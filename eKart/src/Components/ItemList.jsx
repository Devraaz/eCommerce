import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/Cart/CartSlice";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

const ItemList = () => {
  const dispatch = useDispatch();

  const clist = useSelector((state) => state.cart);
  console.log(clist);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <div className="flex w-full max-w-[600px] flex-col">
        {clist.map((item, index) => (
          <div
            key={index}
            className="relative my-3 flex h-48 w-full gap-5 rounded-md border"
          >
            <div className="image w-40 origin-bottom overflow-hidden rounded-md">
              <img
                src={item.product.images[0].image}
                alt="image"
                className="w-40 object-cover"
              />
            </div>
            <div className="text flex flex-col gap-3">
              <Link to={`/ProductPage/${item.product.id}`}>
                <h1 className="text-lg font-medium">
                  {item.product.product_name}
                </h1>
              </Link>
              <h1 className="text-lg font-medium text-primary">
                Size: {item.selectedSize}
              </h1>
              <h1 className="text-lg font-medium text-primary">
                Qnt: {item.selectedQuantity}
              </h1>
              <div className="w-20 rounded-sm bg-[#64D62E] px-2 text-base font-bold text-white">
                {parseInt(item.product.discount, 10)}% off
              </div>
              <div className="absolute bottom-0 right-0 text-xl font-medium text-primary">
                {" "}
                Price:{" "}
                <span className="text-2xl text-slate-900">
                  ₹{item.product.net_price}
                </span>
                <strike className="mx-1 font-normal">
                  {item.product.price}
                </strike>
              </div>
              <button
                title="Remove from Cart"
                className="absolute right-0 top-0 rounded-md border p-2 text-lg font-medium transition-all hover:bg-slate-700 hover:text-slate-200"
                onClick={() => handleRemove(item.product.id)}
              >
                <BsTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemList;
