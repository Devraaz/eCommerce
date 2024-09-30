import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const Breadcrumb = ({ category, item }) => {
  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="mx-auto my-3 w-[96%] rounded-md border bg-slate-300 p-1 px-10 text-xl"
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Typography style={{ fontSize: "14px" }}>
          <Link underline="hover" color="inherit" href="/" className="text-sm">
            Home
          </Link>
        </Typography>
        <Typography style={{ fontSize: "14px" }}>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            className="text-[12px]"
          >
            {category}
          </Link>
        </Typography>
        <Typography style={{ fontSize: "14px" }}>
          <Link
            underline="hover"
            color="text.primary"
            to="#"
            aria-current="page"
            className="text-xs"
          >
            {item}
          </Link>
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
