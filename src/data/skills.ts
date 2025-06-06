export interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'protocols' | 'tools';
  level: number; // 1-5
  experience: string;
  icon: string;
  color: string;
}

export const skills: Skill[] = [
  // Languages
  {
    name: 'Solidity',
    category: 'languages',
    level: 5,
    experience: '4+ years',
    icon: 'Code',
    color: '#627EEA'
  },
  {
    name: 'Vyper',
    category: 'languages', 
    level: 4,
    experience: '2+ years',
    icon: 'Code',
    color: '#FF4785'
  },
  {
    name: 'Rust',
    category: 'languages',
    level: 4,
    experience: '3+ years',
    icon: 'Code',
    color: '#CE422B'
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 5,
    experience: '5+ years',
    icon: 'Code',
    color: '#3178C6'
  },
  {
    name: 'JavaScript',
    category: 'languages',
    level: 5,
    experience: '6+ years',
    icon: 'Code',
    color: '#F7DF1E'
  },
  {
    name: 'Python',
    category: 'languages',
    level: 4,
    experience: '4+ years',
    icon: 'Code',
    color: '#3776AB'
  },

  // Frameworks
  {
    name: 'Hardhat',
    category: 'frameworks',
    level: 5,
    experience: '3+ years',
    icon: 'Wrench',
    color: '#FFF100'
  },
  {
    name: 'Foundry',
    category: 'frameworks',
    level: 5,
    experience: '2+ years',
    icon: 'Wrench',
    color: '#FF6B35'
  },
  {
    name: 'React',
    category: 'frameworks',
    level: 5,
    experience: '5+ years',
    icon: 'Wrench',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    category: 'frameworks',
    level: 4,
    experience: '3+ years',
    icon: 'Wrench',
    color: '#000000'
  },
  {
    name: 'Truffle',
    category: 'frameworks',
    level: 4,
    experience: '3+ years',
    icon: 'Wrench',
    color: '#5E464D'
  },
  {
    name: 'OpenZeppelin',
    category: 'frameworks',
    level: 5,
    experience: '4+ years',
    icon: 'Shield',
    color: '#4E5EE4'
  },

  // Protocols
  {
    name: 'Ethereum',
    category: 'protocols',
    level: 5,
    experience: '4+ years',
    icon: 'Network',
    color: '#627EEA'
  },
  {
    name: 'Polygon',
    category: 'protocols',
    level: 4,
    experience: '2+ years',
    icon: 'Network',
    color: '#8247E5'
  },
  {
    name: 'Arbitrum',
    category: 'protocols',
    level: 4,
    experience: '2+ years',
    icon: 'Network',
    color: '#28A0F0'
  },
  {
    name: 'Optimism',
    category: 'protocols',
    level: 4,
    experience: '2+ years',
    icon: 'Network',
    color: '#FF0420'
  },
  {
    name: 'BSC',
    category: 'protocols',
    level: 4,
    experience: '2+ years',
    icon: 'Network',
    color: '#F3BA2F'
  },
  {
    name: 'Avalanche',
    category: 'protocols',
    level: 3,
    experience: '1+ years',
    icon: 'Network',
    color: '#E84142'
  },

  // Tools
  {
    name: 'Ethers.js',
    category: 'tools',
    level: 5,
    experience: '4+ years',
    icon: 'Tool',
    color: '#627EEA'
  },
  {
    name: 'Web3.js',
    category: 'tools',
    level: 4,
    experience: '4+ years',
    icon: 'Tool',
    color: '#FF6B35'
  },
  {
    name: 'MetaMask',
    category: 'tools',
    level: 5,
    experience: '4+ years',
    icon: 'Tool',
    color: '#F6851B'
  },
  {
    name: 'IPFS',
    category: 'tools',
    level: 4,
    experience: '3+ years',
    icon: 'Tool',
    color: '#65C2CB'
  },
  {
    name: 'The Graph',
    category: 'tools',
    level: 4,
    experience: '2+ years',
    icon: 'Tool',
    color: '#6747ED'
  },
  {
    name: 'Chainlink',
    category: 'tools',
    level: 4,
    experience: '3+ years',
    icon: 'Tool',
    color: '#375BD2'
  }
];

export const skillCategories = {
  languages: 'Smart Contract Languages',
  frameworks: 'Development Frameworks',  
  protocols: 'Blockchain Protocols',
  tools: 'Development Tools'
};