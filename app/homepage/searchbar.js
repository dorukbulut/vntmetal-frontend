"use client";
import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export default function FullWidthTextField({ searchChange }) {
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Ara</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={
          <InputAdornment position="start">
            <ManageSearchIcon />
          </InputAdornment>
        }
        onChange={searchChange}
        label="Ara"
      />
    </FormControl>
  );
}
