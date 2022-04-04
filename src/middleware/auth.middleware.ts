
import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import client from '../connections/init_redis';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { User } from '../models';

const verifyToken = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  //extract token from cookies
  const cookieToken = request.cookies['access_token'];
  const refresh_token = request.cookies['refresh_token'];
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1] || cookieToken;
  if (token) {
    const secret = <string>process.env.JWT_SECRET;
    try {
      const payload = <JwtPayload>jwt.verify(token, secret);

      const id = payload._id;
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

// const verifyRefreshToken = async (request: RequestWithUser, response: Response, next: NextFunction) => {
//   const token = request.cookies['refresh_token'];

//   if(token === null) return response.status(401).json({status: false, message: "Invalid request."});
//   try {
//       const payload = <JwtPayload>jwt.verify(token, <string>process.env.JWT_REFRESH_SECRET);
//       request.user = payload;

//       // verify if token is in store or not
//       const user = <string>payload.sub?.toString();
//       const data = await client.get(user)

//       if(data === null) next(new AuthenticationTokenMissingException());
//       if(JSON.parse(data).token != token) return res.status(401).json({status: false, message: "Invalid request. Token is not same in store."});

//           next();
//   } catch (error) {
//     next(new WrongAuthenticationTokenException());
//   }
// }

export default verifyToken;
