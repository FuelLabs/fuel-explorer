// biome-ignore lint/correctness/noUnusedVariables: <explanation>
import { promises as fs } from 'fs';
import path from 'path';
import * as url from 'url';
import { globby } from 'globby';
import _ from 'lodash';
import prettier from 'prettier';
import ts from 'typescript';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const COMPONENT_DIR = path.join(__dirname, '../src/components');
const INDEX_FILE = path.join(__dirname, '../src/index.tsx');

const PRETTIER_CONFIG = {
  printWidth: 80,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  quoteProps: 'as-needed',
};

function prettierFormat(str) {
  return prettier.format(str, { parser: 'typescript', ...PRETTIER_CONFIG });
}

function extractExports(sourceFile) {
  const exports = {
    valueExports: [],
    typeExports: [],
  };

  function visit(node) {
    if (ts.isExportAssignment(node)) {
      exports.valueExports.push('default');
    } else if (ts.isExportDeclaration(node)) {
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) {
          if (node.isTypeOnly) {
            exports.typeExports.push(element.name.getText(sourceFile));
          } else {
            exports.valueExports.push(element.name.getText(sourceFile));
          }
        }
      }
    } else if (
      ts.isFunctionDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isVariableStatement(node) ||
      ts.isEnumDeclaration(node)
    ) {
      if (node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        if (ts.isVariableStatement(node)) {
          for (const declaration of node.declarationList.declarations) {
            exports.valueExports.push(declaration.name.getText(sourceFile));
          }
        } else {
          exports.valueExports.push(node.name.text);
        }
      }
    } else if (
      ts.isTypeAliasDeclaration(node) ||
      ts.isInterfaceDeclaration(node)
    ) {
      if (node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        exports.typeExports.push(node.name.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  exports.valueExports = _.uniq(exports.valueExports);
  exports.typeExports = _.uniq(exports.typeExports);
  return exports;
}

async function getAllComponents() {
  const allComponents = await globby(
    [
      '**/*.tsx',
      '**/use**.ts',
      '!**/*.stories.tsx',
      '!**/*.test.{tsx,ts}',
      '!**/styles.ts',
    ],
    {
      deep: 2,
      cwd: COMPONENT_DIR,
      absolute: true,
      onlyFiles: true,
    },
  );

  const components = await Promise.all(
    allComponents
      .map(async (comp) => {
        const name = path.parse(comp).name;
        const baseComponent = path.parse(path.dirname(comp)).name;
        const component = name === baseComponent ? null : name;
        const sourceFile = ts.createSourceFile(
          comp,
          await fs.readFile(comp, 'utf8'),
        );

        const { valueExports, typeExports } = extractExports(sourceFile);
        return {
          dir: path.dirname(comp),
          component,
          baseComponent,
          exports: [...new Set(valueExports)],
          types: [...new Set(typeExports)],
        };
      })
      .filter(Boolean),
  );

  return components;
}

function createExportStr(from, exports, isType, pathPrefix = '') {
  const listStr = exports?.sort().join(',');
  return exports.length
    ? `export ${
        isType ? 'type' : ''
      } { ${listStr} } from './${pathPrefix}${from}';`
    : '';
}

function createNestedExportStr(main, nested, isType) {
  if (!nested.length) return '';
  const key = isType ? 'types' : 'exports';
  let items = [];
  for (const n of nested) {
    const list = n[key]
      .filter((i) => main.indexOf(i) === -1)
      .filter((i) => items.every((item) => item.list.indexOf(i) === -1));
    const from = n.component;
    items = items.concat({ from, list });
  }

  return items
    .map((n) => {
      const res = createExportStr(n.from, n.list, isType);
      return res.length ? res : null;
    })
    .filter(Boolean)
    .sort()
    .join('\n');
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function createComponentIndex(components) {
  const mainComponents = components.filter((s) => !s.component);
  for (const item of mainComponents) {
    const component = item.baseComponent;
    const nested = components.filter(
      (c) =>
        c.baseComponent === component &&
        c.component &&
        !c.component?.startsWith('index'),
    );

    const mainExportsStr = createExportStr(component, item.exports);
    const mainTypesStr = createExportStr(component, item.types, true);
    const nestedExportStr = createNestedExportStr(item.exports, nested);
    const nestedTypesStr = createNestedExportStr(item.types, nested, true);

    const index = [
      mainExportsStr,
      mainTypesStr,
      nestedExportStr,
      nestedTypesStr,
    ].join('\n\n');

    const content = await prettierFormat(index);
    await fs.writeFile(`${item.dir}/index.tsx`, content);
  }
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function createMainComponentsIndex(components) {
  const mainComponents = components.filter((s) => !s.component);
  let list = [];

  for (const item of mainComponents) {
    const mainPath = `${item.dir}/index.tsx`;
    const mainStr = await fs.readFile(mainPath, 'utf8');
    const sourceFile = ts.createSourceFile(mainPath, mainStr);
    const { valueExports, typeExports } = extractExports(sourceFile);
    const uniqueExports = [...new Set(valueExports)];
    const uniqueTypes = [...new Set(typeExports)];
    const exportsStr = createExportStr(
      item.baseComponent,
      uniqueExports,
      false,
      'components/',
    );
    const typesStr = createExportStr(
      item.baseComponent,
      uniqueTypes,
      true,
      'components/',
    );
    if (exportsStr.length) list.push(exportsStr);
    if (typesStr.length) list.push(typesStr);
  }

  list = list.join('\n\n');
  const content = await prettierFormat(list);
  await fs.writeFile(INDEX_FILE, content);
}

async function pkgJSON(components) {
  const pkgJSONBuffer = await fs.readFile(
    path.join(__dirname, '../package.json'),
  );
  const pkgJSON = JSON.parse(pkgJSONBuffer.toString());
  const typesVersions = { '*': {} };
  const exportsConfig = {};

  const comps = Array.from(new Set(components.map((c) => c.baseComponent)));
  comps.forEach((component) => {
    const name = component;
    const folder = path.join('./dist/components', name);
    typesVersions['*'][name] = [`./${folder}/index.d.ts`];
    exportsConfig[`./${name}`] = {
      import: `./${folder}/index.esm.js`,
      types: `./${folder}/index.d.ts`,
      typings: `./${folder}/index.d.ts`,
    };
  });
  typesVersions['*']['.'] = ['./dist/index.d.ts'];
  exportsConfig['.'] = {
    import: './dist/index.esm.mjs',
    types: './dist/index.d.ts',
    typings: './dist/index.d.ts',
  };
  exportsConfig['./index.css'] = './dist/index.css';
  exportsConfig['./theme'] = {
    import: './dist/theme.esm.js',
    types: './dist/theme.d.ts',
    typings: './dist/theme.d.ts',
  };

  pkgJSON.exports = exportsConfig;
  pkgJSON.typesVersions = typesVersions;

  await fs.writeFile(
    path.join(__dirname, '../package.json'),
    JSON.stringify(pkgJSON, null, 2),
  );
}

export async function tsup(components) {
  const comps = Array.from(new Set(components.map((c) => c.baseComponent)));
  const entryPoints = comps.map((c) => `src/components/${c}/index.tsx`);

  await fs.writeFile(
    path.join(__dirname, '../tsup.text'),
    JSON.stringify({ entry: entryPoints }),
  );
}

async function main() {
  const components = await getAllComponents();
  // const allIndex = await globby(`${COMPONENT_DIR}/**/index.tsx`);
  // await Promise.all(allIndex.map((i) => fs.rm(i)));

  // await createComponentIndex(components);
  // await createMainComponentsIndex(components);
  await pkgJSON(components);
  // await tsup(components);
}

main();
