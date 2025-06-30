import {
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
// import { v4 as uuidv4 } from "uuid";
import type { Field, FormArray } from "../../Types/FormBuilder/Form";
import SidebarDragItem from "./SidebarDragItem";
import FieldConfiguration from "./FieldConfiguration";
// import useLocalStorage from "../../hook/useLocalStorage";
import FileUploader from "../../component/form/FileUploader";
import { Link } from "react-router";
import { readJsonFile } from "../../Utils/readFile";
import { addForm, openDb } from "../../config/indexDb";

const Home = () => {
  const InputTypes = [
    "text",
    "email",  
    "password",
    "number",
    "select",
    "radio",
    "checkbox",
    "file",
    "date",
  ];

  const [formField, setFormField] = useState<Field[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [editField, setEditField] = useState<Field | null>(null);
  // const [storeValue, setStoreValue] = useLocalStorage<FormArray[]>(
  //   "formArray",
  //   []
  // );

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const type = active.id.toString();
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
      console.log(activeId);
      console.log(overId);
      setIsDropping(true);
    } else if (isExistingField && activeId !== overId) {
      const oldIndex = formField.findIndex((f) => f.id === activeId);
      const newIndex = formField.findIndex((f) => f.id === overId);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setFormField((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }

    // setDraggedType(null);
  };

  const handleBuild = async () => {
    // console.log(storeValue);
    // const hasSubmit = formField.some((f) => f.type === "submit");
    
    const formName = prompt("Enter Form name");
    if (formName) {
      const formArray: FormArray = {
        formId: Date.now(),
        formName: formName ? formName : String(Date.now),
        formElement: formField,
      };

      // const arr = [...storeValue, formArray];
      // setStoreValue(arr);
      await openDb();
      addForm(formArray);
      setFormField([]);
    } else {
      return;
    }
  };

  const removeField = (id: string) => {
    setFormField((prev) => prev.filter((field) => field.id !== id));
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files) {
        const data = (await readJsonFile(
          event.target.files[0]
        )) as unknown as FormArray;

        setFormField(data.formElement);
      }
    } catch (error) {
      console.error(error);
      alert("Facing issue while fetching file");
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="p-6 space-y-6 min-h-screen bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Form.io Clone</h1>
          <div className="space-x-2">
            <button
              onClick={handleBuild}
              className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
            >
              Save Form
            </button>

            <Link
              to={"/dashboard"}
              className="px-3 py-1.5 bg-gray-500 text-white rounded"
            >
              My Forms
            </Link>

            <FileUploader
              accept={[".json", "application/json"]}
              onChange={(e) => handleImport(e)}
              label="Import"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/4 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Field Types</h2>
            {InputTypes.map((type) => (
              <SidebarDragItem key={type} type={type} />
            ))}
          </div>
          <div className="w-3/4 bg-white p-4 rounded shadow h-200 ">
            <DropField id="canvas">
              <SortableContext
                items={formField.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {formField.length > 0 ? (
                  formField.map((field) => (
                    <DragableField
                      key={field.id}
                      field={field}
                      removeField={() => removeField(field.id)}
                      editField={() => setEditField(field)}
                    />
                  ))
                ) : (
                  <h1 className="flex justify-center items-center text-shadow-black font-bold">
                    Drop Zone
                  </h1>
                )}
              </SortableContext>
            </DropField>
          </div>
        </div>
      </div>

      {activeId && isDropping && (
        <FieldConfiguration
          field={activeId}
          onSave={(field) => {
            setFormField((prev) => [...prev, field]);
            setIsDropping(false);
            setActiveId(null);
          }}
          onClose={() => {
            setIsDropping(false);
            setActiveId(null);
          }}
        />
      )}
      {editField && (
        <FieldConfiguration
          field={editField.type}
          initialData={editField}
          onSave={(field) => {
            setFormField((prev) =>
              prev.map((f) => (f.id === field.id ? field : f))
            );
            setEditField(null);
          }}
          onClose={() => setEditField(null)}
        />
      )}
    </DndContext>
  );
};

export default Home;
