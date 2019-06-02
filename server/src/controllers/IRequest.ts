import { Request, Response } from "express";

export interface IRequest extends Request {
  user?: { userID: string };
}
