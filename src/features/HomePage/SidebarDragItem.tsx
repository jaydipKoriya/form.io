import { useDraggable } from "@dnd-kit/core";
import React from "react";

const SidebarDragItem:React.FC<{type:string}> = ({type}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: type,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-pointer">
      {type}
    </div>
  );
};

export default SidebarDragItem;
