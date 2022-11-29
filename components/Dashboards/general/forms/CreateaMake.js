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


const steps = ["Hammaddde Hesapla", "Teklif Hazırla", "Oluştur"];
const TYPE = [{key: "Düz Burç", value : "0"}, {key : "Plaka", value : "1"}, {key : "Flanşlı Burç", value : "2"}]


export default function CreateMake({analyzes, customers}) {

  const ANALYZE = analyzes.map(analyse => {
    return {
      key : analyse.analyze_Name,
      value : analyse.analyze_coef
    }
  })

  const CUSTOMER = customers.map(customer => {
    return {
      key : customer.account_id,
      value : customer.account_id
    }
  })

 
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [canSkip, setCanSkip] = useState(false);
  const router = useRouter();

  const [fields, setFields] = useState({
    calc_raw: {
      account_id : '',
      analyze_Name : '',
      LME :  '',
      euro : '',
      usd : '',
      workmanship : '',
      type : '',

    },
    
  });
  
  const [coef, setCoef] = useState(0);
  const [tl, setTL] = useState(0);
  const [raw_tl, setRawTl] = useState(0);
  const [kgCost, setCost] = useState(0);

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

    // LME
    if (check_fields["calc_raw"]["LME"] === "") {
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

  const handleChange = (field, area, e) => {
    let new_fields = fields;
    new_fields[field][area] = e.target.value;
    setFields(new_fields);

    setCanSkip(handleValidation());
    setCoef(fields.calc_raw.analyze_Name)
    setTL(fields.calc_raw.usd * fields.calc_raw.LME)
    setRawTl(fields.calc_raw.usd * fields.calc_raw.LME *fields.calc_raw.analyze_Name/1000)
    setCost((fields.calc_raw.usd * fields.calc_raw.LME *fields.calc_raw.analyze_Name/1000) + parseFloat(fields.calc_raw.workmanship));
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
                  {activeStep == 0 ? <div className="mt-10">
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
                          <Dropdown label="Cari Kod" field="calc_raw" area="account_id" items={CUSTOMER} handleChange={handleChange}/> 
                        </div>

                        <div className="flex flex-col space-y-3">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Analiz *
                          </label>
                          <Dropdown label="Analiz" field="calc_raw" area="analyze_Name" items={ANALYZE} handleChange={handleChange}/> 
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
                            onChange={(e) =>
                              handleChange("calc_raw", "LME", e)
                            }
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
                            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                            placeholder=""
                            required
                            onChange={(e) =>
                              handleChange("calc_raw", "usd", e)
                            }
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
                            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                            placeholder=""
                            required
                            onChange={(e) =>
                              handleChange("calc_raw", "euro", e)
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-3">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Ürün Tipi *
                          </label>
                          <Dropdown label="Tip" field="calc_raw" area="type" items={TYPE} handleChange={handleChange}/> 
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
                            Hammadde Fiyatı
                          </label>
                          <p className="font-poppins">{raw_tl} ₺</p>
                        </div>

                       

                        <div className="flex flex-col">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Döküm Kilogram Fiyatı (TL)
                          </label>
                          <p className="font-poppins text-red-700">{kgCost} ₺</p>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            TL Değeri 
                          </label>
                          <p className="font-poppins">{tl} ₺</p>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="small-input"
                            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                          >
                            Analiz Katsayısı
                          </label>
                          <p className="font-poppins">{coef}</p>

                          
                          
                        </div>
                        
                      </div>
                    </div>

                    
                  </form>
                  </div> : ""}
                  
                  
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
                    
                    
                    <Button disabled={!canSkip} onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Oluştur" : "ileri"}
                    </Button >
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
