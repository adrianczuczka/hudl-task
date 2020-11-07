import League from './league';
import Team from './team';
import Score from './score';
import { parseISO } from 'date-fns';

type Params = {
  fixtureID: number;
  leagueID: number;
  league: League;
  eventDate: Date;
  status: string;
  statusShort: string;
  elapsed: number;
  venue: string;
  referee?: string;
  homeTeam: Team;
  awayTeam: Team;
  goalsHomeTeam: number;
  goalsAwayTeam: number;
  score: Score;
};

class Fixture {
  private constructor(params: Params) {
    Object.assign(this, params);
  }

  fixtureID!: number;
  leagueID!: number;
  league!: League;
  eventDate!: Date;
  status!: string;
  statusShort!: string;
  elapsed!: number;
  venue!: string;
  referee?: string;
  homeTeam!: Team;
  awayTeam!: Team;
  goalsHomeTeam!: number;
  goalsAwayTeam!: number;
  score!: Score;

  static deserialize(resp: any): Fixture {
    return new Fixture({
      fixtureID: resp.fixture_id,
      leagueID: resp.league_id,
      league: League.deserialize(resp.league),
      eventDate: parseISO(resp.event_date),
      status: resp.status,
      statusShort: resp.statusShort,
      elapsed: resp.elapsed,
      venue: resp.venue,
      referee: resp.referee,
      homeTeam: Team.deserialize(resp.home_team),
      awayTeam: Team.deserialize(resp.away_team),
      goalsHomeTeam: resp.goalsHomeTeam,
      goalsAwayTeam: resp.goalsAwayTeam,
      score: Score.deserialize(resp.score),
    });
  }
}

export default Fixture;
