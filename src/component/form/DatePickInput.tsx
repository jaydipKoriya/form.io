import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Example: using a library like react-datepicker
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label: string;
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}

const DatePickInput: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  minDate,
  maxDate,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholder}
        dateFormat="yyyy/MM/dd"
        isClearable
      />
    </div>
  );
};

export default DatePickInput;
