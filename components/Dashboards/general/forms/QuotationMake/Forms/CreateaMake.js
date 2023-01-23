import { useState} from "react";
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step, { useStepContext } from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Dropdown from "../../Common/Dropdown";
import QuotationItem from "./QuotationItem";
import CalculateRaw from "./CalcRaw";
import Contracted from "./Contracted";
import StrBush from "../TypeForms/StrBush";
import PlateStrip from "../TypeForms/PlateStrip";
import BracketBush from "../TypeForms/BracketBush"
import DoubleBracketBush from "../TypeForms/DoubleBracketBush";
import MiddleBracketBush from "../TypeForms/MiddleBracketBush";


const TYPE = [
  { key: "Düz Burç", value: "Düz Burç" },
  { key: "Plaka", value: "Plaka" },
  { key: "Flanşlı Burç", value: "Flanşlı Burç" },
  { key: "Ortadan Flanşlı Burç", value: "Ortadan Flanşlı Burç" },
  { key: "Çift Flanşlı Burç", value: "Çift Flanşlı Burç" },
];
const QUOTYPE = [
  {key : "Anlaşmalı Teklif Hazırlama", value : "0"},
  {key : "Hammade Üzerinden Teklif Hazırlama", value: "1"}
]
const TYPE_COMPS = {
  "Düz Burç" : <StrBush />,
  "Plaka" : <PlateStrip />,
  "Flanşlı Burç" : <BracketBush />,
  "Çift Flanşlı Burç": <DoubleBracketBush />,
  "Ortadan Flanşlı Burç" : <MiddleBracketBush />
}



const steps = ["Teklif Tipi Seç", "Teklif Hazırla", "Teklif Oluştur", "İşlemi Tamamla"];

export default function CreateMake({ analyzes, customers, prevValues, type}) {

  const CUSTOMER = customers.map((customer) => {
    return {
      key: customer.account_id,
      value: customer.account_id,
    };
  });

  const ANALYZE = analyzes.map((analyse) => {
    return {
      key: analyse.analyze_Name,
      value: analyse.analyze_id,
      TIN: analyse.analyze_coefTin,
      COPPER: analyse.analyze_coefCopper,
    };
  });
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [activeStep, setActiveStep] = useState(type === "update" ? 2 : 0);
  const [skipped, setSkipped] = useState(new Set());
  
  const router = useRouter();

  const [fields, setFields] = useState({
    quo_type  :  {
      quo_type_name : "type" in prevValues ? prevValues.type : ""
    },
  });

  const [canSkipStep1, setCanSkip1] = useState(false);
  

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

    setCanSkip1(handleValidation1()); 
      
  };

  // states 
  const [calcRaws, setCalcRaws] = useState({
    validity : false,

    values  : type === "update" ?  {
      ...prevValues,
      "account_id" : "Customer_ID" in prevValues ? prevValues.Customer_ID : "",
      "analyze_Name" : "Analyze_ID" in prevValues ?  prevValues.Analyze_ID: "",
      "benefit"  : "benefitPercent" in prevValues ? prevValues.benefitPercent : "",
      "alterPrice"  :  "alternativeSale_price" in prevValues ? prevValues.alternativeSale_price : "",
      "LME" : "lmeCopper" in prevValues ? prevValues.lmeCopper : "",
      "TINP" : "lmeTin" in prevValues ? prevValues.lmeTin : "",
      "type" : prevValues.middlebracket_bush !== null ? "Ortadan Flanşlı Burç" :  prevValues.doublebracket_bush !==null ?
      "Çift Flanşlı Burç" :  prevValues.bracket_bush !==null ? "Flanşlı Burç" : prevValues.straight_bush !== null  ? "Düz Burç" :
      prevValues.plate_strip !== null ? "Plaka" : ""

    } : {}
     
  });

  

  //handlers
  const getCalcRaw = (validity, values) => {
    setCalcRaws((old) => {
      return {
        ...old,
        "validity" : validity,
        "values" : {
          ...old.values,
          ...values
        } 
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {}
    const Unitprice = calcRaws.values.totalPrice.split(" ");
    const  standartOptions = {
            "Customer_ID": calcRaws.values.account_id,
            "Analyze_ID" : calcRaws.values.analyze_Name,
            "unit_frequence" : calcRaws.values.unit_frequence,
            "unit_price" : parseFloat(Unitprice[0]),
            "currency" : Unitprice[1],
            "benefitPercent" : calcRaws.values.benefit,
            "model_price" : calcRaws.values.model_price,
            "model_firm" : calcRaws.values.model_firm,
            "treatment_price" : calcRaws.values.treatment_price,
            "test_price" : calcRaws.values.test_price,
            "alternativeSale_price" : calcRaws.values.alterPrice,
            "treatment_firm" : calcRaws.values.treatment_firm,
            "euro" : calcRaws.values.euro,
            "lmeCopper" : calcRaws.values.LME !== undefined || calcRaws.values.LME !== '' ? calcRaws.values.LME : 0  ,
            "lmeTin": calcRaws.values.TINP !== undefined || calcRaws.values.TINP !== '' ? calcRaws.values.TINP : 0 ,
            "type" : fields.quo_type.quo_type_name,
            "kgPrice" : calcRaws.values.kgPrice,
            "usd" : calcRaws.values.usd,
    }
    
    switch (calcRaws.values.type) {
      case "Plaka":
        data = {
          "options" : {
            ...standartOptions,
            "plate_strip" : {
              ...calcRaws.values.plate_strip
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
               ...calcRaws.values.straight_bush
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
              ...calcRaws.values.bracket_bush
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
              ...calcRaws.values.doublebracket_bush
              
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
             ...calcRaws.values.middlebracket_bush
              
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

  //hooks
  React.useEffect(() => {
    setCanSkip1(handleValidation1());
  }, [prevValues]);
  return (
    <div>
      {type === "update" ? <a
        onClick={toggleCreate}
        className="hover:cursor-pointer font-medium text-text-fuchsia-500 dark:text-fuchsia-400-600 dark:text-text-fuchsia-500 dark:text-fuchsia-400-500 hover:underline"
      >
        Düzenle
      </a>: <button
        className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleCreate}
      >
        + Teklif Hazırla
      </button>}
      

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
                      fields.quo_type.quo_type_name == 0 ? (<Contracted type={type}  TYPE={TYPE} prevValues={calcRaws} getCalcRaw={getCalcRaw} ANALYZE={ANALYZE} CUSTOMER={CUSTOMER} />) : (<CalculateRaw TYPE={TYPE} ANALYZE={ANALYZE} CUSTOMER={CUSTOMER} prevValues={calcRaws} customers={customers} type={type} analyzes={analyzes} getCalcRaw={getCalcRaw} />)
                    ) : ("")
                  }

                  {
                    activeStep == 2 ? <QuotationItem type={type}  getCalcRaw={getCalcRaw} euro={calcRaws.values.euro} usd={calcRaws.values.usd}  prevValues={calcRaws.values} kgPrice={calcRaws.values.kgPrice} name={calcRaws.values.type}> {TYPE_COMPS[calcRaws.values.type]} </QuotationItem> : ""
                  }

                  {
                    activeStep == 3 ? <p className="text-lg mt-10 leading-6 font-medium text-green-500 text-center">Bütün bilgiler başarıyla dolduruldu. Teklif Oluşturmak için Oluştur seçeneğine tıklayınız.</p>: ""
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
                      activeStep === 1 ?  <Button disabled={!calcRaws.validity} onClick={handleNext}>
                      { "ileri"}
                    </Button> : ''
                    }
                    {
                      activeStep === 2 ?  <Button disabled={!calcRaws.validity} onClick={handleNext}>
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
