import { Router } from "express";

export const tradesRouter:Router = Router();

tradesRouter.get("/", async (req, res) => {
    const { market } = req.query;
    // get from DB
    res.json({});
})