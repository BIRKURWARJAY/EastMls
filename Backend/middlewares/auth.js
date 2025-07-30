export const authenticateUser = (req, res, next) => {
  const token = req.cookies.EastMls?.token;

  if (!token) {
    return next(PostError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      return next(PostError("Unauthorized", 401));
    }

    req.user = decoded;
    next();
  });
}