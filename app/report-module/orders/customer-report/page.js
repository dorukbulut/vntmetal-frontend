"use client";
import { useSearchParams } from "next/navigation";
import {useState} from "react"
import useSWR from "swr";
import ReportOrdersService from "../../../../services/ReportOrdersService";
import TextField from "@mui/material/TextField";
import {ITEM_TYPES} from "../../../../utils/mappers";
export default function Page() {
    const searchParams = useSearchParams();
    const customer = searchParams.get("customer");
    const [data, setData] = useState({})

    const {dat11} = useSWR(() => {
        ReportOrdersService.getCustomerReport({
            Customer_ID : customer
        })
            .then(res => {
                if (res.status === 200){
                    setData(res.data)
                }
            })
    });
    return (
        <div className="w-full h-full flex flex-col space-y-5">
            <div className="space-y-5">
                <div>
                    <p
                        className={`text-2xl flex text-center text-green-600 tracking widest font-roboto text-md"`}
                    >
                        Müşteri Raporu
                    </p>
                </div>
                <div className="rounded-md shadow-lg ">
                    <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
                        <div className="p-2">
                            <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                                Rapor
                            </p>
                        </div>
                        <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={customer}
                                label="Cari Kod"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.customer?.account_title || ""}
                                label="Müşteri İsmi"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.customer?.account_related || ""}
                                label="İlgili Kişi"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_quotations || ""}
                                label="Toplam Teklif"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_productionorders || ""}
                                label="Toplam İş Emri"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_quotation_revisions || ""}
                                label="Toplam Teklif (Revizyon)"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_sales_revisions || ""}
                                label="Toplam Satış Onayı (Revizyon)"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_workorder_revisions || ""}
                                label="Toplam İş Emri (Revizyon)"
                            />

                        </div>
                        <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.itemTypeCounts?.total || ""}
                                label="Toplam Üretim Miktarı"
                            />
                            {
                                Object.keys(ITEM_TYPES).map((item, index) => {
                                    return <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        key={index}
                                        variant="standard"
                                        value={data?.itemTypeCounts?.[item] || 0}
                                        label={`Toplam üretilen ${ITEM_TYPES[item]} Sayısı`}
                                    />
                                })
                            }

                        </div>
                        <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_sales?.["$"] || 0}
                                label="Toplam Kazanç($)"
                            />
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_sales?.["€"] || 0}
                                label="Toplam Kazanç (€)"
                            />

                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                value={data?.total_sales?.["₺"] || 0}
                                label="Toplam Kazanç (₺)"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

