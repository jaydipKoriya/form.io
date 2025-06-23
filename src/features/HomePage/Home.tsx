import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import React, { useState } from "react";
import DragableField from "./DragableField";
import DropField from "./DropField";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import type { Field } from "../../Types/FormBuilder/Form";
import SidebarDragItem from "./SidebarDragItem";

const Home = () => {
  const InputTypes = ["text", "password", "number"];
  const [formField, setFormField] = useState<Field[]>([
    {
      id: uuidv4(),
      type: "text",
      label: "Name",
      required: false,
      options: [""],
    },
    {
      id: uuidv4(),
      type: "password",
      label: "Password",
      required: false,
      options: [""],
    },
  ]);
  const [dragedType, setDraggedType] = useState<string | null>(null);

  const handleDragEnd: (e: DragEndEvent) => void = (e) => {
    console.log(e);
    const { over, active } = e;
    if (!over) return;
    // if(over.id!=='canvas'){
    //   return
    // }
    console.log("in drag end over", over);
    console.log("in drag end active", active);
    // const dragId = active.id.toString();
    // if (!dragedType) {
    //   return;
    // }
    // const formFieldId = formField.map((field) => field.id);
    // const activeId = active.id.toString();
    // if (formFieldId.includes(activeId)) {
      console.log("in if");
      const fieldContainer=[...formField]
      const activeItem = formField.find((item) => item.id === active.id);

      const overItem = formField.find((item) => item.id === over.id);
      console.log("activeitem",activeItem);
      console.log(overItem);
      if (!activeItem || !overItem) {
        return;
      }

      const activeIndex = formField.findIndex((item) => item.id === active.id);

      const overIndex = formField.findIndex((item) => item.id === over.id);
      console.log("active",activeIndex);
      console.log('overindex',overIndex);

      if (activeIndex !== overIndex) {
        // setItems((prev) => arrayMove<TItem>(prev, activeIndex, overIndex));
        let temp=fieldContainer[activeIndex]
        fieldContainer[activeIndex]=fieldContainer[overIndex]
        fieldContainer[overIndex]=temp
         console.log(true);  
         setFormField(fieldContainer)
      }
    // } else if (over.id === "string") {
    //   const newField: Field = {
    //     id: uuidv4(),
    //     type: dragedType,
    //     label: "",
    //     required: false,
    //     options: [""],
    //   };
    //   setFormField((prev) => [...prev, newField]);
    //   setDraggedType(null);
    // }
  };

  console.log("selected Field", formField);
  const handleDragStart: (e: DragStartEvent) => void = (e) => {
    const { active } = e;
    console.log(active);
    const type = active.id.toString();

    if (InputTypes.includes(type)) setDraggedType(type);
  };
  // console.log(dragedType);
  return (
    <main className="size-200">
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={closestCenter}
      >
        <div>
          <div>
            <h1>Field List</h1>
            <ul>
              {InputTypes.map((field, index) => (
                <SidebarDragItem key={field} type={field} />
              ))}
            </ul>
          </div>
          <DropField id="string">
            <SortableContext
              items={formField.map((f) => f)}
              strategy={verticalListSortingStrategy}
            >
              {formField.map((field) => (
                <DragableField key={field.id} field={field} />
              ))}
            </SortableContext>
          </DropField>
        </div>
      </DndContext>
    </main>
  );
};

export default Home;
