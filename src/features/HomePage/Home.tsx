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
import FieldConfiguration from "./FieldConfiguration";

// {
//   id: uuidv4(),
//   type: "text",
//   label: "Name",
//   required: false,
//   options: [""],
// },
// {
//   id: uuidv4(),
//   type: "password",
//   label: "Password",
//   required: false,
//   options: [""],
// },
const Home = () => {
  const InputTypes = [
    "text",
    "password",
    "number",
    "select",
    "radio",
    "checkbox",
    "file",
    "date"
  ];
  const [formField, setFormField] = useState<Field[]>([]);
  // const [draggedType, setDraggedType] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDropping, setIsDropping] = useState<boolean>(false);

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const type = active.id.toString();
    // if (InputTypes.includes(type)) {
    //   setDraggedType(type);
    // }
    console.log('in drag start',type);
    setActiveId(type);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const isNewField = InputTypes.includes(activeId);
    const isExistingField = formField.find((f) => f.id === activeId);

    if (isNewField && overId === "canvas") {
    setIsDropping(true);

      // const newField: Field = {
      //   id: uuidv4(),
      //   type: activeId,
      //   label: `${activeId} field`,
      //   required: false,
      //   options: [""],
      // };
      // setFormField((prev) => [...prev, newField]);
    } else if (isExistingField && activeId !== overId) {
      const oldIndex = formField.findIndex((f) => f.id === activeId);
      const newIndex = formField.findIndex((f) => f.id === overId);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setFormField((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }

    // setDraggedType(null);
  };

//  console.log(formField);

  const handleBuild=()=>{
    const submitBtn:Field={
      id:uuidv4(),
      label:'submit',
      type:'submit',
      required:true
    }
    setFormField((prev)=>[...prev,submitBtn])
    const formArray={
      formId:Date.now(),
      formElement:formField
    }

    localStorage.setItem('formArray',JSON.stringify([formArray]));
    setFormField([])
  }
  const removeField=(id:string)=>{
    setFormField((prev)=>{
      return prev.filter((field)=>field.id!==id)
    })
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // onDragStart={(e) => setActiveId(e.active.id)}
      onDragStart={handleDragStart}
    >
      <div className="p-6 space-y-6 min-h-screen bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Form.io Clone</h1>
          <div className="space-x-2">
            <button onClick={handleBuild} className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer">Builder</button>
            <button  className="px-3 py-1 bg-green-500 text-white rounded">Fill Form</button>
            <button  className="px-3 py-1 bg-gray-500 text-white rounded">Submissions</button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/4 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Field Types</h2>
            {InputTypes.map((type) => (
              <SidebarDragItem key={type} type={type} />
            ))}
          </div>
          
            <DropField id="canvas">
              <SortableContext
                items={formField.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {formField.map((field) => (
                  <DragableField key={field.id} field={field} removeField={()=>removeField(field.id)}/>
                ))}
              </SortableContext>
            </DropField>
            </div>
      </div>

      {activeId && isDropping && (
        <FieldConfiguration field={activeId} onSave={(field)=>{
          setFormField((prev)=>[...prev,field]);
          setIsDropping(false)
          setActiveId(null)
        }} onClose={()=>{
           setIsDropping(false)
          setActiveId(null)
        }}/>
       
      )}
    </DndContext>
  );
};

export default Home;
