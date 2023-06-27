"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loading from "../../../../components/base/Loading";
import Alert from "../../../../components/base/alert";
import { useSearchParams } from "next/navigation";
import AutoComplete from "../../../../components/base/autocomplete";
import { useRouter } from "next/navigation";
import { isValid } from "../../../valid";
import ProductionInventoryService from "../../../../services/ProductionInventoryService";
import { delay } from "../../../utils";
import {ITEM_TYPES, TYPE} from "../../../../utils/mappers";
export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [error, setError] = useState({
        isOpen: false,
        type: "info",
        message: "neden",
        title: "",
    });
    const [isLoading, setLoading] = useState(false);
    const type = searchParams.get("type");
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [fields, setFields] = useState({
        n_piece : ""
    });
    const [stockType, setStockType] = useState({ title: "" });
    const [stockName, setStockName] = useState({ title: "" });
    const handleChange = (e, name) => {
        setFields((old) => {
            return { ...old, [name]: e.target.value };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError({
            isOpen: true,
            type: "warning",
            message: "Kayıt Oluşturuluyor...",
            title: "Lütfen Bekleyiniz",
        });
        let data = {
            n_piece : type === "create" ? parseInt(fields.n_piece) : - parseInt(fields.n_piece),
            inventory_type : stockType?.title === "Atölye" ? "atelier" : "production",
            inventory_name : TYPE.filter(item => item.title === stockName?.title)[0].value,

        }
        try {
            let res = await ProductionInventoryService.updateInventory(data);
            if (res.status === 200) {
                setError({
                    isOpen: true,
                    type: "success",
                    message: "Kayıt Oluşturuldu !",
                    title: "Başarılı",
                });
                await delay(2000);
                router.back();
            }
        } catch (err) {
            setLoading(false);
            setError({
                isOpen: true,
                type: "error",
                message: "Kayıt Oluşturulamadı!",
                title: "Hata",
            });
        }
    };
    useEffect(() => {
        const check_fields = {
            ...fields,
            a: stockName?.title === undefined ? "" : stockName?.title,
            b: stockType?.title === undefined ? "" : stockType?.title,
        };

        setValid(isValid(check_fields));
    }, [stockName?.title, fields, stockType?.title]);

    useEffect(() => {
        if(type === "update") {

            ProductionInventoryService.getStockInfo({
                reference : id
            })
                .then(res => {
                    if(res.status === 200) {
                        setStockName({title : ITEM_TYPES[res.data.inventoryName]});
                        setStockType({title: res.data.inventoryType === "atelier" ? "Atölye" : "Ocak ve Dökümhane"})
                    }
                })
        }
    }, [])
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
                            {type === "create" ? "Yeni Kayıt" : "Kayıt Sil"}
                        </p>
                    </div>
                    <div className="rounded-md shadow-lg ">
                        <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
                            <div className="p-2">
                                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                                    Kayıt Bilgileri
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">

                                <div>
                                    <TextField
                                        label="Adet"
                                        onChange={(e) => handleChange(e, "n_piece")}
                                        type="number"
                                        helperText="Zorunlu Alan"
                                        error={!valid}
                                        fullWidth
                                        variant="standard"
                                    />
                                </div>
                                <div>
                                    <AutoComplete
                                        data={[{ title: "Atölye" }, { title: "Ocak ve Dökümhane" }]}
                                        setData={setStockType}
                                        prevValue={stockType}
                                        valid={valid}
                                        dropDownOptions={{ label: "Stok Tipi" }}
                                    />
                                </div>
                                <div>
                                    <AutoComplete
                                        data={[{ title: "Plaka" }, { title: "Düz Burç" }, {title: "Flanşlı Burç"}, {title: "Ortadan Flanşlı Burç"}, {title: "Çift Flanşlı Burç"}]}
                                        setData={setStockName}
                                        prevValue={stockName}
                                        valid={valid}
                                        dropDownOptions={{ label: "Stok İsmi" }}
                                    />
                                </div>


                            </div>
                            <div className="grid grid-cols-4 space-x-10 col-span-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!valid}
                                    className={`text-sm ${
                                        type === "create" ? "text-green-600" : "text-yellow-600"
                                    } border-2 ${
                                        type === "create" ? "border-green-600" : "border-yellow-600"
                                    } enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 ${
                                        type === "create"
                                            ? "enabled:hover:bg-green-700"
                                            : "enabled:hover:bg-yellow-700"
                                    } font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {type === "create" ? "OLUŞTUR" : "GÜNCELLE"}
                                </button>

                                <button
                                    onClick={() => router.back()}
                                    className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded"
                                >
                                    IPTAL
                                </button>
                            </div>
                            {!valid && (
                                <p className="text-lg font-rotobot tracking widest text-red-600">
                                    Tüm zorunlu alanlar doldurulmalıdır !
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loading />}
        </div>
    );
}
