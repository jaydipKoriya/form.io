import React from "react";

export interface TextareaProps {
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

const TextareaInput: React.FC<TextareaProps> = ({
  label,
  name,
  id,
  placeholder,
  error,
  maxLength,
  value,
  onChange,
  onFocus,
  disabled,
  required,
  rows = 4,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        maxLength={maxLength}
        disabled={disabled}
        rows={rows}
        required={required}
        className={`w-full p-2 border rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${disabled ? "bg-gray-100" : "bg-white"}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default TextareaInput;