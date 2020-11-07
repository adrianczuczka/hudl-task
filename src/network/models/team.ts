type Params = {
  ID: string;
  name: string;
  logo: string;
};

class Team {
  constructor({ ID, name, logo }: Params) {
    this.ID = ID;
    this.name = name;
    this.logo = logo;
  }
  ID: string;
  name: string;
  logo: string;

  static deserialize(resp: any): Team {
    return new Team({ ID: resp.team_id, name: resp.team_name, logo: resp.logo });
  }
}

export default Team;
