"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "next/link";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function LoginForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="flex flex-col gap-10 lg:gap-12 md:gap-12">
      <TextField
        id="input-with-icon-textfield"
        label="Kullanıcı Adı"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

      <TextField
        id="input-with-icon-textfield"
        label="Şifre"
        type={"password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

      <FormControl variant="standard" sx={{ minWidth: 120, width: "75%" }}>
        <InputLabel id="demo-simple-select-standard-label">Personel</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Personel"
        >
          <MenuItem value={10}>Yönetim</MenuItem>
          <MenuItem value={20}>Satış</MenuItem>
          <MenuItem value={30}>Muhasebe</MenuItem>
          <MenuItem value={30}>Çalışan</MenuItem>
        </Select>
      </FormControl>
      <Link href={"/homepage"} passHref>
        <button
          type="button"
          className="inline-block w-full rounded bg-indigo-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >
          Giriş
        </button>
      </Link>
    </div>
  );
}
