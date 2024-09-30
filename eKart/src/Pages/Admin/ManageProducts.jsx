import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/all/`);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${API_URL}/api/orders/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(orders);
    fetchOrders();
    fetchProducts();
  }, []);

  // Calculate items sold for each product
  const calculateItemSold = (productId) => {
    let totalSold = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product_id === productId) {
          totalSold += item.quantity; // Sum the quantities for the specific product
        }
      });
    });
    return totalSold;
  };

  return (
    <>
      <Helmet>
        <title>Manage Orders | India's Smartest Shopping Point</title>
      </Helmet>
      <section className="w-[100%] rounded-md bg-slate-800 p-3">
        <h1 className="text-md font-semibold text-slate-200">
          Manage Products
        </h1>
        <br />
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 200 }}
              aria-label="simple table"
              className="bg-slate-900"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b className="text-slate-400">Sl no </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400">Product Id </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Product Name </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Image </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Net Price </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Stock Quantity </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Size </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Item Sold </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-slate-200">
                {products.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <span className="text-slate-300">{index}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="cursor-pointer text-slate-300 hover:text-slate-600">
                        {item.id}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.product_name}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      {item.images.length > 0 && item.images[0].image ? (
                        <img
                          src={item.images[0].image}
                          alt="Product"
                          className="w-10"
                        />
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.net_price}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.stock}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.variant.map((size) => (
                          <>
                            <span>{size.size} &nbsp;</span>
                          </>
                        ))}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {calculateItemSold(item.id)}
                      </span>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  );
};

export default ManageProducts;
