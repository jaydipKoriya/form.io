import React from "react";

interface SubmitButtonProps {
  disabled?: boolean;
  submitTrue?: boolean;
  onClick?:()=>void;
  label:string
}
const ButtonComponent: React.FC<SubmitButtonProps> = ({
  disabled,
  submitTrue,
  onClick,
  label
}) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      disabled={disabled}
      type={submitTrue ? "submit" : "button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
