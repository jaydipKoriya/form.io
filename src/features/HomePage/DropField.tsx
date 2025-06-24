import { useDroppable } from "@dnd-kit/core";
import React, { type ReactNode } from "react";
import DragableField from "./DragableField";

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
    <>
      <div className="w-3/4 bg-white p-4 rounded shadow h-200" ref={setNodeRef}>
        <div className="h-180 scroll-auto">
          <h2 className="font-bold mb-2">Form Canvas</h2>
          {children}
        </div>
        <button className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer">
          Submit
        </button>
      </div>
    </>
  );
};

export default DropField;
