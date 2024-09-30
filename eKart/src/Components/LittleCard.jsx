import React from "react";
import { Link } from "react-router-dom";

const LittleCard = (props) => {
  return (
    <>
      <Link
        to={props.url}
        className="items group relative h-20 rounded-md bg-slate-800 transition-all duration-300"
      >
        <p className="text-md mx-auto transform p-5 font-semibold text-slate-300 transition-all duration-300 group-hover:translate-y-8">
          {props.title}
        </p>
        <p className="absolute right-4 top-3 transform font-cursive text-6xl text-slate-300 transition-all duration-300 group-hover:-translate-y-2">
          {props.value}
        </p>
      </Link>
    </>
  );
};

export default LittleCard;
