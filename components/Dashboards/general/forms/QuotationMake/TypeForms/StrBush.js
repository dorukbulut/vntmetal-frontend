import { useEffect, useState } from "react";
import ModalImage from "../../../ui/ModalImage";
import Alert from "./Alert";
export default function StrBush ({getMeasures, prevValues}) {
    const calculateWeight = (A8, B8, C8) => {
      return (((A8/2)*(A8/2)*3.14*C8*8.6-(B8/2)*(B8/2)*3.14*C8*8.6)/1000000);
    }

    //state
    const [fields, setFields] = useState({
      straight_bush : {
        large_diameter : "straight_bush" in prevValues && prevValues.straight_bush !== null
        ? "large_diameter" in prevValues.straight_bush
          ? prevValues.straight_bush.large_diameter
          : ""
        : "",
        inner_diameter : "straight_bush" in prevValues  && prevValues.straight_bush !== null
        ? "inner_diameter" in prevValues.straight_bush
          ? prevValues.straight_bush.inner_diameter
          : ""
        : "",
        bush_length : "straight_bush" in prevValues  && prevValues.straight_bush !== null
        ? "bush_length" in prevValues.straight_bush
          ? prevValues.straight_bush.bush_length
          : ""
        : "",
      }
    });

    const [warning, setWarning] = useState({
      message : "",
      validity : false,
      clicked : []
    });

    const  [calculated, setCalculated] =  useState({
      calcRaw  : "calcRaw" in prevValues ? prevValues.calcRaw  : ""
    })

    //handlers
    const handleChange = (field, area, e) => {
      setFields((old) => {
        return {
          straight_bush: {
            ...old.straight_bush,
            [area]: e.target.value,
          },
        };
      });
    };

    const handleValidation =  () => {
      let check_fields = fields;
      let isValid = true;
      if (check_fields["straight_bush"]["large_diameter"] === "") {
        isValid = false;
      }
      if (check_fields["straight_bush"]["inner_diameter"] === "") {
        isValid = false;
      }
      if (check_fields["straight_bush"]["bush_length"] === "") {
        isValid = false;
      }
      return isValid
    }

    const toggleWarning = (e) => {
      if(!warning.clicked.includes(e.target.id)){
        setWarning((old) => {
          let new_arr = old.clicked
          new_arr.push(e.target.id)
          return {
            message : "Paylı/Paysız ölçü girişine dikkat ediniz",
            validity : true,
            clicked : new_arr
          }
        });
      }
    }
  
    //hooks

    useEffect(() => {
      let numbers = {...fields.straight_bush}
      if (true) {
        const calc = calculateWeight(parseFloat(numbers.large_diameter), parseFloat(numbers.inner_diameter), parseFloat(numbers.bush_length))
        setCalculated((old) => {
          return {
            ...old,
            calcRaw : calc
          }
        });

        
        
      } else {
       
      }
    }, [fields.straight_bush.large_diameter, fields.straight_bush.inner_diameter, fields.straight_bush.bush_length])

    useEffect(() => {
      getMeasures(handleValidation(), {
        straight_bush : {...fields.straight_bush},
        ...calculated
      });
    }, [calculated.calcRaw, fields]);

    useEffect(() => {
      if(calculated.calcRaw < 1) {
        setWarning((old) => {
          return {
            message : "1 KG. Altı Ürün",
            validity : true,
            clicked : old.clicked
          }
        })
      }
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
                id={"str1"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onClick={toggleWarning}
                defaultValue={fields.straight_bush.large_diameter}
                onChange={(e) => {
                  handleChange("straight_bush", "large_diameter",e);
                  
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
                id={"str2"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onClick={toggleWarning}
                defaultValue={fields.straight_bush.inner_diameter}
                onChange={(e) => {
                  handleChange("straight_bush", "inner_diameter",e);
                  
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
                id={"str3"} 
                onClick={toggleWarning}
                defaultValue={fields.straight_bush['bush_length']}
                onChange={(e) => {
                  handleChange("straight_bush", "bush_length",e);
                  
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
            
             <Alert setWarning={setWarning} message={warning.message} renderOpen={warning.validity} />
           
            
            
        </div>
    );
}