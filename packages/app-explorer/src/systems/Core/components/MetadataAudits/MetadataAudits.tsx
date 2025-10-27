import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import type { MetadataAudit } from '~portal/systems/Ecosystem/types';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

type MetadataAuditsProps = {
  audits: MetadataAudit[];
};

export function MetadataAudits({ audits }: MetadataAuditsProps) {
  if (!audits.length) {
    return null;
  }

  return (
    <CodeBlock title="Security Audit" type="jsx" copy={false}>
      <ul className="list-disc pl-3">
        {audits.map((audit) => (
          <li key={audit.auditor}>
            {audit.auditor} - {dayjs.utc(audit.date).format('MMM Do, YYYY')} -{' '}
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
