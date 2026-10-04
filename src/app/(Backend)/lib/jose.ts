import { jwtVerify, SignJWT } from "jose";

const getSecretKey = () => {
  return new TextEncoder().encode(process.env.SECRET_KEY || "");
};

export async function generateAccessToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(getSecretKey());
}

export async function generateRefreshToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(getSecretKey());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
