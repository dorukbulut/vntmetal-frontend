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
import RawCalc from "./RawCalc";

//TODO-1 Guide user to select between material calculate vs anlaşmalı olarak devam et.
//TODO-2 Roadmap Material Hesaplama :
//TODO-2-1 Hammadde hesaplama güncelle
//TODO-2-2 5 Ana Ürün oluşturma seçenekleri ekle.
//TODO-2-3 5 Güncelleme ve silme özellikleri

//TODO-3 Roadmap Teklif :
//TODO-3-1 5 Ana Ürün oluşturma seçenekleri ekle.
//TODO-3-2 5 Güncelleme ve silme özellikleri
const steps = ["Teklif Tipi Seç", "Teklifi Hazırla", "Teklifi Oluştur", "Teklifi Kaydet"];

const QUOTYPE = [
  {key : "Anlaşmalı Teklif Hazırlama", value : "0"},
  {key : "Hammade Üzerinden Teklif Hazırlama", value: "1"}
]

export default function CreateMake({ analyzes, customers }) {

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
    }
  })

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
    const new_fields = fields
    new_fields[field][area] = e.target.value

    setFields(new_fields)
    console.log(fields);
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
                      </p>) : (<RawCalc analyzes={analyzes} customers={customers}></RawCalc>)
                    ) : ("")
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

                    <Button disabled={false} onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Oluştur" : "ileri"}
                    </Button>
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