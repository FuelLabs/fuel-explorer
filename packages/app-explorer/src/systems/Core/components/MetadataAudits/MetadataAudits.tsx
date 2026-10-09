import { useTranslation } from 'react-i18next';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import type { MetadataAudit } from '~portal/systems/Ecosystem/types';

type MetadataAuditsProps = {
  audits: MetadataAudit[];
};

export function MetadataAudits({ audits }: MetadataAuditsProps) {
  const { i18n } = useTranslation();
  if (!audits.length) {
    return null;
  }

  return (
    <CodeBlock title="Security Audit" type="jsx" copy={false}>
      <ul className="list-disc pl-3">
        {audits.map((audit) => (
          <li key={audit.auditor}>
            {audit.auditor} -{' '}
            {new Intl.DateTimeFormat(i18n.language, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
            }).format(new Date(audit.date))}{' '}
            -{' '}
            <a
              href={audit.url}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-11 hover:text-blue-10 transition-colors"
            >
              Security Audit Report
            </a>
          </li>
        ))}
      </ul>
    </CodeBlock>
  );
}
