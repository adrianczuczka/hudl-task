import React, { FC, useEffect, useState } from 'react';
import League from '../../network/models/league';
import AccordionCard from '../../components/AccordionCard';
import Accordion from 'react-bootstrap/Accordion';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getCurrentLeagueRound, getFixtures } from '../../network/networkService';
import Fixture from '../../network/models/fixture';
import { useHistory } from 'react-router-dom';

type Props = {
  league: League;
  isOpen: boolean;
};

const LeagueDetails: FC<Props> = ({ league, isOpen }: Props) => {
  const history = useHistory();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getCurrentLeagueRound(league.ID).then((round) => {
        if (round) {
          getFixtures(league.ID, round).then((resp) => {
            setIsLoading(false);
            if (resp) {
              setFixtures(resp);
            } else {
              setHasError(true);
            }
          });
        }
      });
    }
  }, [isOpen]);

  const formatFixtureName = (fixture: Fixture) => {
    return `${fixture.homeTeam.name} - ${fixture.awayTeam.name}, ${
      fixture.venue
    } at ${fixture.eventDate.toUTCString()}`;
  };

  const renderFixtures = () => {
    return fixtures.map((fixture) => {
      return (
        <AccordionCard
          key={fixture.fixtureID}
          title={formatFixtureName(fixture)}
          onClick={() => {
            history.push(`/${fixture.fixtureID}`);
          }}
        />
      );
    });
  };

  if (isLoading) {
    return <LoadingSpinner centered />;
  }

  return <Accordion>{renderFixtures()}</Accordion>;
};

export default LeagueDetails;
