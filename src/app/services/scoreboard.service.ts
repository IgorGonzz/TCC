import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { MatchState, AthleteScore } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private readonly MATCH_DURATION = 300;

  private initialScore: MatchState = {
    athleteA: { points: 0, advantages: 0, penalties: 0, name: 'Atleta A' },
    athleteB: { points: 0, advantages: 0, penalties: 0, name: 'Atleta B' },
    matchTime: this.MATCH_DURATION,
    isRunning: false,
    winner: null,
  };

  private scoreSubject = new BehaviorSubject<MatchState>(this.initialScore);
  public score$: Observable<MatchState> = this.scoreSubject.asObservable();
  
  private timerSubscription: Subscription | undefined;

  constructor() { }

  public updateScore(athleteId: 'A' | 'B', type: keyof AthleteScore, value: number): void {
    const currentState = this.scoreSubject.getValue();
    const athleteKey = athleteId === 'A' ? 'athleteA' : 'athleteB';
    
    if (currentState.winner) return;

    const updatedState: MatchState = {
      ...currentState,
      [athleteKey]: {
        ...currentState[athleteKey],
        [type]: (currentState[athleteKey][type] as number) + value
      }
    };
    
    this.scoreSubject.next(this.checkWinner(updatedState));
  }

  public resetMatch(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.scoreSubject.next(this.initialScore);
  }

  public startTimer(): void {
    const currentState = this.scoreSubject.getValue();
    if (currentState.isRunning || currentState.matchTime <= 0 || currentState.winner) return;

    this.scoreSubject.next({ ...currentState, isRunning: true });

    this.timerSubscription = interval(1000).subscribe(() => {
      const state = this.scoreSubject.getValue();
      if (state.matchTime > 0) {
        const newState = { ...state, matchTime: state.matchTime - 1 };
        this.scoreSubject.next(this.checkWinner(newState));
      } else {
        this.pauseTimer();
      }
    });
  }

  public pauseTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
    const state = this.scoreSubject.getValue();
    this.scoreSubject.next({ ...state, isRunning: false });
  }

  private checkWinner(state: MatchState): MatchState {
    if (state.matchTime > 0 && (state.athleteA.penalties >= 4 || state.athleteB.penalties >= 4)) {
        return {
            ...state,
            winner: state.athleteA.penalties >= 4 ? state.athleteB.name + ' (Punições)' : state.athleteA.name + ' (Punições)',
            isRunning: false
        };
    }

    if (state.matchTime === 0) {
      const scoreA = state.athleteA.points;
      const scoreB = state.athleteB.points;
      const advA = state.athleteA.advantages;
      const advB = state.athleteB.advantages;
      
      if (scoreA > scoreB) return { ...state, winner: state.athleteA.name + ' (Pontos)', isRunning: false };
      if (scoreB > scoreA) return { ...state, winner: state.athleteB.name + ' (Pontos)', isRunning: false };
      
      if (advA > advB) return { ...state, winner: state.athleteA.name + ' (Vantagens)', isRunning: false };
      if (advB > advA) return { ...state, winner: state.athleteB.name + ' (Vantagens)', isRunning: false };

      return { ...state, winner: 'EMPATE', isRunning: false };
    }

    return state;
  }
}