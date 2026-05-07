export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  //these are for google auth login
  profileImgURL?: string;
  isGoogleAuth?: boolean;
  isVerified?: boolean;
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

export interface updateProfileImgDTO {
  email: string;
  imgUrl: string;
}

export interface updateProfileDTO {
  id: string;
  username: string;
  profileImgURL?: string;
}

export interface OtpDocResponseDTO {
  id: string | undefined;
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAT?: Date;
};

export class OtpEntity {
  constructor(
    public id: string | undefined,
    public email: string,
    public otp: string,
    public expiresAt: Date,
    public createdAt?: Date,
    public updatedAT?: Date,
  ) {}
}
