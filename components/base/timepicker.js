import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerViews({
  propLabels,
  propViews,
  propFormat,
  setData,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          onChange={(newValue, context) => {
            let es = {
              target: {
                value: newValue,
              },
            };
            setData(propViews[0], es);
          }}
          label={propLabels}
          views={propViews}
          format={propFormat}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
