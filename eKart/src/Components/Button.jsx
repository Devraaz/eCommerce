import React from "react";

const Button = ({ text, icon, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="m-1 h-[35px] min-w-[150px] rounded-full bg-primary p-1 px-3 font-medium text-white ring ring-primary transition-all hover:bg-white hover:text-primary hover:ring-primary"
      >
        {text}
        {icon}
      </button>
    </>
  );
};

export default Button;
