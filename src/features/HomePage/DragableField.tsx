import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Field } from "../../Types/FormBuilder/Form";
import { useSortable } from "@dnd-kit/sortable";

const DragableField = ({ field }: { field: Field }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });
  //   const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //     id: field.id,
  //   });

  const style = { transform: CSS.Transform.toString(transform), transition };
//   const style = { transform: CSS.Transform.toString(transform) };
    // const style = transform
    //   ? {
    //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    //       transition:transition
    //     }
    //   : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      //   onClick={onClick}
      className="border p-2 mb-2 bg-white rounded shadow cursor-pointer"
    >
      <label className="block font-semibold mb-1" htmlFor={field.label}>
        {field.id}
      </label>

      <input disabled className="w-full p-1 border rounded" type={field.type} />
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
