import { Button } from '@fuels/ui';
import i18n from '@i18n';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { PageState } from '../PageState/PageState';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

// React only supports error boundaries as class components.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-screen-lg px-4 py-16">
          <PageState
            tone="error"
            title={i18n.t('errors.unexpected')}
            description={i18n.t('errors.unexpected_body')}
            action={
              <Button onClick={() => window.location.reload()}>
                {i18n.t('errors.reload')}
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
