import Country from './models/country';
import GetCountriesResponse from './responses/getCountriesResponse';
import League from './models/league';
import GetLeaguesResponse from './responses/getLeaguesResponse';
import TimedCache from './cache/timedCache';
import GetCurrentRoundResponse from './responses/getCurrentRoundResponse';
import Fixture from './models/fixture';
import GetFixturesResponse from './responses/getFixturesResponse';

/****************
 * Caches
 ***************/

const countriesCache = new TimedCache<Country[]>();
const leaguesByCountryCache = new TimedCache<League[]>();
const currentLeagueRoundCache = new TimedCache<string>();
const fixturesByLeagueCache = new TimedCache<Fixture[]>();
const fixturesCache = new TimedCache<Fixture>();

const fetchFootballData = (input: RequestInfo, init?: RequestInit): Promise<any> => {
  if (init?.headers) {
    init.headers = {
      ...init.headers,
      'x-rapidapi-key': process.env.REACT_APP_API_KEY ?? '',
      'x-rapidapi-host': process.env.REACT_APP_API_HOST ?? '',
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

/****************
 * Rounds
 ***************/

const getCurrentLeagueRoundFromNetwork = (leagueID: number): Promise<string | null> => {
  return fetchFootballData(
    `https://api-football-v1.p.rapidapi.com/v2/fixtures/rounds/${leagueID}/current`,
  )
    .then((resp) => {
      return GetCurrentRoundResponse.deserialize(resp).currentRound;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getCurrentLeagueRound = (leagueID: number): Promise<string | null> => {
  const cached = currentLeagueRoundCache.get(leagueID.toString());
  if (!cached || cached.stale()) {
    return getCurrentLeagueRoundFromNetwork(leagueID).then((resp) => {
      if (resp) {
        currentLeagueRoundCache.put(leagueID.toString(), resp);
      }
      return resp;
    });
  }
  return Promise.resolve(cached.value);
};

/****************
 * Fixtures
 ***************/

const getFixturesFromNetwork = (leagueID: number, round: string): Promise<Fixture[] | null> => {
  return fetchFootballData(
    `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${leagueID}/${round}?timezone=Europe/London`,
  )
    .then((resp) => {
      return GetFixturesResponse.deserialize(resp).fixtures;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getFixtures = (leagueID: number, round: string): Promise<Fixture[] | null> => {
  const cached = fixturesByLeagueCache.get(leagueID.toString());
  if (!cached || cached.stale()) {
    return getFixturesFromNetwork(leagueID, round).then((resp) => {
      if (resp) {
        fixturesByLeagueCache.put(leagueID.toString(), resp);
      }
      return resp;
    });
  }
  return Promise.resolve(cached.value);
};

const getFixtureByIDFromNetwork = (fixtureID: string): Promise<Fixture | null> => {
  return fetchFootballData(
    `https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${fixtureID}?timezone=Europe/London`,
  )
    .then((resp) => {
      return GetFixturesResponse.deserialize(resp).fixtures[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getFixtureByID = (fixtureID: string): Promise<Fixture | null> => {
  const cached = fixturesCache.get(fixtureID);
  if (!cached || cached.stale()) {
    return getFixtureByIDFromNetwork(fixtureID).then((resp) => {
      if (resp) {
        fixturesCache.put(fixtureID, resp);
      }
      return resp;
    });
  }
  return Promise.resolve(cached.value);
};
