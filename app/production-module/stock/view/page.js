"use client"
import Button from "@mui/material/Button";
import Alert from "../../../../components/base/alert";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TimePicker from "../../../../components/base/timepicker";
import Table from "../../../order-module/table";
import {ITEM_TYPES} from "../../../../utils/mappers";
import { useSearchParams } from "next/navigation";

export default function Page() {

    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    const handleFilters = (field, e) => {
        setFilters((old) => {
            return {
                ...old,
                [field]: e.target.value,
            };
        });
    };
    return (
        <div className="w-full h-full space-y-10">
            <div>
                <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
                    {type === "atelier" ? "Atölye" : "Ocak ve Dökümhane"}
                </p>
                <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
                    {ITEM_TYPES[name]} Stok Bilgileri
                </p>
            </div>

            <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
                <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
                    <Link
                        href={{
                            pathname: "/production-module/stock",
                        }}
                    >
                        <Button variant="outlined" color={"error"}>
                            Geri
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">

                    <Link
                        href={{
                            pathname: "/order-module/work-order/form",
                            query: {
                                type: "create",
                                id: "none",
                            },
                        }}
                    >
                        <Button variant="outlined" color={"success"}>
                            Yeni Kayıt
                        </Button>
                    </Link>
                </div>

                <TextField
                    label="İş Emri No."
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
                <TextField
                    label="Cari Kod"
                    type="number"
                    id="filled-start-adornment"
                    onChange={(e) => handleFilters("account_id", e)}
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
                            setData={handleFilters}
                        />
                    );
                })}
            </div>

            <div className="lg:flex lg:flex-col shadow-xl">
                <Table
                    columns={[]}
                    rowdata={[]}
                    count={0}
                    setNPage={() => {}}
                />
            </div>
        </div>
    );
}
