export interface Tournament {
  id: number;
  name: string;
  status: 'pending' | 'active' | 'completed';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  participants: User[];
  matches: TournamentMatch[];
}

export interface TournamentMatch {
  id: number;
  tournamentId: number;
  player1: User;
  player2: User;
  player1Score: number;
  player2Score: number;
  status: 'pending' | 'completed';
  round: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
} 