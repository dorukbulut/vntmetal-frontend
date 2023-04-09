"use client";
import Table from "../table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { columns } from "./data";
import { useState, useEffect } from "react";
import CustomerService from "../../../services/CustomerService";
import { formatData } from "./utils";
export default function Page() {
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState();
  const handleFilters = (field, e) => {
    setFilters((old) => {
      return {
        ...old,
        [field]: e.target.value,
      };
    });
  };
  useEffect(() => {
    CustomerService.getDefaultData().then((res) => {
      if (res.status === 200) {
        const new_data = {
          count: res.data.count,
          rows: formatData(res.data.rows),
        };
        setData(new_data);
      }
    });
  }, []);

  useEffect(() => {
    if (filters) {
      const params = {
        account_id:
          filters.account_id !== undefined && filters.account_id !== ""
            ? filters.account_id
            : undefined,
        account_title:
          filters.account_title !== undefined && filters.account_title !== ""
            ? filters.account_title.replaceAll(" ", "+")
            : undefined,
        account_related:
          filters.account_related !== undefined &&
          filters.account_related !== ""
            ? filters.account_related.replaceAll(" ", "+")
            : undefined,
      };
      CustomerService.getFilteredData(params)
        .then((res) => {
          if (res.status === 200) {
            const new_data = {
              count: res.data.count,
              rows: formatData(res.data.rows),
            };
            setData(new_data);
          }
        })
        .catch((err) => {});
    }
  }, [filters]);

  useEffect(() => {
    CustomerService.getPage(parseInt(page))
      .then((res) => {
        if (res.status === 200) {
          const new_data = {
            count: res.data.count,
            rows: formatData(res.data.rows),
          };
          setData(new_data);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
          Müşterilerim
        </p>
      </div>
      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Link
            href={{
              pathname: "/order-module/customer/form",
              query: {
                type: "create",
                id: "none",
              },
            }}
          >
            <Button variant="outlined" color={"success"}>
              Yeni Müşteri
            </Button>
          </Link>
        </div>
        <TextField
          label="Cari Kod"
          id="filled-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          type="number"
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
          label="Cari Ünvan"
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
        <TextField
          label="İlgili Kişi"
          onChange={(e) => handleFilters("account_related", e)}
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
        />
      </div>
      <div className="lg:flex lg:flex-col shadow-xl">
        <Table
          columns={columns}
          rowdata={data?.rows}
          count={parseInt(data?.count)}
          setNPage={setPage}
        />
      </div>
    </div>
  );
}
