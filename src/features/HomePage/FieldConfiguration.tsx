import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldConfigurationSchema,
  type FieldConfigurationType,
} from "../../Schema/FieldConfigurationSchema";
import type { Field } from "../../Types/FormBuilder/Form";
import { v4 as uuidv4 } from "uuid";

interface FieldConfigurationProps {
  field: string;
  onSave: (field: Field) => void;
  onClose?: () => void;
  initialData?: Field;
}
const FieldConfiguration: React.FC<FieldConfigurationProps> = ({
  field,
  onSave,
  onClose,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldConfigurationType>({
    resolver: zodResolver(FieldConfigurationSchema),
    defaultValues: {
      label: initialData?.label || "",
      required: initialData?.required || false,
      minLength: initialData?.minLength || undefined,
      maxLength: initialData?.maxLength || undefined,
      size: initialData?.size || undefined,
      options: ["radio", "select", "checkbox"].includes(field)
        ? initialData?.options || [{ label: "", value: "" }]
        : undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: FieldConfigurationType) => {
    if (initialData?.id) {
      const updatedField: Field = {
        id: initialData.id,
        type: field,
        label: data.label,
        required: data.required,
        options: data.options,
        minLength: data.minLength,
        maxLength: data.maxLength,
        size: data.size,
      };
      onSave(updatedField);
    } else {
      const newField: Field = {
        id: uuidv4(),
        type: field,
        label: data.label,
        required: data.required,
        options: data.options,
        minLength: data.minLength,
        maxLength: data.maxLength,
        size: data.size,
      };
      onSave(newField);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-[500px] space-y-4"
      >
        <h3 className="text-xl font-semibold">Configure Field</h3>

        <div>
          <label className="block text-sm font-medium">Label</label>
          <input
            {...register("label")}
            autoFocus
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter field label"
            aria-invalid={!!errors.label}
          />
          {errors.label && (
            <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
          )}
        </div>

        {field === "text" && (
          <>
            <div>
              <label className="block text-sm font-medium">Min Length</label>
              <input
                type="number"
                {...register("minLength", { valueAsNumber: true })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.minLength && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.minLength.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Max Length</label>
              <input
                type="number"
                {...register("maxLength", { valueAsNumber: true })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.maxLength && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maxLength.message}
                </p>
              )}
            </div>
          </>
        )}

        {field === "textarea" && (
          <>
            <div>
              <label className="block text-sm font-medium">Size</label>
              <input
                type="number"
                {...register("size", { valueAsNumber: true })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.size && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.size.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Max Length</label>
              <input
                type="number"
                {...register("maxLength", { valueAsNumber: true })}
                className="w-full p-2 border rounded mt-1"
              />
              {errors.maxLength && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maxLength.message}
                </p>
              )}
            </div>
          </>
        )}

        <label className="inline-flex items-center mt-2">
          <input type="checkbox" {...register("required")} />
          <span className="ml-2 text-sm">Required</span>
        </label>

        {["radio", "select", "checkbox"].includes(field) && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">Options</span>
              <button
                type="button"
                onClick={() => append({ value: "", label: "" })}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
              >
                + Add Option
              </button>
            </div>
            {fields.map((option, index) => (
              <div key={option.id} className="flex  items-center  gap-2">
                <input
                  {...register(`options.${index}.value`)}
                  className="flex-1 p-0.5 border rounded text-sm"
                  placeholder="Value"
                />
                <input
                  {...register(`options.${index}.label`)}
                  className="flex-1 p-0.5 border rounded text-sm"
                  placeholder="Label"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FieldConfiguration;
