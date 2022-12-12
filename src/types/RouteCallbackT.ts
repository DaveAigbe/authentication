import {Request, Response} from "express";

export type RouteCallbackT = (req: Request, res: Response) => void;
