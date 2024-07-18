import React, { Component, ComponentType, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

function withErrorBoundary<P>(WrappedComponent: ComponentType<P>) {
  return class ErrorBoundary extends Component<P, State> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log('ErrorBoundary caught an error', error, errorInfo);
      this.setState({
        error: error,
        errorInfo: errorInfo,
      });
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withErrorBoundary;
