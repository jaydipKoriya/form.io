import React from "react";
import type { Options } from "../../Types/FormBuilder/Form";
import type { RefCallBack } from "react-hook-form";

interface RadioGroupProps {
  label: string;
  name?: string;
  options?: Options[];
  value: string; 
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
}

const RadioInput: React.FC<RadioGroupProps> = ({
  name,
  options = [],
  // selectedValue,
  value,
  onChange,
  disabled = false,
  required = false,
  label,
  error,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {options.length ? (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option.value} className="inline-flex items-center">
              {/* <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                disabled={disabled}
                required={required}
                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              /> */}
              <input
                type="radio"
                // id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                disabled={disabled}
                required={required}
                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">No options available</p>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default RadioInput;
