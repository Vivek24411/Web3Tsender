import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, anvil, zksync,sepolia } from 'wagmi/chains';

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error("VITE_WALLETCONNECT_PROJECT_ID not set in .env");
}

const config = getDefaultConfig({
  appName: 'My dApp',
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon, optimism, arbitrum, anvil, zksync,sepolia],
  ssr: false,
});

export default config;
