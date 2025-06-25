import type { ChangeEventHandler, MouseEventHandler } from "react";
import type { RefCallBack } from "react-hook-form";

type TextInputProps = {
  type: string;
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  error?: string;
  disabled?: boolean;
  size?: number;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
};

export default function TextInputComponent(props: TextInputProps) {
  const {
    label,
    error,
    type,
    id,
    name,
    placeholder,
    disabled,
    onClick,
    onChange,
    onFocus,
    value,
    ref,
    maxLength,
    minLength,
    size,
    required,
  } = props;

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        size={size}
        required={required}
        className={`block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${disabled ? "bg-gray-100 " : "bg-white"}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}