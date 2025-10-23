import { useEffect, useState } from 'react';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import { MetadataSourcecodeCommit } from './MetadataSourcecodeCommit';

type MetadataSourcecodeProps = {
  url: string;
  commit: string;
};

export function MetadataSourcecode({ url, commit }: MetadataSourcecodeProps) {
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchSource() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const text = await response.text();
        if (isMounted) setSourceCode(text);
      } catch {
        if (isMounted) setError(true);
      }
    }

    fetchSource();
    return () => {
      isMounted = false;
    };
  }, [url]);

  if (error) return null;
  if (!sourceCode) return <div>Loading...</div>;

  return (
    <CodeBlock
      type="jsx"
      title="Source Code"
      height={300}
      rightEl={<MetadataSourcecodeCommit url={url} commit={commit} />}
    >
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </CodeBlock>
  );
}
