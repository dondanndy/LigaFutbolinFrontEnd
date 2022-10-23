export type Player = {
  name: string,
  surname: string,
  avatar: string
}

export type Team = {
  player1 : Player,
  player2 : Player
}

export type Match = {
  team1: Team,
  team2: Team,
  result: {
    team1: number,
    team2: number
  }
}