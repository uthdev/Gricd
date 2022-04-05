
import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { User } from '../models';

const verifyToken = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  //extract token from cookies
  const cookieToken = request.cookies['access_token'];
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1] || cookieToken;
  if (token) {
    const secret = <string>process.env.JWT_ACCESS_SECRET;
    try {
      const payload = <JwtPayload>jwt.verify(token, secret);
      const id = payload.sub;
      const user = await User.findById(id)
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}


export default verifyToken;
