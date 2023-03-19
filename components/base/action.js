"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";

export default function LOL({ preference, children }) {
  const { name, action, pathname, query } = preference;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    true && (
      <div className="">
        <div className="">
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <p className="text-white text-xs font-roboto tracking-widest hover:text-inherit">
              {name}
            </p>
          </Button>
        </div>

        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {action?.map((item, i) => {
            return (
              <MenuItem key={i} onClick={handleClose} disableRipple>
                {children}
                <Link href={{ pathname, query }} passHref>
                  {item}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    )
  );
}
