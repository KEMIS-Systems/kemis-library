import React from "react";

interface IContainerElementProps {
  children: React.ReactNode;
  className?: string;
  classNameChild?: string;
}

import { Container } from "./styles";

const ContainerElement = ({
  className,
  classNameChild,
  children,
}: IContainerElementProps) => {
  return (
    <>
      <Container
        className={
          className ? "py-5 mt-7 sm:px-5" : `py-5 mt-7 sm:px-5 ${className}`
        }
      >
        <div
          className={
            classNameChild
              ? "flex px-5 flex-col"
              : `flex px-5 flex-col ${classNameChild}`
          }
        >
          {children}
        </div>
      </Container>
    </>
  );
};

export default ContainerElement;
