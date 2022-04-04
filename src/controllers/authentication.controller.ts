import LogInDto from 'dto/logIn.dto';
import { Request, Response, NextFunction, } from 'express';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from '../services/authentication.service';


class AuthenticationController {

  static async registration (request: Request, response: Response, next: NextFunction) {
    const userData: CreateUserDto = request.body;
    try {
      const {
        user,
      } = await AuthenticationService.register(userData);
      response.status(201).json({
        status: 201,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async loggingIn (request: Request, response: Response, next: NextFunction) {
    const logInData: LogInDto = request.body;
    try {
      const { user, access_token, refresh_token } = await AuthenticationService.login(logInData);
      response.cookie('access_token', access_token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: true,
      });
      console.log(refresh_token);
      response.cookie('refresh_token', refresh_token, {
        maxAge: 60 * 60 * 30 * 1000, // 30 day
        httpOnly: true,
        secure: true,
        sameSite: true,
      });

      response.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

}

export default AuthenticationController;