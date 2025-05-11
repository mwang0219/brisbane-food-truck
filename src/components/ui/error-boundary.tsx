'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { ApiError } from '@/types/api';
import { ErrorMessage } from './error-message';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const apiError: ApiError = {
        message: this.state.error?.message || 'An unknown error occurred',
        code: 'UNKNOWN_ERROR'
      };

      return <ErrorMessage error={apiError} />;
    }

    return this.props.children;
  }
} 