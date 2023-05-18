import React from 'react';

interface IContainerElementProps {
  children: React.ReactNode;
}

import { Container } from './styles';

const ContainerElement = ({ children }: IContainerElementProps) => {
  return (
    <>
      <Container className="py-5 mt-7 sm:px-5">
        <div className="flex px-5 flex-col">{children}</div>
      </Container>
    </>
  );
};

export default ContainerElement;
