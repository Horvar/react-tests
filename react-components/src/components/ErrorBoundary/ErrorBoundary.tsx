import React from 'react';
import styles from './ErrorBoundary.module.css';

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
        <div className={styles.error}>
          <div className={styles.errorWrapper}>
            <h1 className={styles.errorTitle}>An error has occurred</h1>
            <button
              className={styles.errorButton}
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
