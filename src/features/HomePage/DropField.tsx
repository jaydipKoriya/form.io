import { useDroppable } from "@dnd-kit/core";
import React, { type ReactNode } from "react";
import DragableField from "./DragableField";
import SubmitButton from "../../component/Button/SubmitButton";

const DropField: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  // const style = {
  //   backgroundColor: isOver ? "#f0f0f0" : "white",
  //   minHeight: 200,
  //   padding: "1rem",
  //   border: "2px dashed black",
  //   borderRadius: "0.5rem",
  // };

  return (
    <div
      ref={setNodeRef}
      className={`w-3/4 bg-white p-4 rounded shadow h-200  ${
        isOver ? " border-1 border-dashed border-blue-400" : ""
      }`}
    >
      <h2 className="font-bold mb-4">Form Canvas</h2>
      <div className="max-h-170 overflow-y-auto space-y-3">
        {children}
      </div>

      
        <SubmitButton disabled/>
      
    </div>
  );
};

export default DropField;
