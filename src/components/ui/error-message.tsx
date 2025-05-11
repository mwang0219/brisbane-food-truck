'use client';

import { ApiError } from '@/types/api';
import { AlertCircle } from 'lucide-react';
import { Button } from './button';

export interface ErrorMessageProps {
  error: ApiError;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <h3 className="text-lg font-semibold mb-1">出错了</h3>
      <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          重试
        </Button>
      )}
    </div>
  );
} 