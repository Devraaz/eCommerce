import React from "react";

const Button4 = (props) => {
  return (
    <>
      <button className="m-1 mx-auto h-[35px] w-[100px] rounded-full bg-primary p-1 px-3 font-medium text-white ring ring-white transition-all hover:bg-white hover:text-primary hover:ring-primary">
        {props.text}
        {props.icon}
      </button>
    </>
  );
};

export default Button4;
