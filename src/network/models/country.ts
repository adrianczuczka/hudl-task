type Params = {
  name: string;
  code: string;
  flag: string;
};

class Country {
  constructor({ name, code, flag }: Params) {
    this.name = name;
    this.code = code;
    this.flag = flag;
  }
  name: string;
  code: string;
  flag: string;

  static deserialize(resp: any): Country {
    return new Country({ name: resp.country, code: resp.code, flag: resp.flag });
  }
}

export default Country;
