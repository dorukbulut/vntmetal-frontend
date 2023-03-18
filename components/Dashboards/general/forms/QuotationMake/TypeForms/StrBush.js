"use client";
import { useEffect, useState } from "react";
import ModalImage from "../../../ui/ModalImage";
import Alert from "./Alert";
import TextField from "@mui/material/TextField";
import { strData } from "../Forms/data";
export default function StrBush({ getMeasures, prevValues }) {
  const calculateWeight = (A8, B8, C8) => {
    return (
      ((A8 / 2) * (A8 / 2) * 3.14 * C8 * 8.6 -
        (B8 / 2) * (B8 / 2) * 3.14 * C8 * 8.6) /
      1000000
    );
  };

  const [valid, setValid] = useState(false);
  //state
  const [fields, setFields] = useState({
    straight_bush: {
      large_diameter:
        "straight_bush" in prevValues && prevValues.straight_bush !== null
          ? "large_diameter" in prevValues.straight_bush
            ? prevValues.straight_bush.large_diameter
            : ""
          : "",
      inner_diameter:
        "straight_bush" in prevValues && prevValues.straight_bush !== null
          ? "inner_diameter" in prevValues.straight_bush
            ? prevValues.straight_bush.inner_diameter
            : ""
          : "",
      bush_length:
        "straight_bush" in prevValues && prevValues.straight_bush !== null
          ? "bush_length" in prevValues.straight_bush
            ? prevValues.straight_bush.bush_length
            : ""
          : "",
    },
  });

  const [warning, setWarning] = useState({
    message: "",
    validity: false,
    clicked: [],
  });

  const [calculated, setCalculated] = useState({
    calcRaw: "calcRaw" in prevValues ? prevValues.calcRaw : "",
  });

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

  const handleValidation = () => {
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
    return isValid;
  };

  const toggleWarning = (e) => {
    if (!warning.clicked.includes(e.target.id)) {
      setWarning((old) => {
        let new_arr = old.clicked;
        new_arr.push(e.target.id);
        return {
          message: "Paylı/Paysız ölçü girişine dikkat ediniz",
          validity: true,
          clicked: new_arr,
        };
      });
    }
  };

  //hooks

  useEffect(() => {
    let numbers = { ...fields.straight_bush };
    if (true) {
      const calc = calculateWeight(
        parseFloat(numbers.large_diameter),
        parseFloat(numbers.inner_diameter),
        parseFloat(numbers.bush_length)
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
    fields.straight_bush.large_diameter,
    fields.straight_bush.inner_diameter,
    fields.straight_bush.bush_length,
  ]);

  useEffect(() => {
    setValid(handleValidation());
    getMeasures(handleValidation(), {
      straight_bush: { ...fields.straight_bush },
      ...calculated,
    });
  }, [calculated.calcRaw, fields]);

  useEffect(() => {
    if (calculated.calcRaw < 1) {
      setWarning((old) => {
        return {
          message: "1 KG. Altı Ürün",
          validity: true,
          clicked: old.clicked,
        };
      });
    }
  }, [calculated.calcRaw]);

  return (
    <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
      <div className="space-y-2 lg:w-1/2">
        <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
          Düz Burç Ölçüleri
        </p>
        <hr />
      </div>
      <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
        {strData.map((item, index) => {
          return (
            <TextField
              label={item.label}
              key={index}
              onClick={toggleWarning}
              variant="standard"
              helperText="Zorunlu Alan"
              value={fields[item.fields][item.value] || ""}
              type={item.type}
              error={!valid}
              onChange={(e) => handleChange(item.fields, item.value, e)}
            />
          );
        })}
        <TextField
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={
            isNaN(calculated.calcRaw)
              ? ""
              : parseFloat(calculated.calcRaw).toFixed(3)
          }
          label="Hesaplanan Ağırlık"
        />
        <br />
      </div>

      <div className="flex flex-col">
        <ModalImage image={"/straightbush.png"} />
      </div>

      <Alert
        setWarning={setWarning}
        message={warning.message}
        renderOpen={warning.validity}
      />
    </div>
  );
}
