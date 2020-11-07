import Country from './models/country';
import GetCountriesResponse from './responses/getCountriesResponse';
import League from './models/league';
import GetLeaguesResponse from './responses/getLeaguesResponse';
import TimedCache from './cache/timedCache';

/****************
 * Caches
 ***************/

const countriesCache = new TimedCache<Country[]>();
const leaguesByCountryCache = new TimedCache<League[]>();

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

/****************
 * Countries
 ***************/

const getCountriesFromNetwork = (): Promise<Country[] | null> => {
  return fetchFootballData('https://api-football-v1.p.rapidapi.com/v2/countries')
    .then((resp) => {
      return GetCountriesResponse.deserialize(resp).countries;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getCountries = (): Promise<Country[] | null> => {
  const cached = countriesCache.get('countries');
  if (!cached || cached.stale()) {
    return getCountriesFromNetwork().then((resp) => {
      if (resp) {
        countriesCache.put('countries', resp);
      }
      return resp;
    });
  }
  return Promise.resolve(cached.value);
};

/****************
 * Leagues
 ***************/

const getLeaguesByCountryFromNetwork = (country: string): Promise<League[] | null> => {
  return fetchFootballData(
    `https://api-football-v1.p.rapidapi.com/v2/leagues/country/${country}/2020`,
  )
    .then((resp) => {
      return GetLeaguesResponse.deserialize(resp).countries;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getLeaguesByCountry = (country: string): Promise<League[] | null> => {
  const cached = leaguesByCountryCache.get(country);
  if (!cached || cached.stale()) {
    return getLeaguesByCountryFromNetwork(country).then((resp) => {
      if (resp) {
        leaguesByCountryCache.put(country, resp);
      }
      return resp;
    });
  }
  return Promise.resolve(cached.value);
};
