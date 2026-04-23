//Access token and refresh token generation
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user: {
  id: string | undefined;
  role: string;
}) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
};

export const generateRefreshToken = (id: string | undefined) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
