import React from 'react';
import renderer from 'react-test-renderer';
import AccordionCard from './index';

it('renders correctly with only title', () => {
  const tree = renderer.create(<AccordionCard title="Test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with title and children', () => {
  const tree = renderer.create(<AccordionCard title="Test">Test Child</AccordionCard>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with title, children, and onClick', () => {
  const tree = renderer
    .create(
      <AccordionCard
        title="Test"
        onClick={() => {
          console.log('Test');
        }}
      >
        Test Child
      </AccordionCard>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
