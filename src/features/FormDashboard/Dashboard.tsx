import { useEffect, useState } from "react";
import { getAllForm } from "../../config/indexDb";
import useLocalStorage from "../../hook/useLocalStorage";
import type { FormArray } from "../../Types/FormBuilder/Form";
import FormCard from "./FormCard";

const Dashboard = () => {
  // const [formArray] = useLocalStorage<FormArray[]>(
  //   "formArray",
  //   []
  // );
  //   console.log(formArray);
  const [formArray, setFormArray] = useState<FormArray[]>([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const fetchedData=await getAllForm();
        setFormArray(fetchedData)
      } catch (error) {
        console.log('err aavi');
        console.error(error);
      }
    }
    fetchData()
  },[])


  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold  text-gray-900 sm:text-4xl">
          My Forms
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
          {formArray.map((form) => (
            <FormCard form={form} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
