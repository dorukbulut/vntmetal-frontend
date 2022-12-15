import Dropdown from "./Dropdown";
import { useState } from "react";
const TYPE = [
  { key: "Düz Burç", value: "0" },
  { key: "Plaka", value: "1" },
  { key: "Flanşlı Burç", value: "2" },
  { key: "Ortadan Flanşlı Burç", value: "2" },
  { key: "Çift Flanşlı Burç", value: "2" },
];
export default function RawCalc({ analyzes, customers}){
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
  };
  const ANALYZE = analyzes.map((analyse) => {
    return {
      key: analyse.analyze_Name,
      value: analyse.analyze_coef,
    };
  });

  const CUSTOMER = customers.map((customer) => {
    return {
      key: customer.account_id,
      value: customer.account_id,
    };
  });
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
                onChange={(e) => handleChange("calc_raw", "LME", e)}
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
              <p className="font-poppins">{} ₺</p>
            </div>

            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Bakır ₺ Değeri
              </label>
              <p className="font-poppins">{} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kalay ₺ Değeri
              </label>
              <p className="font-poppins">{} ₺</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Bakır Analiz Katsayısı
              </label>
              <p className="font-poppins">{}</p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kalay Analiz Katsayısı
              </label>
              <p className="font-poppins">{}</p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Döküm Kilogram Fiyatı (₺)
              </label>
              <p className="font-poppins text-red-700">{} ₺</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
