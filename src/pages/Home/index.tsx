import React, { FC, useState } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import AccordionCard from '../../components/AccordionCard';
import { getCountries } from '../../network/networkService';
import { useMountEffect } from '../../util/reactUtil';
import Country from '../../network/models/country';
import LoadingSpinner from '../../components/LoadingSpinner';

const Home: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useMountEffect(() => {
    setIsLoading(true);
    getCountries().then((resp) => {
      setIsLoading(false);
      if (resp) {
        setCountries(resp);
      } else {
        setHasError(true);
      }
    });
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Accordion>
      <AccordionCard title="Click me!">Text Body</AccordionCard>
    </Accordion>
  );
};

export default Home;
