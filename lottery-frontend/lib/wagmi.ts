import { createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'viem';

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;

const customChain =
  chainId === 11155111
    ? sepolia
    : {
        id: chainId,
        name: 'CustomChain',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: {
          default: { http: [rpcUrl] },
          public: { http: [rpcUrl] },
        },
      };

export const config = createConfig({
  chains: [customChain],
  transports: {
    [customChain.id]: http(rpcUrl),
  },
  multiInjectedProviderDiscovery: false,
});
