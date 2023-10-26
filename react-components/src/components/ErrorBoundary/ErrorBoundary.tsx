import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Record<string, never>>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<Record<string, never>>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Произошла ошибка.</h1>
          <button onClick={() => window.location.reload()}>
            Перезагрузить
          </button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
