"use client";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step, { useStepContext } from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import QuotationItem from "./QuotationItem";
import CalculateRaw from "./CalcRaw";
import Contracted from "./Contracted";
import Loading from "../../../../../base/Loading";
import Alert from "../../../../../base/alert";
import { delay } from "../../../../../../app/utils";
import Link from "next/link";
import DropDown from "../../../../../base/autocomplete";
import { isValid } from "../../../../../../app/valid";

import {
  steps,
  TYPE,
  QUOTYPE,
  TYPE_COMPS,
} from "../../../../../../utils/mappers";
import QuotationItemService from "../../../../../../services/QuotationService/QuotationItemService";
import CustomerService from "../../../../../../services/CustomerService";
import AnalysisService from "../../../../../../services/AnalysisService";

export default function CreateMake({ type, prevType, prevId, id }) {
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const [valid, setValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [fields, setFields] = useState({ title: "" });

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
    if (check_fields["title"] === "") {
      isValid = false;
    }

    return isValid;
  };

  // states
  const [calcRaws, setCalcRaws] = useState({
    validity: false,
    values: {},
  });

  const [CUSTOMER, setCustomer] = useState([]);
  const [ANALYZE, setAnalyze] = useState([]);

  //hooks
  React.useEffect(() => {
    AnalysisService.getAllAnalyze().then((res) => {
      if (res.status === 200) {
        const temp = res.data.analyzes.map((analyse) => {
          return {
            title: analyse.analyze_Name,
            id: analyse.analyze_id,
            TIN: analyse.analyze_coefTin,
            COPPER: analyse.analyze_coefCopper,
          };
        });

        setAnalyze(temp);
      }
    });
  }, []);
  React.useEffect(() => {
    CustomerService.getAllCustomers().then((res) => {
      if (res.status === 200) {
        const temp = res.data.customers.map((customer) => {
          return {
            title: customer.account_id,
            id: customer.account_id,
          };
        });

        setCustomer(temp);
      }
    });
  }, []);

  React.useEffect(() => {
    const check_valid = {
      a:
        fields?.title === undefined || fields?.title === null
          ? ""
          : fields?.title,
    };
    setValid(isValid(check_valid));
  }, [fields]);

  //handlers
  const getCalcRaw = (validity, values) => {
    setCalcRaws((old) => {
      return {
        ...old,
        validity: validity,
        values: {
          ...old.values,
          ...values,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Kalem Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });

    let data = {};
    const Unitprice = calcRaws.values.totalPrice.split(" ");
    const analyzeID = ANALYZE.find(
      (item) => item.title === calcRaws.values.analyze_Name
    ).id;
    const tp = TYPE.find((item) => item.title === calcRaws.values.type).value;
    const quo = QUOTYPE.find((item) => item.title === fields.title).id;
    const standartOptions = {
      Customer_ID: calcRaws.values.account_id,
      Analyze_ID: analyzeID,
      unit_frequence: calcRaws.values.unit_frequence,
      unit_price: parseFloat(Unitprice[0]),
      calcRaw: parseFloat(calcRaws.values.calcRaw).toFixed(2),
      currency: Unitprice[1],
      benefitPercent: calcRaws.values.benefit,
      model_price: calcRaws.values.model_price,
      model_firm: calcRaws.values.model_firm,
      treatment_price: calcRaws.values.treatment_price,
      test_price: calcRaws.values.test_price,
      alternativeSale_price: calcRaws.values.alterPrice,
      treatment_firm: calcRaws.values.treatment_firm,
      euro: calcRaws.values.euro,
      lmeCopper:
        calcRaws.values.LME === undefined || calcRaws.values.LME === ""
          ? 0
          : calcRaws.values.LME,
      lmeTin:
        calcRaws.values.TINP === undefined || calcRaws.values.TINP === ""
          ? 0
          : calcRaws.values.TINP,
      type: quo,
      kgPrice: calcRaws.values.kgPrice,
      usd: calcRaws.values.usd,
      itemType: tp,
    };

    switch (tp) {
      case "plate_strip":
        const plate_item = calcRaws.values.plate_strip;
        data = {
          options: {
            ...standartOptions,
            dimensions: `${plate_item.width}*${plate_item["length"]}*${plate_item.thickness}mm`,
            plate_strip: {
              ...plate_item,
            },
          },
        };
        break;
      case "straight_bush":
        const str_item = calcRaws.values.straight_bush;
        data = {
          options: {
            ...standartOptions,
            dimensions: `Q${str_item.large_diameter}*Q${str_item.inner_diameter}*${str_item.bush_length}mm`,
            straight_bush: {
              ...str_item,
            },
          },
        };
        break;
      case "bracket_bush":
        let bracket_item = calcRaws.values.bracket_bush;
        data = {
          options: {
            ...standartOptions,
            dimensions: `Q${bracket_item.bigger_diameter}*Q${bracket_item.inner_diameter}*Q${bracket_item.body_diameter}*${bracket_item.bush_length}*${bracket_item.bracket_length}mm`,
            bracket_bush: {
              ...bracket_item,
            },
          },
        };
        break;
      case "doublebracket_bush":
        const double_bracket = calcRaws.values.doublebracket_bush;
        data = {
          options: {
            ...standartOptions,
            dimensions: `Q${double_bracket.bigger_diameter}*Q${double_bracket.inner_diameter}*Q${double_bracket.body_diameter}*${double_bracket.bracket_l1}*${double_bracket.bracket_l2}*${double_bracket.bracket_l3}*${double_bracket.bracket_full}mm`,
            doublebracket_bush: {
              ...double_bracket,
            },
          },
        };
        break;
      case "middlebracket_bush":
        const middle_bracket = calcRaws.values.middlebracket_bush;
        data = {
          options: {
            ...standartOptions,
            dimensions: `Q${middle_bracket.bracket_q1}*Q${middle_bracket.bracket_q2}*Q${middle_bracket.bracket_q3}*Q${middle_bracket.bracket_q4}*${middle_bracket.bracket_l1}*${middle_bracket.bracket_l2}*${middle_bracket.bracket_l3}*${middle_bracket.bracket_full}mm`,
            middlebracket_bush: {
              ...middle_bracket,
            },
          },
        };
        break;
    }

    try {
      const res = await QuotationItemService.createItem(data);
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Kalem Oluşturuldu !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(
          `/order-module/quotation/form?type=${prevType}&id=${prevId}`
        );
      }
    } catch (err) {
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Kalem Oluşturulamadı !",
        title: "Hata",
      });
    }
  };

  //hooks

  React.useEffect(() => {
    if (type === "update") {
      QuotationItemService.getByID(id).then((res) => {
        const old_item = res.data[0];

        setFields({
          title: QUOTYPE.find((item) => item.id === old_item.type).title,
          id: old_item.type,
        });
        setCalcRaws({
          validity: false,
          values: Object.assign(old_item, {
            account_id:
              "Customer_ID" in old_item ? `${old_item.Customer_ID}` : "",
            analyze_Name: old_item.analyze.analyze_Name,
            benefit:
              "benefitPercent" in old_item ? old_item.benefitPercent : "",
            alterPrice:
              "alternativeSale_price" in old_item
                ? old_item.alternativeSale_price
                : "",
            LME: "lmeCopper" in old_item ? old_item.lmeCopper : "",
            TINP: "lmeTin" in old_item ? old_item.lmeTin : "",
            type: TYPE.find((item) => item.value === old_item.itemType).title,
          }),
        });
        setActiveStep(type === "update" ? 2 : 0);
      });
    }
  }, []);

  return (
    <div>
      <Alert error={error} />
      {!isLoading && (
        <div className="relative lg:top-3 top-20 mx-auto p-5 lg:w-full lg:w-full rounded-md bg-white p-10">
          <Link
            href={{
              pathname: "/order-module/quotation/form",
              query: {
                type: prevType,
                id: prevId,
              },
            }}
            passHref
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 relative top-0 left-0 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>

          <div
            className={`${
              true ? "visible scale-100" : "invisible scale-0 h-0"
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
                            <DropDown
                              dropDownOptions={{ label: "Teklif Tipi Seç" }}
                              data={QUOTYPE}
                              setData={setFields}
                              prevValue={fields}
                              valid={valid}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}

                  {activeStep == 1 ? (
                    fields.id == 0 ? (
                      <Contracted
                        type={type}
                        TYPE={TYPE}
                        prevValues={calcRaws}
                        getCalcRaw={getCalcRaw}
                        ANALYZE={ANALYZE}
                        CUSTOMER={CUSTOMER}
                      />
                    ) : (
                      <CalculateRaw
                        TYPE={TYPE}
                        ANALYZE={ANALYZE}
                        CUSTOMER={CUSTOMER}
                        prevValues={calcRaws}
                        customers={CUSTOMER}
                        type={type}
                        analyzes={ANALYZE}
                        getCalcRaw={getCalcRaw}
                      />
                    )
                  ) : (
                    ""
                  )}

                  {activeStep == 2 ? (
                    <QuotationItem
                      type={type}
                      getCalcRaw={getCalcRaw}
                      euro={calcRaws.values.euro}
                      usd={calcRaws.values.usd}
                      prevValues={calcRaws.values}
                      kgPrice={calcRaws.values.kgPrice}
                      name={
                        TYPE.find(
                          (item) => item.title === calcRaws?.values?.type
                        )?.value
                      }
                    >
                      {" "}
                      {
                        TYPE_COMPS[
                          TYPE.find(
                            (item) => item.title === calcRaws?.values?.type
                          )?.value
                        ]
                      }{" "}
                    </QuotationItem>
                  ) : (
                    ""
                  )}

                  {activeStep == 3 ? (
                    <p className="text-lg mt-10 leading-6 font-roboto text-green-500 text-center">
                      Bütün bilgiler başarıyla dolduruldu. Teklif Oluşturmak
                      için Oluştur seçeneğine tıklayınız.
                    </p>
                  ) : (
                    ""
                  )}

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
                    {activeStep === 0 ? (
                      <Button disabled={!valid} onClick={handleNext}>
                        {"ileri"}
                      </Button>
                    ) : (
                      ""
                    )}

                    {activeStep === 1 ? (
                      <Button
                        disabled={!calcRaws.validity}
                        onClick={handleNext}
                      >
                        {"ileri"}
                      </Button>
                    ) : (
                      ""
                    )}
                    {activeStep === 2 ? (
                      <Button
                        disabled={!calcRaws.validity}
                        onClick={handleNext}
                      >
                        {"ileri"}
                      </Button>
                    ) : (
                      ""
                    )}

                    {activeStep === 3 ? (
                      <Button
                        disabled={false}
                        onClick={async (e) => {
                          await handleSubmit(e);
                          handleNext(e);
                        }}
                      >
                        {"Oluştur"}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
