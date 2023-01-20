import { useEffect, useState } from "react";
import ModalImage from "../../../ui/ModalImage";
export default function StrBush ({getMeasures, prevValues}) {
    const calculateWeight = (A8, B8, C8) => {
      return (((A8/2)*(A8/2)*3.14*C8*8.6-(B8/2)*(B8/2)*3.14*C8*8.6)/1000000);
    }

    //state
    const [fields, setFields] = useState({
      straigth_bush : {
        bigger_diameter : "straigth_bush" in prevValues
        ? "bigger_diameter" in prevValues.straigth_bush
          ? prevValues.straigth_bush.bigger_diameter
          : ""
        : "",
        inner_diameter : "straigth_bush" in prevValues
        ? "inner_diameter" in prevValues.straigth_bush
          ? prevValues.straigth_bush.inner_diameter
          : ""
        : "",
        length : "straigth_bush" in prevValues
        ? "length" in prevValues.straigth_bush
          ? prevValues.straigth_bush.length
          : ""
        : "",
      }
    });

    const  [calculated, setCalculated] =  useState({
      calcRaw  : "calcRaw" in prevValues ? prevValues.calcRaw  : ""
    })

    //handlers
    const handleChange = (field, area, e) => {
      setFields((old) => {
        return {
          straigth_bush: {
            ...old.straigth_bush,
            [area]: e.target.value,
          },
        };
      });
    };

    const handleValidation =  () => {
      let check_fields = fields;
      let isValid = true;
      if (check_fields["straigth_bush"]["bigger_diameter"] === "") {
        isValid = false;
      }
      if (check_fields["straigth_bush"]["inner_diameter"] === "") {
        isValid = false;
      }
      if (check_fields["straigth_bush"]["length"] === "") {
        isValid = false;
      }
      return isValid
    }

    //hooks

    useEffect(() => {
      let numbers = {...fields.straigth_bush}
      if (true) {
        const calc = calculateWeight(parseFloat(numbers.bigger_diameter), parseFloat(numbers.inner_diameter), parseFloat(numbers.length))
        setCalculated((old) => {
          return {
            ...old,
            calcRaw : calc
          }
        });

        
        
      } else {
       
      }
    }, [fields.straigth_bush.bigger_diameter, fields.straigth_bush.inner_diameter, fields.straigth_bush.length])

    useEffect(() => {
      getMeasures(handleValidation(), {
        straigth_bush : {...fields.straigth_bush},
        ...calculated
      });
    }, [calculated.calcRaw])
    
    
    return (
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
            <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Düz Burç Ölçüleri
                  </p>
                  <hr />
            </div>
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Büyük Çap *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.straigth_bush.bigger_diameter}
                onChange={(e) => {
                  handleChange("straigth_bush", "bigger_diameter",e);
                  
                } }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                İç Çap *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.straigth_bush.inner_diameter}
                onChange={(e) => {
                  handleChange("straigth_bush", "inner_diameter",e);
                  
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Boy  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.straigth_bush['length']}
                onChange={(e) => {
                  handleChange("straigth_bush", "length",e);
                  
              }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Hesaplanan Ağırlık
              </label>
              <p className="font-poppins text-red-700">{isNaN(calculated.calcRaw) ? "" : calculated.calcRaw}</p>
            </div>
            </div>

            <div className="flex flex-col">
              <ModalImage image={'/straightbush.png'} />
            </div>

            {/* <div className="flex flex-col">
              <p className="font-poppins text-red-700">UYARI: PAYLI/PAYSIZ ÖLÇÜ GİRİŞİNE DİKKAT EDİNİZ !</p>
            </div>
            {calcs.calcW < 1 ? <div className="flex flex-col">
              <p className="font-poppins text-red-700">UYARI: 1 kg. altı ÜRÜN</p>
            </div>: "" } */}
            
        </div>
    );
}