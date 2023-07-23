"use client";
import Table from "../../order-module/table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import {columns} from "./data";
import useSWR from "swr";
import { formatData } from "./utils";
import CustomerService from "../../../services/CustomerService";

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

    const { data1 } = useSWR(() => {
        if (filters) {
            const params = {
                account_id:
                    filters.account_id !== undefined && filters.account_id !== ""
                        ? filters.account_id
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
        } else {
            CustomerService.getPage(page).then((res) => {
                if (res.status === 200) {
                    const new_data = {
                        count: res.data.count,
                        rows: formatData(res.data.rows),
                    };
                    setData(new_data);
                }
            });
        }
    });

    return (
        <div className="w-full h-full space-y-10">
            <div>
                <p className="text-2xl flex text-center text-green-600 tracking widest font-roboto">
                    Müşterilerim
                </p>
            </div>
            <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
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
