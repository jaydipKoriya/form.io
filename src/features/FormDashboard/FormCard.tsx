import React, { useEffect, useState } from "react";
import type { FormArray } from "../../Types/FormBuilder/Form";
import { useNavigate } from "react-router";
import { getSubmission } from "../../config/indexDb";
import ZodSchemaGenerater from "../../Utils/ZodSchemaGenerater";
import type { z } from "zod";
import { CSVLink } from "react-csv";
interface FormCardProps {
  form: FormArray;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  const customZod = ZodSchemaGenerater(form.formElement);

  type FormData = z.infer<typeof customZod>;
  const [submissionData, setSbmissionData] = useState<{
    formId: number;
    submissionArray: { submissionId: number; submissionData: FormData }[];
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubmission(form.formId);
      setSbmissionData(data);
    };
    fetchData();
  }, []);
  // console.log(submissionData);
  // const headerData = form.formElement.map((element) => {
  //   return {
  //     Label: element.label,
  //     key: element.label,
  //   };
  // });

  const csvData =
    submissionData?.submissionArray.map((data) => data.submissionData) || [];
  // console.log(csvData);
  // console.log(headerData);

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
          <button
            className="px-1.5 py-1  text-sm font-medium bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(`/form/${form.formId}`)}
          >
            Fill Form
          </button>
          {/* <button
            className="px-1.5 py-1  text-sm font-medium  bg-green-500 text-white rounded"
            onClick={() => {
              console.log(csvData);
              console.log(headerData);
            }}
          >
            Submissions
          </button> */}
          <CSVLink data={csvData} filename={`${form.formId}.csv`} className="px-1.5 py-1  text-sm font-medium  bg-green-500 text-white rounded">Submissions</CSVLink>

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
