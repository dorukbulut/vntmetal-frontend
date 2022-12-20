import React from "react"
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  const onChange =  e => {
    setValue(e.target.value);
    updateMyData(index, id, value);
  }
  
  
  return <input value={value} onChange={onChange}  />
}
export default EditableCell