import ModalImage from "../../../ui/ModalImage";
import { useEffect, useState } from "react";
import Alert from "./Alert";
export default function DoubleBracketBush({ getMeasures, prevValues }) {
  const calcWeigth = (A8, B8, C8, D8, E8, F8, G8) => {
    return (
      ((A8 / 2) * (A8 / 2) * 3.14 * 8.6 * D8 -
        (C8 / 2) * (C8 / 2) * 3.14 * 8.6 * D8) /
        1000000 +
      ((B8 / 2) * (B8 / 2) * 3.14 * 8.6 * F8 -
        (C8 / 2) * (C8 / 2) * 3.14 * 8.6 * F8) /
        1000000 +
      ((A8 / 2) * (A8 / 2) * 3.14 * 8.6 * E8 -
        (C8 / 2) * (C8 / 2) * 3.14 * 8.6 * E8) /
        1000000
    );
  };

  const [fields, setFields] = useState({
    doublebracket_bush: {
      bigger_diameter:  "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "bigger_diameter" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.bigger_diameter
        : ""
      : "",
      inner_diameter:  "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "inner_diameter" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.inner_diameter
        : ""
      : "",
      body_diameter:  "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "body_diameter" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.body_diameter
        : ""
      : "",
      bracket_l1: "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "bracket_l1" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.bracket_l1
        : ""
      : "",
      bracket_l2: "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "bracket_l2" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.bracket_l2
        : ""
      : "",
      bracket_l3: "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "bracket_l3" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.bracket_l3
        : ""
      : "",
      bracket_full: "doublebracket_bush" in prevValues && prevValues.doublebracket_bush !== null
      ? "bracket_full" in prevValues.doublebracket_bush
        ? prevValues.doublebracket_bush.bracket_full
        : ""
      : "",
    },
  });

  const [calculated, setCalculated] = useState({
    calcRaw: "calcRaw" in prevValues ? prevValues.calcRaw :"",
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
        doublebracket_bush: {
          ...old.doublebracket_bush,
          [area]: e.target.value,
        },
      };
    });
  };

  const handleValidation = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["doublebracket_bush"]["bigger_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["inner_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["body_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l1"] === "") {
      
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l2"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_l3"] === "") {
      isValid = false;
    }
    if (check_fields["doublebracket_bush"]["bracket_full"] === "") {
      isValid = false;
    }
    return isValid;
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
    console.log("entered calc raws")
    let numbers = { ...fields.doublebracket_bush };
    if (true) {
      const calc = calcWeigth(
        numbers["bigger_diameter"],
        numbers["body_diameter"],
        numbers["inner_diameter"],
        numbers["bracket_l1"],
        numbers["bracket_l2"],
        numbers["bracket_l3"]
      );
      setCalculated((old) => {
        return {
          ...old,
          calcRaw: calc,
        };
      });
    } else {
    }
  }, [
    fields.doublebracket_bush.bigger_diameter,
    fields.doublebracket_bush.inner_diameter,
    fields.doublebracket_bush.body_diameter,
    fields.doublebracket_bush.bracket_l1,
    fields.doublebracket_bush.bracket_l2,
    fields.doublebracket_bush.bracket_l3,
    fields.doublebracket_bush.bracket_full,
  ]);

  useEffect(() => {
    console.log("entered measures");
    getMeasures(handleValidation(), {
      doublebracket_bush: { ...fields.doublebracket_bush },
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
          Çift Flanşlı Burç Ölçüleri
        </p>
        <hr />
      </div>
      <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Büyük Çap * (Q1)
          </label>
          <input
            type="number"
            step={"any"}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            onClick={toggleWarning}
            id={"dbr1"}
            required
            defaultValue={fields.doublebracket_bush.bigger_diameter}
            onChange={(e) => {
              handleChange("doublebracket_bush", "bigger_diameter", e);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Body Çap * (Q3)
          </label>
          <input
            type="number"
            step={"any"}
            id={"dbr2"}
            onClick={toggleWarning}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            defaultValue={fields.doublebracket_bush.body_diameter}
            required
            onChange={(e) => {
              handleChange("doublebracket_bush", "body_diameter", e);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            İç Çap * (Q2)
          </label>
          <input
            type="number"
            step={"any"}
            onClick={toggleWarning}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            id={"dbr3"}
            required
            defaultValue={fields.doublebracket_bush.inner_diameter}
            onChange={(e) => {
              handleChange("doublebracket_bush", "inner_diameter", e);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Flanş Boyu L1 *
          </label>
          <input
            type="number"
            step={"any"}
            id={"dbr4"}
            onClick={toggleWarning}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            defaultValue={fields.doublebracket_bush.bracket_l1}
            required
            onChange={(e) => {
              handleChange("doublebracket_bush", "bracket_l1", e);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Flanş Boyu L2 *
          </label>
          <input
            type="number"
            step={"any"}
            onClick={toggleWarning}
            id={"dbr5"}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            defaultValue={fields.doublebracket_bush.bracket_l2}
            required
            onChange={(e) => {
              handleChange("doublebracket_bush", "bracket_l2", e);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Ara Boy L3 *
          </label>
          <input
            type="number"
            step={"any"}
            id={"dbr6"}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            onClick={toggleWarning}
            defaultValue={fields.doublebracket_bush.bracket_l3}
            required
            onChange={(e) => {
              handleChange("doublebracket_bush", "bracket_l3", e);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
          >
            Tam Boy L *
          </label>
          <input
            type="number"
            step={"any"}
            id={"dbr7"}
            className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
            placeholder=""
            onClick={toggleWarning}
            defaultValue={fields.doublebracket_bush.bracket_full}
            required
            onChange={(e) => {
              handleChange("doublebracket_bush", "bracket_full", e);
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
        <ModalImage image={"/doublebracket.png"} />
      </div>

      <Alert setWarning={setWarning} message={warning.message} renderOpen={warning.validity} />
    </div>
  );
}
