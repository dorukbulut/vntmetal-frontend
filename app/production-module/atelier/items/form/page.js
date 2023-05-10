"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loading from "../../../../../components/base/Loading";
import Alert from "../../../../../components/base/alert";
import { useSearchParams } from "next/navigation";
import AutoComplete from "../../../../../components/base/autocomplete";
import { useRouter } from "next/navigation";
import { isValid } from "../../../../valid";
import ProductionAtelierService from "../../../../../services/ProductionAtelierService";
import { delay } from "../../../../../app/utils";
export default function Page() {
  const searchParams = useSearchParams();
  const header_id = searchParams.get("id");
  const product_id = searchParams.get("product_id");
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
    atelier_dims: "",
    n_piece : "",
    total_kg : "",
    preparedBy : "",
  });

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
      ...fields,
      ProductHeader_ID: header_id,
      Product_ID : product_id,
    };
    try {
      let res;
      if (type === "create") {
        res = await ProductionAtelierService.createProduct(data);
      } else {
        data["product_id"] = product_id;
        res = await ProductionAtelierService.updateProduct(data);
      }
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
        message: "Kayıt Oluşturulamadı !",
        title: "Hata",
      });
    }
  };
  useEffect(() => {
    const check_fields = {
      ...fields,
    };

    setValid(isValid(check_fields));
  }, [fields]);
  useEffect(() => {
    if (type === "update") {
      ProductionProductService.getByID(product_id)
        .then((res) => {
          const data = res.data;
          setAtelierType({ title: data.atelier });
          setProductType({ title: data.type });

          delete data.product_id;
          delete data.ProductHeader_ID;
          delete data.type;
          delete data.atelier;
          setFields((old) => {
            return {
              ...data,
            };
          });
        })
        .catch((err) => console.log);
    }
  }, []);
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
              {type === "create" ? "Yeni Kayıt" : "Kayıt Güncelle"}
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
                    onChange={(e) => handleChange(e, "atelier_dims")}
                    value={fields?.atelier_dims || ""}
                    label="İşleme Ölçüsü"
                    error={!valid}
                    helperText="Zorunlu Alan"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div>
                  <TextField
                    label="İşlenen Adet"
                    onChange={(e) => handleChange(e, "n_piece")}
                    value={fields?.n_piece || ""}
                    type="number"
                    helperText="Zorunlu Alan"
                    error={!valid}
                    fullWidth
                    variant="standard"
                  />
                </div>

                <div>
                  <TextField
                    label="Tartılan KG"
                    type="number"
                    value={fields?.total_kg || ""}
                    onChange={(e) => handleChange(e, "total_kg")}
                    defaultValue={0}
                    helperText="Zorunlu Alan"
                    error={!valid}
                    fullWidth
                    variant="standard"
                  />
                </div>

                <div>
                  <TextField
                    label="Dolduran"
                    onChange={(e) => handleChange(e, "preparedBy")}
                    value={fields?.preparedBy || ""}
                    variant="standard"
                    error={!valid}
                    helperText="Zorunlu Alan"
                    fullWidth
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
