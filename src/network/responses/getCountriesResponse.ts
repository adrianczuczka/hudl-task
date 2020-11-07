import Country from '../models/country';

type Params = {
  results: number;
  countries: Country[];
};

class GetCountriesResponse {
  private constructor({ results, countries }: Params) {
    this.results = results;
    this.countries = countries;
  }
  results: number;
  countries: Country[];

  static deserialize(resp: any): GetCountriesResponse {
    return new GetCountriesResponse({
      results: resp.results,
      countries: resp.countries.map((country: any) => {
        return Country.deserialize(country);
      }),
    });
  }
}

export default GetCountriesResponse;
