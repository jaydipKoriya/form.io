import { useDroppable } from "@dnd-kit/core";
import React from "react";
import ButtonComponent from "../../component/Button/SubmitButton";

const DropField: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { setNodeRef,isOver } = useDroppable({ id });


  return (

    <div>
      <h2 className="font-bold mb-4">Form Canvas</h2>
      <div
        ref={setNodeRef}
        id="jaydip"
        className={`bg-gray-200 p-5 ${
        isOver ? " border-2 border-dashed border-t-black rounded " : "border-1 border-t-black rounded "
      } `}
      >
        <div className="max-h-170 overflow-y-auto space-y-3">{children}</div>
      </div>

      <ButtonComponent label="Submit" disabled={true} />
    </div>


  );
};

export default DropField;
