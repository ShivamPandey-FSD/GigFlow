import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
 const token = req.cookies.token;

 if (!token) {
  return res.status(400).json({ message: "Not authorized. Login required" });
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
 } catch (error) {
  res.status(401).json({ message: "Invalid or expired token" });
 }
}

export default authMiddleware;
