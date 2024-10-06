import React, { useEffect, useState } from "react";
import Navbar from "../../Sections/Navbar";
import Footer from "../../Sections/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
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
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const [order, setOrder] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          `${API_URL}/api/orders/orders/user_orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        // Reverse the order of the fetched data
        const reversedOrders = res.data.reverse();

        setOrder(reversedOrders);
        console.log(reversedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    borderRadius: "10px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    setOpen(false);
    setProductItems([]);
    setProductImages({});
  };

  const handleOpen = async (items) => {
    setOpen(true);
    setProductItems(items);

    const images = {};
    for (const item of items) {
      try {
        const res = await axios.get(
          `${API_URL}/api/products/all/${item.product_id}`,
        );
        images[item.product_id] = res.data.images[0].image; // Store the image using product ID as key
      } catch (error) {
        console.log(error);
      }
    }
    setProductImages(images);
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${API_URL}/api/orders/orders/${orderId}/update_status/`,
        { delivery_status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      // Update the local state to reflect the canceled order
      setOrder((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, delivery_status: "Cancelled" } : o,
        ),
      );
    } catch (error) {
      console.error("Failed to cancel the order", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <section className="flex h-auto w-[99.9%] flex-col items-center justify-center bg-slate-200">
        <div className="m-3 h-auto w-[100%] rounded-md bg-slate-50 shadow-lg md:w-[80%]">
          <div className="text-center text-lg font-bold text-primary">
            My Orders
          </div>
          <div className="p-5">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 200 }}
                aria-label="simple table"
                className="bg-slate-100"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <b className="text-slate-700"> Order No. </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Product Amount </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Discount </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Shipping Charge </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Total Amount </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Payment Option </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Payment Status </b>
                    </TableCell>

                    <TableCell align="left">
                      <b className="text-slate-700"> Delivery Status </b>
                    </TableCell>
                    <TableCell align="left">
                      <b className="text-slate-700"> Cancel Order </b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="text-slate-200">
                  {order.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <span
                          className="cursor-pointer text-blue-600 hover:text-blue-900"
                          onClick={() => handleOpen(item.items)}
                        >
                          {item.order_no}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-slate-600">
                          {item.total_amount}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-slate-600">{item.discount}</span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-slate-600">
                          {item.shipping_charge}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold text-slate-600">
                          {item.net_amount}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-slate-600">
                          {item.payment_options}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-slate-600">
                          {item.payment_status}
                        </span>{" "}
                      </TableCell>

                      <TableCell align="left">
                        <span className="text-slate-600">
                          {item.delivery_status}
                        </span>{" "}
                      </TableCell>
                      <TableCell align="left">
                        {item.delivery_status === "Cancelled" ? (
                          <span className="font-medium text-red-500">
                            Cancelled
                          </span>
                        ) : item.delivery_status === "Delivered" ? (
                          <Button variant="contained" color="error" disabled>
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => cancelOrder(item.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <p>
          <i className="font-semibold text-red-500"> Note* </i> If you have any
          queries realated to Return{" "}
          <Link
            to="#"
            className="text-green-600"
            onClick={() => window.open("https://wa.me/7653855604", "_blank")}
          >
            Whatsapp Us here
          </Link>
        </p>
      </section>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="absolute left-[50%] top-[50%] w-96 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10 shadow-md md:w-2/3">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Order Details
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. no.</TableCell>
                    <TableCell align="right">Product Image</TableCell>
                    <TableCell align="right">Product Price</TableCell>
                    <TableCell align="right">Product Quantity</TableCell>
                    <TableCell align="right">Product Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productItems.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/ProductPage/${row.product_id}`}>
                          <img
                            src={productImages[row.product_id]}
                            alt="Product"
                            width={50}
                            height={50}
                          />
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.product_price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Fade>
      </Modal>
      <Footer />
    </>
  );
};

export default MyOrders;
