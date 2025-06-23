import React, { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Droppable } from "./DroppableContainer";
import { Draggable } from "./DraggableItem";

export default function DragExample() {
  const containers = ["A", "B", "C"];
//   const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {draggableMarkup}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {/* {parent === id ? draggableMarkup : "Drop here"} */}
        </Droppable>
      ))}
    </DndContext>
  );
  
  function handleDragEnd(event: DragEndEvent) {
    const { active,over } = event;
    console.log(over);
    console.log(active);
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    // setParent(over ? over.id : null);
  }
}
