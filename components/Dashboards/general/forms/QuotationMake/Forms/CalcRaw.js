"use client";
import Dropdown from "../../Common/Dropdown";
import { useRef, useEffect, useState } from "react";

export default function CalculateRaw({
  CUSTOMER,
  TYPE,
  ANALYZE,
  getCalcRaw,
  prevValues,
  type,
}) {
  //states
  const [fields, setFields] = useState({
    calc_raw: {
      account_id:
        "account_id" in prevValues.values ? prevValues.values.account_id : "",
      analyze_Name:
        "analyze_Name" in prevValues.values
          ? prevValues.values.analyze_Name
          : "",
      LME: "LME" in prevValues.values ? prevValues.values.LME : "",
      TINP: "TINP" in prevValues.values ? prevValues.values.TINP : "",
      usd: "usd" in prevValues.values ? prevValues.values.usd : "",
      euro: "euro" in prevValues.values ? prevValues.values.euro : "",
      type: "type" in prevValues.values ? prevValues.values.type : "",
      workmanship:
        "workmanship" in prevValues.values ? prevValues.values.workmanship : "",
    },
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
    const item = ANALYZE.find(
      (analyse) => analyse.value === fields.calc_raw.analyze_Name
    );

    if (item !== undefined) {
      setCalculated((old) => {
        return {
          ...old,
          TIN: item.TIN,
          COPPER: item.COPPER,
        };
      });
    }
  }, [fields.calc_raw.analyze_Name]);

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
  }, [fields.calc_raw.LME, fields.calc_raw.usd, fields.calc_raw.analyze_Name]);

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
  }, [fields.calc_raw.TINP, fields.calc_raw.usd, fields.calc_raw.analyze_Name]);

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
    getCalcRaw(handleValidation(), {
      ...fields.calc_raw,
      ...calculated,
    });
  }, [fields, calculated]);

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

  const handleValidation = () => {
    let check_fields = fields;
    let isValid = true;

    // account_id
    if (check_fields["calc_raw"]["account_id"] === "") {
      isValid = false;
    }

    // analyze_Name
    if (check_fields["calc_raw"]["analyze_Name"] === "") {
      isValid = false;
    }

    // analyze_Name

    // LME
    if (check_fields["calc_raw"]["LME"] === "") {
      isValid = false;
    }

    // TIN
    if (check_fields["calc_raw"]["TIN"] === "") {
      isValid = false;
    }

    // euro
    if (check_fields["calc_raw"]["euro"] === "") {
      isValid = false;
    }

    // usd
    if (check_fields["calc_raw"]["usd"] === "") {
      isValid = false;
    }

    // workmanship
    if (check_fields["calc_raw"]["workmanship"] === "") {
      isValid = false;
    }

    // type
    if (check_fields["calc_raw"]["type"] === "") {
      isValid = false;
    }
    return isValid;
  };
  return (
    <div className="mt-10">
      {type === "update" ? (
        <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-yellow-600">
          Teklifi Güncelle
        </p>
      ) : (
        <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
          Yeni Teklif
        </p>
      )}

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
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Cari Kod *
              </label>
              <Dropdown
                label="Cari Kod"
                field="calc_raw"
                area="account_id"
                items={CUSTOMER}
                fields={fields}
                handleChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Analiz *
              </label>
              <Dropdown
                label="Analiz"
                field="calc_raw"
                area="analyze_Name"
                fields={fields}
                items={ANALYZE}
                handleChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                LME Copper *
              </label>
              <input
                type="number"
                step={"any"}
                id={"LME"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields["calc_raw"]["LME"]}
                required
                onChange={(e) => handleChange("calc_raw", "LME", e)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                LME Tin *
              </label>
              <input
                type="number"
                step={"any"}
                defaultValue={fields["calc_raw"]["TINP"]}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("calc_raw", "TINP", e)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Dolar Kuru *
              </label>
              <input
                type="number"
                step={"any"}
                defaultValue={fields["calc_raw"]["usd"]}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("calc_raw", "usd", e)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Euro Kuru *
              </label>
              <input
                type="number"
                step={"any"}
                defaultValue={fields["calc_raw"]["euro"]}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("calc_raw", "euro", e)}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Ürün Tipi *
              </label>
              <Dropdown
                label="Tip"
                field="calc_raw"
                area="type"
                items={TYPE}
                fields={fields}
                handleChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                İşçilik *
              </label>
              <input
                type="number"
                defaultValue={fields["calc_raw"]["workmanship"]}
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("calc_raw", "workmanship", e)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Toplam Hammadde Fiyatı
              </label>
              <p className="font-poppins">{calculated.totalRaw}</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Bakır ₺ Değeri
              </label>
              <p className="font-poppins">{calculated.priceCopper} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Kalay ₺ Değeri
              </label>
              <p className="font-poppins">{calculated.priceTin} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Bakır Analiz Katsayısı
              </label>
              <p className="font-poppins">{calculated.COPPER}</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Kalay Analiz Katsayısı
              </label>
              <p className="font-poppins">{calculated.TIN}</p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Döküm Kilogram Fiyatı (₺)
              </label>
              <p className="font-poppins text-red-700">
                {calculated.kgPrice} ₺
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
