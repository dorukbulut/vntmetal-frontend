import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({
  dropDownOptions,
  data,
  setData,
  valid,
}) {
  const { label } = dropDownOptions;
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.title,
  };
  return (
    <Autocomplete
      {...defaultProps}
      id="clear-on-escape"
      clearText={""}
      onChange={(e, newValue) => setData(newValue)}
      renderInput={(params) => (
        <TextField
          error={!valid}
          {...params}
          helperText={"Zorunlu Alan"}
          label={label}
          variant="standard"
        />
      )}
    />
  );
}
