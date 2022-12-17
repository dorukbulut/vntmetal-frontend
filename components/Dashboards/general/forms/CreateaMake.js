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
import BracketBush from "./BracketBush"
import DoubleBracketBush from "./DoubleBracketBush";
import MiddleBracketBush from "./MiddleBracketBush";

const steps = ["Teklif Tipi Seç", "Teklif Hazırla", "Teklif Oluştur", "İşlemi Tamamla"];

const QUOTYPE = [
  {key : "Anlaşmalı Teklif Hazırlama", value : "0"},
  {key : "Hammade Üzerinden Teklif Hazırlama", value: "1"}
]

const TYPE = [
  { key: "Düz Burç", value: "Düz Burç" },
  { key: "Plaka", value: "Plaka" },
  { key: "Flanşlı Burç", value: "Flanşlı Burç" },
  { key: "Ortadan Flanşlı Burç", value: "Ortadan Flanşlı Burç" },
  { key: "Çift Flanşlı Burç", value: "Çift Flanşlı Burç" },
];

const TYPE_COMPS = {
  "Düz Burç" : <StrBush />,
  "Plaka" : <PlateStrip />,
  "Flanşlı Burç" : <BracketBush />,
  "Çift Flanşlı Burç": <DoubleBracketBush />,
  "Ortadan Flanşlı Burç" : <MiddleBracketBush />
}

export default function CreateMake({ analyzes, customers }) {
  const ANALYZE = analyzes.map((analyse) => {
    return {
      key: analyse.analyze_Name,
      value : analyse.analyze_id,
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
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const router = useRouter();

  const [fields, setFields] = useState({
    quo_type  :  {
      quo_type_name : ""
    },
    final : {
      price : 0,
    },
    quotation_item : {
      unit_frequence : '',
      model_price : '',
      model_firm : '',
      treatment_price : '',
      treatment_firm : '',
      test_price : '',
      benefit : '',
      alterPrice : '',
    },
    straigth_bush : {
      bigger_diameter : '',
      inner_diameter : '',
      length : '',

    },
    plate_strip : {
      width : '',
      length : '',
      thickness : '',

    },
    bracket_bush : {
      bigger_diameter : '',
      inner_diameter : '',
      body_diameter : '',
      bush_length : '',
      bracket_length : '',
    },
    middlebracket_bush : {
      bracket_q1 : '',
      bracket_q2 : '',
      bracket_q3 : '',
      bracket_q4 : '',
      bracket_l1 : '',
      bracket_l2 : '',
      bracket_l3 : '',
      bracket_full : '',

    },
    doublebracket_bush : {
      bigger_diameter : '',
      body_diameter : '',
      inner_diameter : '',
      bracket_l1 : '',
      bracket_l2 : '',
      bracket_l3 : '',
      bracket_full : '',
    },
    calc_raw: {
      account_id : '',
      analyze_Name : '',
      LME :  '',
      TIN : '',
      euro : '',
      usd : '',
      workmanship : '',
      type : '',

    },
  })

  

  const handleValidateStr =  () => {
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
    return isValid
  }

  const handleValidatePlate =  () => {
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
    return isValid
  }

  const handleValidateBracket =  () => {
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
    return isValid
  }

  const handleValidateDoubleBracket =  () => {
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
    return isValid
  }

  const handleValidateMiddleBracket =  () => {
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
    return isValid
  }

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

    return isValid
  }
 
  const TYPE_VALIDATE = {
    "Düz Burç" : handleValidateStr,
    "Plaka" : handleValidatePlate,
    "Flanşlı Burç" : handleValidateBracket ,
    "Çift Flanşlı Burç": handleValidateDoubleBracket ,
    "Ortadan Flanşlı Burç" : handleValidateMiddleBracket,
  }

  const [coef, setCoef] = useState("");
  const [rawCopperPrice, setCopperPrice ] = useState(0);
  const [rawTinPrice, setTinPrice ] = useState(0);
  const [kgPrice, setUnitPrice ] = useState(0);  
  const [canSkipStep1, setCanSkip1] = useState(false);
  const [canSkipStep2, setCanSkip2] = useState(false);
  const [canSkipStep3, setCanSkip3] = useState(false);
  const [type , setType] = useState('');

  const [moldingPrice, setMolding] = useState(0);
  const [modelUnitPrice, setModelUnitPrice]  = useState(0);
  const [cost, setCost] = useState(0);
  const [salePrice,setPrice] = useState([]);
  const [calcW, setCalcW] = useState(0);
  const [analyzeID , setAnalyzeID] = useState('');

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    let new_fields = fields
    new_fields["straigth_bush"] = {
      bigger_diameter : '',
      inner_diameter : '',
      length : '',
    }
    new_fields["plate_strip"] = {
      width : '',
      length : '',
      thickness : '',

    }
    new_fields["bracket_bush"] = {
      bigger_diameter : '',
      inner_diameter : '',
      body_diameter : '',
      bush_length : '',
      bracket_length : '',
    }
    new_fields["middlebracket_bush"] = {
      bracket_q1 : '',
      bracket_q2 : '',
      bracket_q3 : '',
      bracket_q4 : '',
      bracket_l1 : '',
      bracket_l2 : '',
      bracket_l3 : '',
      bracket_full : '',

    }
    new_fields["doublebracket_bush"] = {
      bigger_diameter : '',
      body_diameter : '',
      inner_diameter : '',
      bracket_l1 : '',
      bracket_l2 : '',
      bracket_l3 : '',
      bracket_full : '',
    }
    setFields(new_fields);
    setCanSkip3(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

    // type
    if (check_fields["calc_raw"]["type"] === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleValidation1 = () => {
    let check_fields = fields;
    let isValid = true;
    // quo_type
    if (check_fields["quo_type"]["quo_type_name"] === "") {
      isValid = false;
    }

    return isValid;
  }
  const handleChange = (field, area, e) => {
    const new_fields = fields
    new_fields[field][area] = e.target.value
    setFields(new_fields);
    const an = analyzes.find(analyze => fields.calc_raw.analyze_Name === analyze.analyze_id)
    if (an) {
      setCoef(`${an.analyze_coefCopper},${an.analyze_coefTin}`); 
    }
    
    setCopperPrice((fields.calc_raw.LME * fields.calc_raw.usd * parseFloat(coef.split(",")[0]) /1000).toFixed(3))
    setTinPrice(((fields.calc_raw.TIN * fields.calc_raw.usd)/1000 * parseFloat(coef.split(",")[1]) /100).toFixed(3))
    setUnitPrice(((((fields.calc_raw.LME * fields.calc_raw.usd * parseFloat(coef.split(",")[0]) /1000) + (fields.calc_raw.TIN * fields.calc_raw.usd)/1000 * parseFloat(coef.split(",")[1]) /100) ) + parseFloat(fields.calc_raw.workmanship)).toFixed(3))
    setType(fields.calc_raw.type);
    setMolding(parseFloat(calcW) * parseFloat(kgPrice));
    setModelUnitPrice(parseFloat(fields["quotation_item"]["model_price"]) / parseInt(fields["quotation_item"]["unit_frequence"]));
    setCost((parseFloat(moldingPrice) + parseFloat(modelUnitPrice ? modelUnitPrice : 0) + parseFloat(fields["quotation_item"]["treatment_price"] !== '' ?fields["quotation_item"]["treatment_price"] :0 ) + parseFloat(fields["quotation_item"]["test_price"] !== '' ? fields["quotation_item"]["test_price"] :0 )))
    let sale = (parseFloat(cost) +  parseFloat(cost) * parseFloat(fields["quotation_item"]["benefit"]) / 100).toFixed(3)
    setPrice([{value : parseFloat(sale).toFixed(3), key : `${parseFloat(sale).toFixed(3)} ₺ `}, 
    {value : (sale * parseFloat(fields["calc_raw"]["usd"])).toFixed(3), key : `${(sale / parseFloat(fields["calc_raw"]["usd"])).toFixed(3)} $ `},
    {value : (sale * parseFloat(fields["calc_raw"]["euro"])).toFixed(3), key : `${(sale / parseFloat(fields["calc_raw"]["euro"])).toFixed(3)} € `},
    {value : parseFloat(fields["quotation_item"]["alterPrice"]).toFixed(3), key : `${(parseFloat(fields["quotation_item"]["alterPrice"])).toFixed(3)} ₺ `},
    {value : (parseFloat(fields["quotation_item"]["alterPrice"]) * parseFloat(fields["calc_raw"]["usd"])).toFixed(3), key : `${(parseFloat(fields["quotation_item"]["alterPrice"]) / parseFloat(fields["calc_raw"]["usd"])).toFixed(3)} $ `},
    {value : (parseFloat(fields["quotation_item"]["alterPrice"]) * parseFloat(fields["calc_raw"]["euro"])).toFixed(3), key : `${(parseFloat(fields["quotation_item"]["alterPrice"]) / parseFloat(fields["calc_raw"]["euro"])).toFixed(3)} € `},
  ])
    setCanSkip1(handleValidation1());
    setCanSkip2(handleValidation0());
    const all_type_val = (TYPE_VALIDATE["Düz Burç"]() || TYPE_VALIDATE["Flanşlı Burç"]() || TYPE_VALIDATE["Ortadan Flanşlı Burç"]() || TYPE_VALIDATE["Plaka"]() || TYPE_VALIDATE["Çift Flanşlı Burç"]())
    setCanSkip3(all_type_val  && handleValidateQuotationItems());
      
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {}
    const  standartOptions = {
            "Customer_ID": fields.calc_raw.account_id,
            "Analyze_ID" : fields.calc_raw.analyze_Name,
            "unit_frequence" : fields.quotation_item.unit_frequence,
            "unit_price" : fields.final.price,
            "benefitPercent" : fields.quotation_item.benefit,
            "model_price" : fields.quotation_item.model_price,
            "model_firm" : fields.quotation_item.model_firm,
            "treatment_price" : fields.quotation_item.treatment_price,
            "test_price" : fields.quotation_item.test_price,
            "alternativeSale_price" : fields.quotation_item.alterPrice,
            "treatment_firm" : fields.quotation_item.treatment_firm,
            "euro" : fields.calc_raw.euro,
            "usd" : fields.calc_raw.usd,
    }
    switch (fields.calc_raw.type) {
      case "Plaka":
        data = {
          "options" : {
            ...standartOptions,
            "plate_strip" : {
              "width" : fields.plate_strip.width,
              "length" : fields.plate_strip["length"],
              "thickness" : fields.plate_strip.thickness,
            }
          },

          "type" : "plate_strip"
        }
        break;
      case "Düz Burç":
        data = {
          "options" : {
            ...standartOptions,
            "straight_bush" : {
              "large_diameter" : fields.straigth_bush.bigger_diameter,
              "inner_diameter" : fields.straigth_bush.inner_diameter,
              "bush_length" : fields.straigth_bush["length"],
              
            }
          },

          "type" : "straight_bush"
        }
        break;
      case  "Flanşlı Burç":
        data = {
          "options" : {
            ...standartOptions,
            "bracket_bush" : {
              "bigger_diameter" : fields.bracket_bush.bigger_diameter,
              "body_diameter" : fields.bracket_bush.body_diameter,
              "inner_diameter" : fields.bracket_bush.inner_diameter,
              "bracket_length" : fields.bracket_bush.bracket_length,
              "bush_length" : fields.bracket_bush.bush_length,
            }
          },

          "type" : "bracket_bush"
        }
        break;
      case "Çift Flanşlı Burç":
        data = {
          "options" : {
            ...standartOptions,
            "doublebracket_bush" : {
              "bigger_diameter" : fields.doublebracket_bush.bigger_diameter,
              "body_diameter" : fields.doublebracket_bush.body_diameter,
              "inner_diameter" : fields.doublebracket_bush.inner_diameter,
              "bracket_l1" : fields.doublebracket_bush.bracket_l1,
              "bracket_l2" : fields.doublebracket_bush.bracket_l2,
              "bracket_l3" : fields.doublebracket_bush.bracket_l3,
              "bracket_full" : fields.doublebracket_bush.bracket_full,
              
            }
          },

          "type" : "double_bracket_bush"
        }
        break;
      case "Ortadan Flanşlı Burç":
        data = {
          "options" : {
            ...standartOptions,
            "middlebracket_bush" : {
              "bracket_q1" : fields.middlebracket_bush.bracket_q1,
              "bracket_q2" : fields.middlebracket_bush.bracket_q2,
              "bracket_q3" : fields.middlebracket_bush.bracket_q3,
              "bracket_q4" : fields.middlebracket_bush.bracket_q4,
              "bracket_l1" : fields.middlebracket_bush.bracket_l1,
              "bracket_l2" : fields.middlebracket_bush.bracket_l2,
              "bracket_l3" : fields.middlebracket_bush.bracket_l3,
              "bracket_full" : fields.middlebracket_bush.bracket_full,
              
            }
          },

          "type" : "middle_bracket_bush"
        }
        break;
    }
    
      try {
        const res = await axios({
          method: "post",
          data: data,
          url: `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/create`,
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
    
  };
  const toggleCreate = () => {
    setCreate(!create);
  };
  return (
    <div>
      <button
        className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleCreate}
      >
        + Teklif Hazırla
      </button>

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
            onClick={() => {toggleCreate() 
              router.reload(window.location.pathname);}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div
            className={`${
              !submit && isValid && !createErr
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } flex flex-col space-y-20`}
          >
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Bir Hata oluştu !
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep == 0 ? (
                    <form className="grid grid-cols-1 space-y-5 lg:grid lg:place-items-center ">
                      {/*Customer info*/}
                      <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
                        <div className="space-y-2 lg:w-full">
                          <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                            Teklif Tipi Seç
                          </p>
                          <hr />
                        </div>

                        <div className="space-y-5 lg:grid  lg:w-full lg:items-end lg:gap-3 ">
                          <div className="lg:w-96 space-y-5">
                            <label
                              htmlFor="small-input"
                              className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                            >
                              Teklif Tipi *
                            </label>
                            <Dropdown
                              label="Teklif Tipi Seç"
                              field="quo_type"
                              area="quo_type_name"
                              fields={fields}
                              items={QUOTYPE}
                              handleChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}

                  {
                    activeStep == 1 ? (
                      fields.quo_type.quo_type_name == 0 ? (<p>
                        this is anlaşmalı
                      </p>) : (<div className="mt-10">
      <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
        Yeni Teklif
      </p>
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
                defaultValue={fields["calc_raw"]["LME"]}
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
                defaultValue={fields["calc_raw"]["TIN"]}
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
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
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
                onChange={(e) => handleChange("calc_raw", "workmanship", e)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Toplam Hammadde Fiyatı
              </label>
              <p className="font-poppins">{(parseFloat(rawCopperPrice) + parseFloat(rawTinPrice)).toFixed(3)} ₺</p>
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
      </form>
    </div>)
                    ) : ("")
                  }

                  {
                    activeStep == 2 ? <QuotationItem fields={fields} calcs={{modelUnitPrice, moldingPrice, cost, salePrice, calcW, setCalcW, setModelUnitPrice}} handleChange={handleChange} kgPrice={kgPrice} name={type}> {TYPE_COMPS[type]} </QuotationItem> : ""
                  }

                  {
                    activeStep == 3 ? <p className="text-lg mt-10 leading-6 font-medium text-green-500 text-center">Bütün bilgiler başarıyla dolduruldu. Teklif Oluşturmak için "Oluştur"seçeneğine tıklayınız.</p>: ""
                  }

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Geri
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {
                      activeStep === 0 ?  <Button disabled={!canSkipStep1} onClick={handleNext}>
                      {"ileri"}
                    </Button> : ''
                    }

                    {
                      activeStep === 1 ?  <Button disabled={!canSkipStep2} onClick={handleNext}>
                      { "ileri"}
                    </Button> : ''
                    }
                    {
                      activeStep === 2 ?  <Button disabled={!canSkipStep3} onClick={handleNext}>
                      {"ileri"}
                    </Button> : ''
                    }

{
                      activeStep === 3 ?  <Button disabled={false} onClick={async (e) => {
                        await handleSubmit(e);
                        handleNext(e);
                      }}>
                      {"Oluştur" }
                    </Button> : ''
                    }
                   
                  </Box>
                </React.Fragment>
              )}
            </Box>
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
                Teklif Başarıyla Kaydedildi!
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
        </div>
      </div>
    </div>
  );
}
