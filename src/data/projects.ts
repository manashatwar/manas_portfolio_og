export interface Project {
  id: string;
  name: string;
  category: 'defi' | 'smart-contracts' | 'dapps' | 'nft' | 'research';
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: {
    gasOptimization?: string;
    tvlManaged?: string;
    transactions?: string;
    users?: string;
    security?: string;
  };
  links: {
    github?: string;
    live?: string;
    demo?: string;
    article?: string;
    documentation?: string;
  };
  images: string[];
  status: 'Live' | 'Audited' | 'Development' | 'Beta' | 'Deprecated';
  featured: boolean;
  tags: string[];
  dateCompleted: string;
}

export const projects: Project[] = [
  {
    id: 'defi-vault-strategy',
    name: 'Advanced DeFi Yield Vault',
    category: 'defi',
    description: 'Multi-strategy yield vault with automated rebalancing and risk management',
    longDescription: 'A sophisticated DeFi yield vault that automatically allocates funds across multiple protocols (Compound, Aave, Curve) based on real-time yield analysis. Features include automated rebalancing, slippage protection, and emergency withdrawal mechanisms.',
    techStack: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Chainlink', 'React', 'Web3.js'],
    metrics: {
      tvlManaged: '$12.5M',
      gasOptimization: '25%',
      transactions: '50K+',
      security: 'Audited'
    },
    links: {
      github: 'https://github.com/blockchain-dev/defi-vault',
      live: 'https://vault.defiprotocol.com',
      article: 'https://medium.com/@dev/advanced-yield-strategies'
    },
    images: [
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
      'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg'
    ],
    status: 'Audited',
    featured: true,
    tags: ['DeFi', 'Yield Farming', 'Smart Contracts', 'Security'],
    dateCompleted: '2024-01-15'
  },
  {
    id: 'cross-chain-bridge',
    name: 'Cross-Chain Asset Bridge',
    category: 'defi',
    description: 'Secure bridge protocol for transferring assets between Ethereum and Layer 2 networks',
    longDescription: 'A trustless cross-chain bridge enabling seamless asset transfers between Ethereum, Polygon, and Arbitrum. Implements optimistic rollup verification and merkle proof validation for maximum security.',
    techStack: ['Solidity', 'Foundry', 'Merkle Trees', 'TypeScript', 'Next.js', 'Ethers.js'],
    metrics: {
      tvlManaged: '$8.2M',
      transactions: '125K+',
      gasOptimization: '40%',
      security: 'Multi-Audit'
    },
    links: {
      github: 'https://github.com/blockchain-dev/cross-chain-bridge',
      live: 'https://bridge.protocol.com',
      documentation: 'https://docs.bridge.protocol.com'
    },
    images: [
      'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg',
      'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'
    ],
    status: 'Live',
    featured: true,
    tags: ['Cross-chain', 'Bridge', 'Layer 2', 'Security'],
    dateCompleted: '2024-02-28'
  },
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace with Royalties',
    category: 'nft',
    description: 'Advanced NFT marketplace with creator royalties and batch operations',
    longDescription: 'A full-featured NFT marketplace supporting ERC-721 and ERC-1155 tokens with automatic royalty distribution, lazy minting, and gas-optimized batch operations. Features include auction mechanics and collection management.',
    techStack: ['Solidity', 'React', 'IPFS', 'The Graph', 'Ethers.js', 'Tailwind CSS'],
    metrics: {
      transactions: '75K+',
      users: '15K+',
      gasOptimization: '35%',
      security: 'Audited'
    },
    links: {
      github: 'https://github.com/blockchain-dev/nft-marketplace',
      live: 'https://nft.marketplace.com',
      demo: 'https://demo.nft.marketplace.com'
    },
    images: [
      'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
      'https://images.pexels.com/photos/1144287/pexels-photo-1144287.jpeg'
    ],
    status: 'Live',
    featured: false,
    tags: ['NFT', 'Marketplace', 'ERC-721', 'IPFS'],
    dateCompleted: '2023-11-20'
  },
  {
    id: 'dao-governance',
    name: 'DAO Governance Protocol',
    category: 'smart-contracts',
    description: 'Flexible governance system with delegate voting and proposal execution',
    longDescription: 'A comprehensive DAO governance system supporting multiple voting mechanisms, delegate voting, timelock execution, and proposal validation. Includes quadratic voting and conviction voting options.',
    techStack: ['Solidity', 'OpenZeppelin Governor', 'Hardhat', 'React', 'Wagmi', 'RainbowKit'],
    metrics: {
      users: '8K+',
      transactions: '25K+',
      gasOptimization: '30%',
      security: 'Formal Verification'
    },
    links: {
      github: 'https://github.com/blockchain-dev/dao-governance',
      live: 'https://governance.dao.com',
      documentation: 'https://docs.governance.dao.com'
    },
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    ],
    status: 'Live',
    featured: true,
    tags: ['DAO', 'Governance', 'Voting', 'Smart Contracts'],
    dateCompleted: '2024-03-10'
  },
  {
    id: 'defi-lending-protocol',
    name: 'Decentralized Lending Protocol',
    category: 'defi',
    description: 'Compound-style lending protocol with dynamic interest rates',
    longDescription: 'A lending protocol that allows users to supply and borrow crypto assets with algorithmically determined interest rates. Features include liquidation mechanisms, collateral management, and governance token distribution.',
    techStack: ['Solidity', 'Vyper', 'Brownie', 'React', 'Web3.py', 'Alchemy'],
    metrics: {
      tvlManaged: '$25M',
      users: '12K+',
      transactions: '200K+',
      security: 'Triple Audited'
    },
    links: {
      github: 'https://github.com/blockchain-dev/lending-protocol',
      live: 'https://lending.protocol.com'
    },
    images: [
      'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg',
      'https://images.pexels.com/photos/259100/pexels-photo-259100.jpeg'
    ],
    status: 'Live',
    featured: true,
    tags: ['DeFi', 'Lending', 'Interest Rates', 'Liquidation'],
    dateCompleted: '2023-12-05'
  },
  {
    id: 'wallet-sdk',
    name: 'Multi-Chain Wallet SDK',
    category: 'dapps',
    description: 'TypeScript SDK for building multi-chain wallet applications',
    longDescription: 'A comprehensive SDK that simplifies multi-chain wallet development with support for Ethereum, Polygon, BSC, and Avalanche. Includes transaction batching, gas estimation, and hardware wallet integration.',
    techStack: ['TypeScript', 'Ethers.js', 'Web3.js', 'Ledger SDK', 'Jest', 'Rollup'],
    metrics: {
      users: '500+',
      downloads: '10K+',
      gasOptimization: '20%',
      security: 'Security Review'
    },
    links: {
      github: 'https://github.com/blockchain-dev/wallet-sdk',
      documentation: 'https://docs.wallet-sdk.com'
    },
    images: [
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
    ],
    status: 'Live',
    featured: false,
    tags: ['SDK', 'Multi-chain', 'Wallet', 'TypeScript'],
    dateCompleted: '2023-10-15'
  }
];

export const projectCategories = {
  'defi': {
    name: 'DeFi Projects',
    icon: 'TrendingUp',
    color: '#00FFFF',
    count: projects.filter(p => p.category === 'defi').length
  },
  'smart-contracts': {
    name: 'Smart Contracts',
    icon: 'FileText',
    color: '#007FFF', 
    count: projects.filter(p => p.category === 'smart-contracts').length
  },
  'dapps': {
    name: 'dApps & Frontend',
    icon: 'Globe',
    color: '#4F46E5',
    count: projects.filter(p => p.category === 'dapps').length
  },
  'nft': {
    name: 'NFT & Gaming',
    icon: 'Gamepad2',
    color: '#7C3AED',
    count: projects.filter(p => p.category === 'nft').length
  },
  'research': {
    name: 'Research',
    icon: 'BookOpen',
    color: '#059669',
    count: projects.filter(p => p.category === 'research').length
  }
};