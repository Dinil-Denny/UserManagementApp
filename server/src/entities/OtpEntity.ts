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
