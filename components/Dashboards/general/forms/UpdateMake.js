import { useState, useEffect } from "react";
import * as React from "react";
import axios, { Axios } from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import QuotationItem from "./QuotationItem";
import StrBush from "./StrBush";
import PlateStrip from "./PlateStrip";
import BracketBush from "./BracketBush";
import DoubleBracketBush from "./DoubleBracketBush";
import MiddleBracketBush from "./MiddleBracketBush";

const steps = [
  "Teklif Tipi Seç",
  "Teklif Hazırla",
  "Teklif Oluştur",
  "İşlemi Tamamla",
];

const QUOTYPE = [
  { key: "Anlaşmalı Teklif Hazırlama", value: "0" },
  { key: "Hammade Üzerinden Teklif Hazırlama", value: "1" },
];

const TYPE = [
  { key: "Düz Burç", value: "Düz Burç" },
  { key: "Plaka", value: "Plaka" },
  { key: "Flanşlı Burç", value: "Flanşlı Burç" },
  { key: "Ortadan Flanşlı Burç", value: "Ortadan Flanşlı Burç" },
  { key: "Çift Flanşlı Burç", value: "Çift Flanşlı Burç" },
];

const TYPE_COMPS = {
  "Düz Burç": <StrBush />,
  Plaka: <PlateStrip />,
  "Flanşlı Burç": <BracketBush />,
  "Çift Flanşlı Burç": <DoubleBracketBush />,
  "Ortadan Flanşlı Burç": <MiddleBracketBush />,
};

export default function UpdateMake({ analyzes, customers, item }) {
 
  const ANALYZE = analyzes.map((analyse) => {
    return {
      key: analyse.analyze_Name,
      value: analyse.analyze_id,
    };
  });

  const CUSTOMER = customers.map((customer) => {
    return {
      key: customer.account_id,
      value: customer.account_id,
    };
  });
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const router = useRouter();
  
  const handleDelete = async () => {
    let type = "";
    if (
      item.straight_bush === null &&
      item.bracket_bush === null &&
      item.plate_strip === null &&
      item.middlebracket_bush === null
    ) {
      type = "double_bracket_bush";
    }
    if (
      item.doublebracket_bush === null &&
      item.bracket_bush === null &&
      item.plate_strip === null &&
      item.middlebracket_bush === null
    ) {
      type = "straight_bush";
    }
    if (
      item.straight_bush === null &&
      item.doublebracket_bush === null &&
      item.plate_strip === null &&
      item.middlebracket_bush === null
    ) {
      type = "bracket_bush";
    }

    if (
      item.straight_bush === null &&
      item.bracket_bush === null &&
      item.doublebracket_bush === null &&
      item.middlebracket_bush === null
    ) {
      type = "plate_strip";
    }
    if (
      item.straight_bush === null &&
      item.bracket_bush === null &&
      item.plate_strip === null &&
      item.doublebracket_bush === null
    ) {
      type = "middle_bracket_bush";
    }
    const res = await axios({
      method: "delete",
      data: {
        item_id: fields.item_id,
        type: type,
      },

      url: `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/delete`,
      withCredentials: true,
    });

    if (res.status === 200) {
      setIsDelete(false);
      setIsDel(true);
    } else {
      setIsvalid(false);
    }
  };

  const [fields, setFields] = useState({
    item_id: item.item_id,
    quo_type: {
      quo_type_name: `${item.type}`,
    },
    final: {
      price: item.unit_price,
    },
    quotation_item: {
      unit_frequence: item.unit_frequence,
      model_price: item.model_price,
      model_firm: item.model_firm,
      treatment_price: item.treatment_price,
      treatment_firm: item.treatment_firm,
      test_price: item.test_price,
      benefit: item.benefitPercent,
      alterPrice: item.alternativeSale_price,
    },
    straigth_bush: {
      bigger_diameter: "",
      inner_diameter: "",
      length: "",
    },
    plate_strip: {
      width: "",
      length: "",
      thickness: "",
    },
    bracket_bush: {
      bigger_diameter: "",
      inner_diameter: "",
      body_diameter: "",
      bush_length: "",
      bracket_length: "",
    },
    middlebracket_bush: {
      bracket_q1: "",
      bracket_q2: "",
      bracket_q3: "",
      bracket_q4: "",
      bracket_l1: "",
      bracket_l2: "",
      bracket_l3: "",
      bracket_full: "",
    },
    doublebracket_bush: {
      bigger_diameter: "",
      body_diameter: "",
      inner_diameter: "",
      bracket_l1: "",
      bracket_l2: "",
      bracket_l3: "",
      bracket_full: "",
    },
    calc_raw: {
      account_id: item.Customer_ID,
      analyze_Name: item.Analyze_ID,
      LME: item.lmeCopper,
      TIN: item.lmeTin,
      euro: item.euro,
      usd: item.usd,
      workmanship: "",
      type: "",
    },
  });

  const handleValidateStr = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["straigth_bush"]["bigger_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["straigth_bush"]["inner_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["straigth_bush"]["lenght"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidatePlate = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["plate_strip"]["width"] === "") {
      isValid = false;
    }
    if (check_fields["plate_strip"]["length"] === "") {
      isValid = false;
    }
    if (check_fields["plate_strip"]["thickness"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidateBracket = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["bracket_bush"]["bigger_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["inner_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["body_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["bush_length"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["bracket_length"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidateDoubleBracket = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["doublebracket_bush"]["bigger_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["inner_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["body_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l1"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l2"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l3"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_full"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidateMiddleBracket = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["middlebracket_bush"]["bracket_q1"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_q2"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_q3"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_q4"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_l1"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_l2"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_l3"] === "") {
      isValid = false;
    }
    if (check_fields["middlebracket_bush"]["bracket_full"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidateQuotationItems = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["quotation_item"]["unit_frequence"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["model_price"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["model_firm"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["treatment_price"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["treatment_firm"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["test_price"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["benefit"] === "") {
      isValid = false;
    }
    if (check_fields["quotation_item"]["alterPrice"] === "") {
      isValid = false;
    }

    

    return isValid;
  };

  const TYPE_VALIDATE = {
    "Düz Burç": handleValidateStr,
    Plaka: handleValidatePlate,
    "Flanşlı Burç": handleValidateBracket,
    "Çift Flanşlı Burç": handleValidateDoubleBracket,
    "Ortadan Flanşlı Burç": handleValidateMiddleBracket,
  };

  const [coef, setCoef] = useState("");
  const [rawCopperPrice, setCopperPrice] = useState(0);
  const [rawTinPrice, setTinPrice] = useState(0);
  const [kgPrice, setUnitPrice] = useState(parseFloat(item.kgPrice));
  const [canSkipStep1, setCanSkip1] = useState(false);
  const [canSkipStep2, setCanSkip2] = useState(false);
  const [canSkipStep3, setCanSkip3] = useState(false);
  const handleValidationInput = () => {
    let check_fields = fields;
    let isValid = true;

    // account_id
    if (check_fields["calc_raw"]["account_id"] === "") {
      isValid = false;
    }

    // account_id
    if (check_fields["calc_raw"]["analyze_Name"] === "") {
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
    
    if (kgPrice === NaN) {
      isValid = false;
    }

    
    return isValid;
  };
  let type2 = "";
  if (
    item.straight_bush === null &&
    item.bracket_bush === null &&
    item.plate_strip === null &&
    item.middlebracket_bush === null
  ) {
    type2 = "Çift Flanşlı Burç";
  }
  if (
    item.doublebracket_bush === null &&
    item.bracket_bush === null &&
    item.plate_strip === null &&
    item.middlebracket_bush === null
  ) {
    type2 = "Düz Burç";
  }
  if (
    item.straight_bush === null &&
    item.doublebracket_bush === null &&
    item.plate_strip === null &&
    item.middlebracket_bush === null
  ) {
    type2 = "Flanşlı Burç";
  }

  if (
    item.straight_bush === null &&
    item.bracket_bush === null &&
    item.doublebracket_bush === null &&
    item.middlebracket_bush === null
  ) {
    type2 = "Plaka";
  }
  if (
    item.straight_bush === null &&
    item.bracket_bush === null &&
    item.plate_strip === null &&
    item.doublebracket_bush === null
  ) {
    type2 = "Ortadan Flanşlı Burç";
  }
  const [type, setType] = useState(type2);

  const [moldingPrice, setMolding] = useState(0);
  const [modelUnitPrice, setModelUnitPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [salePrice, setPrice] = useState([]);
  const [calcW, setCalcW] = useState(0);
  const [analyzeID, setAnalyzeID] = useState("");

  const handleValidation0 = () => {
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
    return isValid;
  };

  
  const handleChange = async (field, area, e) => {
    const new_fields = fields;
    new_fields[field][area] = e.target.value;
    setFields(new_fields);
    
    const an = analyzes.find(
      (analyze) => fields.calc_raw.analyze_Name === analyze.analyze_id
    );
    if (an) {
      setCoef(`${an.analyze_coefCopper},${an.analyze_coefTin}`);
    }
    if (fields.quo_type.quo_type_name === "1") {
      setCopperPrice(
        (
          (fields.calc_raw.LME *
            fields.calc_raw.usd *
            parseFloat(coef.split(",")[0])) /
          1000
        ).toFixed(3)
      );
      setTinPrice(
        (
          (((fields.calc_raw.TIN * fields.calc_raw.usd) / 1000) *
            parseFloat(coef.split(",")[1])) /
          100
        ).toFixed(3)
      );
      setUnitPrice(
        (
          (fields.calc_raw.LME *
            fields.calc_raw.usd *
            parseFloat(coef.split(",")[0])) /
            1000 +
          (((fields.calc_raw.TIN * fields.calc_raw.usd) / 1000) *
            parseFloat(coef.split(",")[1])) /
            100 +
          parseFloat(fields.calc_raw.workmanship)
        ).toFixed(3)
      );

      console.log(kgPrice);
    }
    

    setMolding(parseFloat(calcW) * parseFloat(kgPrice));
    setModelUnitPrice(
      parseFloat(fields["quotation_item"]["model_price"]) /
        parseInt(fields["quotation_item"]["unit_frequence"])
    );
    setCost(
      parseFloat(moldingPrice) +
        parseFloat(modelUnitPrice ? modelUnitPrice : 0) +
        parseFloat(
          fields["quotation_item"]["treatment_price"] !== ""
            ? fields["quotation_item"]["treatment_price"]
            : 0
        ) +
        parseFloat(
          fields["quotation_item"]["test_price"] !== ""
            ? fields["quotation_item"]["test_price"]
            : 0
        )
    );
    let sale = (
      parseFloat(cost) +
      (parseFloat(cost) * parseFloat(fields["quotation_item"]["benefit"])) / 100
    ).toFixed(3);
    setPrice([
      {
        value: parseFloat(sale).toFixed(3),
        key: `${parseFloat(sale).toFixed(3)} ₺ `,
      },
      {
        value: (sale * parseFloat(fields["calc_raw"]["usd"])).toFixed(3),
        key: `${(sale / parseFloat(fields["calc_raw"]["usd"])).toFixed(3)} $ `,
      },
      {
        value: (sale * parseFloat(fields["calc_raw"]["euro"])).toFixed(3),
        key: `${(sale / parseFloat(fields["calc_raw"]["euro"])).toFixed(3)} € `,
      },
      {
        value: parseFloat(fields["quotation_item"]["alterPrice"]).toFixed(3),
        key: `${parseFloat(fields["quotation_item"]["alterPrice"]).toFixed(
          3
        )} ₺ `,
      },
      {
        value: (
          parseFloat(fields["quotation_item"]["alterPrice"]) *
          parseFloat(fields["calc_raw"]["usd"])
        ).toFixed(3),
        key: `${(
          parseFloat(fields["quotation_item"]["alterPrice"]) /
          parseFloat(fields["calc_raw"]["usd"])
        ).toFixed(3)} $ `,
      },
      {
        value: (
          parseFloat(fields["quotation_item"]["alterPrice"]) *
          parseFloat(fields["calc_raw"]["euro"])
        ).toFixed(3),
        key: `${(
          parseFloat(fields["quotation_item"]["alterPrice"]) /
          parseFloat(fields["calc_raw"]["euro"])
        ).toFixed(3)} € `,
      },
    ]);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const all_type_val =
      TYPE_VALIDATE["Düz Burç"]() ||
      TYPE_VALIDATE["Flanşlı Burç"]() ||
      TYPE_VALIDATE["Ortadan Flanşlı Burç"]() ||
      TYPE_VALIDATE["Plaka"]() ||
      TYPE_VALIDATE["Çift Flanşlı Burç"]();
      console.log((all_type_val && handleValidateQuotationItems()))
    if ((handleValidation0() || handleValidationInput()) && ((all_type_val && handleValidateQuotationItems()))){
      let data = {};
    const standartOptions = {
      Customer_ID: fields.calc_raw.account_id,
      Analyze_ID: fields.calc_raw.analyze_Name,
      unit_frequence: fields.quotation_item.unit_frequence,
      unit_price: fields.final.price,
      benefitPercent: fields.quotation_item.benefit,
      model_price: fields.quotation_item.model_price,
      model_firm: fields.quotation_item.model_firm,
      treatment_price: fields.quotation_item.treatment_price,
      test_price: fields.quotation_item.test_price,
      alternativeSale_price: fields.quotation_item.alterPrice,
      treatment_firm: fields.quotation_item.treatment_firm,
      euro: fields.calc_raw.euro,
      lmeCopper : fields.calc_raw.LME,
      lmeTin : fields.calc_raw.TIN,
      kgPrice : kgPrice,
      usd: fields.calc_raw.usd,
    };
    switch (type) {
      case "Plaka":
        data = {
          options: {
            ...standartOptions,
            type_options: {
              width: fields.plate_strip.width,
              length: fields.plate_strip["length"],
              thickness: fields.plate_strip.thickness,
            },

            
          },

          type: "plate_strip",
          item_id : fields.item_id
        };
        break;
      case "Düz Burç":
        data = {
          options: {
            ...standartOptions,
            type_options: {
              large_diameter: fields.straigth_bush.bigger_diameter,
              inner_diameter: fields.straigth_bush.inner_diameter,
              bush_length: fields.straigth_bush["length"],
            },
          },

          type: "straight_bush",
          item_id : fields.item_id
        };
        break;
      case "Flanşlı Burç":
        data = {
          options: {
            ...standartOptions,
            type_options: {
              bigger_diameter: fields.bracket_bush.bigger_diameter,
              body_diameter: fields.bracket_bush.body_diameter,
              inner_diameter: fields.bracket_bush.inner_diameter,
              bracket_length: fields.bracket_bush.bracket_length,
              bush_length: fields.bracket_bush.bush_length,
            },
          },

          type: "bracket_bush",
          item_id : fields.item_id
        };
        break;
      case "Çift Flanşlı Burç":
        data = {
          options: {
            ...standartOptions,
            type_options: {
              bigger_diameter: fields.doublebracket_bush.bigger_diameter,
              body_diameter: fields.doublebracket_bush.body_diameter,
              inner_diameter: fields.doublebracket_bush.inner_diameter,
              bracket_l1: fields.doublebracket_bush.bracket_l1,
              bracket_l2: fields.doublebracket_bush.bracket_l2,
              bracket_l3: fields.doublebracket_bush.bracket_l3,
              bracket_full: fields.doublebracket_bush.bracket_full,
            },
          },

          type: "double_bracket_bush",
          item_id : fields.item_id
        };
        break;
      case "Ortadan Flanşlı Burç":
        data = {
          options: {
            ...standartOptions,
            type_options: {
              bracket_q1: fields.middlebracket_bush.bracket_q1,
              bracket_q2: fields.middlebracket_bush.bracket_q2,
              bracket_q3: fields.middlebracket_bush.bracket_q3,
              bracket_q4: fields.middlebracket_bush.bracket_q4,
              bracket_l1: fields.middlebracket_bush.bracket_l1,
              bracket_l2: fields.middlebracket_bush.bracket_l2,
              bracket_l3: fields.middlebracket_bush.bracket_l3,
              bracket_full: fields.middlebracket_bush.bracket_full,
            },
          },

          type: "middle_bracket_bush",
          item_id : fields.item_id
        };
        break;
    }

    try {
      const res = await axios({
        method: "post",
        data: data,
        url: `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/update`,
        withCredentials: true,
      });
      if (res.status === 200) {
        setSubmit(true);
        setIsvalid(true);
      }
    } catch (err) {
      setSubmit(false);
      setCreateErr(true);
    }
    }

    else {
      setIsvalid(false);
    }
    
  };
  const toggleCreate = () => {
    setCreate(!create);
  };
  return (
    <div>
      <a
        onClick={toggleCreate}
        className="hover:cursor-pointer font-medium text-text-fuchsia-500 dark:text-fuchsia-400-600 dark:text-text-fuchsia-500 dark:text-fuchsia-400-500 hover:underline"
      >
        Düzenle
      </a>

      <div
        className={`${
          create ? "visible scale-100" : "invisible transform scale-0 h-0"
        } fixed z-50 inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto lg:p-10  h-full w-full transition duration-500 ease-in-out origin-center`}
      >
        <div className="relative lg:top-3 top-20 mx-auto p-5 border shadow-lg lg:w-full lg:w-full rounded-md bg-white p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 relative top-0 left-0 hover:cursor-pointer"
            onClick={() => {
              toggleCreate();
              router.reload(window.location.pathname);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div
            className={`${
              !submit && isValid && !createErr && !isDelete && !isDel
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } flex flex-col space-y-10`}
          >
            <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-yellow-600">
              Teklifi Düzenle
            </p>
            <div className="grid grid-cols-1 space-y-5 lg:grid-cols-1">
              {/*Customer info*/}
              {fields.quo_type.quo_type_name === "1" ? (
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
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Analiz *
                      </label>
                      <Dropdown
                        label="Analiz"
                        field="calc_raw"
                        area="analyze_Name"
                        setAnalyzeID0={setAnalyzeID}
                        fields={fields}
                        items={ANALYZE}
                        handleChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        LME Copper *
                      </label>
                      <input
                        type="number"
                        step={"any"}
                        className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                        placeholder=""
                        required
                        onChange={(e) => handleChange("calc_raw", "LME", e)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        LME Tin *
                      </label>
                      <input
                        type="number"
                        step={"any"}
                        className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                        placeholder=""
                        required
                        onChange={(e) => handleChange("calc_raw", "TIN", e)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                        onChange={(e) =>
                          handleChange("calc_raw", "workmanship", e)
                        }
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Toplam Hammadde Fiyatı
                      </label>
                      <p className="font-poppins">
                        {(
                          parseFloat(rawCopperPrice) + parseFloat(rawTinPrice)
                        ).toFixed(3)}{" "}
                        ₺
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Bakır ₺ Değeri
                      </label>
                      <p className="font-poppins">{rawCopperPrice} ₺</p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Kalay ₺ Değeri
                      </label>
                      <p className="font-poppins">{rawTinPrice} ₺</p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Bakır Analiz Katsayısı
                      </label>
                      <p className="font-poppins">{coef.split(",")[0]}</p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Kalay Analiz Katsayısı
                      </label>
                      <p className="font-poppins">{coef.split(",")[1]}</p>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                      >
                        Döküm Kilogram Fiyatı (₺)
                      </label>
                      <p className="font-poppins text-red-700">{kgPrice} ₺</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-10">
                  <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
                    Yeni Teklif
                  </p>
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
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Analiz *
                          </label>
                          <Dropdown
                            label="Analiz"
                            field="calc_raw"
                            area="analyze_Name"
                            setAnalyzeID0={setAnalyzeID}
                            fields={fields}
                            items={ANALYZE}
                            handleChange={handleChange}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                            onChange={(e) =>
                              handleChange("calc_raw", "euro", e)
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Döküm Kilogram Fiyatı*
                          </label>
                          <input
                            type="number"
                            step={"any"}
                            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                            placeholder=""
                            required
                            onChange={async (e) => {
                               setUnitPrice(parseFloat(e.target.value));
                               setCanSkip2(handleValidationInput());
                              
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              <QuotationItem
                fields={fields}
                calcs={{
                  modelUnitPrice,
                  moldingPrice,
                  cost,
                  salePrice,
                  calcW,
                  setCalcW,
                  setModelUnitPrice,
                }}
                handleChange={handleChange}
                kgPrice={kgPrice}
                name={type}
              >
                {" "}
                {TYPE_COMPS[type]}{" "}
              </QuotationItem>
            </div>

            {/*Buttons*/}
            <div className="flex justify-end space-x-3">
              <button
                className="disabled:opacity-25 disabled:cursor-not-allowed bg-yellow-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={handleSubmit}
                
              >
                Güncelle
              </button>
              <button
                className="bg-red-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={() => setIsDelete(true)}
              >
                Sil
              </button>
              <button
                className="bg-red-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  toggleCreate();
                  router.reload(window.location.pathname);
                }}
              >
                İptal
              </button>
            </div>
          </div>

          <div
            className={`${
              submit && isValid ? "visible scale-100" : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Başarılı!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Teklif Başarıyla Güncellendi!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  toggleCreate();
                  setSubmit(false);
                  router.reload(window.location.pathname);
                }}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Tamam
              </button>
            </div>
          </div>

          <div
            className={`${
              isDel ? "visible scale-100" : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Başarılı!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">Teklif Başarıyla Silindi!</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  toggleCreate();
                  setSubmit(false);
                  router.reload(window.location.pathname);
                }}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Tamam
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && !isValid
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Eksik Bilgi girdiniz !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>

              
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setIsvalid(true);
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && createErr
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Hata !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setCreateErr(false);
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>

          <div
            className={`${
              isDelete ? "visible scale-100" : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Uyarı !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">Teklif Silinecektir!</p>
            </div>
            <div className="items-center px-4 py-3 space-y-5">
              <button
                id="ok-btn"
                onClick={() => {
                  setIsDelete(false);
                }}
                className="px-4 py-2 bg-yellow-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>

              <button
                id="ok-btn"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
