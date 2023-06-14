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
      className={
        className
          ? "bg-white rounded-2xl w-full py-5 px-1 sm:px-5"
          : `bg-white rounded-2xl w-full py-5 px-1 sm:px-5 ${className}`
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
    </div>
  );
};

export default BoxElement;
