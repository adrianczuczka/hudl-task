import React, { FC } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import AccordionCard from '../../components/AccordionCard';

const Home: FC = () => {
  return (
    <Accordion>
      <AccordionCard title="Click me!">Text Body</AccordionCard>
    </Accordion>
  );
};

export default Home;
