"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "next/navigation";
import { customerInputInfo, taxInputInfo, adressInputInfo } from "./form/data";
import { isValid } from "../../valid";
export default function CustomerForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [fields, setFields] = useState({
    customer: {
      account_id: "",
      account_title: "",
      account_related: "",
      account_IN: 0,
      account_tel1: "",
      account_tel2: "",
      account_fax: "",
      account_email: "",
      account_webSite: "",
      account_KEP: "",
    },
    taxinfo: {
      tax_info_taxID: 0,
      tax_info_Admin: "",
      tax_info_AdminID: 0,
    },

    adressinfo: {
      customer_Address: "",
      customer_bID: 0,
      customer_bName: "",
      customer_dID: 0,
      customer_town: "",
      customer_district: "",
      customer_city: "",
      customer_country: "",
      customer_UAVT: 0,
      customer_postal: 0,
    },
  });
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const check_valid = {
      a: fields.customer.account_id,
      b: fields.customer.account_title,
      c: fields.customer.account_related,
    };
    setValid(isValid(check_valid));
  }, [fields]);
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
      <div>
        <p
          className={`text-2xl flex text-center ${
            type === "create" ? "text-green-600" : "text-yellow-600"
          } tracking widest font-roboto text-md"`}
        >
          {type === "create" ? "Yeni Müşteri" : "Müşteri Güncelle"}
        </p>
      </div>
      <div className="rounded-md shadow-lg ">
        <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
          <div className="p-2">
            <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
              Cari Hesap Bilgileri
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
            {customerInputInfo.map((item, index) => {
              return item.isRequired ? (
                <TextField
                  error={!valid}
                  key={index}
                  id="standard-helperText"
                  label={item.name}
                  defaultValue=""
                  variant="standard"
                  helperText="Zorunlu Alan"
                  type={item.type}
                  onChange={(e) => handleChange(item.field, item.area, e)}
                />
              ) : (
                <TextField
                  key={index}
                  id="standard-helperText"
                  label={item.name}
                  defaultValue=""
                  variant="standard"
                  type={item.type}
                  onChange={(e) => handleChange(item.field, item.area, e)}
                />
              );
            })}
          </div>

          <div className="p-2">
            <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
              Vergi Dairesi Bilgileri
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10  p-2 rounded-lg">
            {taxInputInfo.map((item, index) => {
              return (
                <TextField
                  key={index}
                  id="standard-helperText"
                  label={item.name}
                  defaultValue=""
                  variant="standard"
                  type={item.type}
                  onChange={(e) => handleChange(item.field, item.area, e)}
                />
              );
            })}
          </div>

          <div className="p-2">
            <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
              Adres Bilgileri
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10  p-2 rounded-lg  ">
            {adressInputInfo.map((item, index) => {
              return (
                <TextField
                  key={index}
                  id="standard-helperText"
                  label={item.name}
                  defaultValue=""
                  variant="standard"
                  type={item.type}
                  onChange={(e) => handleChange(item.field, item.area, e)}
                />
              );
            })}
            <div className="grid grid-cols-4 space-x-10 col-span-2">
              <button
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

              <button className="text-red-600 border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
                IPTAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
