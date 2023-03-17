"use client";
import DropDown from "../../../../../base/autocomplete";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { isValid } from "../../../../../../app/valid";

export default function Contracted({
  CUSTOMER,
  TYPE,
  ANALYZE,
  prevValues,
  getCalcRaw,
  type,
}) {
  //state

  const [Customer_ID, setCustomer] = useState({
    title:
      "account_id" in prevValues.values ? prevValues.values.account_id : "",
  });
  const [Analyze_ID, setAnalyze] = useState({
    title:
      "analyze_Name" in prevValues.values ? prevValues.values.analyze_Name : "",
  });
  const [itemType, setType] = useState({
    title: "type" in prevValues.values ? prevValues.values.type : "",
  });

  const [fields, setFields] = useState({
    calc_raw: {
      usd: "usd" in prevValues.values ? prevValues.values.usd : "",
      euro: "euro" in prevValues.values ? prevValues.values.euro : "",
      kgPrice: "kgPrice" in prevValues.values ? prevValues.values.kgPrice : "",
    },
  });
  const [valid, setValid] = useState(false);

  //handlers

  const handleChange = (field, area, e) => {
    setFields((old) => {
      return {
        calc_raw: {
          ...old.calc_raw,
          [area]: e.target.value,
        },
      };
    });
  };

  //hooks

  useEffect(() => {
    const check_valid = {
      a:
        Customer_ID?.title === undefined || Customer_ID?.title === null
          ? ""
          : Customer_ID?.title,
      b:
        Analyze_ID?.title === undefined || Analyze_ID?.title === null
          ? ""
          : Analyze_ID?.title,
      c:
        itemType?.title === undefined || itemType?.title === null
          ? ""
          : itemType?.title,
      ...fields.calc_raw,
    };
    getCalcRaw(isValid(check_valid), {
      ...fields.calc_raw,
      account_id: Customer_ID?.title,
      analyze_Name: Analyze_ID?.title,
      type: itemType?.title,
    });
    setValid(isValid(check_valid));
  }, [fields, Customer_ID, itemType, Analyze_ID]);

  return (
    <div className="mt-10">
      <form className="grid grid-cols-1 space-y-5 lg:grid lg:place-items-center ">
        {/*Customer info*/}
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
          <div className="space-y-2 lg:w-1/2">
            <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
              Anlaşmalı Fiyat Girişi
            </p>
            <hr />
          </div>

          <div className="space-y-5 lg:grid lg:grid-cols-3 lg:items-end lg:gap-3 ">
            <div className="flex flex-col space-y-3 ">
              <DropDown
                dropDownOptions={{ label: "Cari Kod" }}
                data={CUSTOMER}
                prevValue={Customer_ID}
                valid={valid}
                setData={setCustomer}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <DropDown
                dropDownOptions={{ label: "Analiz" }}
                data={ANALYZE}
                prevValue={Analyze_ID}
                valid={valid}
                setData={setAnalyze}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <DropDown
                dropDownOptions={{ label: "Ürün Tipi" }}
                data={TYPE}
                prevValue={itemType}
                valid={valid}
                setData={setType}
              />
            </div>
            <TextField
              label={"Dolar Kuru"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.usd || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "usd", e)}
            />

            <TextField
              label={"Euro Kuru"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.euro || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "euro", e)}
            />

            <TextField
              label={"Kilogram Fiyatı (TL)"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.kgPrice || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "kgPrice", e)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
