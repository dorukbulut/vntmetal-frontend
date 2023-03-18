"use client";
import ModalImage from "../../../ui/ModalImage";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import TextField from "@mui/material/TextField";
import { plateData } from "../Forms/data";
export default function PlateStrip({ getMeasures, prevValues }) {
  const calcWeigth = (A8, B8, C8) => {
    return (A8 * B8 * C8 * 8.6) / 1000000;
  };

  //state
  const [fields, setFields] = useState({
    plate_strip: {
      width:
        "plate_strip" in prevValues && prevValues.plate_strip !== null
          ? "width" in prevValues.plate_strip
            ? prevValues.plate_strip.width
            : ""
          : "",
      thickness:
        "plate_strip" in prevValues && prevValues.plate_strip !== null
          ? "thickness" in prevValues.plate_strip
            ? prevValues.plate_strip.thickness
            : ""
          : "",
      length:
        "plate_strip" in prevValues && prevValues.plate_strip !== null
          ? "length" in prevValues.plate_strip
            ? prevValues.plate_strip.length
            : ""
          : "",
    },
  });
  const [valid, setValid] = useState(false);

  const [calculated, setCalculated] = useState({
    calcRaw: "calcRaw" in prevValues ? prevValues.calcRaw : "",
  });

  const [warning, setWarning] = useState({
    message: "",
    validity: false,
    clicked: [],
  });

  //handlers
  const handleChange = (field, area, e) => {
    setFields((old) => {
      return {
        plate_strip: {
          ...old.plate_strip,
          [area]: e.target.value,
        },
      };
    });
  };

  const handleValidation = () => {
    let check_fields = fields;
    let isValid = true;
    if (check_fields["plate_strip"]["width"] === "") {
      isValid = false;
    }
    if (check_fields["plate_strip"]["thickness"] === "") {
      isValid = false;
    }
    if (check_fields["plate_strip"]["length"] === "") {
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
    let numbers = { ...fields.plate_strip };

    if (true) {
      const calc = calcWeigth(
        parseFloat(numbers.width),
        parseFloat(numbers["thickness"]),
        parseFloat(numbers.length)
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
    fields.plate_strip.width,
    fields.plate_strip.thickness,
    fields.plate_strip.length,
  ]);

  useEffect(() => {
    setValid(handleValidation());
    getMeasures(handleValidation(), {
      plate_strip: { ...fields.plate_strip },
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
          Plaka Ölçüleri
        </p>
        <hr />
      </div>
      <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
        {plateData.map((item, index) => {
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
        <ModalImage image={"/platestrip.png"} />
      </div>

      <Alert
        setWarning={setWarning}
        message={warning.message}
        renderOpen={warning.validity}
      />
    </div>
  );
}
