import React from "react";
import type { Options } from "../../Types/FormBuilder/Form";

interface CheckboxProps {
  label: string;
  value: string[];
  options: Options[];
  onChange: (newValue: string[]) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  value,
  options,
  onChange,
  error,
}) => {
  const handleCheckboxChange = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              value={opt.value}
              checked={value.includes(opt.value)}
              onChange={() => handleCheckboxChange(opt.value)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckboxInput;
