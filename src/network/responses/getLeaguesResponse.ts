import League from '../models/league';

type Params = {
  results: number;
  countries: League[];
};

class GetLeaguesResponse {
  private constructor({ results, countries }: Params) {
    this.results = results;
    this.countries = countries;
  }
  results: number;
  countries: League[];

  static deserialize(resp: any): GetLeaguesResponse {
    return new GetLeaguesResponse({
      results: resp.results,
      countries: resp.leagues.map((league: any) => {
        return League.deserialize(league);
      }),
    });
  }
}

export default GetLeaguesResponse;
