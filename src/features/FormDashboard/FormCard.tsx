import React from "react";
import type { Field, FormArray } from "../../Types/FormBuilder/Form";
import { useNavigate } from "react-router";

interface FormCardProps {
  form: FormArray;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
    const navigate=useNavigate()

  const handleExport = (data: FormArray) => {
    const jsonData = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const jsonUrl = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonUrl;
    link.download = `${data.formId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-sm leading-5 font-medium text-shadow-black">
          Form Id:{form.formId}
        </div>
        <div className="mt-1 text-sm leading-9 font-semibold text-gray-500 truncate">
          Field Count:{form.formElement.length}
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-1.5 py-1  text-sm font-medium bg-blue-600 text-white rounded cursor-pointer"
            onClick={()=>navigate(`/form/${form.formId}`)}
          >
            Fill Form
          </button>
          <button className="px-1.5 py-1  text-sm font-medium  bg-green-500 text-white rounded">
            Submissions
          </button>
          <button
            className="px-1.5 py-1  text-sm font-medium  bg-gray-500 text-white rounded"
            onClick={() => handleExport(form)}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
