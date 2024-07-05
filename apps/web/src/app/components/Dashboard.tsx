"use client";
import React, { useState } from "react";
import { Markets } from "./Markets";

interface CryptoData {
  name: string;
  pair: string;
  price: number;
  change: number;
  logo: string;
}

interface DashboardProps {
  data: {
    new: CryptoData[];
    topGainers: CryptoData[];
    experimental: CryptoData[];
  };
}

const TopMarket: React.FC<{ data: CryptoData[]; title: string }> = ({
  data,
  title,
}) => {
  return (
    <div className="rounded-lg bg-baseBackgroundL1 shadow-sm text-base p-5 min-h-[180px] w-full">
      <p className="font-medium text-baseTextHighEmphasis mb-4">{title}</p>
      {data.map((crypto, index) => (
        <div
          className="flex items-center justify-between flex-row mt-4 !text-sm"
          key={index}
        >
          <div className="flex flex-row w-[40%]">
            <div className="flex items-center flex-row gap-2 w-full cursor-pointer">
              <div className="flex flex-row relative">
                <img
                  alt={`${crypto.name} Logo`}
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  className="z-10 rounded-full"
                  src={crypto.logo}
                  style={{ color: "transparent" }}
                />
              </div>
              <p className="font-medium text-baseTextHighEmphasis">
                {crypto.pair}
              </p>
            </div>
          </div>
          <div className="flex justify-end flex-row w-[30%]">
            <p className="font-medium text-baseTextHighEmphasis tabular-nums">
              ${crypto.price}
            </p>
          </div>
          <div className="flex justify-end flex-row w-[30%]">
            <p
              className={`font-medium tabular-nums ${
                crypto.change < 0 ? "text-redText" : "text-greenText"
              }`}
            >
              {crypto.change}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
function Tab() {
  const tabs = ["all", "spot", "experimental", "favorites"];
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-row mt-8">
      <div className="flex flex-col" data-rac="" data-orientation="horizontal">
        <div
          id="react-aria-tablist"
          role="tablist"
          aria-orientation="horizontal"
          className="mx-auto flex space-x-2"
          data-rac=""
          data-orientation="horizontal"
        >
          {tabs.map((tab) => (
            <div
              key={tab}
              tabIndex={activeTab === tab ? 0 : -1}
              data-key={tab}
              id={`react-aria-tab-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls={`react-aria-tabpanel-${tab}`}
              role="tab"
              className={`cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize outline-none ${
                activeTab === tab
                  ? "bg-blue-600/[16%] text-accentBlue/90"
                  : "text-baseTextMedEmphasis"
              }`}
              data-rac=""
              data-selected={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Dashboard: React.FC = () => {
  const data: DashboardProps["data"] = {
    new: [
      {
        name: "MOTHER",
        pair: "MOTHER/USDC",
        price: 0.0446,
        change: -19.78,
        logo: "/_next/image?url=%2Fcoins%2Fmother.png&w=48&q=75",
      },
      {
        name: "ZEX",
        pair: "ZEX/USDC",
        price: 0.0793,
        change: -16.0,
        logo: "/_next/image?url=%2Fcoins%2Fzex.png&w=48&q=75",
      },
      {
        name: "ZRO",
        pair: "ZRO/USDC",
        price: 3.6596,
        change: -4.43,
        logo: "/coins/zro.svg",
      },
    ],
    topGainers: [
      {
        name: "UNI",
        pair: "UNI/USDC",
        price: 8.8,
        change: 10.0,
        logo: "/_next/image?url=%2Fcoins%2Funi.png&w=48&q=75",
      },
      {
        name: "KMNO",
        pair: "KMNO/USDC",
        price: 0.0377,
        change: 5.9,
        logo: "/_next/image?url=%2Fcoins%2Fkmno.png&w=48&q=75",
      },
      {
        name: "MOBILE",
        pair: "MOBILE/USDC",
        price: 0.00211,
        change: 4.98,
        logo: "/_next/image?url=%2Fcoins%2Fmobile.png&w=48&q=75",
      },
    ],
    experimental: [
      {
        name: "MOTHER",
        pair: "MOTHER/USDC",
        price: 0.0446,
        change: -19.78,
        logo: "/_next/image?url=%2Fcoins%2Fmother.png&w=48&q=75",
      },
      {
        name: "HABIBI",
        pair: "HABIBI/USDC",
        price: 0.012747,
        change: 2.87,
        logo: "/_next/image?url=%2Fcoins%2Fhabibi.png&w=48&q=75",
      },
      {
        name: "BODEN",
        pair: "BODEN/USDC",
        price: 0.0356,
        change: -37.26,
        logo: "/_next/image?url=%2Fcoins%2Fboden.png&w=48&q=75",
      },
    ],
  };

  return (
    <div className="flex justify-center flex-row mx-[24px]">
      <div className="flex flex-col min-w-[700px] flex-1">
        <div className="flex items-center flex-row my-4">
          <p className="text-baseTextHighEmphasis text-[28px] font-semibold">
            Markets
          </p>
        </div>
        <div className="flex items-center justify-between flex-row gap-6">
          <TopMarket data={data.new} title="New" />
          <TopMarket data={data.topGainers} title="Top Gainers" />
          <TopMarket data={data.experimental} title="Experimental" />
        </div>
        <Tab />
        <div className="flex flex-col mt-3 flex-1 rounded-xl bg-baseBackgroundL0">
          <Markets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
