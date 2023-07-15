"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Alert from "../../../../components/base/alert";
import SearchableSelect from "../../../../components/base/SearchableSelect";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Loading from "../../../../components/base/Loading";
import ShipmentPackagingService from "../../../../services/ShipmentPackagingService";
export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
    const [fields, setFields] = useState({
        options: {
            Item_ID: "",
            type: "",
            plate_model_size: "",
            treatment_size: "",
            reference: "",
            company: "",
        },
    });
  const id = searchParams.get("id");
    const [error, setError] = useState({
        isOpen: false,
        type: "info",
        message: "neden",
        title: "",
    });
    const [isLoading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);


    const [customers, setCustomers] = useState([]);

    return (
        <div className="w-full h-full flex flex-col space-y-5">
            <Alert error={error} />
            {!isLoading && (
                <div className="space-y-5">
                    <div>
                        <p
                            className={`text-2xl flex text-center ${
                                type === "create" ? "text-green-600" : "text-yellow-600"
                            } tracking widest font-roboto text-md"`}
                        >
                            {type === "create" ? "Yeni Paket" : "Paket Bilgilerini Güncelle"}
                        </p>
                    </div>
                    <div className="rounded-md shadow-lg ">
                        <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
                            <div className="p-2">
                                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                                    Form Bilgileri
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">

                                <TextField
                                    error={!valid}
                                    label={"Paket Açıklaması"}
                                    value={""}
                                    variant="standard"
                                    helperText="Zorunlu Alan"
                                    type={"text"}
                                    onChange={(e) => {}}
                                />

                                {type === "create" ? (
                                    <SearchableSelect name={"reference"} Service={ShipmentPackagingService} ac={"reference"} val={"workorder_ID"}/>
                                ) : (
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                        value={""}
                                        label="Cari Kod"
                                    />
                                )}

                            </div>



                            <div className="grid grid-cols-1 gap-10  p-2 rounded-lg ">
                                <div className="grid grid-cols-4 space-x-10 col-span-2">
                                    <button
                                        onClick={() => {}}
                                        disabled={!valid}
                                        className={`text-sm ${
                                            type === "create" ? "text-green-600" : "text-yellow-600"
                                        } border-2 ${
                                            type === "create"
                                                ? "border-green-600"
                                                : "border-yellow-600"
                                        } enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 ${
                                            type === "create"
                                                ? "enabled:hover:bg-green-700"
                                                : "enabled:hover:bg-yellow-700"
                                        } font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {type === "create" ? "OLUŞTUR" : "GÜNCELLE"}
                                    </button>
                                    <Link href={"/order-module/work-order"} passHref>
                                        <button className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
                                            IPTAL
                                        </button>
                                    </Link>
                                </div>
                                {!valid && (
                                    <p className="text-lg font-rotobot tracking widest text-red-600">
                                        Tüm zorunlu alanlar doldurulmalıdır !
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loading />}
        </div>
    );
}
