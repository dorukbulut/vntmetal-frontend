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
//TODO : Listleme Özellikleri

//TODO-2 Roadmap Material Hesaplama :
//TODO-2-1 Hammadde hesaplama güncelle
//TODO-2-2 5 Ana Ürün oluşturma seçenekleri ekle.
//TODO-2-3 5 Güncelleme ve silme özellikleri

//TODO-3 Roadmap Teklif :
//TODO-3-1 5 Ana Ürün oluşturma seçenekleri ekle.
//TODO-3-2 5 Güncelleme ve silme özellikleri
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
      value: `${analyse.analyze_coefCopper},${analyse.analyze_coefTin}`,
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
    quotation_item : {
      unit_frequence : '',
      model_price : '',
      treatment_price  : '',
      test_price : '',
      alternativeSale_price : '',
      treatment_firm : '',
      model_firm : '',
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

  const [coef, setCoef] = useState("");
  const [rawCopperPrice, setCopperPrice ] = useState(0);
  const [rawTinPrice, setTinPrice ] = useState(0);
  const [kgPrice, setUnitPrice ] = useState(0);  
  const [canSkipStep1, setCanSkip1] = useState(false);
  const [canSkipStep2, setCanSkip2] = useState(false);
  const [type , setType] = useState('');

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
    setFields(new_fields)
    console.log(fields);
    setCoef(fields.calc_raw.analyze_Name);
    setCopperPrice((fields.calc_raw.LME * fields.calc_raw.usd * parseFloat(coef.split(",")[0]) /1000).toFixed(3))
    setTinPrice(((fields.calc_raw.TIN * fields.calc_raw.usd)/1000 * parseFloat(coef.split(",")[1]) /100).toFixed(3))
    setUnitPrice(((((fields.calc_raw.LME * fields.calc_raw.usd * parseFloat(coef.split(",")[0]) /1000) + (fields.calc_raw.TIN * fields.calc_raw.usd)/1000 * parseFloat(coef.split(",")[1]) /100) ) + parseFloat(fields.calc_raw.workmanship)).toFixed(3))
    setType(fields.calc_raw.type);
    setCanSkip1(handleValidation1());
    setCanSkip2(handleValidation0());  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const res = await axios({
          method: "post",
          data: fields,
          url: `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/create`,
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
    } else {
      setIsvalid(false);
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
            onClick={toggleCreate}
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
                    All steps completed - you&apos;re finished
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
                    activeStep == 2 ? <QuotationItem kgPrice={kgPrice} name={type}> {TYPE_COMPS[type]} </QuotationItem> : ""
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
                      {activeStep === steps.length - 1 ? "Oluştur" : "ileri"}
                    </Button> : ''
                    }

                    {
                      activeStep === 1 ?  <Button disabled={!canSkipStep2} onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Oluştur" : "ileri"}
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
                Müşteri Başarıyla Kaydedildi!
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
