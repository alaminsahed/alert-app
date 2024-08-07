import { Error404 } from 'components/error/404';
import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught in error boundary:', error);
    console.error('Error info:', errorInfo);
  }

  componentDidMount() {
    window.onerror = () => {
      this.setState({ hasError: true });
    };
  }

  componentWillUnmount() {
    window.onerror = null;
  }

  render() {
    if (this.state.hasError) {
      return <Error404 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
