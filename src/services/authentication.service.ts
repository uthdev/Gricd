import CreateUserDto from "dto/user.dto";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/ResourceExitsException';
import { User } from '../models'
import LogInDto from "dto/logIn.dto";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import client from "../connections/init_redis";

class AuthenticationService {
  
  static async register(userData: CreateUserDto) {
    if (
      await User.findOne({ email: userData.email })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(`User with email ${userData.email} already exists`);
    }
    const newUser = new User(userData)
    const user = await newUser.save();
    return {
      user,
    };
  }

  static async login(logInData: LogInDto) {
    const user = await User.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password,
      );
      if (isPasswordMatching) {
        const secret = <string>process.env.JWT_ACCESS_SECRET;
        const access_token = jwt.sign({sub: user._id}, secret, { expiresIn: process.env.JWT_ACCESS_TIME});
        const refresh_token = await this.generateRefreshToken(user._id);
        return {
          user, access_token, refresh_token
        };
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }

  static async generateRefreshToken(user_id: string) {
    try {  
      const refresh_token = jwt.sign({ sub: user_id }, <string>process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME });
      await client.set(user_id.toString(), JSON.stringify({token: refresh_token}))
      return refresh_token;
    } catch (error) {
      return error;
    }
  }
}

export default AuthenticationService;
