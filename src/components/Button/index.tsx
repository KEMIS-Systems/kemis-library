import React from "react";

interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, type, onClick }: IButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="
        mb-16
        w-full
        font-bold py-4
        bg-blue-submit
        text-white
        rounded-lg
        "
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
