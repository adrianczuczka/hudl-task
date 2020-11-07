import React, { FC, useEffect, useState } from 'react';
import Fixture from '../../network/models/fixture';
import { getFixtureByID } from '../../network/networkService';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/cjs/Image';

import styles from './styles.module.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from 'react-bootstrap/cjs/Card';
import ListGroup from 'react-bootstrap/cjs/ListGroup';

const FixtureDetails: FC = () => {
  const { fixtureID } = useParams();
  const [fixture, setFixture] = useState<Fixture | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getFixtureByID(fixtureID).then((resp) => {
      setIsLoading(false);
      if (resp) {
        setFixture(resp);
      } else {
        setHasError(true);
      }
    });
  }, [fixtureID]);

  if (isLoading) {
    return <LoadingSpinner centered />;
  }

  return (
    <Card className={styles.fullContainer} bg="light">
      <div className={styles.topContainer}>
        <Card className={styles.teamContainer}>
          <div>
            <Image src={fixture?.homeTeam.logo} className={styles.teamLogo} />
          </div>
          <ListGroup variant="flush">
            <ListGroup.Item className={styles.topSectionDetailsItem}>
              {fixture?.homeTeam.name}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <ListGroup className={styles.topSectionDetails}>
          <ListGroup.Item className={styles.topSectionDetailsItem}>
            {fixture?.league.name}
          </ListGroup.Item>
          <ListGroup.Item className={styles.topSectionDetailsItem}>{fixture?.venue}</ListGroup.Item>
          <ListGroup.Item className={styles.topSectionDetailsItem}>
            {fixture?.goalsHomeTeam} - {fixture?.goalsAwayTeam}
          </ListGroup.Item>
          <ListGroup.Item className={styles.topSectionDetailsItem}>
            {fixture?.elapsed} minutes elapsed
          </ListGroup.Item>
        </ListGroup>
        <Card className={styles.teamContainer}>
          <div>
            <Image src={fixture?.awayTeam.logo} className={styles.teamLogo} />
          </div>
          <ListGroup variant="flush">
            <ListGroup.Item className={styles.topSectionDetailsItem}>
              {fixture?.awayTeam.name}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </Card>
  );
};

export default FixtureDetails;
