module.exports = [
"[externals]/wagmi/connectors [external] (wagmi/connectors, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("wagmi/connectors");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
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
(()=>{
    const e = new Error("Cannot find module '@/lib/abi'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
;
const CONTRACT = ("TURBOPACK compile-time value", "0x4B904fBABBCfa079FA6632c333f231a976A3E278");
function Home() {
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useAccount"])();
    const { connect } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useConnect"])({
        connector: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi$2f$connectors__$5b$external$5d$__$28$wagmi$2f$connectors$2c$__esm_import$29$__["injected"])()
    });
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useDisconnect"])();
    const { writeContractAsync } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$wagmi__$5b$external$5d$__$28$wagmi$2c$__esm_import$29$__["useWriteContract"])();
    const [roundId, setRoundId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [closeSeconds, setCloseSeconds] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(60);
    const [betHex, setBetHex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0x01');
    const [betEth, setBetEth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0.001');
    const [resultHex, setResultHex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0x01');
    const openRound = async ()=>{
        try {
            const closeTime = Math.floor(Date.now() / 1000) + closeSeconds;
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'openRound',
                args: [
                    BigInt(closeTime)
                ]
            });
            alert(`✅ openRound TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const closeRound = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'closeRound',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ closeRound TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const finalizeRound = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'finalizeRound',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ finalizeRound TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const placeBet = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'placeBet',
                args: [
                    BigInt(roundId),
                    betHex
                ],
                value: BigInt(Number(betEth) * 1e18)
            });
            alert(`✅ placeBet TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const fulfillResult = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'fulfillResult',
                args: [
                    BigInt(roundId),
                    resultHex
                ]
            });
            alert(`✅ fulfillResult TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
    const claim = async ()=>{
        try {
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: lotteryAbi,
                functionName: 'claim',
                args: [
                    BigInt(roundId)
                ]
            });
            alert(`✅ claim TX sent: ${tx}`);
        } catch (e) {
            alert(`❌ ${e.message}`);
        }
    };
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
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: styles.wallet,
                                children: [
                                    "Wallet: ",
                                    address?.slice(0, 6),
                                    "...",
                                    address?.slice(-4)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: styles.disconnectBtn,
                                onClick: ()=>disconnect(),
                                children: "Disconnect"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: styles.connectBtn,
                        onClick: ()=>connect(),
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "🎛 Admin / Round Control"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Round ID:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: roundId,
                                onChange: (e)=>setRoundId(parseInt(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Close in seconds:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: closeSeconds,
                                onChange: (e)=>setCloseSeconds(parseInt(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 127,
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
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: closeRound,
                                children: "closeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: finalizeRound,
                                children: "finalizeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "🎲 Player Panel"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Bet (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: betHex,
                                onChange: (e)=>setBetHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "ETH amount:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: betEth,
                                onChange: (e)=>setBetEth(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: styles.mainBtn,
                        onClick: placeBet,
                        children: "placeBet (payable)"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "📜 Oracle / Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                children: "Result (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: resultHex,
                                onChange: (e)=>setResultHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: fulfillResult,
                        children: "fulfillResult"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "💰 Claim Reward"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: claim,
                        children: "claim"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
const styles = {
    page: {
        maxWidth: 650,
        margin: '0 auto',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#f9fafc'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    wallet: {
        background: '#eaf5ff',
        padding: '6px 12px',
        borderRadius: 8,
        fontSize: 14
    },
    connectBtn: {
        background: '#0070f3',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 6,
        cursor: 'pointer'
    },
    disconnectBtn: {
        marginLeft: 10,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__ce7ba24d._.js.map