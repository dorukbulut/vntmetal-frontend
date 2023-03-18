"use client";
import ModalImage from "../../../ui/ModalImage";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import { bracketData } from "../Forms/data";
import TextField from "@mui/material/TextField";
export default function BracketBush({ getMeasures, prevValues }) {
  const calcWeigth = (A8, B8, C8, D8, E8) => {
    return (
      ((A8 / 2) * (A8 / 2) * 3.14 * D8 * 8.6 -
        (B8 / 2) * (B8 / 2) * 3.14 * D8 * 8.6) /
        1000000 +
      ((B8 / 2) * (B8 / 2) * 3.14 * E8 * 8.6 -
        (C8 / 2) * (C8 / 2) * 3.14 * E8 * 8.6) /
        1000000
    );
  };
  //state
  const [fields, setFields] = useState({
    bracket_bush: {
      bigger_diameter:
        "bracket_bush" in prevValues && prevValues.bracket_bush !== null
          ? "bigger_diameter" in prevValues.bracket_bush
            ? prevValues.bracket_bush.bigger_diameter
            : ""
          : "",
      inner_diameter:
        "bracket_bush" in prevValues && prevValues.bracket_bush !== null
          ? "inner_diameter" in prevValues.bracket_bush
            ? prevValues.bracket_bush.inner_diameter
            : ""
          : "",
      body_diameter:
        "bracket_bush" in prevValues && prevValues.bracket_bush !== null
          ? "body_diameter" in prevValues.bracket_bush
            ? prevValues.bracket_bush.body_diameter
            : ""
          : "",
      bush_length:
        "bracket_bush" in prevValues && prevValues.bracket_bush !== null
          ? "bush_length" in prevValues.bracket_bush
            ? prevValues.bracket_bush.bush_length
            : ""
          : "",
      bracket_length:
        "bracket_bush" in prevValues && prevValues.bracket_bush !== null
          ? "bracket_length" in prevValues.bracket_bush
            ? prevValues.bracket_bush.bracket_length
            : ""
          : "",
    },
  });

  const [valid, setValid] = useState(false);

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
        bracket_bush: {
          ...old.bracket_bush,
          [area]: e.target.value,
        },
      };
    });
  };

  const handleValidation = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["bracket_bush"]["bigger_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["inner_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["body_diameter"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["bush_length"] === "") {
      isValid = false;
    }
    if (check_fields["bracket_bush"]["bracket_length"] === "") {
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
    let numbers = { ...fields.bracket_bush };
    if (true) {
      const calc = calcWeigth(
        numbers["bigger_diameter"],
        numbers["body_diameter"],
        numbers["inner_diameter"],
        numbers["bush_length"],
        numbers["bracket_length"]
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
    fields.bracket_bush.bigger_diameter,
    fields.bracket_bush.inner_diameter,
    fields.bracket_bush.body_diameter,
    fields.bracket_bush.bush_length,
    fields.bracket_bush.bracket_length,
  ]);

  useEffect(() => {
    setValid(handleValidation());
    getMeasures(handleValidation(), {
      bracket_bush: { ...fields.bracket_bush },
      ...calculated,
    });

    if (parseFloat(calculated).calcRaw < 1) {
      setWarning({
        message: "Uyarı ! 1 KG. ALTI ÜRÜN !",
        validity: true,
      });
    }
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
          Flanşlı Burç Ölçüleri
        </p>
        <hr />
      </div>
      <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
        {bracketData.map((item, index) => {
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
        <ModalImage image={"/bracketbush.png"} />
        <Alert
          setWarning={setWarning}
          message={warning.message}
          renderOpen={warning.validity}
        />
      </div>
    </div>
  );
}
