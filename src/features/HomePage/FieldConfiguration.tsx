import React from "react";
import type { Field } from "../../Types/FormBuilder/Form";
import TextInputComponent from "../../component/form/TextInput";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldConfigurationSchema,
  type FieldConfiguration,
} from "../../Schema/FieldConfigurationSchema";
import { v4 as uuidv4 } from "uuid";

interface FieldConfigurationProps {
  field: string;
  onClose: () => void;
  onSave: (field: Field) => void;
  // setFormField:React.Dispatch<React.SetStateAction<Field[]>>
}
const FieldConfiguration: React.FC<FieldConfigurationProps> = ({
  field,
  onSave,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldConfiguration>({
    resolver: zodResolver(FieldConfigurationSchema),
    defaultValues: {
      options: ["radio", "select", "checkbox"].includes(field)
        ? [{ label: "", value: "" }]
        : undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  console.log(field);

  const onSubmit = (data: any) => {
    console.log(data);
    if (typeof field === "string") {
      const newField: Field = {
        id: uuidv4(),
        type: field,
        label: data.label,
        required: false,
        options: data.options,
      };
      onSave(newField);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-[400px]">
            <h3 className="text-xl font-bold mb-4">Configure Field </h3>
            <label className="block text-sm mb-1">Label Name</label>
            <input
              className="w-full mb-3 p-2 border rounded"
              {...register(`label`)}
            />
            {errors && <p>{errors.label?.message}</p>}

            {field === "text" ? (
              <>
                <label className="block text-sm mb-1">Min Length:</label>
                <input
                  className="w-full mb-3 p-2 border rounded"
                  {...register(`minLength`)}
                />
                {errors && <p>{errors.minLength?.message}</p>}
                <label className="block text-sm mb-1">Max Length:</label>
                <input
                  className="w-full mb-3 p-2 border rounded"
                  {...register(`maxLength`)}
                />
                {errors && <p>{errors.maxLength?.message}</p>}
              </>
            ) : field === "textarea" ? (
              <>
                <label className="block text-sm mb-1">Size:</label>
                <input
                  className="w-full mb-3 p-2 border rounded"
                  {...register(`size`)}
                />
                {errors && <p>{errors.size?.message}</p>}
                <label className="block text-sm mb-1">Max Length:</label>
                <input
                  className="w-full mb-3 p-2 border rounded"
                  {...register(`maxLength`)}
                />
                {errors && <p>{errors.maxLength?.message}</p>}
              </>
            ) : null}

            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" {...register(`required`)} />
              Required
            </label>
            {["radio", "select", "checkbox"].includes(field)
              ? fields.map((f, index) => (
                  <div>
                    <button
                      onClick={() => append({ value: "", label: "" })}
                      className="px-3 bg-blue-500 text-white rounded"
                    >
                      +
                    </button>
                    <div>
                      <li
                        key={index}
                        className="flex justify-between text-sm mb-1"
                      >
                        <div className="flex flex-col">
                          <label htmlFor={`options.${index}.value`}>
                            Option value
                          </label>
                          <input
                            type="text"
                            {...register(`options.${index}.value`)}
                            className="bg-blue-200"
                          />
                          <label htmlFor={`options.${index}.label`}>
                            Option label
                          </label>

                          <input
                            type="text"
                            {...register(`options.${index}.label`)}
                            className="bg-blue-200"
                          />
                        </div>

                        <button
                          className="text-red-500"
                          onClick={() => remove(index)}
                        >
                          x
                        </button>
                        {/* {errors && <p>Enter value in option</p>} */}
                      </li>
                    </div>
                  </div>
                ))
              : ""}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FieldConfiguration;
