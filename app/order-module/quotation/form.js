"use client";
import Loading from "../../../components/base/Loading";
import SetItem from "../../../components/Dashboards/general/forms/QuotationForms/Forms/SetQuotationItem";
import TextField from "@mui/material/TextField";
import {
  setValues,
  clearResults,
  setCust,
} from "../../GlobalRedux/Features/Quotation/quotationSlice";
import {
  QuotationInfo,
  PreparedData,
  TransPortdata,
  TransPortDataExtra,
} from "./form/data";
import AutoComplete from "../../../components/base/autocomplete";
import { useEffect, useState } from "react";
import { isValid } from "../../valid";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
export default function QuotationForm({ customers, prevValue, dispatch }) {
  const { customer } = prevValue;
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [all, setAll] = useState([]);
  const [valid, setValid] = useState(false);
  const [Customer_ID, setCustomer] = useState({
    title: customer,
  });
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState({ ...prevValue.fields });
  useEffect(() => {}, []);
  useEffect(() => {
    dispatch(setValues(fields));
    dispatch(setCust(Customer_ID?.title || ""));
    const check_valid = {
      a: Customer_ID?.title === undefined ? "" : Customer_ID?.title,
      b: fields?.options?.customerInquiryNum,
    };
    setValid(isValid(check_valid));
  }, [fields, Customer_ID?.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearResults());
    console.log(fields);
    console.log(Customer_ID?.title);
  };
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
  return (
    <div className="w-full h-full flex flex-col space-y-5">
      {!isLoading && (
        <div className="space-y-5">
          <div>
            <p
              className={`text-2xl flex text-center ${
                type === "create" ? "text-green-600" : "text-yellow-600"
              } tracking widest font-roboto text-md"`}
            >
              {type === "create"
                ? "Yeni Teklif Formu"
                : "Teklif Formu Güncelle"}
            </p>
          </div>
          <div className="rounded-md shadow-lg ">
            <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Müşteri Bilgileri
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                <AutoComplete
                  data={customers}
                  setData={setCustomer}
                  prevValue={Customer_ID}
                  valid={valid}
                  dropDownOptions={{ label: "Cari Kod" }}
                />
                <TextField
                  id="standard-helperText"
                  label={"Müşteri Referans No."}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.options?.customerInquiryNum || ""}
                  type={"text"}
                  error={!valid}
                  onChange={(e) =>
                    handleChange("options", "customerInquiryNum", e)
                  }
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Ürün Bilgileri
                </p>
              </div>
              <div className="grid grid-col-4 gap-5 rounded-lg">
                <SetItem
                  fields={{ options: { Customer_ID: Customer_ID?.title } }}
                  setAll={setAll}
                  url={type === "create" ? "get" : "getitems"}
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Teslimat Detayları
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {TransPortdata.map((item, index) => {
                  if (item.type === "dropdown") {
                    return (
                      <AutoComplete
                        key={index}
                        data={item.data}
                        dropDownOptions={{ label: item.name }}
                      />
                    );
                  } else
                    return (
                      <TextField
                        key={index}
                        id="standard-helperText"
                        label={item.name}
                        variant="standard"
                        type={item.type}
                      />
                    );
                })}
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Yurt Dışı Teslimat Detayları
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {TransPortDataExtra.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      id="standard-helperText"
                      label={item.name}
                      variant="standard"
                      type={item.type}
                    />
                  );
                })}
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Teklif Detayları
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {QuotationInfo.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      multiline
                      rows={3}
                      id="standard-helperText"
                      label={item.name}
                      variant="standard"
                      type={item.type}
                    />
                  );
                })}
                <AutoComplete
                  data={[{ title: "İngilizce" }, { title: "Türkçe" }]}
                  dropDownOptions={{ label: "Form Dili" }}
                />
                <AutoComplete
                  data={[{ title: "VNT" }, { title: "Bilgesin" }]}
                  dropDownOptions={{ label: "Şirket" }}
                />
                {PreparedData.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      id="standard-helperText"
                      label={item.name}
                      variant="standard"
                      helperText="Zorunlu Alan"
                      type={item.type}
                    />
                  );
                })}
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
                  <Link href={"/order-module/quotation"} passHref>
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
