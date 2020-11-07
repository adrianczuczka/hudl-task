import React, { FC } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Accordion from 'react-bootstrap/esm/Accordion';

const Home: FC = () => {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click me!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! Im the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Click me!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! Im another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Home;
