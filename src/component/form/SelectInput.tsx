import React from "react";
import type { Options } from "../../Types/FormBuilder/Form";
import type { RefCallBack } from "react-hook-form";

interface SelectProps {
  label: string;
  name?: string;
  options?: Options[];
  value?: string;
  onChange:React.ChangeEventHandler<HTMLSelectElement>
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  ref?: React.RefObject<HTMLSelectElement | null> | RefCallBack;
}

const SelectBoxInput: React.FC<SelectProps> = ({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  ref,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        required={required}
        className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default SelectBoxInput;