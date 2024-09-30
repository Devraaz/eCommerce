import React from "react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import ProductList from "../Sections/ProductList";
import { Helmet } from "react-helmet";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // If you're using axios for API calls
import Button2 from "../Components/Button2";
import Card from "../Components/Card";
const API_URL = import.meta.env.VITE_API_URL;

const Filters = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const params = new URLSearchParams(location.search);
  const searchWord = params.get("search");

  const fetchSearch = async () => {
    const searchTerm = params.get("search");

    try {
      setLoading(true);
      setError(null);

      let apiUrl = `${API_URL}/api/products/all/?search=${searchTerm}`;

      // Append price range filters if available
      if (minPrice) apiUrl += `&min_price=${minPrice}`;
      if (maxPrice) apiUrl += `&max_price=${maxPrice}`;

      const res = await axios.get(apiUrl);
      setSearchResult(res.data);
      console.log(res.data);
    } catch (err) {
      setError("Error fetching search results");
    } finally {
      setLoading(false); // Stop loading after the request is completed
    }
  };
  useEffect(() => {
    fetchSearch();
  }, [location.search, minPrice, maxPrice]);

  return (
    <>
      <Helmet>
        <title>Filter | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />

      <section className="mx-auto flex flex-col justify-center gap-10 bg-slate-100 p-10 md:flex-row">
        <div className="h-fit w-[96%] rounded-md border bg-white p-3 shadow-md md:w-[25%]">
          <h3 className="text-center text-lg font-medium">FILTER</h3>
          <hr />
          <div className="price-filter mt-10 gap-5 p-1">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Min Price: &nbsp;
              <input
                type="number"
                className="w-36 appearance-none rounded border px-2 py-2 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </label>

            <label className="mb-2 block text-sm font-bold text-gray-700">
              Max Price:&nbsp;
              <input
                type="number"
                className="w-36 appearance-none rounded border px-2 py-2 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>

            <button
              onClick={fetchSearch}
              className="mx-auto rounded-md border bg-slate-300 px-3 py-1 transition-all hover:bg-slate-600 hover:text-white"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="h-auto w-[96%] space-y-5 rounded-md border bg-white p-3 shadow-md md:w-[70%]">
          <p className="text-xl font-semibold">
            Your search result for "{searchWord}"
          </p>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && searchResult.length === 0 && (
            <p>No results found</p>
          )}

          <div className="cards mx-auto grid grid-cols-2 gap-4 sm:grid-cols-2 sm:flex-row md:grid-cols-2 lg:grid-cols-3">
            {searchResult.map((product) => (
              <Card key={product.id} products={product} url="/Men" />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Filters;
