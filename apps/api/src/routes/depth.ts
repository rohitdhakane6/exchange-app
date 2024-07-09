import { Router, Request, Response } from "express";
import { RedisManager } from "../RedisManager";
import { GET_DEPTH } from "../types";

export const depthRouter: Router = Router();

depthRouter.get("/", async (req: Request, res: Response) => {
    const { symbol } = req.query;

    if (typeof symbol !== 'string') {
        res.status(400).json({ error: "Symbol query parameter is required and must be a string." });
        return;
    }

    try {
        const response = await RedisManager.getInstance().sendAndAwait({
            type: GET_DEPTH,
            data: {
                market: symbol
            }
        });

        res.json(response.payload);
    } catch (error) {
        console.error('Error fetching depth data:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});
