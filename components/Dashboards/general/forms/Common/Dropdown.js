"use client";
import * as React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { containsText } from "../../../../../utils/containsText";

const DropDown = ({ label, items, handleChange, field, area, fields }) => {
  React.useEffect(() => {
    setSelected(fields[field][area]);
  }, [fields]);
  const [selected, setSelected] = React.useState(fields[field][area]);

  const [searchText, setSearchText] = React.useState("");
  const displayedOptions = React.useMemo(
    () => items.filter((option) => containsText(`${option.key}`, searchText)),
    [searchText, items]
  );
  return (
    <div className="w-full">
      <FormControl className="w-full">
        <InputLabel>{label}</InputLabel>
        <Select
          value={selected}
          label={label}
          onChange={(e) => {
            setSelected(e.target.value);

            handleChange(field, area, e);
          }}
          onClose={() => setSearchText("")}
          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
          //renderValue={() => selected}
          required
        >
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Ara..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDown;
