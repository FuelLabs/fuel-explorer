import { Button } from '@fuels/ui';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

// A class component is required here: React only calls
// getDerivedStateFromError/componentDidCatch on class components, so a hook
// version cannot catch errors thrown by its own render tree.
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
          <h1 className="text-2xl font-medium">Something went wrong</h1>
          <p className="text-base">
            An unexpected error occurred. Please reload the page.
          </p>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
