(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Downloads/lottery-frontend/lib/abi.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/lottery-frontend/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/wagmi/dist/esm/hooks/useAccount.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/wagmi/dist/esm/hooks/useConnect.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/wagmi/dist/esm/hooks/useDisconnect.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/node_modules/@wagmi/core/dist/esm/connectors/injected.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/lottery-frontend/lib/abi.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const CONTRACT = ("TURBOPACK compile-time value", "0x4B904fBABBCfa079FA6632c333f231a976A3E278");
function Home() {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const injectedConnector = connectors.find((c)=>c.id === 'injected');
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useDisconnect"])();
    const { writeContractAsync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const [roundId, setRoundId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [closeSeconds, setCloseSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(60);
    const [betHex, setBetHex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('0x01');
    const [betEth, setBetEth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('0.001');
    const [resultHex, setResultHex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('0x01');
    const openRound = async ()=>{
        try {
            const closeTime = Math.floor(Date.now() / 1000) + closeSeconds;
            const tx = await writeContractAsync({
                address: CONTRACT,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$lib$2f$abi$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["lotteryAbi"],
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            margin: 0
                        },
                        children: "🎯 Lottery DApp"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.walletBox,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.wallet,
                                children: [
                                    address?.slice(0, 6),
                                    "...",
                                    address?.slice(-4)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.disconnectBtn,
                                onClick: ()=>disconnect(),
                                children: "Disconnect"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: styles.connectBtn,
                        onClick: ()=>connect({
                                connector: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$client$5d$__$28$ecmascript$29$__["injected"])()
                            }),
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "🎛 Admin / Round Control"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Round ID:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: roundId,
                                onChange: (e)=>setRoundId(parseInt(e.target.value))
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Close in seconds:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: closeSeconds,
                                onChange: (e)=>setCloseSeconds(parseInt(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.btnRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openRound,
                                children: "openRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeRound,
                                children: "closeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: finalizeRound,
                                children: "finalizeRound"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "🎲 Player Panel"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Bet (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: betHex,
                                onChange: (e)=>setBetHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "ETH amount:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: betEth,
                                onChange: (e)=>setBetEth(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: styles.mainBtn,
                        onClick: placeBet,
                        children: "placeBet (payable)"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "📜 Oracle / Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.row,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Result (hex bytes):"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: resultHex,
                                onChange: (e)=>setResultHex(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fulfillResult,
                        children: "fulfillResult"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "💰 Claim Reward"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: claim,
                        children: "claim"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/lottery-frontend/pages/index.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(Home, "fiX/MOibogH45wrBmnrIAlFI7QU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useDisconnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$lottery$2d$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useWriteContract"]
    ];
});
_c = Home;
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
        marginBottom: 25
    },
    walletBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    wallet: {
        background: '#eaf5ff',
        padding: '6px 12px',
        borderRadius: 8,
        fontSize: 14,
        border: '1px solid #cde4ff'
    },
    connectBtn: {
        background: '#0070f3',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 6,
        cursor: 'pointer',
        transition: '0.2s'
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
}; // 'use client';
 // import { useState } from 'react';
 // import {
 //   useAccount,
 //   useConnect,
 //   useDisconnect,
 //   useWriteContract,
 // } from 'wagmi';
 // import { injected } from 'wagmi/connectors';
 // import { lotteryAbi } from '../lib/abi';
 // const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
 // export default function Home() {
 //   const { address, isConnected } = useAccount();
 //   const { connect, connectors } = useConnect();
 //   const injectedConnector = connectors.find(c => c.id === 'injected');
 //   const { disconnect } = useDisconnect();
 //   const { writeContractAsync } = useWriteContract();
 //   const [roundId, setRoundId] = useState(1);
 //   const [closeSeconds, setCloseSeconds] = useState(60);
 //   const [betHex, setBetHex] = useState('0x01');
 //   const [betEth, setBetEth] = useState('0.001');
 //   const [resultHex, setResultHex] = useState('0x01');
 //   const openRound = async () => {
 //     try {
 //       const closeTime = Math.floor(Date.now() / 1000) + closeSeconds;
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'openRound',
 //         args: [BigInt(closeTime)],
 //       });
 //       alert(`✅ openRound TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   const closeRound = async () => {
 //     try {
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'closeRound',
 //         args: [BigInt(roundId)],
 //       });
 //       alert(`✅ closeRound TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   const finalizeRound = async () => {
 //     try {
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'finalizeRound',
 //         args: [BigInt(roundId)],
 //       });
 //       alert(`✅ finalizeRound TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   const placeBet = async () => {
 //     try {
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'placeBet',
 //         args: [BigInt(roundId), betHex],
 //         value: BigInt(Number(betEth) * 1e18),
 //       });
 //       alert(`✅ placeBet TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   const fulfillResult = async () => {
 //     try {
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'fulfillResult',
 //         args: [BigInt(roundId), resultHex],
 //       });
 //       alert(`✅ fulfillResult TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   const claim = async () => {
 //     try {
 //       const tx = await writeContractAsync({
 //         address: CONTRACT,
 //         abi: lotteryAbi,
 //         functionName: 'claim',
 //         args: [BigInt(roundId)],
 //       });
 //       alert(`✅ claim TX sent: ${tx}`);
 //     } catch (e: any) {
 //       alert(`❌ ${e.message}`);
 //     }
 //   };
 //   return (
 //     <div style={styles.page}>
 //       {/* Header */}
 //       <div style={styles.header}>
 //         <h1 style={{ margin: 0 }}>🎯 Lottery DApp</h1>
 //         {isConnected ? (
 //           <div style={styles.walletBox}>
 //             <span style={styles.wallet}>
 //               {address?.slice(0, 6)}...{address?.slice(-4)}
 //             </span>
 //             <button style={styles.disconnectBtn} onClick={() => disconnect()}>
 //               Disconnect
 //             </button>
 //           </div>
 //         ) : (
 //           <button
 //             style={styles.connectBtn}
 //             onClick={() => connect({ connector: injectedConnector })}
 //           >
 //             Connect Wallet
 //           </button>
 //         )}
 //       </div>
 //       {/* Admin Panel */}
 //       <div style={styles.card}>
 //         <h2>🎛 Admin / Round Control</h2>
 //         <div style={styles.row}>
 //           <label>Round ID:</label>
 //           <input
 //             type="number"
 //             value={roundId}
 //             onChange={(e) => setRoundId(parseInt(e.target.value))}
 //           />
 //         </div>
 //         <div style={styles.row}>
 //           <label>Close in seconds:</label>
 //           <input
 //             type="number"
 //             value={closeSeconds}
 //             onChange={(e) => setCloseSeconds(parseInt(e.target.value))}
 //           />
 //         </div>
 //         <div style={styles.btnRow}>
 //           <button onClick={openRound}>openRound</button>
 //           <button onClick={closeRound}>closeRound</button>
 //           <button onClick={finalizeRound}>finalizeRound</button>
 //         </div>
 //       </div>
 //       {/* Player Panel */}
 //       <div style={styles.card}>
 //         <h2>🎲 Player Panel</h2>
 //         <div style={styles.row}>
 //           <label>Bet (hex bytes):</label>
 //           <input
 //             value={betHex}
 //             onChange={(e) => setBetHex(e.target.value)}
 //           />
 //         </div>
 //         <div style={styles.row}>
 //           <label>ETH amount:</label>
 //           <input
 //             value={betEth}
 //             onChange={(e) => setBetEth(e.target.value)}
 //           />
 //         </div>
 //         <button style={styles.mainBtn} onClick={placeBet}>
 //           placeBet (payable)
 //         </button>
 //       </div>
 //       {/* Oracle Panel */}
 //       <div style={styles.card}>
 //         <h2>📜 Oracle / Result</h2>
 //         <div style={styles.row}>
 //           <label>Result (hex bytes):</label>
 //           <input
 //             value={resultHex}
 //             onChange={(e) => setResultHex(e.target.value)}
 //           />
 //         </div>
 //         <button onClick={fulfillResult}>fulfillResult</button>
 //       </div>
 //       {/* Claim Panel */}
 //       <div style={styles.card}>
 //         <h2>💰 Claim Reward</h2>
 //         <button onClick={claim}>claim</button>
 //       </div>
 //     </div>
 //   );
 // }
 // const styles: { [key: string]: React.CSSProperties } = {
 //   page: {
 //     maxWidth: 700,
 //     margin: '0 auto',
 //     padding: 30,
 //     fontFamily: 'system-ui, sans-serif',
 //     backgroundColor: '#f9fafc',
 //   },
 //   header: {
 //     display: 'flex',
 //     justifyContent: 'space-between',
 //     alignItems: 'center',
 //     marginBottom: 25,
 //   },
 //   walletBox: { display: 'flex', alignItems: 'center', gap: 10 },
 //   wallet: {
 //     background: '#eaf5ff',
 //     padding: '6px 12px',
 //     borderRadius: 8,
 //     fontSize: 14,
 //     border: '1px solid #cde4ff',
 //   },
 //   connectBtn: {
 //     background: '#0070f3',
 //     color: 'white',
 //     border: 'none',
 //     padding: '8px 14px',
 //     borderRadius: 6,
 //     cursor: 'pointer',
 //     transition: '0.2s',
 //   },
 //   disconnectBtn: {
 //     background: '#e53e3e',
 //     color: 'white',
 //     border: 'none',
 //     padding: '8px 14px',
 //     borderRadius: 6,
 //     cursor: 'pointer',
 //   },
 //   card: {
 //     background: 'white',
 //     padding: 20,
 //     marginBottom: 20,
 //     borderRadius: 12,
 //     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
 //   },
 //   row: {
 //     display: 'flex',
 //     justifyContent: 'space-between',
 //     alignItems: 'center',
 //     marginBottom: 10,
 //   },
 //   btnRow: {
 //     display: 'flex',
 //     gap: 10,
 //     marginTop: 12,
 //   },
 //   mainBtn: {
 //     background: '#0a7cff',
 //     color: 'white',
 //     border: 'none',
 //     padding: '10px 16px',
 //     borderRadius: 8,
 //     cursor: 'pointer',
 //     marginTop: 8,
 //   },
 // };
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/lottery-frontend/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Downloads/lottery-frontend/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Downloads/lottery-frontend/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/lottery-frontend/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__bc5bf05c._.js.map