
import { Router,Request,Response } from "express";
import { RedisManager } from "../RedisManager";
import { GET_DEPTH } from "../types";

export const tickersRouter:Router = Router();



tickersRouter.get("/", async (req: Request, res: Response) => {
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

// firstPrice": "0.1709",
// "high": "0.1723",
// "lastPrice": "0.1723",
// "low": "0.1709",
// "priceChange": "0.0014",
// "priceChangePercent": "0.008192",
// "quoteVolume": "10.520498",
// "symbol": "BLUR_USDC",
// "trades": "2",
// "volume": "61.06"