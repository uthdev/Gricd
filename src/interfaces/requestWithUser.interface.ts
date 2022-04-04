import { Request } from 'express';
import User from 'interfaces/user.interface';
import { IUser } from 'models/user.model';

interface RequestWithUser extends Request {
  user?: IUser['_id'];
}

export default RequestWithUser;
