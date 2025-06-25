import React from "react";
import type { JSX } from "react/jsx-runtime";
interface SubmitButtonProps{
    disabled?:boolean
}
const SubmitButton:React.FC<SubmitButtonProps>  = ({disabled}) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      disabled={disabled}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
