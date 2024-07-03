
"use client";

import { useEffect, useState } from "react";
import { getDepth, getKlines, getTicker, getTrades } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";

export function Depth({ market }: {market: string}) {
    const [bids, setBids] = useState<[string, string][]>();
    const [asks, setAsks] = useState<[string, string][]>();
    const [price, setPrice] = useState<string>();

    useEffect(() => {
        SignalingManager.getInstance().registerCallback("depth", (data: any) => {
            console.log("depth has been updated");
            console.log(data);
            
            setBids((originalBids) => {
                const bidsAfterUpdate = new Map((originalBids || []).map(bid => [bid[0], bid[1]]));
            
                data.bids.forEach(([price, amount]:any) => {
                    if (Number(amount) === 0) {
                        bidsAfterUpdate.delete(price);
                    } else {
                        bidsAfterUpdate.set(price, amount);
                    }
                });
            
                const updatedBids = Array.from(bidsAfterUpdate.entries()).sort(([priceA], [priceB]) => Number(priceB) - Number(priceA));
                return updatedBids;
            });
            setAsks((originalAsks) => {
                const asksAfterUpdate = new Map((originalAsks || []).map(ask => [ask[0], ask[1]]));
            
                data.asks.forEach(([price, amount]:any) => {
                    if (Number(amount) === 0) {
                        asksAfterUpdate.delete(price);
                    } else {
                        asksAfterUpdate.set(price, amount);
                    }
                });
            
                const updatedAsks = Array.from(asksAfterUpdate.entries()).sort(([priceA], [priceB]) => Number(priceA) - Number(priceB));
                return updatedAsks;
            });
            
        }, `DEPTH-${market}`);
        
        SignalingManager.getInstance().sendMessage({method: "SUBSCRIBE", params: [`depth.200ms.${market}`], id: 3});

        getDepth(market).then(d => {    
            setBids(d.bids.reverse());
            setAsks(d.asks);
        });

        getTicker(market).then(t => setPrice(t.lastPrice));
        getTrades(market).then(t => setPrice(t[0].price));

        return () => {
            SignalingManager.getInstance().sendMessage({method: "UNSUBSCRIBE", params: [`depth.200ms.${market}`], id: 3});
            SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
        }
    }, []) 
    
    return <div>
        <TableHeader />
        {asks && <AskTable asks={asks} />}
        {price && <div>{price}</div>}
        {bids && <BidTable bids={bids} />}
    </div>
}

function TableHeader() {
    return <div className="flex justify-between text-xs">
    <div className="text-white">Price</div>
    <div className="text-slate-500">Size</div>
    <div className="text-slate-500">Total</div>
</div>
}