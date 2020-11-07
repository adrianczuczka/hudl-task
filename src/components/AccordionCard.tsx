import React, { FC, ReactElement } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

type Props = {
  title: string;
  children: string | ReactElement;
};

const AccordionCard: FC<Props> = ({ title, children }: Props) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        Click me!
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;