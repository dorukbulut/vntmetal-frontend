import React, { useState } from "react";
import {TextField, Select, MenuItem} from  "@mui/material"

const SearchableSelect = ({ Service, name }) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);

    const handleChange = (e) => {
        setValue(e.target.value);
        Service.search({[name] : e.target.value})
            .then(res => {
                setOptions(Service.reformatData(res.data))
            })
            .catch(err => console.error)

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected option:", value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                value={value}
                onChange={handleChange}
                label="Ara"
            />
            <Select
                value={value}
                onChange={handleChange}
                options={options}
            >
                <MenuItem value="" />
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </form>
    );
};

export default SearchableSelect;
