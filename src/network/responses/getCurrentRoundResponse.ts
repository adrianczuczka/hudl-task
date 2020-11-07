type Params = {
  results: number;
  currentRound: string;
};

class GetCurrentRoundResponse {
  private constructor({ results, currentRound }: Params) {
    this.results = results;
    this.currentRound = currentRound;
  }
  results: number;
  currentRound: string;

  static deserialize(resp: any): GetCurrentRoundResponse {
    return new GetCurrentRoundResponse({
      results: resp.results,
      currentRound: resp.fixtures[0],
    });
  }
}

export default GetCurrentRoundResponse;
