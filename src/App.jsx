import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

function App() {
  const [activeTab, setActiveTab] = useState("stake");
  const [account, setAccount] = useState(null);

  const [stakedCount, setStakedCount] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [amountToStake, setAmountToStake] = useState(0);

  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");

  const navItems = [
    { id: "stake", label: "Stake", icon: "🧬" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask to continue.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed. Please try again.");
    }
  }

  function disconnectWallet() {
    setAccount(null);
    setStakedCount(0);
    setRewardPoints(0);
  }

  useEffect(() => {
    if (!account) return;
    setStakedCount(3);
    setRewardPoints(1250);
  }, [account]);

  function handleStakeDemo() {
    if (!account) {
      alert("Connect your wallet first.");
      return;
    }
    if (amountToStake <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    const newStaked = stakedCount + amountToStake;
    const newPoints = rewardPoints + amountToStake * 10;

    setStakedCount(newStaked);
    setRewardPoints(newPoints);
    setAmountToStake(0);
  }

  function handleUnstakeDemo() {
    if (!account) {
      alert("Connect your wallet first.");
      return;
    }
    setStakedCount(0);
  }

  return (
    <div className="min-h-screen bg-night bg-radial-grid text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#050816]/80 backdrop-blur-xl flex flex-col">
        {/* Logo + brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <img
            src="/1111.png"           // file nằm trong /public/slimevip.png
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
        <div className="px-4 py-4 border-t border-white/5 text-[11px] text-text-dim">
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
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-xl bg-night/60">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-text-dim mb-1">
              SlimeX Staking Dashboard
            </div>
            <h1 className="text-2xl font-semibold">
              {activeTab === "stake" ? "Stake NFTs · Earn Points" : "Settings"}
            </h1>
          </div>

          <button
            onClick={account ? disconnectWallet : connectWallet}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink text-black font-semibold text-sm shadow-neon hover:opacity-90 transition"
          >
            {account
              ? account.slice(0, 6) + "..." + account.slice(-4) + " · Disconnect"
              : "Connect Wallet"}
          </button>
        </header>

        {/* Content */}
        {activeTab === "stake" ? (
          <StakeView
            account={account}
            stakedCount={stakedCount}
            rewardPoints={rewardPoints}
            amountToStake={amountToStake}
            setAmountToStake={setAmountToStake}
            onStake={handleStakeDemo}
            onUnstake={handleUnstakeDemo}
          />
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

/* STAKE TAB */

function StakeView({
  account,
  stakedCount,
  rewardPoints,
  amountToStake,
  setAmountToStake,
  onStake,
  onUnstake,
}) {
  return (
    <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-[2fr,1.3fr] gap-8">
      <section className="space-y-6">
        {/* Summary card */}
        <div className="rounded-3xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-7 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-dim mb-2">
                SlimeX Points Program
              </p>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                Stake SlimeX NFTs, earn reward points.
              </h2>
              <p className="text-sm text-text-dim max-w-md">
                Each staked NFT generates{" "}
                <span className="text-neon-cyan font-medium">SlimeX Points</span>{" "}
                over time. Points can be redeemed for rewards, whitelist access,
                or future airdrops depending on the program.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm min-w-[170px]">
              <div className="rounded-2xl border border-neon-cyan/40 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-text-dim uppercase tracking-[0.2em] mb-1">
                  Your Staked NFTs
                </div>
                <div className="text-xl font-semibold">
                  {account ? stakedCount : "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-neon-pink/40 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-text-dim uppercase tracking-[0.2em] mb-1">
                  Reward Points
                </div>
                <div className="text-xl font-semibold">
                  {account ? rewardPoints.toLocaleString() : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stake form */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-1">Stake NFTs</h3>
              <p className="text-xs text-text-dim">
                Enter the number of NFTs you want to stake.
              </p>
            </div>
            <div className="hidden md:block text-[11px] text-text-dim">
              Reward rate:{" "}
              <span className="text-neon-cyan font-medium">
                10 pts / NFT / day
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs text-text-dim mb-1">
                Number of NFTs
              </label>

              <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-2">
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={amountToStake}
                  onChange={(e) =>
                    setAmountToStake(Number(e.target.value) || 0)
                  }
                  className="bg-transparent outline-none text-sm flex-1"
                />
                <button
                  type="button"
                  onClick={() => setAmountToStake(5)} // demo MAX
                  className="text-[11px] px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onStake}
                className="px-5 py-2 rounded-xl text-sm bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold shadow-neon-soft hover:opacity-90 transition"
              >
                Stake Selected
              </button>

              <button
                type="button"
                onClick={onUnstake}
                className="px-5 py-2 rounded-xl text-sm bg-transparent border border-white/15 text-text-dim hover:border-neon-cyan/60 hover:text-neon-cyan transition"
              >
                Unstake All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Right column info */}
      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm mb-3">How SlimeX Points Work</h3>
          <ul className="text-xs text-text-dim space-y-2 list-disc list-inside">
            <li>Each staked NFT generates 10 points per day.</li>
            <li>Points accumulate while NFTs remain staked.</li>
            <li>Unstaking stops point generation for that NFT.</li>
            <li>Redemption rules can be configured per campaign.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* SETTINGS TAB */

function SettingsView({ selectedNetwork, setSelectedNetwork }) {
  const history = [
    { id: 1, action: "Staked 3 NFTs", delta: "+300 pts", date: "Today" },
    { id: 2, action: "Daily emission", delta: "+90 pts", date: "Yesterday" },
    { id: 3, action: "Staked 1 NFT", delta: "+10 pts", date: "2 days ago" },
  ];

  return (
    <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Network */}
      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm mb-3">Network</h3>
          <p className="text-xs text-text-dim mb-3">
            Select the primary network used by SlimeX Staking.
          </p>

          <div className="flex gap-3">
            {[
              { id: "ethereum", label: "Ethereum" },
              { id: "base", label: "Base" },
              { id: "arbitrum", label: "Arbitrum" },
            ].map((n) => (
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

        {/* Points history */}
        <div className="rounded-2xl border border-white/10 bg-night-soft/80 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-sm mb-3">
            Points History (Preview)
          </h3>
          <p className="text-xs text-text-dim mb-3">
            Demonstration table for displaying user point activity.
          </p>

          <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-[2fr,1fr,1fr] bg-white/5 px-3 py-2 text-text-dim">
              <span>Action</span>
              <span>Points</span>
              <span>Date</span>
            </div>

            {history.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[2fr,1fr,1fr] px-3 py-2 border-t border-white/5"
              >
                <span>{row.action}</span>
                <span className="text-neon-cyan">{row.delta}</span>
                <span className="text-text-dim">{row.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community links */}
      <section className="space-y-6">
        <div className="rounded-2xl border border-neon-purple/40 bg-gradient-to-br from-neon-purple/15 to-night-soft/80 p-6 shadow-neon-soft">
          <h3 className="font-semibold text-sm mb-2">Community & Links</h3>
          <p className="text-xs text-text-dim mb-4">
            Official links for the SlimeX ecosystem.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">X (Twitter)</div>
                <div className="text-text-dim">
                  Official SlimeX Twitter account.
                </div>
              </div>
              <a
                href="https://x.com/your-slimex-handle"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] transition"
              >
                Open X
              </a>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div>
                <div className="font-semibold">Discord</div>
                <div className="text-text-dim">
                  Official SlimeX Discord community.
                </div>
              </div>
              <a
                href="https://discord.gg/your-slimex-server"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] transition"
              >
                Open Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
