
import type { Request, Response } from "express";
export const testController = (req: Request, res: Response) => {
    res.send("Hello, from test controller!");
};