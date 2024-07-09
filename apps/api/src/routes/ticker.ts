
import { Router } from "express";

export const tickersRouter:Router = Router();

tickersRouter.get("/", async (req, res) => {    
    res.json({});
});