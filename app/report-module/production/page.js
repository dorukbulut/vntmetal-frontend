"use client";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "../../order-module/table";
import { columns } from "./data.js";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Action from "../../../components/base/action";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import ReportProductionService from "../../../services/ReportProductionService";
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
        if(filters?.reference === '') {
            setFilters(undefined)
        }
        if (filters) {
            const params = {
                reference:
                    filters.reference !== undefined && filters.reference !== ""
                        ? filters.reference.replaceAll(" ", "+")
                        : undefined,
            };

            ReportProductionService.getFilteredData(params)
                .then((res) => {
                    if (res.status === 200) {

                        const new_data = {
                            count: res.data.count,
                            rows: res.data.rows.map((item, index) => {
                                const date = new Date(item.createdAt);
                                console.log(item)
                                return {
                                    reference: item.reference,
                                    workorder : item.work_order?.reference + "-REV-" + item.work_order?.revision,
                                    customer : item.work_order.Customer_ID,
                                    saleorder : item.work_order.sale_confirmation.reference + "-REV-" + item.work_order.sale_confirmation.revision,
                                    quotorder : item.work_order.sale_confirmation.quotation_form.reference + "-REV-" + item.work_order.sale_confirmation.quotation_form.revision,
                                    product_status: !item.isFinished ? (
                                        <Chip label="Devam ediyor" color="warning" />
                                    ) : (
                                        <Chip label="Bitti" color="success" />
                                    ),
                                    n_piece: item.n_piece,
                                    atelier_status: !item.isAtelierFinished ? (
                                        <Chip label="Devam ediyor" color="warning" />
                                    ) : (
                                        <Chip label="Bitti" color="success" />
                                    ),
                                    shipment_status: !item.isShipmentFinished ? (
                                        <Chip label="Devam ediyor" color="warning" />
                                    ) : (
                                        <Chip label="Bitti" color="success" />
                                    ),

                                };
                            }),
                        };
                        setData(new_data);
                    }
                })
                .catch((err) => {});
        } else {
            ReportProductionService.getPage(page).then((res) => {
                if (res.status === 200) {
                    const new_data = {
                        count: res.data.count,
                        rows: res.data.rows.map((item, index) => {
                            const date = new Date(item.createdAt);
                            console.log(item)
                            return {
                                reference: item.reference,
                                workorder : item.work_order?.reference + "-REV-" + item.work_order?.revision,
                                customer : item.work_order.Customer_ID,
                                saleorder : item.work_order.sale_confirmation.reference + "-REV-" + item.work_order.sale_confirmation.revision,
                                quotorder : item.work_order.sale_confirmation.quotation_form.reference + "-REV-" + item.work_order.sale_confirmation.quotation_form.revision,
                                product_status: !item.isFinished ? (
                                    <Chip label="Devam ediyor" color="warning" />
                                ) : (
                                    <Chip label="Bitti" color="success" />
                                ),
                                n_piece: item.n_piece,
                                atelier_status: !item.isAtelierFinished ? (
                                    <Chip label="Devam ediyor" color="warning" />
                                ) : (
                                    <Chip label="Bitti" color="success" />
                                ),
                                shipment_status: !item.isShipmentFinished ? (
                                    <Chip label="Devam ediyor" color="warning" />
                                ) : (
                                    <Chip label="Bitti" color="success" />
                                ),

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
                <p className="text-2xl flex text-center text-green-600 tracking widest font-roboto">
                    Döküm Özeti
                </p>
            </div>
            <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
                <TextField
                    label="Döküm No."
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
