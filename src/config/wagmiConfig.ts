import { http, createConfig } from 'wagmi'
import { mainnet, optimism, base, polygon, arbitrum } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
    appName: 'Ozean Test',
    projectId: '6d6e105d97709f1728de63ea9815aed4',
    chains: [mainnet, polygon, optimism, arbitrum, base],
  });