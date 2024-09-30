import React from "react";

const Button3 = (props) => {
  return (
    <button className="m-1 mx-auto h-[30px] w-[100px] rounded-sm bg-[#FECE22] p-1 px-3 font-medium text-black transition-all hover:bg-yellow-400">
      {props.text}
      {props.icon}
    </button>
  );
};

export default Button3;
