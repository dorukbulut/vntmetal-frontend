"use client";
import Dropdown from "../../Common/Dropdown";
import DropDown from "../../../../../base/autocomplete";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { isValid } from "../../../../../../app/valid";

export default function CalculateRaw({
  CUSTOMER,
  TYPE,
  ANALYZE,
  getCalcRaw,
  prevValues,
  type,
}) {
  //states
  const [valid, setValid] = useState(false);
  const [fields, setFields] = useState({
    calc_raw: {
      LME: "LME" in prevValues.values ? prevValues.values.LME : "",
      TINP: "TINP" in prevValues.values ? prevValues.values.TINP : "",
      usd: "usd" in prevValues.values ? prevValues.values.usd : "",
      euro: "euro" in prevValues.values ? prevValues.values.euro : "",
      workmanship:
        "workmanship" in prevValues.values ? prevValues.values.workmanship : "",
    },
  });
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

  const [calculated, setCalculated] = useState({
    COPPER: "COPPER" in prevValues.values ? prevValues.values.COPPER : "",
    TIN: "TIN" in prevValues.values ? prevValues.values.TIN : "",
    priceCopper:
      "priceCopper" in prevValues.values ? prevValues.values.priceCopper : "",
    priceTin: "priceTin" in prevValues.values ? prevValues.values.priceTin : "",
    totalRaw: "totalRaw" in prevValues.values ? prevValues.values.totalRaw : "",
    kgPrice: "kgPrice" in prevValues.values ? prevValues.values.kgPrice : "",
  });

  //hooks
  // react hook for analyse
  useEffect(() => {
    const item = ANALYZE.find((analyse) => analyse.title === Analyze_ID?.title);

    setCalculated((old) => {
      return {
        ...old,
        TIN: item?.TIN || "",
        COPPER: item?.COPPER || "",
      };
    });
  }, [Analyze_ID?.title]);

  //for Copper Prices
  useEffect(() => {
    setCalculated((old) => {
      let inter =
        parseFloat(fields.calc_raw.LME) * parseFloat(fields.calc_raw.usd);
      let price = ((inter * parseFloat(old.COPPER)) / 1000).toFixed(2);

      return {
        ...old,
        priceCopper: price,
      };
    });
  }, [fields.calc_raw.LME, fields.calc_raw.usd, Analyze_ID?.title]);

  //for TIN

  useEffect(() => {
    setCalculated((old) => {
      let inter =
        parseFloat(fields.calc_raw.TINP) * parseFloat(fields.calc_raw.usd);
      let price = (((inter / 1000) * parseFloat(old.TIN)) / 100).toFixed(2);
      return {
        ...old,
        priceTin: price,
      };
    });
  }, [fields.calc_raw.TINP, fields.calc_raw.usd, Analyze_ID?.title]);

  // for totalCalc

  useEffect(() => {
    setCalculated((old) => {
      return {
        ...old,
        totalRaw: (
          parseFloat(old.priceCopper) + parseFloat(old.priceTin)
        ).toFixed(2),
      };
    });
  }, [calculated.priceCopper, calculated.priceTin]);

  // for kgPrice

  useEffect(() => {
    setCalculated((old) => {
      return {
        ...old,
        kgPrice: (
          parseFloat(fields.calc_raw.workmanship) + parseFloat(old.totalRaw)
        ).toFixed(2),
      };
    });
  }, [calculated.totalRaw, fields.calc_raw.workmanship]);

  // getValues hook with lmeCopper, lmeTin, usd, euro, kgPrice
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
      ...calculated,
      account_id: Customer_ID?.title,
      analyze_Name: Analyze_ID?.title,
      type: itemType?.title,
    });
    setValid(isValid(check_valid));
  }, [fields, calculated, Customer_ID, itemType, Analyze_ID]);

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

  return (
    <div className="mt-10">
      <form className="grid grid-cols-1 space-y-5 lg:grid lg:place-items-center ">
        {/*Customer info*/}
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
          <div className="space-y-2 lg:w-1/2">
            <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
              Hammadde Hesaplama
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
              label={"LME Copper"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.LME || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "LME", e)}
            />
            <TextField
              label={"LME Tin"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.TINP || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "TINP", e)}
            />
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
              label={"İşçilik"}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields?.calc_raw?.workmanship || ""}
              type={"number"}
              error={!valid}
              onChange={(e) => handleChange("calc_raw", "workmanship", e)}
            />
            <br />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={isNaN(calculated.totalRaw) ? "" : calculated.totalRaw}
              label="Toplam Hammade Fiyatı"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={
                isNaN(calculated.priceCopper) ? "" : calculated.priceCopper
              }
              label="Bakır ₺ Değeri"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={isNaN(calculated.priceTin) ? "" : calculated.priceTin}
              label="Kalay ₺ Değeri"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={isNaN(calculated.COPPER) ? "" : calculated.COPPER}
              label="Bakır Analiz Katsayısı"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={isNaN(calculated.TIN) ? "" : calculated.TIN}
              label="Kalay Analiz Katsayısı"
            />

            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={isNaN(calculated.kgPrice) ? "" : calculated.kgPrice}
              label="Döküm Kilogram Fiyatı"
              error={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
