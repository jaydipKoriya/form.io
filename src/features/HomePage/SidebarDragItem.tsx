import { useDraggable } from "@dnd-kit/core";
import React from "react";

const SidebarDragItem: React.FC<{ type: string }> = ({ type }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: type });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="cursor-pointer p-2 bg-blue-500 text-white rounded mb-2 "
    >
      {type.toUpperCase()}
    </div>
  );
};


export default SidebarDragItem;
