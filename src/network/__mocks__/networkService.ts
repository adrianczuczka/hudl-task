const mockNetworkService = jest.fn().mockImplementation(() => {
  return {
    getCountries: jest.fn(),
    getLeaguesByCountry: jest.fn(),
    getCurrentLeagueRound: jest.fn(),
  };
});

export default mockNetworkService;
