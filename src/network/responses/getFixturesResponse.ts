import Fixture from '../models/fixture';

type Params = {
  results: number;
  fixtures: Fixture[];
};

class GetFixturesResponse {
  private constructor({ results, fixtures }: Params) {
    this.results = results;
    this.fixtures = fixtures;
  }
  results: number;
  fixtures: Fixture[];

  static deserialize(resp: any): GetFixturesResponse {
    return new GetFixturesResponse({
      results: resp.results,
      fixtures: resp.fixtures.map((fixture: any) => {
        return Fixture.deserialize(fixture);
      }),
    });
  }
}

export default GetFixturesResponse;
