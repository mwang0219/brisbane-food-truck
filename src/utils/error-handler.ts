import { ApiError } from '@/types/api';

/**
 * 处理 API 错误
 * @param error 原始错误
 * @returns 标准化的 API 错误对象
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof Response) {
    return {
      message: `HTTP error! status: ${error.status}`,
      code: `HTTP_${error.status}`
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  }

  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR'
  };
} 