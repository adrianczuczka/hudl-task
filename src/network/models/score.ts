type Params = {
  halfTime: string;
  fullTime: string;
  extraTime: string;
  penalty: string;
};

class Score {
  private constructor({ halfTime, fullTime, extraTime, penalty }: Params) {
    this.halfTime = halfTime;
    this.fullTime = fullTime;
    this.extraTime = extraTime;
    this.penalty = penalty;
  }
  halfTime: string;
  fullTime: string;
  extraTime: string;
  penalty: string;

  static deserialize(resp: any): Score {
    return new Score({
      halfTime: resp.halftime,
      fullTime: resp.fulltime,
      extraTime: resp.extratime,
      penalty: resp.penalty,
    });
  }
}

export default Score;
