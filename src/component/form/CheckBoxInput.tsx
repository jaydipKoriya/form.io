// src/components/Checkbox.tsx
import React, { type InputHTMLAttributes } from "react";
import type { Options } from "../../Types/FormBuilder/Form";
import type { RefCallBack } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  options?: Options[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
  disabled?: boolean;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  onChange,
  options,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      {options ? (
        options.map((option) => (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              onChange={onChange}
              value={option.value}
              {...rest}
            />
            {option.label && (
              <span className="ml-2 text-gray-700">{option.label}</span>
            )}
          </label>
        ))
      ) : (
        <p>NO Option avalilable</p>
      )}
    </div>
  );
};

export default CheckboxInput;
