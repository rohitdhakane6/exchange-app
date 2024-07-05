import flowbite from "flowbite-react/tailwind";

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme" | "plugins"> = {
  content: ["./src/app/**/*.tsx", flowbite.content()],
  plugins: [flowbite.plugin()],
  presets: [sharedConfig],
  theme: {
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
    },
    extend: {
      colors: {
        greenBackgroundTransparent: "rgba(0,194,120,.12)",
        redBackgroundTransparent: "rgba(234,56,59,.12)",
        baseBackgroundL0: "rgb(14,15,20)",
        baseBackgroundL1: "rgb(20,21,27)",
        baseBackgroundL2: "rgb(32,33,39)",
        baseBackgroundL3: "rgb(32,33,39)",
        greenPrimaryButtonBackground: "rgb(0,194,120)",

        greenText: "rgb(0,194,120)",
        accentBlue: "rgb(76,148,255)",
      },
      borderColor: {
        redBorder: "rgba(234,56,59,.5)",
        greenBorder: "rgba(0,194,120,.4)",
        baseBorderMed: "#cccccc",
        accentBlue: "rgb(76,148,255)",
        baseBorderLight: "rgb(32,33,39)",
        baseTextHighEmphasis: "rgb(244,244,246)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        greenPrimaryButtonText: "rgb(20,21,27)",
      },
    },
  },
};

export default config;
