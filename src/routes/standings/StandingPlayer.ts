import type { Player } from "src/models/models";

export type StandingsPlayer = {
  position: number,
  player: Player,
  points: number,
  games_played: number,
  games_won: number,
  games_lost: number,
  goals_for: number,
  goals_against: number
  goals_difference: number
}
