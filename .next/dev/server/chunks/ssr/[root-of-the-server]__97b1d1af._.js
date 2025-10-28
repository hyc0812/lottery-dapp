module.exports = [
"[externals]/wagmi/connectors [external] (wagmi/connectors, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("wagmi/connectors");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Downloads/lottery-frontend/lib/abi.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lotteryAbi",
    ()=>lotteryAbi
]);
const lotteryAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "bet",
                "type": "bytes"
            }
        ],
        "name": "BetPlaced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Claimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
            }
        ],
        "name": "ResultFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "RoundClosed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "RoundFinalized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "closeTime",
                "type": "uint256"
            }
        ],
        "name": "RoundOpened",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "closeRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentRoundId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "finalizeRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
            }
        ],
        "name": "fulfillResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "getBetCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getClaimable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "getRoundInfo",
        "outputs": [
            {
                "internalType": "bool",
                "name": "open",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "finalized",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "totalPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "closeTime",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "closeTime",
                "type": "uint256"
            }
        ],
        "name": "openRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "betData",
                "type": "bytes"
            }
        ],
        "name": "placeBet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
}),
"[project]/Downloads/lottery-frontend/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/wagmi [external] (wagmi, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/wagmi/connectors [external] (wagmi/connectors, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/lib/abi.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$viem__$5b$external$5d$__$28$viem$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/viem [external] (viem, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$viem__$5b$external$5d$__$28$viem$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$viem__$5b$external$5d$__$28$viem$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
;
;
const CONTRACT = ("TURBOPACK compile-time value", "0x583AFB148a4E82564cF370E5a56E613cdC7981D6");
function Home() {
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useAccount"])();
    const { connect, connectors } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useConnect"])();
    const injectedConnector = connectors.find((c)=>c.id === 'injected');
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useDisconnect"])();
    const { writeContractAsync } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useWriteContract"])();
    const [roundId, setRoundId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [closeSeconds, setCloseSeconds] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(60);
    const [betHex, setBetHex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0x01');
    const [betEth, setBetEth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0.001');
    const [resultHex, setResultHex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0x01');
    const [owner, setOwner] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["usePublicClient"])();
    // 🔹 current round
    const { data: currentRoundIdData, refetch: refetchCurrentRound } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useReadContract"])({
        address: CONTRACT,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
        functionName: 'currentRoundId'
    });
    // 🔹 round info
    const roundArgs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>roundId > 0 ? [
            BigInt(roundId)
        ] : undefined, [
        roundId
    ]);
    const { data: roundInfo, refetch: refetchRoundInfo, isFetching: isRoundInfoLoading } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useReadContract"])({
        address: CONTRACT,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
        functionName: 'getRoundInfo',
        args: roundArgs
    });
    const { data: blockNumber } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useBlockNumber"])({
        watch: true
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (blockNumber) {
            refetchCurrentRound();
            if (roundArgs) refetchRoundInfo();
        }
    }, [
        blockNumber
    ]);
    const refreshRoundData = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const promises = [];
        if (roundArgs) promises.push(refetchRoundInfo());
        promises.push(refetchCurrentRound());
        return Promise.allSettled(promises);
    }, [
        refetchCurrentRound,
        refetchRoundInfo,
        roundArgs
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (currentRoundIdData && roundId === 1) {
            setRoundId(Number(currentRoundIdData));
        }
    }, [
        currentRoundIdData,
        roundId
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function fetchOwner() {
            if (!publicClient) return;
            try {
                const ownerAddress = await publicClient.readContract({
                    address: CONTRACT,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                    functionName: 'owner'
                });
                setOwner(ownerAddress);
            } catch (err) {
                console.error('Failed to fetch owner', err);
            }
        }
        fetchOwner();
    }, [
        publicClient
    ]);
    const totalPoolEth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!roundInfo) return null;
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$viem__$5b$external$5d$__$28$viem$2c$__esm_import$29$__["formatEther"])(roundInfo[2]);
    }, [
        roundInfo
    ]);
    const winnerAddress = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!roundInfo) return null;
        const rawResult = roundInfo[4];
        if (!rawResult || rawResult === '0x') return null;
        try {
            const [decodedWinner] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$viem__$5b$external$5d$__$28$viem$2c$__esm_import$29$__["decodeAbiParameters"])([
                {
                    name: 'winner',
                    type: 'address'
                }
            ], rawResult);
            return decodedWinner;
        } catch  {
            if (rawResult.length >= 42) {
                const last40 = rawResult.slice(-40);
                return `0x${last40}`;
            }
            return null;
        }
    }, [
        roundInfo
    ]);
    const closeTimeDisplay = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!roundInfo) return null;
        const closeTime = roundInfo[3];
        if (!closeTime || closeTime === 0n) return null;
        const date = new Date(Number(closeTime) * 1000);
        if (Number.isNaN(date.getTime())) return null;
        return date.toLocaleString();
    }, [
        roundInfo
    ]);
    // ---------- Contract Actions ----------
    const openRound = async ()=>{
        try {
            const closeTime = Math.floor(Date.now() / 1000) + closeSeconds;
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'openRound',
                args: [
                    BigInt(closeTime)
                ]
            });
            alert(`✅ openRound TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const closeRound = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'closeRound',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ closeRound TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const finalizeRound = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'finalizeRound',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ finalizeRound TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const placeBet = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'placeBet',
                args: [
                    BigInt(roundId),
                    betHex
                ],
                value: BigInt(Number(betEth) * 1e18)
            });
            alert(`✅ placeBet TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const fulfillResult = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'fulfillResult',
                args: [
                    BigInt(roundId),
                    resultHex
                ]
            });
            alert(`✅ fulfillResult TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const claim = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lotteryAbi"],
                functionName: 'claim',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ claim TX sent: ${tx}`);
            await refreshRoundData();
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    // ---------- Render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: styles.page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        style: {
                            margin: 0
                        },
                        children: "🎯 Lottery DApp"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    address && owner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 14,
                            color: '#444'
                        },
                        children: address.toLowerCase() === owner.toLowerCase() ? '🧑‍💼 Role: Owner' : '🎟️ Role: Player'
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.walletBox,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: styles.wallet,
                                children: [
                                    address?.slice(0, 6),
                                    "...",
                                    address?.slice(-4)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: styles.disconnectBtn,
                                onClick: ()=>disconnect(),
                                children: "Disconnect"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: styles.connectBtn,
                        onClick: ()=>connect({
                                connector: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__["injected"])()
                            }),
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "📊 Round Snapshot"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.infoGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Current Round ID"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: currentRoundIdData ? currentRoundIdData.toString() : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Viewing Round"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: roundId > 0 ? `#${roundId}` : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Total Pool"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: isRoundInfoLoading ? 'Loading...' : totalPoolEth ? `${totalPoolEth} ETH` : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Winner"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: winnerAddress ?? '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 289,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Closes At"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: closeTimeDisplay ?? '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: styles.infoItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: styles.infoLabel,
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: roundInfo ? roundInfo[1] ? 'Finalized' : roundInfo[0] ? 'Open' : 'Closed' : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 10
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: refreshRoundData,
                            style: styles.mainBtn,
                            children: "🔄 Refresh Data"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "🎛 Admin / Round Control"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Round ID:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: roundId,
                                onChange: (e)=>setRoundId(parseInt(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Close in seconds:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: closeSeconds,
                                onChange: (e)=>setCloseSeconds(parseInt(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.btnRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: openRound,
                                children: "openRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: closeRound,
                                children: "closeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: finalizeRound,
                                children: "finalizeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "🎲 Player Panel"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Bet (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: betHex,
                                onChange: (e)=>setBetHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "ETH amount:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            "当前的 .env.local 文件里是否有 NEXT_PUBLIC_CONTRACT_ADDRESS",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: betEth,
                                onChange: (e)=>setBetEth(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: styles.mainBtn,
                        onClick: placeBet,
                        children: "placeBet (payable)"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "📜 Oracle / Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Result (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: resultHex,
                                onChange: (e)=>setResultHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: fulfillResult,
                        children: "fulfillResult"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "💰 Claim Reward"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: claim,
                        children: "claim"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
// ---------- Styles ----------
const styles = {
    page: {
        maxWidth: 700,
        margin: '0 auto',
        padding: 30,
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#f9fafc'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    walletBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    wallet: {
        background: '#edf2f7',
        padding: '8px 12px',
        borderRadius: 8,
        fontFamily: 'monospace'
    },
    connectBtn: {
        background: '#0a7cff',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: 8,
        cursor: 'pointer'
    },
    disconnectBtn: {
        background: '#e53e3e',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 6,
        cursor: 'pointer'
    },
    card: {
        background: 'white',
        padding: 20,
        marginBottom: 20,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        marginTop: 12
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: 12,
        borderRadius: 10,
        background: '#f4f7fb',
        border: '1px solid #e0e6f2'
    },
    infoLabel: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: '#5b6b81'
    },
    btnRow: {
        display: 'flex',
        gap: 10,
        marginTop: 12
    },
    mainBtn: {
        background: '#0a7cff',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: 8,
        cursor: 'pointer',
        marginTop: 8
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97b1d1af._.js.map