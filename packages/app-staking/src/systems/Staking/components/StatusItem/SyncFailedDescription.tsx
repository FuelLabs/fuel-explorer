import { Trans } from 'react-i18next';

export const SyncFailedDescription = () => (
  <Trans
    i18nKey="staking.status.sync_failed_body"
    components={{
      discord: (
        // biome-ignore lint/a11y/useAnchorContent: Trans fills the text
        <a
          href="https://discord.com/invite/xfpK4Pe"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        />
      ),
    }}
  />
);
