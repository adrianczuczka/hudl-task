import Country from './models/country';
import GetCountriesResponse from './responses/getCountriesResponse';

const fetchFootballData = (input: RequestInfo, init?: RequestInit): Promise<any> => {
  if (init?.headers) {
    init.headers = {
      ...init.headers,
      'x-rapidapi-key': 'ecd51782c5msh6d33a0e41999c36p1aaadbjsn89d210a1a738',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    };
    return fetch(input, init).then((resp) => {
      return resp.json().then((json) => {
        return json.api;
      });
    });
  } else {
    return fetch(input, {
      headers: {
        'x-rapidapi-key': 'ecd51782c5msh6d33a0e41999c36p1aaadbjsn89d210a1a738',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    }).then((resp) => {
      return resp.json().then((json) => {
        return json.api;
      });
    });
  }
};

export const getCountries = (): Promise<Country[] | null> => {
  return fetchFootballData('https://api-football-v1.p.rapidapi.com/v2/countries')
    .then((resp) => {
      return GetCountriesResponse.deserialize(resp).countries;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
