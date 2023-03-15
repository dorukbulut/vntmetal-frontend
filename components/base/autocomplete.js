import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({
  dropDownOptions,
  data,
  setData,
  prevValue,
  valid,
}) {
  const { label } = dropDownOptions;
  const [value, setValue] = React.useState(prevValue);

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.title}
      id="clear-on-escape"
      clearText={""}
      value={value}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      onChange={(e, newValue) => {
        setData(newValue);
        setValue(newValue);
      }}
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
