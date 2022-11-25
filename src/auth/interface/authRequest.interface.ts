import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    name: string;
    is_admin: boolean;
  };
}
