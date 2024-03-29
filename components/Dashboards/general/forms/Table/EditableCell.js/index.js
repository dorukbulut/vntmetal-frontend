"use client";
import React, { useEffect } from "react";
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  useEffect(() => {
    updateMyData(index, id, value);
  }, [value]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      value={value}
      required
      onChange={onChange}
      className="border-2 invalid:border-red-600 valid:border-none"
    />
  );
};
export default EditableCell;
