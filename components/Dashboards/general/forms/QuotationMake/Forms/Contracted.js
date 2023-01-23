import Dropdown from "../../Common/Dropdown";
import { useRef, useEffect, useState } from "react";



export default function Contracted ({CUSTOMER, TYPE ,ANALYZE,prevValues, getCalcRaw, type}) {

    //state

    const [fields, setFields] = useState({
        calc_raw : {
            account_id : "account_id" in prevValues.values ? prevValues.values.account_id : "",
            analyze_Name : "analyze_Name" in prevValues.values ? prevValues.values.analyze_Name : "",
            usd : "usd" in prevValues.values ? prevValues.values.usd : "",
            euro : "euro" in prevValues.values ? prevValues.values.euro : "",
            type : "type" in prevValues.values ? prevValues.values.type : "",
            kgPrice : "kgPrice" in prevValues.values ? prevValues.values.kgPrice : ""

        }
    })

    

    //handlers

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
    
       
    
        // euro
        if (check_fields["calc_raw"]["euro"] === "") {
          isValid = false;
        }
    
        // usd
        if (check_fields["calc_raw"]["usd"] === "") {
          isValid = false;
        }
    
        // kgPrice
        if (check_fields["calc_raw"]["kgPrice"] === "" || isNaN(check_fields["calc_raw"]["kgPrice"])) {
          isValid = false;
        }
    
        // type
        if (check_fields["calc_raw"]["type"] === "") {
          isValid = false;
        }
        return isValid;
    }

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

      //hooks

    useEffect(() => {
        getCalcRaw(handleValidation(), {
            ...fields.calc_raw
        })
    }, [fields]);

    return (
        <div className="mt-10">
                      {type === "update" ? <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-yellow-600">
        Teklifi Güncelle
      </p> : <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
        Yeni Teklif
      </p> }
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
                fields={fields}
                items={ANALYZE}
                handleChange={handleChange}
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
                Döküm Kilogram Fiyatı*
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields["calc_raw"]["kgPrice"]}
                required
                onChange={
                    (e) => handleChange("calc_raw", "kgPrice", e)
                }
              />
            </div>
                          </div>
                        </div>
                      </form>
                    </div>
    );
}