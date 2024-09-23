import React from "react";

interface IContainerElementProps {
  children: React.ReactNode;
  className?: string;
  classNameChild?: string;
}

const BoxElement = ({
  className,
  classNameChild,
  children,
}: IContainerElementProps) => {
  return (
    <div
      className={`bg-white shadow-xl rounded-xl w-full py-5 px-1 sm:px-5 ${className}`}
    >
      <div
        className={`flex flex-col ${classNameChild}`}
      >
        {children}
      </div>
    </div>
  );
};

export default BoxElement;
