import React, { FC, useState } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import AccordionCard from '../../components/AccordionCard';
import { getCountries } from '../../network/networkService';
import { useMountEffect } from '../../util/reactUtil';
import Country from '../../network/models/country';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './styles.module.scss';
import CountryDetails from '../CountryDetails';

const Home: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);

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
    return <LoadingSpinner centered />;
  }

  const renderCountries = () => {
    return countries.map((country) => {
      return (
        <AccordionCard
          key={country.name}
          title={country.name}
          onClick={() => {
            setSelectedCountry(country);
          }}
          image={country.flag}
        >
          <CountryDetails country={country} isOpen={selectedCountry?.name === country.name} />
        </AccordionCard>
      );
    });
  };

  return <Accordion className={styles.home}>{renderCountries()}</Accordion>;
};

export default Home;
