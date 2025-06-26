import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Field } from "../../Types/FormBuilder/Form";

import SelectBoxInput from "../../component/form/SelectInput";
import TextInputComponent from "../../component/form/TextInput";
import CheckboxInput from "../../component/form/CheckBoxInput";
import RadioInput from "../../component/form/RadioInput";
import DatePickInput from "../../component/form/DatePickInput";
import PasswordInputComponent from "../../component/form/PasswordInput";
import TextareaInput from "../../component/form/TextareaInput";

interface DragableFieldProps {
  field: Field;
  removeField: (id: string) => void;
  editField: (id: string) => void;
}

const DragableField: React.FC<DragableFieldProps> = ({
  field,
  editField,
  removeField,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    removeField(field.id);
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        // onDoubleClick={handleDelete}
        onDoubleClick={() => editField(field.id)}
        className="border p-3 mb-2  bg-white rounded border-white shadow-sm  cursor-pointer"
      >
        {field.label && (
          <>
            {field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ||
            field.type === "file" ? (
              <TextInputComponent
                type={field.type}
                label={field.label}
                disabled
                required={field.required}
              />
            ) : field.type === "password" ? (
              <PasswordInputComponent
                label={field.label}
                disabled
                required={field.required}
              />
            ) : field.type === "select" ? (
              <SelectBoxInput
                label={field.label}
                options={field.options || []}
                onChange={() => {}}
                required={field.required}
              />
            ) : field.type === "checkbox" ? (
              <CheckboxInput
                label={field.label}
                options={field.options || []}
                disabled={true}
                required={field.required}
                onChange={() => {}}
                value={[]}
              />
            ) : field.type === "radio" ? (
              <RadioInput
                label={field.label}
                options={field.options || []}
                onChange={() => {}}
                disabled
                required={field.required}
                value=""
              />
            ) : field.type === "date" ? (
              <DatePickInput
                label={field.label}
                placeholder="yyyy/mm/dd"
                disabled
                required={field.required}
                onChange={() => {}}
                selectedDate={null}
              />
            ) : field.type === "textarea" ? (
              <TextareaInput
                label={field.label}
                disabled
                required={field.required}
              />
            ) : null}
          </>
        )}
       
      </div>
       <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 text-sm cursor-pointer"
        >
          ✕
        </button>
    </div>
  );
};

export default DragableField;
