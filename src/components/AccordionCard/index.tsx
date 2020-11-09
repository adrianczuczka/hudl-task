import React, { EventHandler, FC, ReactElement, SyntheticEvent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/cjs/Image';

import styles from './styles.module.scss';

type Props = {
  title: string;
  children?: string | ReactElement;
  onClick?: EventHandler<SyntheticEvent>;
  image?: string;
};

const AccordionCard: FC<Props> = ({ title, children, onClick, image }: Props) => {
  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={title}
        onClick={onClick}
        className={styles.toggle}
      >
        {title}
        {image && <Image src={image} className={styles.image} />}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={title}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
