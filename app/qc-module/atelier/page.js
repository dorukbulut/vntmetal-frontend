"use client";
import Table from "../../order-module/table";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { columns } from "./data.js";
import { useState, useEffect } from "react";
import QCService from "../../../services/QCService";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import useSWR from "swr";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from "../../../components/base/alert";

export default function Page() {
    const [data, setData] = useState();
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState();
    const [error, setError] = useState({
        isOpen: false,
        type: "info",
        message: "neden",
        title: "",
    });

    const handleQCChange = async (product_id, qcValue) => {
        console.log("clicked")
        try {
            const res = await QCService.setQCAtelier(product_id, qcValue);
            if (res.status === 200) {
                setError({
                    isOpen: true,
                    type: "success",
                    message: "Kalite Kontrol Bilgisi kayedildi!",
                    title: "Başarılı",
                });
            }
        } catch (err) {
            setError({
                isOpen: true,
                type: "error",
                message: "Bilgi Kayedilemedi !",
                title: "Hata",
            });
        }
    }
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

            QCService.getFilteredDataAtelier(params)
                .then((res) => {
                    if (res.status === 200) {
                        const new_data = {
                            count: res.data.count,
                            rows: res.data.rows.map((item, index) => {
                                return {
                                    reference: item.productheader.reference + "-" + item.product.step,
                                    step: item.step,
                                    isQC: item.isQC === "pending" ? <Chip label="Bekliyor" color="warning" /> : item.isQC === "accepted" ?  <Chip label="Onaylandı" color="success" /> : <Chip label="Red" color="error" />,
                                    options: (
                                        <div className="">
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel>İşlem</InputLabel>
                                                <Select sx={{ padding: "2px" }}>
                                                    <div className="p-2">
                                                        <Button
                                                            onClick={(e, atelier_id = item.atelier_id, qcValue="accepted") =>
                                                                handleQCChange(atelier_id, qcValue)
                                                            }
                                                            variant="outlined"
                                                            color={"success"}
                                                        >
                                                            Onay
                                                        </Button>
                                                    </div>
                                                    <div className="p-2">
                                                        <Button
                                                            onClick={(e, atelier_id = item.atelier_id, qcValue="pending") =>
                                                                handleQCChange(atelier_id, qcValue)
                                                            }
                                                            variant="outlined"
                                                            color={"warning"}
                                                        >
                                                            Beklemeye Al
                                                        </Button>
                                                    </div>
                                                    <div className="p-2">
                                                        <Button
                                                            onClick={(e, atelier_id = item.atelier_id, qcValue="rejected") =>
                                                                handleQCChange(atelier_id, qcValue)
                                                            }
                                                            variant="outlined"
                                                            color={"error"}
                                                        >
                                                            Red
                                                        </Button>
                                                    </div>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    ),
                                };
                            }),
                        };
                        setData(new_data);
                    }
                })
                .catch((err) => {});
        } else {
            QCService.getPageAtelier(page).then((res) => {
                if (res.status === 200) {
                    const new_data = {
                        count: res.data.count,
                        rows: res.data.rows.map((item, index) => {
                            return {
                                reference: item.productheader.reference + "-" + item.product.step,
                                step: item.step,
                                isQC: item.isQC === "pending" ? <Chip label="Bekliyor" color="warning" /> : item.isQC === "accepted" ?  <Chip label="Onaylandı" color="success" /> : <Chip label="Red" color="error" />,
                                options: (
                                    <div className="">
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>İşlem</InputLabel>
                                            <Select sx={{ padding: "2px" }}>
                                                <div className="p-2">
                                                    <Button
                                                        onClick={(e, atelier_id = item.atelier_id, qcValue="accepted") =>
                                                            handleQCChange(atelier_id, qcValue)
                                                        }
                                                        variant="outlined"
                                                        color={"success"}
                                                    >
                                                        Onay
                                                    </Button>
                                                </div>
                                                <div className="p-2">
                                                    <Button
                                                        onClick={(e, atelier_id = item.atelier_id, qcValue="pending") =>
                                                            handleQCChange(atelier_id, qcValue)
                                                        }
                                                        variant="outlined"
                                                        color={"warning"}
                                                    >
                                                        Beklemeye Al
                                                    </Button>
                                                </div>
                                                <div className="p-2">
                                                    <Button
                                                        onClick={(e, atelier_id = item.atelier_id, qcValue="rejected") =>
                                                            handleQCChange(atelier_id, qcValue)
                                                        }
                                                        variant="outlined"
                                                        color={"error"}
                                                    >
                                                        Red
                                                    </Button>
                                                </div>
                                            </Select>
                                        </FormControl>
                                    </div>
                                ),
                            };
                        }),
                    };
                    setData(new_data);
                }
            });
        }
    });
    const router = useRouter();
    return (
        <div className="w-full h-full space-y-10">
            <Alert error={error} />
            <div>
                <p className="text-2xl flex text-center text-purple-700 tracking widest font-roboto">
                    Atölye
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
