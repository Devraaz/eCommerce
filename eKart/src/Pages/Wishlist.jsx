import React from "react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import ItemList from "../Components/ItemList";
import { useDispatch, useSelector } from "react-redux";
import { selectedWishList } from "../redux/Wishlist/WishlistSlice";
import Card from "../Components/Card";

const ProductList = React.lazy(() => import("../Sections/ProductList"));
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wlist = useSelector((state) => state.wishlist);
  return (
    <>
      <Helmet>
        <title>Wishlist | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <Breadcrumb category="Wishlist" />
      {wlist && wlist.length > 0 ? (
        <ProductList deals={wlist} />
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          {" "}
          Wishlist is Empty
        </h1>
      )}

      <Footer />
    </>
  );
};

export default Wishlist;
