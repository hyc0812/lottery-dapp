'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { lotteryAbi } from '../lib/abi';
import { decodeAbiParameters, formatEther } from 'viem';

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

  // 🔹 current round
  const {
    data: currentRoundIdData,
    refetch: refetchCurrentRound,
  } = useReadContract({
    address: CONTRACT,
    abi: lotteryAbi,
    functionName: 'currentRoundId',
    query: { watch: true },
  });

  // 🔹 round info
  const roundArgs = useMemo(
    () => (roundId > 0 ? ([BigInt(roundId)] as const) : undefined),
    [roundId],
  );

  const {
    data: roundInfo,
    refetch: refetchRoundInfo,
    isLoading: isRoundInfoLoading,
  } = useReadContract({
    address: CONTRACT,
    abi: lotteryAbi,
    functionName: 'getRoundInfo',
    args: roundArgs,
    query: { enabled: Boolean(roundArgs), watch: true },
  });

  const refreshRoundData = useCallback(() => {
    const promises: Promise<unknown>[] = [];
    if (roundArgs) promises.push(refetchRoundInfo());
    promises.push(refetchCurrentRound());
    return Promise.allSettled(promises);
  }, [refetchCurrentRound, refetchRoundInfo, roundArgs]);

  useEffect(() => {
    if (currentRoundIdData && roundId === 1) {
      setRoundId(Number(currentRoundIdData));
    }
  }, [currentRoundIdData, roundId]);

  const totalPoolEth = useMemo(() => {
    if (!roundInfo) return null;
    return formatEther(roundInfo[2]);
  }, [roundInfo]);

  const winnerAddress = useMemo(() => {
    if (!roundInfo) return null;
    const rawResult = roundInfo[4];
    if (!rawResult || rawResult === '0x') return null;
    try {
      const [decodedWinner] = decodeAbiParameters(
        [{ name: 'winner', type: 'address' }],
        rawResult,
      );
      return decodedWinner;
    } catch {
      if (rawResult.length >= 42) {
        const last40 = rawResult.slice(-40);
        return `0x${last40}` as `0x${string}`;
      }
      return null;
    }
  }, [roundInfo]);

  const closeTimeDisplay = useMemo(() => {
    if (!roundInfo) return null;
    const closeTime = roundInfo[3];
    if (!closeTime || closeTime === 0n) return null;
    const date = new Date(Number(closeTime) * 1000);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  }, [roundInfo]);

  // ---------- Contract Actions ----------
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
      await refreshRoundData();
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
      await refreshRoundData();
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
      await refreshRoundData();
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
      await refreshRoundData();
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
      await refreshRoundData();
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
      await refreshRoundData();
    } catch (e: any) {
      alert(`❌ ${e.message}`);
    }
  };

  // ---------- Render ----------
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

      {/* Round Snapshot */}
      <div style={styles.card}>
        <h2>📊 Round Snapshot</h2>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Current Round ID</span>
            <strong>
              {currentRoundIdData ? currentRoundIdData.toString() : '—'}
            </strong>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Viewing Round</span>
            <strong>{roundId > 0 ? `#${roundId}` : '—'}</strong>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Total Pool</span>
            <strong>
              {isRoundInfoLoading
                ? 'Loading...'
                : totalPoolEth
                ? `${totalPoolEth} ETH`
                : '—'}
            </strong>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Winner</span>
            <strong>{winnerAddress ?? '—'}</strong>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Closes At</span>
            <strong>{closeTimeDisplay ?? '—'}</strong>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Status</span>
            <strong>
              {roundInfo
                ? roundInfo[1]
                  ? 'Finalized'
                  : roundInfo[0]
                  ? 'Open'
                  : 'Closed'
                : '—'}
            </strong>
          </div>
        </div>
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

// ---------- Styles ----------
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
    marginBottom: 20,
  },
  walletBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  wallet: {
    background: '#edf2f7',
    padding: '8px 12px',
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  connectBtn: {
    background: '#0a7cff',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
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
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginTop: 12,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 12,
    borderRadius: 10,
    background: '#f4f7fb',
    border: '1px solid #e0e6f2',
  },
  infoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#5b6b81',
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








