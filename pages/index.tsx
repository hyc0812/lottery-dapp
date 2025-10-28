'use client';
import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { lotteryAbi } from '../lib/abi';

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const injectedConnector = connectors.find(c => c.id === 'injected');
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();

  const [roundId, setRoundId] = useState(1);
  const [closeSeconds, setCloseSeconds] = useState(60);
  const [betHex, setBetHex] = useState<`0x${string}`>('0x01');
  const [betEth, setBetEth] = useState('0.001');
  const [resultHex, setResultHex] = useState<`0x${string}`>('0x01');

  const openRound = async () => {
    try {
      const closeTime = Math.floor(Date.now() / 1000) + closeSeconds;
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'openRound',
        args: [BigInt(closeTime)],
      });
      alert(`✅ openRound TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  const closeRound = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'closeRound',
        args: [BigInt(roundId)],
      });
      alert(`✅ closeRound TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  const finalizeRound = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'finalizeRound',
        args: [BigInt(roundId)],
      });
      alert(`✅ finalizeRound TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  const placeBet = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'placeBet',
        args: [BigInt(roundId), betHex],
        value: BigInt(Number(betEth) * 1e18),
      });
      alert(`✅ placeBet TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  const fulfillResult = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'fulfillResult',
        args: [BigInt(roundId), resultHex],
      });
      alert(`✅ fulfillResult TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  const claim = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT,
        abi: lotteryAbi,
        functionName: 'claim',
        args: [BigInt(roundId)],
      });
      alert(`✅ claim TX sent: ${tx}`);
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>🎯 Lottery DApp</h1>
        {isConnected ? (
          <div style={styles.walletBox}>
            <span style={styles.wallet}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button style={styles.disconnectBtn} onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        ) : (
          <button
            style={styles.connectBtn}
            onClick={() => connect({ connector: injected() })}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Admin Panel */}
      <div style={styles.card}>
        <h2>🎛 Admin / Round Control</h2>
        <div style={styles.row}>
          <label>Round ID:</label>
          <input
            type="number"
            value={roundId}
            onChange={(e) => setRoundId(parseInt(e.target.value))}
          />
        </div>
        <div style={styles.row}>
          <label>Close in seconds:</label>
          <input
            type="number"
            value={closeSeconds}
            onChange={(e) => setCloseSeconds(parseInt(e.target.value))}
          />
        </div>
        <div style={styles.btnRow}>
          <button onClick={openRound}>openRound</button>
          <button onClick={closeRound}>closeRound</button>
          <button onClick={finalizeRound}>finalizeRound</button>
        </div>
      </div>

      {/* Player Panel */}
      <div style={styles.card}>
        <h2>🎲 Player Panel</h2>
        <div style={styles.row}>
          <label>Bet (hex bytes):</label>
          <input
            value={betHex}
            onChange={(e) => setBetHex(e.target.value as `0x${string}`)}
          />
        </div>
        <div style={styles.row}>
          <label>ETH amount:</label>
          <input
            value={betEth}
            onChange={(e) => setBetEth(e.target.value)}
          />
        </div>
        <button style={styles.mainBtn} onClick={placeBet}>
          placeBet (payable)
        </button>
      </div>

      {/* Oracle Panel */}
      <div style={styles.card}>
        <h2>📜 Oracle / Result</h2>
        <div style={styles.row}>
          <label>Result (hex bytes):</label>
          <input
            value={resultHex}
            onChange={(e) => setResultHex(e.target.value as `0x${string}`)}
          />
        </div>
        <button onClick={fulfillResult}>fulfillResult</button>
      </div>

      {/* Claim Panel */}
      <div style={styles.card}>
        <h2>💰 Claim Reward</h2>
        <button onClick={claim}>claim</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    maxWidth: 700,
    margin: '0 auto',
    padding: 30,
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f9fafc',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  walletBox: { display: 'flex', alignItems: 'center', gap: 10 },
  wallet: {
    background: '#eaf5ff',
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 14,
    border: '1px solid #cde4ff',
  },
  connectBtn: {
    background: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: '0.2s',
  },
  disconnectBtn: {
    background: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
  },
  card: {
    background: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnRow: {
    display: 'flex',
    gap: 10,
    marginTop: 12,
  },
  mainBtn: {
    background: '#0a7cff',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 8,
  },
};
