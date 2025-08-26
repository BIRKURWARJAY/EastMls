import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: string;
  };
}
export interface RequestWithFiles extends RequestWithUser{
  files: any
}