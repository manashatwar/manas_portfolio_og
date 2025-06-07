export interface Project {
  id: string;
  name: string;
  category: 'web3' | 'blockchain' | 'dapp' | 'defi' | 'smart-contracts' | 'nft' | 'research';
  description: string;
  longDescription: string;
  techStack: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: string[];
  status: 'Live' | 'Development' | 'Completed';
  featured: boolean;
  tags: string[];
  dateCompleted: string;
}

export const projects: Project[] = [
  {
    id: 'decentralized-attendance',
    name: 'Decentralized Attendance System',
    category: 'blockchain',
    description: 'A blockchain-based attendance tracking system ensuring transparency and immutability',
    longDescription: 'A comprehensive decentralized attendance management system built on blockchain technology. This system ensures that attendance records are immutable, transparent, and cannot be tampered with. Features include smart contract-based attendance marking, role-based access control, and real-time attendance tracking.',
    techStack: ['Solidity', 'React', 'Web3.js', 'Ethereum', 'MetaMask', 'Hardhat'],
    links: {
      github: 'https://github.com/kpj2006/tempattendance'
    },
    images: [
      'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg'
    ],
    status: 'Completed',
    featured: true,
    tags: ['Blockchain', 'Smart Contracts', 'Education', 'Transparency'],
    dateCompleted: '2024-01-20'
  },
  {
    id: 'blockchain-portfolio-ipfs',
    name: 'Blockchain Portfolio on IPFS',
    category: 'web3',
    description: 'A decentralized portfolio website hosted on IPFS showcasing Web3 projects',
    longDescription: 'A fully decentralized portfolio website hosted on IPFS (InterPlanetary File System) that showcases blockchain and Web3 projects. This project demonstrates the power of decentralized hosting and ensures that the portfolio remains accessible even if traditional hosting fails.',
    techStack: ['React', 'IPFS', 'Web3.js', 'JavaScript', 'CSS3', 'HTML5'],
    links: {
      github: 'https://github.com/manashatwar/INTERDRIVE-'
    },
    images: [
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'
    ],
    status: 'Live',
    featured: true,
    tags: ['IPFS', 'Decentralized', 'Portfolio', 'Web3'],
    dateCompleted: '2024-02-15'
  },
  {
    id: 'discord-dapp',
    name: 'Discord Web3 DApp',
    category: 'dapp',
    description: 'A Discord integration DApp for Web3 community management and token gating',
    longDescription: 'A Discord bot and DApp integration that brings Web3 functionality to Discord servers. Features include token-gated channels, NFT verification, wallet connection, and community management tools for Web3 projects.',
    techStack: ['Node.js', 'Discord.js', 'Web3.js', 'Solidity', 'MongoDB', 'Express'],
    links: {
      github: 'https://github.com/manashatwar/discord-dapp'
    },
    images: [
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
    ],
    status: 'Development',
    featured: true,
    tags: ['Discord', 'DApp', 'Community', 'Token Gating'],
    dateCompleted: '2024-03-01'
  }
];

export const projectCategories = {
  'web3': {
    name: 'Web3 Projects',
    icon: 'Globe',
    color: '#00FFFF',
    count: projects.filter(p => p.category === 'web3').length
  },
  'blockchain': {
    name: 'Blockchain Apps',
    icon: 'Link',
    color: '#007FFF', 
    count: projects.filter(p => p.category === 'blockchain').length
  },
  'dapp': {
    name: 'DApps',
    icon: 'Smartphone',
    color: '#4F46E5',
    count: projects.filter(p => p.category === 'dapp').length
  },
  'defi': {
    name: 'DeFi Projects',
    icon: 'TrendingUp',
    color: '#10B981',
    count: projects.filter(p => p.category === 'defi').length
  },
  'smart-contracts': {
    name: 'Smart Contracts',
    icon: 'FileText',
    color: '#F59E0B',
    count: projects.filter(p => p.category === 'smart-contracts').length
  },
  'nft': {
    name: 'NFT Projects',
    icon: 'Image',
    color: '#EF4444',
    count: projects.filter(p => p.category === 'nft').length
  },
  'research': {
    name: 'Research',
    icon: 'BookOpen',
    color: '#8B5CF6',
    count: projects.filter(p => p.category === 'research').length
  }
};