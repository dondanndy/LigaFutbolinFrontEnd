export type Player = {
  id: string,
  name: string,
  surname: string,
}

export type Team = {
  player1 : Player,
  player2 : Player
}

export type MatchResult = {
  team1: number,
  team2: number
}

export type Match = {
  id: string,
  team1: Team,
  team2: Team,
  result: MatchResult
  matchday?: number,
  date?: Date
}

export type MatchDay = {
  date: Date,
  matchday: number,
  matches: Match[],
  bye_players?: Player[]
}

export enum DataLoadingStatus{
  Loading,
  Complete,
  Error
}