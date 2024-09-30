import React, { Suspense } from "react";

import Card from "../Components/Card";
const ProductList = (props) => {
  let deal = [];

  if (props.deals) {
    deal = props.deals;
  }
  return (
    <>
      <section className="mx-auto my-3 w-[98vw] rounded-lg bg-white p-4">
        <h1 className="after:content[] relative from-red-600 to-purple-700 text-3xl font-bold after:absolute after:-bottom-3 after:left-0 after:h-1 after:w-20 after:bg-gradient-to-tr">
          {props.title}
        </h1>
        <br />
        <div className="cards mx-auto grid grid-cols-2 gap-4 sm:grid-cols-2 sm:flex-row md:grid-cols-3 lg:grid-cols-4">
          {deal.map((data) => (
            <Card key={data.id} products={data} url="/Men" />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
