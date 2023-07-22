"use client";
import {useRouter, useSearchParams} from "next/navigation";
import { useState, useEffect } from "react";
import Alert from "../../../../../components/base/alert";
import TextField from "@mui/material/TextField";
import SearchableBox from "../../../../../components/base/SearchableSelect"
import Link from "next/link";
import Loading from "../../../../../components/base/Loading";
import ShipmentPackagingService from "./../../../../../services/ShipmentPackagingService";
import {isValid} from "../../../../valid";
import {delay} from "../../../../utils";
import ShipmentCustomerService from "../../../../../services/ShipmentCustomerService";
export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");
  const n_piece = searchParams.get("n_piece");
  const [fields, setFields] = useState({
    options: {
      total_kg : "",
    },
  });
  const [packageNum, setPackageNumber] = useState("");
  const id = searchParams.get("id");
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const handleChange = (area, field, e) => {
    setFields((old) => {
      return {
        ...old,
        [area]: {
          ...old[area],
          [field]: e.target.value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Sevkiyat Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });
    let data = {
      total_kg : fields.options.total_kg,
      n_piece : n_piece,
      WorkOrder_ID : id,
      packageReference : packageNum,
      productId : productId,
    };

    try {
      let res;
      if (type === "create") {
        res = await ShipmentCustomerService.create(data);
      } else {

      }
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Sevkiyat Oluşturuldu !",
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
        message: "Kayıt Oluşturulamadı !",
        title: "Hata",
      });
    }
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Paket Siliniyor...",
      title: "Lütfen Bekleyiniz",
    });
    let data = {
      package_id : id
    };

    try {
      let res = await ShipmentPackagingService.deletePackage(data)
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Paket Silindi !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(`/shipment-module/packaging`);
      }
    } catch (err) {
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Bir hata ile karşılaşıldı !",
        title: "Hata",
      });
    }
  };

  useEffect(() => {
    const check_fields = {
      ...fields.options,
      a : packageNum
    }
    setValid(isValid(check_fields));
  }, [fields, packageNum])

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
                  {type === "create" ? "Sevk Bilgileri" : "Sevk Bilgileri"}
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
                        label={"Paket ağırlığı (kg)"}
                        value={fields.options.total_kg || ""}
                        variant="standard"
                        helperText="Zorunlu Alan"
                        type={"number"}
                        onChange={(e) => handleChange("options", "total_kg",e)}
                    />

                  </div>

                  <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                    <div className={"flex flex-col gap-5"}>
                      <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                        Paket Numarası
                      </p>
                      <SearchableBox set={setPackageNumber} Service={ShipmentCustomerService} name={"reference"} />
                    </div>


                  </div>



                  <div className="grid grid-cols-1 gap-10  p-2 rounded-lg ">
                    <div className="grid grid-cols-4 space-x-10 col-span-2">
                      <button
                          onClick={handleSubmit}
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
                      <button onClick={() => {router.back()}} className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
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
            </div>
        )}
        {isLoading && <Loading />}
      </div>
  );
}
