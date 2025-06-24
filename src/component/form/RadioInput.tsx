// src/components/RadioGroup.tsx
import React from "react";
import type { Options } from "../../Types/FormBuilder/Form";
import type { RefCallBack } from "react-hook-form";

interface RadioGroupProps {
  label: string;
  name?: string;
  options?: Options[];
  selectedValue?: string;
  onChange: (value: string) => void;
  className?: string;
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
  disabled?: boolean;
}

const RadioInput: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  className,
  disabled,
  label,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className || ""}`}>
      <label htmlFor={label}>{label}</label>
      {options ? (
        options.map((option) => (
          <div
            key={option.value}
            className={`inline-flex items-center cursor-pointer `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </div>
        ))
      ) : (
        <p>No option available</p>
      )}
    </div>
  );
};

export default RadioInput;
