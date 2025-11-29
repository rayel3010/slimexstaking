// src/web3Config.js
import { defaultWagmiConfig } from "@web3modal/wagmi";
import { mainnet } from "wagmi/chains";

export const projectId = "286949e647ce38e5ed962308cf28489e"; // 👈 thay bằng ID thật

export const metadata = {
  name: "SlimeX Staking",
  description: "Stake SlimeX NFTs and earn reward points",
  url: "https://slimex-staking.vercel.app",
  icons: ["https://slimex-staking.vercel.app/1111.png"]
};

export const chains = [mainnet];

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata
});
