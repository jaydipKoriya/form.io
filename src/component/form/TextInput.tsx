import type { ChangeEventHandler, MouseEventHandler } from "react";
import type { RefCallBack } from "react-hook-form";

type TextIpType = {
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
};

export default function TextInputComponent(prop: TextIpType) {
  let { label, error, ...rest } = prop;
  return (
    <>
      {/* <label>{label}</label>

      <div>
        <input type="text" {...rest} />
        {error && <p>{error}</p>}
      </div> */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            {...rest}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div> {error && <p>{error}</p>}</div>
      </div>
    </>
  );
}
