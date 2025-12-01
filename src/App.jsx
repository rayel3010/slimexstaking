// src/App.jsx
import { useState } from "react";
import { useAccount } from "wagmi";

function App() {
  const { address, isConnected } = useAccount();

  const [activeTab, setActiveTab] = useState("stake");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");

  const navItems = [
    { id: "stake", label: "Stake", icon: "🧬" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-night bg-radial-grid text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#050816]/80 backdrop-blur-xl flex flex-col">
        {/* Logo + brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <img
            src="/1111.png"
            alt="SlimeX Logo"
            className="w-10 h-10 rounded-2xl shadow-neon object-cover"
          />

          <div className="leading-tight">
            <div className="font-semibold text-sm tracking-wide">
              SlimeX Staking
            </div>
            <div className="text-[11px] text-text-dim uppercase tracking-widest">
              Reward Points
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-neon-purple/40 to-neon-cyan/40 shadow-neon-soft"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                {item.label}
              </span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
<div className="px-4 py-4 border-t border-white/5 text-[11px] text-text-dim space-y-1">

  <div className="flex items-center justify-between mb-1">
    <span>Network</span>
    <span className="text-xs text-neon-cyan">
      {selectedNetwork === "ethereum"
        ? "Ethereum"
        : selectedNetwork === "base"
        ? "Base"
        : "Arbitrum"}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <span>Program</span>
    <span className="text-xs text-text-dim">SlimeX Points v1</span>
  </div>

  {/* Email Support */}
  <div className="pt-2 border-t border-white/5">
    <span className="block">Support</span>
    <a
      href="mail:support@slimexnft.xyz"
      className="text-xs text-neon-cyan hover:underline"
    >
      support@slimexnft.xyz
    </a>
  </div>

</div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-xl bg-night/60">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-text-dim mb-1">
              SLIMEX STAKING DASHBOARD
            </div>
            <h1 className="text-2xl font-semibold">
              {activeTab === "stake" ? "Stake NFTs · Earn Points" : "Settings"}
            </h1>
          </div>

          {/* Web3Modal connect button – giữ nguyên */}
          <w3m-button />
        </header>

        {/* Content */}
        {activeTab === "stake" ? (
          <StakeView isConnected={isConnected} />
        ) : (
          <SettingsView
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        )}
      </main>
    </div>
  );
}

/* STAKE TAB – chỉ UI, không cho stake / không hiện điểm */

function StakeView({ isConnected }) {
  return (
    <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-[2fr,1.3fr] gap-8">
      
      {/* LEFT SIDE */}
      <section className="space-y-6">
        
        {/* Summary card */}
        <div className="rounded-3xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-7 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-dim mb-2">
                SLIMEX POINTS PROGRAM
              </p>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                Stake SlimeX NFTs, earn reward points.
              </h2>
              <p className="text-sm text-text-dim max-w-md">
                Staking is currently disabled. You can already connect your wallet and get ready for the program launch.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm min-w-[170px]">
              <div className="rounded-2xl border border-neon-cyan/40 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-text-dim uppercase tracking-[0.2em] mb-1">
                  Your Staked NFTs
                </div>
                <div className="text-xl font-semibold">-</div>
              </div>

              <div className="rounded-2xl border border-neon-pink/40 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-text-dim uppercase tracking-[0.2em] mb-1">
                  Reward Points
                </div>
                <div className="text-xl font-semibold">-</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stake form */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-1">Stake NFTs</h3>
              <p className="text-xs text-text-dim">Staking is not available yet.</p>
            </div>
            <div className="hidden md:block text-[11px] text-text-dim">
              Reward rate: 10 pts / NFT / day (coming soon)
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs text-text-dim mb-1">Number of NFTs</label>

              <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-2">
                <input
                  type="number"
                  placeholder="Staking coming soon"
                  disabled
                  className="bg-transparent outline-none text-sm flex-1 cursor-not-allowed text-text-dim"
                />
                <button
                  type="button"
                  disabled
                  className="text-[11px] px-2 py-1 rounded-lg bg-white/10 opacity-50 cursor-not-allowed"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled
                className="px-5 py-2 rounded-xl text-sm bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold shadow-neon-soft opacity-50 cursor-not-allowed"
              >
                Stake Selected
              </button>

              <button
                type="button"
                disabled
                className="px-5 py-2 rounded-xl text-sm bg-transparent border border-white/15 text-text-dim opacity-50 cursor-not-allowed"
              >
                Unstake All
              </button>
            </div>
          </div>

          {isConnected ? (
            <p className="text-[11px] text-text-dim mt-2">
              Wallet connected – staking will be enabled in a future update.
            </p>
          ) : (
            <p className="text-[11px] text-text-dim mt-2">
              Connect your wallet to get ready for SlimeX Staking.
            </p>
          )}
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="space-y-6">

        {/* How it works */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm mb-3">How SlimeX Points Work</h3>
          <ul className="text-xs text-text-dim space-y-2 list-disc list-inside">
            <li>Each staked NFT will generate 10 points per day.</li>
            <li>Points accumulate while NFTs remain staked.</li>
            <li>Unstaking will stop point generation for that NFT.</li>
            <li>Detailed reward rules will be announced when the program goes live.</li>
          </ul>
        </div>

        {/* ⭐ NEW — Prize Pool Card */}
        <div className="rounded-2xl border border-neon-cyan/30 bg-night-soft/80 backdrop-blur-xl p-6 shadow-neon-soft">
          <h3 className="font-semibold text-sm mb-2 text-neon-cyan">
            Total Prize Pool
          </h3>

          <div className="text-3xl font-bold text-white mb-1">
            1,000,000 $SLX
          </div>

          <p className="text-xs text-text-dim">
            Distributed daily to stakers
          </p>
        </div>

      </section>
    </div>
  );
}


/* SETTINGS TAB */

function SettingsView({ selectedNetwork, setSelectedNetwork }) {
  const networks = [
    { id: "ethereum", label: "Ethereum" },
    { id: "base", label: "Base" },
    { id: "arbitrum", label: "Arbitrum" },
  ];

  return (
    <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* LEFT SIDE */}
      <section className="space-y-6">
        {/* Network selector */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm mb-3">Network</h3>
          <p className="text-xs text-text-dim mb-3">
            Select the primary network used by SlimeX Staking.
          </p>

          <div className="flex gap-3">
            {networks.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNetwork(n.id)}
                className={`px-3 py-2 rounded-xl text-sm border transition ${
                  selectedNetwork === n.id
                    ? "border-neon-cyan bg-white/10 text-neon-cyan"
                    : "border-white/10 bg-white/5 text-text-dim hover:border-neon-cyan/40"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Points History – chỉ title, không preview, không dữ liệu demo */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm">Points History</h3>
        </div>
      </section>

      {/* RIGHT SIDE – Community links */} 
<section className="space-y-6">
  <div className="rounded-2xl border border-neon-purple/40 bg-gradient-to-br from-neon-purple/15 to-night-soft/80 p-6 shadow-neon-soft">

    <h3 className="font-semibold text-sm mb-2">Community & Links</h3>
    <p className="text-xs text-text-dim mb-4">
      Official links for the SlimeX ecosystem.
    </p>

    <div className="space-y-4 text-xs">

      {/* X / Twitter */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">X (Twitter)</div>
          <div className="text-text-dim">Official SlimeX Twitter account.</div>
        </div>
        <a
          href="https://x.com/NFTSlimeX"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] transition"
        >
          Open X
        </a>
      </div>

      {/* Discord */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div>
          <div className="font-semibold">Discord</div>
          <div className="text-text-dim">Official SlimeX Discord community.</div>
        </div>
        <a
          href="https://discord.gg/tfp6Gje6"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] transition"
        >
          Open Discord
        </a>
      </div>

      {/* Linktree */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div>
          <div className="font-semibold">Linktree</div>
          <div className="text-text-dim">All official SlimeX links in one place.</div>
        </div>
        <a
          href="https://linktr.ee/nftslimex"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] transition"
        >
          Open Linktree
        </a>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}

export default App;
