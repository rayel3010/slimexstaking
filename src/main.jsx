// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { wagmiConfig, projectId, chains } from "./web3Config";

// Khởi tạo modal đúng chuẩn Web3Modal v3
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark"
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);
