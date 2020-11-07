import React, { EventHandler, FC, ReactElement, SyntheticEvent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

type Props = {
  title: string;
  children: string | ReactElement;
  onClick?: EventHandler<SyntheticEvent>;
};

const AccordionCard: FC<Props> = ({ title, children, onClick }: Props) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={title} onClick={onClick}>
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={title}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
