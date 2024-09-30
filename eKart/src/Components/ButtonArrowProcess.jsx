import React from "react";

const ButtonArrowProcess = (props) => {
  return (
    <>
      <button
        {...props.className}
        className="bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
      >
        {props.text}
      </button>
    </>
  );
};

export default ButtonArrowProcess;
