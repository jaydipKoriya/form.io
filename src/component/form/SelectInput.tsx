import React from "react";
import type { Options } from "../../Types/FormBuilder/Form";
import type { RefCallBack } from "react-hook-form";

interface SelectProps {
  label: string;
  options?: Options[];
  selectedValue?: string;
  onChange?: (option: Options) => void;
  placeholder?: string;
  className?: string; //
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
}
const SelectBoxInput: React.FC<SelectProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (options && onChange) {
      const selectedOption = options[event.currentTarget.selectedIndex];

      if (selectedOption !== undefined) {
        onChange(selectedOption);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={label}>{label}</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-150 ease-in-out"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options?(options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))):''}
      </select>
     
    </div>
  );
};

export default SelectBoxInput;
