export interface UserPayload {
  email: string;
  displayName: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginDto {
  email: string;
  password?: string;
  isGoogleAuth?: boolean;
}

export interface AuthResponseData {
  token: string;
  user: UserPayload;
}
