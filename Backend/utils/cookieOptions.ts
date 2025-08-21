interface cookieOptions {
  httpOnly: boolean;
  secure: boolean;
  origin: string | undefined;
  sameSite: "none" | "lax" | "strict";
  expires: Date;
}


export const cookieOptions = (maxAge: number): cookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    origin: process.env.FRONTEND_URI,
    sameSite: "none",
    expires: new Date(Date.now() + maxAge)
  }
};