import React, { type MouseEventHandler } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Field } from "../../Types/FormBuilder/Form";
import { useSortable } from "@dnd-kit/sortable";
import SelectBoxInput from "../../component/form/SelectInput";
import TextInputComponent from "../../component/form/TextInput";
import CheckboxInput from "../../component/form/CheckBoxInput";
import RadioInput from "../../component/form/RadioInput";
import DatePickInput from "../../component/form/DatePickInput";

interface DragableFieldProps{
  field:Field,
  removeField:(id:string)=>void
}

const DragableField: React.FC<DragableFieldProps> = ({field,removeField}) => {
  
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete=()=>{
   removeField(field.id)
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border p-2 mb-2 bg-white rounded shadow cursor-pointer"
      onDoubleClick={handleDelete}
    >
      {field.type === "text" || field.type === "email" ? (

        <TextInputComponent type={field.type} label={field.label} disabled={true}/>
      ) : field.type === "number" ? (
        <TextInputComponent type={field.type} label={field.label} disabled={true}/>

      ) 
      : field.type === "password" ? (
        <TextInputComponent type={field.type} label={field.label} disabled={true}/>
      ): field.type === "file" ? (
        <TextInputComponent type={field.type} label={field.label} disabled={true}/>

      ) : field.type === "select" ? (

        <SelectBoxInput label={field.label} options={field.options}/>
      ) : field.type === "checkbox" ? (
          
          <CheckboxInput label={field.label} options={field.options}/>
      ) : field.type==='radio'?(
        <RadioInput onChange={()=>{}}options={field.options} label={field.label}/>
      ):field.type==='date'?(
        <DatePickInput label={field.label} placeholder="yyyy/mm/dd"/>
      ):null}
    </div>
  );
};

export default DragableField;

// const DraggableField = ({
//   field,
//   onClick,
// }: {
//   field: Field;
//   onClick: () => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: field.id });

//   const style = { transform: CSS.Transform.toString(transform), transition };

//   return (
//     <div
//       ref={setNodeRef}
//       {...attributes}
//       {...listeners}
//       style={style}
//       onClick={onClick}
//       className="border p-2 mb-2 bg-white rounded shadow cursor-pointer"
//     >
//       <label className="block font-semibold mb-1">{field.label}</label>

//       <input disabled className="w-full p-1 border rounded" type={field.type} />
//     </div>
//   );
// };
