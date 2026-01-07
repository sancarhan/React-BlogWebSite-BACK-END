import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token bulunamadı"
    });
  }

  // Bearer ayrıştır
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 çok önemli
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Geçersiz veya süresi dolmuş token"
    });
  }
};

export default auth;
