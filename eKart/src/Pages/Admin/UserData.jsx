import axios from "axios";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TiTick } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

const API_URL = import.meta.env.VITE_API_URL;

const UserData = () => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    borderRadius: "10px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${API_URL}/api/users/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(res.data);

        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async (items) => {
    setOpen(true);
    console.log(items);
    setAddress(items);
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
                    <b className="text-slate-400">Name </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Email </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400">Is Admin</b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Is Active </b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-slate-400"> Address </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-slate-200">
                {user.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <span className="text-slate-300">{index}</span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="cursor-pointer text-slate-300 hover:text-slate-600">
                        {item.name}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">{item.email}</span>{" "}
                    </TableCell>

                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.is_admin ? <TiTick /> : <IoIosCloseCircle />}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-slate-300">
                        {item.is_active ? <TiTick /> : <IoIosCloseCircle />}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <button
                        onClick={() => handleOpen(item.address)}
                        className="rounded-md border px-5 py-1 text-slate-100 transition-all hover:bg-slate-800"
                      >
                        View
                      </button>
                      {/* <span className="text-slate-300">
                        {item.variant.map((size) => (
                          <>
                            <span>{size.size} &nbsp;</span>
                          </>
                        ))}
                      </span> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
          <Box sx={style} className="bg-slate-800">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Order Details
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. no.</TableCell>
                    <TableCell align="right">Address 1 </TableCell>
                    <TableCell align="right">Address 2</TableCell>
                    <TableCell align="right">District</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Pin Code</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Current Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {address.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{row.address1}</TableCell>
                      <TableCell align="right">{row.address2}</TableCell>
                      <TableCell align="right">{row.district}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.pin}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right" className="mx-auto">
                        <span className="mx-auto text-xl text-slate-900">
                          {row.is_current ? (
                            <TiTick className="text-green-500" />
                          ) : (
                            <IoIosCloseCircle />
                          )}
                        </span>{" "}
                      </TableCell>
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
    </>
  );
};

export default UserData;
