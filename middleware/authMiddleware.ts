require("dotenv").config();
import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import User from "../entity/User";


export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;

 //jws controlling
  if (token) {
    jwt.verify(token, "baris", (err: any, decryptedToken: any ) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decryptedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

console.log(process.env.JWT)
//controlling user's jwt
export const checkUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "baris", async (err: any, decryptedToken: any) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.find(decryptedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};