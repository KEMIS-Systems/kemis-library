import React from 'react';

interface IContainerElementProps {
  children: React.ReactNode;
}

const BoxElement = ({ children }: IContainerElementProps) => {
  return (
    <div className="bg-white rounded-2xl w-full py-5 px-1 sm:px-5">
      <div className="flex px-5 flex-col">{children}</div>
    </div>
  );
};

export default BoxElement;
