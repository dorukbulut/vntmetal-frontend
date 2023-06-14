"use client";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Table from "../../order-module/table";
import {columns} from "./data";
import {useState} from "react";
import useSWR from "swr";
import ProductionInventoryService from "../../../services/ProductionInventoryService";
import {ITEM_TYPES} from "../../../utils/mappers";
import Chip from "@mui/material/Chip";
import Action from "../../../components/base/action";
import EditIcon from "@mui/icons-material/Edit";

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

                reference:
                    filters.reference !== undefined && filters.reference !== ""
                        ? filters.reference.replaceAll(" ", "+")
                        : undefined,
            };

            ProductionInventoryService.getFilteredData(params)
                .then((res) => {
                    if (res.status === 200) {
                        const new_data = {
                            count: res.data.count,
                            rows: res.data.rows.map((item, index) => {
                                return {
                                    reference: item.reference,
                                    inventoryType: item.inventoryType === "atelier" ? "Atölye" : "Ocak ve Dökümhane",
                                    inventoryName : ITEM_TYPES[item.inventoryName],
                                    n_remaining : item.n_remaining,
                                    updatedAt : new Date(item.updatedAt).toISOString().slice(0, 10),
                                    options: [
                                        <Action
                                            key={index}
                                            preference={{
                                                name: "Düzenle",
                                                action: [
                                                    {
                                                        name: "Görüntüle",
                                                        pathname: "/production-module/stock/view",
                                                        query: {
                                                            id : item.header_id,
                                                            type: item.inventoryType,
                                                            name: item.inventoryName,
                                                        },
                                                    },
                                                ],
                                            }}
                                        >
                                            <EditIcon />
                                        </Action>,
                                    ],
                                };
                            }),
                        };
                        setData(new_data);
                    }
                })
                .catch((err) => {});
        } else {
            ProductionInventoryService.getPage(page).then((res) => {
                if (res.status === 200) {
                    const new_data = {
                        count: res.data.count,
                        rows: res.data.rows.map((item, index) => {
                            return {
                                reference: item.reference,
                                inventoryType: item.inventoryType === "atelier" ? "Atölye" : "Ocak ve Dökümhane",
                                inventoryName : ITEM_TYPES[item.inventoryName],
                                n_remaining : item.n_remaining,
                                updatedAt : new Date(item.updatedAt).toISOString().slice(0, 10),
                                options: [
                                    <Action
                                        key={index}
                                        preference={{
                                            name: "Düzenle",
                                            action: [
                                                {
                                                    name: "Görüntüle",
                                                    pathname: "/production-module/stock/view",
                                                    query: {
                                                        id : item.header_id,
                                                        type: item.inventoryType,
                                                        name: item.inventoryName,
                                                    },
                                                },
                                            ],
                                        }}
                                    >
                                        <EditIcon />
                                    </Action>,
                                ],
                            };
                        }),
                    };
                    setData(new_data);
                }
            });
        }
    });
    return (
        <div className="w-full h-full space-y-10">
            <div>
                <p className="text-2xl flex text-center text-yellow-600 tracking widest font-roboto">
                    Stok Bilgileri
                </p>
            </div>
            <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
                <TextField
                    label="Stok Numarası"
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
                    onChange={(e) => handleFilters("reference", e)}
                />

            </div>
            <div className="lg:flex lg:flex-col shadow-xl">
                <Table
                    columns={columns}
                    rowdata={data?.rows}
                    count={data?.count}
                    setNPage={setPage}
                />
            </div>
        </div>
    );
}
