import React from 'react';
import CountryDetails from './index';
import Country from '../../network/models/country';
import renderer from 'react-test-renderer';
import League from '../../network/models/league';
import { act } from '@testing-library/react';

const mockLeagues = [new League({ ID: 1, name: 'test name', logo: 'test logo' })];

jest.mock('../../network/networkService', () => {
  return {
    getLeaguesByCountry: (country: string): Promise<League[] | null> => {
      return Promise.resolve(mockLeagues);
    },
  };
});

const country = new Country({ name: 'test name', code: 'test code', flag: 'test flag' });

it('builds tree', async () => {
  let tree;
  const component = <CountryDetails country={country} isOpen />;
  act(() => {
    tree = renderer.create(component).toJSON();
  });
  expect(tree).toMatchSnapshot();
});
