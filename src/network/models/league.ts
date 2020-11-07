type Params = {
  leagueID: string;
  name: string;
  logo: string;
};

class League {
  constructor({ leagueID, name, logo }: Params) {
    this.leagueID = leagueID;
    this.name = name;
    this.logo = logo;
  }
  leagueID: string;
  name: string;
  logo: string;

  static deserialize(resp: any): League {
    return new League({ leagueID: resp.league_id, name: resp.name, logo: resp.logo });
  }
}

export default League;
