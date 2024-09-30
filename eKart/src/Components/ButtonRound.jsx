import React from "react";

const ButtonRound = ({ text }) => {
  return (
    <>
      <button className="m-1 h-10 w-10 rounded-full border border-r-lime-900 p-2 text-lg font-medium text-primary">
        {text}
      </button>
    </>
  );
};

export default ButtonRound;
