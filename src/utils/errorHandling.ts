export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return { statusCode: error.statusCode, message: error.message };
  } else if (error instanceof Error) {
    return { statusCode: 500, message: error.message, stack: error.stack };
  } else {
    return { statusCode: 500, message: 'An unknown error occurred' };
  }
}