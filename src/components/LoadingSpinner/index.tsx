import React from 'react';
import Spinner from 'react-bootstrap/cjs/Spinner';

import styles from './styles.module.scss';

type Props = {
  centered?: boolean;
};

const LoadingSpinner = ({ centered = false }: Props) => {
  if (centered) {
    return (
      <Spinner animation="border" role="status" className={styles.centered}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default LoadingSpinner;
