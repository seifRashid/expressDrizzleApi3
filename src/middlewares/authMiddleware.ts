//create an auth middleware to protect routes
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth middleware reached");
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Access token required" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: jwt.JwtPayload | string | null) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid or expired token" });
//     }
//     (req as any).user = user;
//     next();
//   });

//extract token from cookies,or headers then verify it and attach the user to the request object
const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: jwt.JwtPayload | string | null) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    (req as any).user = user;
    next();
  });
};

