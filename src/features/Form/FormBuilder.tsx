import { Controller, useForm } from "react-hook-form";
import TextInputComponent from "../../component/form/TextInput";

import { useNavigate, useParams } from "react-router";
// import useLocalStorage from "../../hook/useLocalStorage";
import type { Field, FormArray } from "../../Types/FormBuilder/Form";
import PasswordInputComponent from "../../component/form/PasswordInput";
import SelectBoxInput from "../../component/form/SelectInput";
import RadioInput from "../../component/form/RadioInput";
import CheckboxInput from "../../component/form/CheckBoxInput";
import DatePickInput from "../../component/form/DatePickInput";
import TextareaInput from "../../component/form/TextareaInput";
import { addSubmission, getForm, getSubmission } from "../../config/indexDb";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ZodSchemaGenerater from "../../Utils/ZodSchemaGenerater";
import { z } from "zod";
import ButtonComponent from "../../component/Button/SubmitButton";

const FormBuilder = () => {
  // const [storeData] = useLocalStorage<FormArray[]>(
  //   "formArray",
  //   []
  // );
  // const [formData, setFormData] = useLocalStorage<FormArray[]>("formArray", []);
  const { id } = useParams();

  const [formArray, setFormArray] = useState<FormArray>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getForm(Number(id));
        setFormArray(fetchedData);
      } catch (error) {
        console.log("err aavi");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const customZod = ZodSchemaGenerater(formArray?.formElement || []);
  // console.log(z.object({}).extend(customZod));
  type FormData = z.infer<typeof customZod>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,

    control,
  } = useForm<FormData>({
    resolver: zodResolver(customZod),
  });
  if (!id) {
    return <h1>No Form Foundcdsdc</h1>;
  }

  const navigate = useNavigate();

  const formFields = formArray?.formElement;

  const findField = (formField: Field, error: any) => {
    switch (formField.type) {
      case "text":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            // required={formField.required}
            // error={error}
            error={error[formField.label]?.message}
            // maxLength={formField.maxLength}
            // minLength={formField.minLength}
            {...register(formField.label)}
          />
        );
      case "email":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            // required={formField.required}
            // error={errors.root?.message}
            error={error[formField.label]?.message}
            {...register(formField.label)}
          />
        );
      case "password":
        return (
          <PasswordInputComponent
            label={formField.label}
            // required={formField.required}
            // error={errors.root?.message}
            error={error[formField.label]?.message}
            {...register(formField.label)}
          />
        );
      case "number":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            // required={formField.required}
            // error={errors.root?.message}
            error={error[formField.label]?.message}
            // maxLength={formField.maxLength}
            // minLength={formField.minLength}
            {...register(formField.label, { valueAsNumber: true })}
          />
        );
      case "select":
        return (
          <SelectBoxInput
            label={formField.label}
            options={formField.options}
            // error={errors.root?.message}
            error={error[formField.label]?.message}
            // required={formField.required}
            {...register(formField.label)}
            onChange={(e) => setValue(formField.label, e.target.value)}
          />
        );
      case "radio":
        return (
          <Controller
            name={formField.label}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <RadioInput
                  {...field}
                  options={formField.options}
                  label={formField.label}
                  error={error?.message}
                />
              </>
            )}
          />
        );
      case "checkbox":
        return (
          <Controller
            control={control}
            name={formField.label}
            defaultValue={[]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CheckboxInput
                label={formField.label}
                options={formField.options || []}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        );
      case "file":
        return (
          <TextInputComponent
            type="file"
            label={formField.label}
            error={error[formField.label]?.message}
            {...register(formField.label)}
            // required={formField.required}
            accept={formField.fileType?.join(",")}
          />
        );
      case "date":
        return (
          <Controller
            control={control}
            name={formField.label}
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickInput
                label={formField.label}
                selectedDate={value}
                onChange={onChange}
                error={error?.message}
                required={formField.required}
              />
            )}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            label={formField.label}
            error={errors.root?.message}
            required={formField.required}
            maxLength={formField.maxLength}
            {...register(formField.label)}
          />
        );
    }
  };

  const onSubmit = async (data: any) => {
    const subObj = {
      submissionId: Date.now(),
      submissionData: data,
    };
    const prevSubmission = await getSubmission(Number(id));
    const submissionObject = {
      formId: Number(id),
      submissionArray: prevSubmission
        ? [...prevSubmission.submissionArray, subObj]
        : [subObj],
    };

    await addSubmission(submissionObject);
    alert("Form submited");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" w-full max-w-lg max-h-[100vh] mt-10 bg-white shadow-lg rounded-lg overflow-y-auto">
        {formFields ? (
          <>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className=" py-4 px-6"
            >
              {formFields.map((field) => (
                <div key={field.id}>{findField(field, errors)}</div>
              ))}
        <ButtonComponent submitTrue={true} label="Submit"/>

            </form>
          </>
        ) : (
          <div>
          <h1>No Form Found</h1>
        <ButtonComponent label="Return" onClick={()=>{navigate('/dashboard')}}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
