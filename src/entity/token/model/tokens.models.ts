export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokensUnpacked {
  accessToken?: string;
  refreshToken?: string;
}

export const TokenExpiredError = 'Token expired'
