import React from "react";

const Button = ({ text, icon, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="m-1 h-[35px] w-[150px] rounded-full bg-white p-1 px-3 font-medium text-darkblack ring ring-darkblack transition-all hover:bg-darkblack hover:text-white hover:ring-darkblack"
      >
        {text}
        {icon}
      </button>
    </>
  );
};

export default Button;
