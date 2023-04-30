"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loading from "../../../../../components/base/Loading";
import Alert from "../../../../../components/base/alert";
import { useSearchParams } from "next/navigation";
import AutoComplete from "../../../../../components/base/autocomplete";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isValid } from "../../../../valid";
import ProductionProductService from "../../../../../services/ProductionProductService";
import { delay } from "../../../../../app/utils";
export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
    casting_start: "",
    casting_stop: "",
    charge_number: "",
    extra_kg: "",
    iron: false,
    kwa_start: "",
    kwa_stop: "",
    loading_start: "",
    loading_stop: "",
    mangan: false,
    model_dims: "",
    n_piece: "",
    other: false,
    piece_kg: "",
    preparedBy: "",
    sawdust_kg: "",
    stop_description: "",
    stop_time: "",
    temperature: "",
    tin: false,
    zinc: false,
  });
  const [productType, setProductType] = useState({ title: "" });
  const [atelier, setAtelierType] = useState({ title: "" });
  const handleChange = (e, name) => {
    setFields((old) => {
      return { ...old, [name]: e.target.value };
    });
  };
  const handleChange2 = (e, name) => {
    setFields((old) => {
      return { ...old, [name]: e.target.checked };
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
      atelier: atelier?.title,
      type: productType?.title,
      WorkOrder_ID: id,
    };
    try {
      let res;
      if (type === "create") {
        res = await ProductionProductService.createProduct(data);
      } else {
        data["product_id"] = product_id;
        res = await ProductionProductService.updateProduct(data);
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
      a: atelier?.title === undefined ? "" : atelier?.title,
      b: productType?.title === undefined ? "" : productType?.title,
    };

    setValid(isValid(check_fields));
  }, [atelier?.title, fields, productType?.title]);
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
                    onChange={(e) => handleChange(e, "model_dims")}
                    value={fields?.model_dims || ""}
                    label="Kalıp Ölçüsü"
                    error={!valid}
                    helperText="Zorunlu Alan"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div>
                  <TextField
                    label="Dökülen Adet"
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
                  <AutoComplete
                    data={[{ title: "Savurma Döküm" }, { title: "El Kalıbı" }]}
                    setData={setProductType}
                    prevValue={productType}
                    valid={valid}
                    dropDownOptions={{ label: "Döküm Tipi" }}
                  />
                </div>
                <div>
                  <TextField
                    label="Adet KG"
                    type="number"
                    value={fields?.piece_kg || ""}
                    onChange={(e) => handleChange(e, "piece_kg")}
                    defaultValue={0}
                    helperText="Zorunlu Alan"
                    error={!valid}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div>
                  <TextField
                    label="İlave KG"
                    onChange={(e) => handleChange(e, "extra_kg")}
                    value={fields?.extra_kg || ""}
                    type="number"
                    error={!valid}
                    defaultValue={0}
                    helperText="Zorunlu Alan"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div>
                  <TextField
                    label="Talaş KG"
                    onChange={(e) => handleChange(e, "sawdust_kg")}
                    value={fields?.sawdust_kg || ""}
                    type="number"
                    defaultValue={0}
                    helperText="Zorunlu Alan"
                    error={!valid}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div>
                  <AutoComplete
                    data={[
                      { title: "İç Atölye" },
                      { title: "Dış atölye" },
                      { title: "Yok" },
                    ]}
                    setData={setAtelierType}
                    prevValue={atelier}
                    valid={valid}
                    dropDownOptions={{ label: "Atölye" }}
                  />
                </div>
                <div>
                  <TextField
                    label="Sıcaklık"
                    onChange={(e) => handleChange(e, "temperature")}
                    value={fields?.temperature || ""}
                    type="number"
                    variant="standard"
                    helperText="Zorunlu Alan"
                    fullWidth
                    error={!valid}
                  />
                </div>
                <div>
                  <TextField
                    label="KWA Baş."
                    onChange={(e) => handleChange(e, "kwa_start")}
                    value={fields?.kwa_start || ""}
                    variant="standard"
                    type="number"
                    error={!valid}
                    helperText="Zorunlu Alan"
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="KWA Bit."
                    onChange={(e) => handleChange(e, "kwa_stop")}
                    value={fields?.kwa_stop || ""}
                    variant="standard"
                    type="number"
                    helperText="Zorunlu Alan"
                    error={!valid}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="Şarj No."
                    onChange={(e) => handleChange(e, "charge_number")}
                    value={fields?.charge_number || ""}
                    variant="standard"
                    error={!valid}
                    type="number"
                    helperText="Zorunlu Alan"
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="Yükleme Baş. Zamanı"
                    onChange={(e) => handleChange(e, "loading_start")}
                    value={fields?.loading_start || ""}
                    variant="standard"
                    error={!valid}
                    helperText="Zorunlu Alan"
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="Yükleme Bit. Zamanı"
                    variant="standard"
                    onChange={(e) => handleChange(e, "loading_stop")}
                    value={fields?.loading_stop || ""}
                    error={!valid}
                    fullWidth
                    helperText="Zorunlu Alan"
                  />
                </div>
                <div>
                  <TextField
                    label="Döküm Baş. Zamanı"
                    variant="standard"
                    onChange={(e) => handleChange(e, "casting_start")}
                    value={fields?.casting_start || ""}
                    error={!valid}
                    fullWidth
                    helperText="Zorunlu Alan"
                  />
                </div>
                <div>
                  <TextField
                    label="Döküm Bit. Zamanı"
                    onChange={(e) => handleChange(e, "casting_stop")}
                    value={fields?.casting_stop || ""}
                    variant="standard"
                    error={!valid}
                    fullWidth
                    helperText="Zorunlu Alan"
                  />
                </div>
                <div>
                  <TextField
                    onChange={(e) => handleChange(e, "stop_time")}
                    value={fields?.stop_time || ""}
                    label="Durma Zamanı"
                    variant="standard"
                    error={!valid}
                    fullWidth
                    helperText="Zorunlu Alan"
                  />
                </div>
                <div>
                  <TextField
                    onChange={(e) => handleChange(e, "stop_description")}
                    value={fields?.stop_description || ""}
                    label="Durma Nedeni"
                    variant="standard"
                    error={!valid}
                    fullWidth
                    helperText="Zorunlu Alan"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleChange2(e, "tin")}
                        value={fields?.tin || ""}
                      />
                    }
                    label="Kalay"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleChange2(e, "mangan")}
                        value={fields?.mangan || ""}
                      />
                    }
                    label="Mangan"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleChange2(e, "iron")}
                        value={fields?.iron || ""}
                      />
                    }
                    label="Demir"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleChange2(e, "zinc")}
                        value={fields?.zinc || ""}
                      />
                    }
                    label="Çinko"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleChange2(e, "other")}
                        value={fields?.other || ""}
                      />
                    }
                    label="Diğer"
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
