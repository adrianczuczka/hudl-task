import React from 'react';
import renderer from 'react-test-renderer';
import LoadingSpinner from './index';

it('renders correctly', () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when centered', () => {
  const tree = renderer.create(<LoadingSpinner centered />).toJSON();
  expect(tree).toMatchSnapshot();
});
