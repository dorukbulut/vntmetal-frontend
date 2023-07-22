import React, { useState } from "react";
import {TextField, Select, MenuItem} from  "@mui/material"

const SearchableSelect = ({ Service, name, set }) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);

    const handleChange = (e) =>
    {
        setValue(e.target.value);
        set(e.target.value)
        Service.search({[name] : e.target.value})
            .then(res => {
                setOptions(Service.reformatData(res.data))

            })
            .catch(err => console.error)
    };


    return (
        <div >
            <TextField
                value={value}
                onChange={handleChange}
                label="Ara"
            />
            <Select
                value={""}
                onChange={handleChange}
                options={options}
            >
                <MenuItem value="" />
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default SearchableSelect;
