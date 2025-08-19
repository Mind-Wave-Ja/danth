export interface Artist {
  id: string;
  name: string;
  avatar: string;
  totalViews: number;
  followers: number;
  rating: number;
  overallRank: number;
  dancehallThrone: number;
  isVeteran: boolean;
  gender: 'male' | 'female';
  traits: {
    style: number;
    delivery: number;
    lyrics: number;
    flow: number;
    adaptability: number;
    popularity: number;
    fanbase: number;
    originality: number;
    versatility: number;
    impact: number;
    stagePerformance: number;
  };
}

export interface PastKing {
  id: string;
  name: string;
  era: string;
  avatar: string;
  description: string;
}

export interface PastQueen {
  id: string;
  name: string;
  era: string;
  avatar: string;
  description: string;
}
