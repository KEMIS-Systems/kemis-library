import React from 'react';

import { Container } from './styles';

interface ILoading {
  show?: boolean;
}

export default function Loading({ show }: ILoading) {
  return (
    <>
      {show && (
        <Container className="loading-box">
          <div className="loader" role="status" />
        </Container>
      )}
    </>
  );
}
