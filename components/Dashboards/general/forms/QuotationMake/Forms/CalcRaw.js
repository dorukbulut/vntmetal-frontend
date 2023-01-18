import Dropdown from "../../Common/Dropdown";
import { use, useEffect, useState } from "react";

const TYPE = [
    { key: "Düz Burç", value: "Düz Burç" },
    { key: "Plaka", value: "Plaka" },
    { key: "Flanşlı Burç", value: "Flanşlı Burç" },
    { key: "Ortadan Flanşlı Burç", value: "Ortadan Flanşlı Burç" },
    { key: "Çift Flanşlı Burç", value: "Çift Flanşlı Burç" },
  ];

export default function CalculateRaw({customers, analyzes}) {

    //constants
    const ANALYZE = analyzes.map((analyse) => {
        return {
          key: analyse.analyze_Name,
          value : analyse.analyze_id,
          TIN : analyse.analyze_coefTin,
          COPPER : analyse.analyze_coefCopper
        };
      });
    
      const CUSTOMER = customers.map((customer) => {
        return {
          key: customer.account_id,
          value: customer.account_id,
        };
      });
    

    //states
    const [fields, setFields] = useState({
      calc_raw : {
        account_id : '',
        analyze_Name : '',
        LME  : '',
        TIN : '',
        usd  : '',
        euro : '',
        type : '',
        workmanship : ''
      }
    });
    
    const [calculated, setCalculated] = useState({
        COPPER : '',
        TIN : '',
        priceCopper : '',
        priceTin : '',
        totalRaw : '',
        kgPrice : ''

    })

    //hooks
    // react hook for analyse
    useEffect(() => {
        
        const item = ANALYZE.find(analyse => analyse.value === fields.calc_raw.analyze_Name);
        
        if (item !== undefined) {
            setCalculated((old) => {
                return {
                    ...old,
                    TIN : item.TIN,
                    COPPER : item.COPPER
                }
            })

        
        }
        
    }, [fields.calc_raw.analyze_Name])

    //for Copper Prices TODO
    useEffect(() => {
      setCalculated((old) => {
        let inter = (parseFloat(fields.calc_raw.LME)) * parseFloat(fields.calc_raw.usd);
        let price = ((inter * parseFloat(old.COPPER)) / 1000).toFixed(2);

        return {
          ...old,
          priceCopper : price,
        }
      });
    }, [
      fields.calc_raw.LME,
      fields.calc_raw.usd,
      fields.calc_raw.analyze_Name
    ])

    //for TIN

    useEffect(() => {
      setCalculated((old) => {
        let inter = (parseFloat(fields.calc_raw.TIN)) * parseFloat(fields.calc_raw.usd);
        let price = (((inter * 1000) * parseFloat(old.TIN)) / 100).toFixed(2);

        return {
          ...old,
          priceTin : price,
        }
      });
    }, [
      fields.calc_raw.TIN,
      fields.calc_raw.usd,
      fields.calc_raw.analyze_Name
    ])

    // for totalCalc

    useEffect(() => {
      setCalculated((old) => {
        return {
          ...old, 

          totalRaw : parseFloat(calculated.priceCopper) + parseFloat(calculated.priceTin)
        }
      });
    }, [calculated.priceCopper, calculated.priceTin] );

    // for kgPrice

    useEffect(() => {
      setCalculated((old) => {
        return {
          ...old,
          kgPrice : (parseFloat(fields.calc_raw.workmanship) + parseFloat(old.totalRaw)).toFixed(2)
        }
      });
    }, [calculated.totalRaw, fields.calc_raw.workmanship]);
    
    //handlers
    const handleChange =  (field, area, e) => {
      setFields(old => {
        return {
          calc_raw : {
            ...old.calc_raw,
            [area] : e.target.value
          }
        }
      });

      
    };
    return (
        <div className="mt-10">
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
                id={"LME"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                defaultValue={fields['calc_raw']["LME"]}
                required
                onChange={(e) => handleChange('calc_raw', 'LME', e)}
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
              <p className="font-poppins">{calculated.totalRaw}</p>
            </div>

            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Bakır ₺ Değeri
              </label>
              <p className="font-poppins">{calculated.priceCopper} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kalay ₺ Değeri
              </label>
              <p className="font-poppins">{calculated.TIN} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Bakır Analiz Katsayısı
              </label>
              <p className="font-poppins">{calculated.COPPER}</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kalay Analiz Katsayısı
              </label>
              <p className="font-poppins">{calculated.TIN}</p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Döküm Kilogram Fiyatı (₺)
              </label>
              <p className="font-poppins text-red-700">{calculated.kgPrice} ₺</p>
            </div>
          </div>
        </div>
      </form>
    </div>
    );
};