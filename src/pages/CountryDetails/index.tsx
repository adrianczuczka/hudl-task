import React, { FC, useEffect, useState } from 'react';
import League from '../../network/models/league';
import { getLeaguesByCountry } from '../../network/networkService';
import AccordionCard from '../../components/AccordionCard';
import Accordion from 'react-bootstrap/Accordion';
import LoadingSpinner from '../../components/LoadingSpinner';
import Country from '../../network/models/country';

type Props = {
  country: Country;
  isOpen: boolean;
};

const CountryDetails: FC<Props> = ({ country, isOpen }: Props) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getLeaguesByCountry(country.name).then((resp) => {
        setIsLoading(false);
        if (resp) {
          setLeagues(resp);
        } else {
          setHasError(true);
        }
      });
    }
  }, [isOpen]);

  const renderLeagues = () => {
    return leagues.map((league) => {
      return (
        <AccordionCard key={league.name} title={league.name}>
          Text Body
        </AccordionCard>
      );
    });
  };

  if (isLoading) {
    return <LoadingSpinner centered />;
  }

  return <Accordion>{renderLeagues()}</Accordion>;
};

export default CountryDetails;
