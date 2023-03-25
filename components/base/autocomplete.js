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
  data.sort((x, y) => {
    if (isNaN(x.title) && isNaN(y.title)) {
      return x.title.localeCompare(y.title);
    } else {
      return x.title - y.title;
    }
  });

  const formattedData = data.map((item) => {
    return {
      ...item,
      title: `${item.title}`,
    };
  });
  React.useEffect(() => {
    setValue(prevValue);
  }, [prevValue]);
  return (
    <Autocomplete
      options={formattedData}
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
