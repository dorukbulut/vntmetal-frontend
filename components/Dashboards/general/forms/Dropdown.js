import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropDown = ({label,items, handleChange, field, area, fields}) =>  {
  const [selected, setSelected] = React.useState(fields[field][area]);
  return (
    <div className="w-full">
      <FormControl className="w-full">
        <InputLabel >{label}</InputLabel>
        <Select
          value={selected}
          label={label}
          onChange={(e) => {
            setSelected(e.target.value);
            handleChange(field, area, e)
          }}
          required
        >
          {items.map((item,index) => <MenuItem key={index} value={item.value}>{item.key}</MenuItem>)}
        </Select>
      </FormControl>
     
    </div>
  );
};

export default DropDown;