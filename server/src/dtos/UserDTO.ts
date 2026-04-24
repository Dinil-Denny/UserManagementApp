export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface SaveOtpDTO {
  email: string;
  otp: string;
  expiresAt: Date;
}

export interface OtpDTO {
  email: string;
  otp: string;
}

export interface RefreshTokenDTO {
  id: string | undefined;
  token: string;
}

export interface ResetPassDTO {
  email: string;
  password: string;
}
