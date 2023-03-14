"use client";
import Table from "../table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { columns } from "./data";
import TimePicker from "../../../components/base/timepicker.js";

export default function Quotation() {
  //TODO : Filters Tab with CustomerID, Quotation Reference, Day, month, year
  //TODO : Display Table
  //TODO : Create Quotation Form : GET ONLY unused quotation items list
  //TODO : Update Quotation Form : GET unused and used
  //TODO : Create Quotation Items
  //TODO : Update Quotation Items
  //TODO : Create Filter Component and Apply to Customers too

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
            <AddBoxIcon
              color="success"
              sx={{ width: "2.75rem", height: "2.75rem" }}
            />
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
