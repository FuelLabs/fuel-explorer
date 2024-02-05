import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: ["./src/queries/**.graphql"],
  schema: `http://localhost:${process.env.SERVER_PORT}/graphql`,
  generates: {
    "src/generated/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        nonOptionalTypename: true,
        rawRequest: true,
        useTypeImports: true,
        defaultScalarType: "string",
        scalars: {
          Boolean: "boolean",
          Int: "number",
        },
      },
    },
    "src/generated/mocks.ts": {
      plugins: [
        {
          "typescript-mock-data": {
            addTypename: true,
            typesFile: "./types.ts",
            typesNames: "keep",
            generateLibrary: "faker",
            fieldGeneration: {
              _all: {
                totalAmount: {
                  generator: "datatype.hexadecimal",
                },
              },
            },
            scalars: {
              Address: {
                generator: "random.alphaNumeric",
                arguments: [40],
              },
              AssetId: {
                generator: "random.alphaNumeric",
                arguments: [32],
              },
              ContractId: {
                generator: "random.alphaNumeric",
                arguments: [32],
              },
              TransactionId: {
                generator: "random.alphaNumeric",
                arguments: [32],
              },
              UtxoId: {
                generator: "random.alphaNumeric",
                arguments: [32],
              },
              U64: {
                generator: "datatype.hexadecimal",
              },
              HexString: {
                generator: "datatype.hexadecimal",
                arguments: [160],
              },
            },
          },
        },
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ["pnpm fix:generated"],
  },
};
export default config;
