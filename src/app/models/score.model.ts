export interface AthleteScore {
  points: number;
  advantages: number;
  penalties: number;
  name: string;
}

export interface MatchState {
  athleteA: AthleteScore;
  athleteB: AthleteScore;
  matchTime: number;
  isRunning: boolean;
  winner: string | null;
}