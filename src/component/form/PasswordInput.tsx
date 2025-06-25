import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import type { RefCallBack } from "react-hook-form";

type PasswordInputProps = {
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function PasswordInputComponent({
  label = "Password",
  name,
  id,
  placeholder,
  onClick,
  onChange,
  onFocus,
  value,
  ref,
  error,
  required = false,
  disabled = false,
}: PasswordInputProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="password"
        name={name}
        id={id}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        ref={ref as any}
        required={required}
        disabled={disabled}
        className={`block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${disabled ? "bg-gray-100" : "bg-white"}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}