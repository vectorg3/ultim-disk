export interface IServerError {
  error: string;
  message: string;
  statusCode: number;
}

export const TokenExpiredError = 'Token expired'
