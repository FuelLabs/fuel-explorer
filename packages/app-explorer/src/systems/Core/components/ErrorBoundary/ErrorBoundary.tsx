import { Button } from '@fuels/ui';
import i18n from '@i18n';
import { Component, type ErrorInfo, type ReactNode } from 'react';

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
        <div className="flex flex-col items-center justify-center gap-4 pt-16 pb-16 text-center">
          <h1 className="text-2xl font-medium">
            {i18n.t('errors.unexpected')}
          </h1>
          <p className="text-base">{i18n.t('errors.unexpected_body')}</p>
          <Button onClick={() => window.location.reload()}>
            {i18n.t('errors.reload')}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
