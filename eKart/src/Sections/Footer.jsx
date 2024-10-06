import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const f_nana = [
    { id: 1, src: "/About", text: "Who we are" },
    { id: 3, src: "/Terms", text: "Terms & Condition" },
    { id: 4, src: "/", text: "Privacy Policy" },
    { id: 5, src: "/AdminLogin", text: "Admin Login" },
    { id: 6, src: "/", text: "Payments & Coupon" },
    { id: 7, src: "/", text: "Return & Refund Policy" },
  ];
  const connection = [
    { id: 1, src: "/", text: "Facebook" },
    { id: 2, src: "/", text: "Instagram" },
    { id: 3, src: "/", text: "Twitter" },
    { id: 4, src: "/", text: "Whatsapp" },
  ];
  const categories = [
    { id: 1, src: "/", text: "Shirts" },
    { id: 2, src: "/", text: "Casual" },
    { id: 3, src: "/", text: "Oversized Shirts" },
    { id: 4, src: "/", text: "Hoodies" },
    { id: 5, src: "/", text: "Lowers" },
    { id: 6, src: "/", text: "T-shirts" },
  ];
  const help = [
    { id: 1, src: "/", text: "FAQ" },
    { id: 2, src: "/", text: "Return" },
    { id: 3, src: "/", text: "Refund" },
    { id: 4, src: "/", text: "Discounts" },
    { id: 5, src: "/", text: "Shipping" },
  ];

  const handleMove = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button
        className="top-5 h-14 w-full bg-primary py-4 text-center font-thin text-white"
        onClick={() => handleMove()}
      >
        BACK TO TOP
      </button>
      <footer className="mx-auto grid grid-cols-1 gap-10 bg-secondary pb-10 pt-20 sm:grid-cols-2 sm:items-start lg:grid-cols-4">
        <div className="body1 mx-auto p-1 text-center sm:text-left">
          <h1 className="mb-5 text-xl font-medium text-white">FASHION NANA</h1>
          <ul className="text-white">
            {f_nana.map((data, index) => (
              <li className="mt-3 text-sm" key={data.id}>
                <Link to={data.src}>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="body2 mx-auto p-1 text-center sm:text-left">
          <h1 className="mb-5 text-xl font-medium text-white">
            CONNECT WITH US
          </h1>
          <ul className="text-white">
            {connection.map((data, index) => (
              <li className="mt-3 text-sm" key={data.id}>
                <Link>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="body3 mx-auto p-1 text-center sm:text-left">
          <h1 className="mb-5 text-xl font-medium text-white">SHOP BY</h1>
          <ul className="text-white">
            {categories.map((data, index) => (
              <li className="mt-3 text-sm" key={data.id}>
                <Link>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="body4 mx-auto p-1 text-center sm:text-left">
          <h1 className="mb-5 text-xl font-medium text-white">HELP</h1>
          <ul className="text-white">
            {help.map((data, index) => (
              <li className="mt-3 text-sm" key={data.id}>
                <Link to={data.src}>{data.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <footer className="mx-auto bg-secondary p-1 text-center text-sm text-slate-100">
        <hr className="mx-auto mb-2 w-40" />
        Fashion Nana &copy; All Rights Reserved | Terms & Condition | Privacy
        Policy | Powered By:{" "}
        <a href="https://www.webokraft.in">Webokraft Solutions</a>
      </footer>
    </>
  );
};

export default Footer;
