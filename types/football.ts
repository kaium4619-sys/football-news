export interface Team {
  id: number;
  name: string;
  logo: string;
  winner?: boolean | null;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string;
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goals;
  score: {
    halftime: Goals;
    fulltime: Goals;
    extratime: Goals;
    penalty: Goals;
  };
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
}
