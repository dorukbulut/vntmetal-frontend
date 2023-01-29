import ModalImage from "../../../ui/ModalImage";
import { useEffect, useState } from "react";
import Alert from "./Alert";
export default function MiddleBracketBush ({getMeasures, prevValues}) {
    const calcaWeigth  = (A8, B8, C8, D8, E8, F8, G8, H8) => {
      return ((A8/2)*(A8/2)*3.14*8.6*E8-(B8/2)*(B8/2)*3.14*8.6*E8)/1000000+((A8/2)*(A8/2)*3.14*8.6*G8-(C8/2)*(C8/2)*3.14*8.6*G8)/1000000+((A8/2)*(A8/2)*3.14*8.6*F8-(D8/2)*(D8/2)*3.14*8.6*F8)/1000000
    }

    const [fields, setFields] = useState({
      middlebracket_bush: {
        bracket_q1: "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_q1" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_q1
          : ""
        : "",
        bracket_q2: "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_q2" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_q2
          : ""
        : "",
        bracket_q3:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_q3" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_q3
          : ""
        : "",
        bracket_q4:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_q4" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_q4
          : ""
        : "",
        bracket_l1:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_l1" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_l1
          : ""
        : "",
        bracket_l2:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_l2" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_l2
          : ""
        : "",
        bracket_l3:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_l3" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_l3
          : ""
        : "",
        bracket_full:  "middlebracket_bush" in prevValues && prevValues.middlebracket_bush !== null
        ? "bracket_full" in prevValues.middlebracket_bush
          ? prevValues.middlebracket_bush.bracket_full
          : ""
        : "",
      },
    });
  
    const [calculated, setCalculated] = useState({
      calcRaw: "calcRaw" in prevValues ? prevValues.calcRaw : "",
    });

    const [warning, setWarning] = useState({
      message : "",
      validity : false,
      clicked : []
    });
  
    //handlers
    const handleChange = (field, area, e) => {
      setFields((old) => {
        return {
          middlebracket_bush: {
            ...old.middlebracket_bush,
            [area]: e.target.value,
          },
        };
      });
    };
  
    const handleValidation = () => {
      let check_fields = fields;
      let isValid = true;
      if (check_fields["middlebracket_bush"]["bracket_q1"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_q2"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_q3"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_q4"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_l1"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_l2"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_l3"] === "") {
        isValid = false;
      }
      if (check_fields["middlebracket_bush"]["bracket_full"] === "") {
        isValid = false;
      }
      return isValid
    };

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
      let numbers = { ...fields.middlebracket_bush };
      if (true) {
        const calc = calcaWeigth(numbers["bracket_q1"],
        numbers["bracket_q3"],
        numbers["bracket_q2"],
        numbers["bracket_q4"],
        numbers["bracket_l1"],
        numbers["bracket_l2"],
        numbers["bracket_l3"],
        numbers["bracket_full"]

        )
        setCalculated((old) => {
          return {
            ...old,
            calcRaw: calc,
          };
        });
      } else {
      }
    }, [
      fields.middlebracket_bush.bracket_q1,
      fields.middlebracket_bush.bracket_q2,
      fields.middlebracket_bush.bracket_q3,
      fields.middlebracket_bush.bracket_q4,
      fields.middlebracket_bush.bracket_l1,
      fields.middlebracket_bush.bracket_l2,
      fields.middlebracket_bush.bracket_l3,
      fields.middlebracket_bush.bracket_full,
    ]);
  
    useEffect(() => {
      getMeasures(handleValidation(), {
        middlebracket_bush: { ...fields.middlebracket_bush },
        ...calculated,
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
                    Ortadan Flanşlı Burç Ölçüleri
                  </p>
                  <hr />
            </div>
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Q1 *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr1"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_q1}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q1",e);
                  
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                 Q2 *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr2"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_q2}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q2",e);
                  
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Q3 *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr3"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_q3}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q3",e);
                  
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Q4 *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr4"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_q4}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q4",e);
                 
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                 L1  *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr5"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_l1}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l1",e);
                  
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Flanş Boyu L2  *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr6"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields.middlebracket_bush.bracket_l2}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l2",e);
                  
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Ara Boy L3  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                onClick={toggleWarning}
                id={"mdr7"}
                required
                defaultValue={fields.middlebracket_bush.bracket_l3}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l3",e);
                  
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Tam Boy L  *
              </label>
              <input
                type="number"
                step={"any"}
                onClick={toggleWarning}
                id={"mdr8"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                
                defaultValue={fields.middlebracket_bush.bracket_full}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_full",e);
                  
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Hesaplanan Ağırlık
              </label>
              <p className="font-poppins text-red-700">{calculated.calcRaw}</p>
            </div>
            </div>
          
        
            <div className="flex flex-col">
              <ModalImage image={'/middlebracket.png'} />
            </div>
            <Alert setWarning={setWarning} message={warning.message} renderOpen={warning.validity} />
        </div>
    );
}