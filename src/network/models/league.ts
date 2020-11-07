type Params = {
  ID: number;
  name: string;
  logo: string;
};

class League {
  constructor({ ID, name, logo }: Params) {
    this.ID = ID;
    this.name = name;
    this.logo = logo;
  }
  ID: number;
  name: string;
  logo: string;

  static deserialize(resp: any): League {
    return new League({ ID: resp.league_id, name: resp.name, logo: resp.logo });
  }
}

export default League;
