export interface Player {
    name: string;
  }
  
  export interface Match {
    player1: Player;
    player2: Player;
    winner?: Player;
  }
  
  export interface TournamentRound {
    matches: Match[];
  }
  
  export interface TournamentState {
    rounds: TournamentRound[];
    currentRoundIndex: number;
  }
  
  export let tournamentState: TournamentState;
  
  export function initTournament(players: string[]) {
    // Shuffle players randomly
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const round1: Match[] = [];
  
    for (let i = 0; i < shuffled.length; i += 2) {
      round1.push({
        player1: { name: shuffled[i] },
        player2: { name: shuffled[i + 1] }
      });
    }
  
    tournamentState = {
      rounds: [{ matches: round1 }],
      currentRoundIndex: 0
    };
  }
  