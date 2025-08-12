export const cookieOptions = (maxAge) => {
  return {
    httpOnly: true,
    secure: true,
    origin: process.env.FRONTEND_URI,
    sameSite: "none",
    expires: new Date(Date.now() + maxAge)
  }
};