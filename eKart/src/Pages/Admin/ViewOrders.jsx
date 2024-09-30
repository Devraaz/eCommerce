import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { Helmet } from "react-helmet";

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
const statusChoices = {
  None: "None",
  Processing: "Processing",
  Placed: "Placed",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const API_URL = import.meta.env.VITE_API_URL;

const ViewOrders = () => {
  const [data, setData] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState({});
  const handleClose = () => {
    setOpen(false);
    setProductItems([]);
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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchedData = res.data;
        console.log(fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAddress = async () => {};
    fetchOrders();
    fetchAddress();

    console.log(data);
  }, [deliveryStatus]);

  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;
    setDeliveryStatus(newStatus);
    console.log("New Status: ", newStatus);
    console.log("Order Id ", orderId.id);
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${API_URL}/api/orders/orders/${orderId.id}/update_status/`,
        {
          delivery_status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      setError("Error updating status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>View Orders | India's Smartest Shopping Point</title>
      </Helmet>
      <div className="right-0 mx-auto mb-5 w-full p-1">
        <h4 className="p-1 text-center text-xl font-medium text-white">
          View Orders
        </h4>
        <hr className="my-4 bg-slate-400" />

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
                    <b className="text-slate-400"> Order Id </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Order No. </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> User Name </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> User Address </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Net Amount </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Discount </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Tax </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Total Amount </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Payment Option </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Payment Status </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Shipping Charge </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Delivery Status </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Change Status </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-slate-200">
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <span className="text-slate-300">{item.id}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span
                        className="cursor-pointer text-slate-300 hover:text-slate-600"
                        onClick={() => handleOpen(item.items)}
                      >
                        {item.order_no}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.user_email}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.user_id}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.net_amount}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.discount}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.tax}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.total_amount}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.payment_options}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.payment_status}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.shipping_charge}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.delivery_status}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <FormControl fullWidth>
                        <Select
                          labelId={`status-select-${item.id}`}
                          value={deliveryStatus}
                          onChange={(e) => handleStatusChange(e, item)}
                          disabled={loading}
                        >
                          {Object.keys(statusChoices).map((key) => (
                            <MenuItem
                              key={key}
                              value={key}
                              sx={{ backgroundColor: "" }}
                            >
                              {statusChoices[key]}
                            </MenuItem>
                          ))}
                        </Select>
                        {loading && <p>Updating...</p>}
                        {error && <p>{error}</p>}
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Button>Open modal</Button>
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
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Order Details
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell align="right">Product Image</TableCell>
                      <TableCell align="right">Product Price</TableCell>
                      <TableCell align="right">Product Quantity</TableCell>
                      <TableCell align="right">Product Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productItems.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product_id}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            src={productImages[row.product_id]}
                            alt="Product"
                            width={50}
                            height={50}
                          />
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
      </div>
    </>
  );
};

export default ViewOrders;
