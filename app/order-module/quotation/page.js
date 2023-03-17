"use client";
import Table from "../table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { columns } from "./data";
import TimePicker from "../../../components/base/timepicker.js";

export default function Quotation() {
  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
          Tekliflerim
        </p>
      </div>

      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Link
            href={{
              pathname: "/order-module/quotation/form",
              query: {
                type: "create",
                id: "none",
              },
            }}
          >
            <Button variant="outlined" color={"success"}>
              Yeni Teklif
            </Button>
          </Link>
        </div>
        <TextField
          label="Teklif No."
          id="filled-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => handleFilters("account_id", e)}
        />
        <TextField
          label="Cari Kod"
          id="filled-start-adornment"
          onChange={(e) => handleFilters("account_title", e)}
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        {[
          { label: "Gün", views: ["day"], format: "DD" },
          { label: "Ay", views: ["month"], format: "MM" },
          { label: "Yıl", views: ["year"], format: "YYYY" },
        ].map((item, index) => {
          return (
            <TimePicker
              key={index}
              propLabels={item.label}
              propViews={item.views}
              propFormat={item.format}
            />
          );
        })}
      </div>

      <div className="lg:flex lg:flex-col shadow-xl">
        <Table columns={columns} rowdata={[]} count={0} setNPage={() => {}} />
      </div>
    </div>
  );
}
