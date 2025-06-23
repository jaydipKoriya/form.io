import { useDroppable } from "@dnd-kit/core";
import React, { type ReactNode } from "react";
import DragableField from "./DragableField";

interface DropFieldProps {
  id: "string";
  children: ReactNode;
}
const DropField: React.FC<DropFieldProps> = (props) => {
  const { over, active, isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: over?.id === "password" ? "green" : undefined,
  };
  //   console.log(over);
  //   console.log(active);
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Form Canvas</h2>
      <div
        className="m-20 p-50 border-2 border-black"
        style={style}
        ref={setNodeRef}
      >
        {props.children}
      </div>
    </>
  );
};

export default DropField;
