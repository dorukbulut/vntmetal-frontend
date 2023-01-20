import Dropdown from "../../Common/Dropdown";
import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function QuotationItem({ name, children, kgPrice, usd, euro,getCalcRaw, prevValues}) {
  //states

  const [fields, setFields] = useState({
    quotation_item: {
      unit_frequence: "unit_frequence" in prevValues ? prevValues.unit_frequence : "",
      model_price: "model_price" in prevValues ? prevValues.model_price : "",
      model_firm: "model_firm" in prevValues ? prevValues.model_firm : "",
      treatment_price: "treatment_price" in prevValues ? prevValues.treatment_price : "",
      treatment_firm: "treatment_firm" in prevValues ? prevValues.treatment_firm : "",
      test_price: "test_price" in prevValues ? prevValues.test_price : "",
      benefit: "benefit" in prevValues ? prevValues.benefit : "",
      alterPrice: "alterPrice" in prevValues ? prevValues.alterPrice : "",
      totalSalePrice : "totalSalePrice" in prevValues ? prevValues.totalSalePrice : [],
      totalPrice : "totalPrice" in prevValues ? prevValues.totalPrice : "",
    },
  });

  const [calculated, setCalculated] = useState({
    modelUnitPrice: "modelUnitPrice" in prevValues ? prevValues.modelUnitPrice : "",
    totalCost: "totalCost" in prevValues ? prevValues.totalCost : "",
  });

  const [molding, setMolding] = useState({
    validity: false,
    values: {},
  });

  
  //handlers

  const getMeasures = (validity, values) => {
    setMolding((old) => {
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

  const handleChange = (field, area, e) => {
    setFields((old) => {
      return {
        quotation_item: {
          ...old.quotation_item,
          [area]: e.target.value,
        },
      };
    });
  };

  const handleValidation = () => {
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
    if (check_fields["quotation_item"]["totalPrice"] === "") {
      isValid = false;
    }


    return isValid
  }

  

  //hooks
  useEffect(() => {
    if (
      parseInt(fields.quotation_item.unit_frequence) !== 0 &&
      !isNaN(fields.quotation_item.unit_frequence)
    ) {
      setCalculated((old) => {
        return {
          ...old,
          modelUnitPrice: (
            parseFloat(fields.quotation_item.model_price) /
            parseFloat(fields.quotation_item.unit_frequence)
          ).toFixed(2),
        };
      });
    }
  }, [fields.quotation_item.model_price, fields.quotation_item.unit_frequence]);

  useEffect(() => {
    setCalculated((old) => {
      console.log()
      return {
        ...old,
        totalCost: (
          parseFloat(calculated.modelUnitPrice) +
          parseFloat(fields.quotation_item.test_price) +
          parseFloat(fields.quotation_item.treatment_price) +
          parseFloat((molding.values.calcRaw * kgPrice))
        ).toFixed(2),
      };
    });
  }, [
    calculated.modelUnitPrice,
    fields.quotation_item.test_price,
    fields.quotation_item.treatment_price,
    molding.values.calcRaw,
  ]);
  useEffect(() => {
    getCalcRaw(handleValidation() && molding.validity, {

      ...fields.quotation_item,
      ...calculated,
      ...molding.values
      
    });
  }, [molding.validity,molding.values,fields, calculated])
  useEffect(() => {
    let sale = (parseFloat(calculated.totalCost) +  parseFloat(calculated.totalCost) * parseFloat(fields["quotation_item"]["benefit"]) / 100).toFixed(2)
    let tCost = [{value : parseFloat(sale).toFixed(2), key : `${parseFloat(sale).toFixed(2)} ₺ `}, 
    {value : (sale * parseFloat(usd)).toFixed(2), key : `${(sale / parseFloat(usd)).toFixed(2)} $ `},
    {value : (sale * parseFloat(euro)).toFixed(2), key : `${(sale / parseFloat(euro)).toFixed(2)} € `},
    {value : parseFloat(fields["quotation_item"]["alterPrice"]).toFixed(2), key : `${(parseFloat(fields["quotation_item"]["alterPrice"])).toFixed(2)} ₺ `},
    {value : (parseFloat(fields["quotation_item"]["alterPrice"]) * parseFloat(usd)).toFixed(2), key : `${(parseFloat(fields["quotation_item"]["alterPrice"]) / parseFloat(usd)).toFixed(2)} $ `},
    {value : (parseFloat(fields["quotation_item"]["alterPrice"]) * parseFloat(euro)).toFixed(2), key : `${(parseFloat(fields["quotation_item"]["alterPrice"]) / parseFloat(euro)).toFixed(2)} € `},
  ]
    setFields((old) => {
      return {
        ...old,
        quotation_item : {
          ...old.quotation_item,
          totalSalePrice : tCost,
          totalPrice : ""
        }
      }
    })
  }, [fields.quotation_item.benefit, fields.quotation_item.alterPrice, calculated.totalCost])
  //utils
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { getMeasures, prevValues });
    }
    return child;
  });

  return (
    <div className="mt-10 lg:grid lg:place-items-center">
      <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
        Yeni {name}
      </p>
      <div className="grid grid-cols-1 space-y-5 lg:grid lg:grid-cols-2 space-x-10 ">
        {childrenWithProps}
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
          <div className="space-y-2 lg:w-1/2">
            <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
              {name} Oluştur
            </p>
            <hr />
          </div>
          <div className="space-y-5 lg:grid lg:grid-cols-3 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Adet *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields["quotation_item"]["unit_frequence"]}
                required
                onChange={(e) => {
                  handleChange("quotation_item", "unit_frequence", e);
                }}
              />
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

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Döküm Fiyatı (₺)
              </label>
              <p className="font-poppins">
                {(molding.values.calcRaw * parseFloat(kgPrice)).toFixed(2)} ₺
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Model Fiyatı *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields["quotation_item"]["model_price"]}
                required
                onChange={(e) => {
                  handleChange("quotation_item", "model_price", e);
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Model Adet Fiyatı (₺)
              </label>
              <p className="font-poppins">
                {isNaN(calculated.modelUnitPrice)
                  ? ""
                  : calculated.modelUnitPrice}{" "}
                ₺
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Model Firma Adı *
              </label>
              <input
                type="text"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["quotation_item"]["model_firm"]}
                onChange={(e) =>
                  handleChange("quotation_item", "model_firm", e)
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                İşleme Fiyatı *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields.quotation_item.treatment_price}
                required
                onChange={(e) =>
                  handleChange("quotation_item", "treatment_price", e)
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                İşleme Firma Adı *
              </label>
              <input
                type="text"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["quotation_item"]["treatment_firm"]}
                onChange={(e) =>
                  handleChange("quotation_item", "treatment_firm", e)
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Test Fiyatı *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields.quotation_item.test_price}
                required
                onChange={(e) =>
                  handleChange("quotation_item", "test_price", e)
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Maliyet (₺)
              </label>
              <p className="font-poppins text-red-700">
                {isNaN(calculated.totalCost) ? "" : calculated.totalCost} ₺
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kar Oranı(yüzde) *
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["quotation_item"]["benefit"]}
                onChange={(e) => handleChange("quotation_item", "benefit", e)}
              />
            </div>

           

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Alternatif Fiyat *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["quotation_item"]["alterPrice"]}
                onChange={(e) =>
                  handleChange("quotation_item", "alterPrice", e)
                }
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Satış Fiyatı
              </label>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Fiyat</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Fiyat"
        displayEmpty
        value={fields.quotation_item.totalPrice}
        onChange={(e) => handleChange("quotation_item", "totalPrice", e)}
      >
        <MenuItem value="">Fiyat Seçiniz</MenuItem>
        {fields.quotation_item.totalSalePrice.map((price, i)=> {
          return  <MenuItem key={i} value={price.value}>{price.key}</MenuItem>
        })}
      </Select>
    </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
