type Params = {
  name: string;
  logo: string;
};

class League {
  private constructor({ name, logo }: Params) {
    this.name = name;
    this.logo = logo;
  }
  name: string;
  logo: string;

  static deserialize(resp: any): League {
    return new League({ name: resp.name, logo: resp.logo });
  }
}

export default League;
