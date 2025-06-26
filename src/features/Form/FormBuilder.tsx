import {
  Controller,
  useForm,
  type FieldErrors,
  type FieldValues,
} from "react-hook-form";
import TextInputComponent from "../../component/form/TextInput";
import SubmitButton from "../../component/Button/SubmitButton";
import { useNavigate, useParams } from "react-router";
import useLocalStorage from "../../hook/useLocalStorage";
import type { Field, FormArray } from "../../Types/FormBuilder/Form";
import PasswordInputComponent from "../../component/form/PasswordInput";
import SelectBoxInput from "../../component/form/SelectInput";
import RadioInput from "../../component/form/RadioInput";
import CheckboxInput from "../../component/form/CheckBoxInput";
import DatePickInput from "../../component/form/DatePickInput";
import TextareaInput from "../../component/form/TextareaInput";
import { getAllForm, getForm } from "../../config/indexDb";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ZodSchemaGenerater from "../../Utils/ZodSchemaGenerater";

const FormBuilder = () => {
  // const [storeData] = useLocalStorage<FormArray[]>(
  //   "formArray",
  //   []
  // );
    // const [formData, setFormData] = useLocalStorage<FormArray[]>("formArray", []);
  const { id } = useParams();

  const [formArray, setFormArray] = useState<FormArray>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,

    control,
  } = useForm({
    // resolver:zodResolver(ZodSchemaGenerater(formArray?.formElement!))
  });
  if (!id) {
    return <h1>No Form Foundcdsdc</h1>;
  }
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
  

  // console.log(fetchedData

  const navigate = useNavigate();

  const formFields = formArray?.formElement;

  const findField = (formField: Field, error: FieldErrors<FieldValues>) => {
    switch (formField.type) {
      case "text":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            required={formField.required}
            error={error.root?.message}
            maxLength={formField.maxLength}
            minLength={formField.minLength}
            {...register(formField.label)}
          />
        );
      case "email":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            required={formField.required}
            error={error.root?.message}
            {...register(formField.label)}
          />
        );
      case "password":
        return (
          <PasswordInputComponent
            label={formField.label}
            required={formField.required}
            error={error.root?.message}
            {...register(formField.label)}
          />
        );
      case "number":
        return (
          <TextInputComponent
            type={formField.type}
            label={formField.label}
            required={formField.required}
            error={error.root?.message}
            maxLength={formField.maxLength}
            minLength={formField.minLength}
            {...register(formField.label, { valueAsNumber: true })}
          />
        );
      case "select":
        return (
          <SelectBoxInput
            label={formField.label}
            options={formField.options}
            error={error.root?.message}
            required={formField.required}
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
            error={error.root?.message}
            {...register(formField.label)}
            required={formField.required}
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
            error={error.root?.message}
            required={formField.required}
            maxLength={formField.maxLength}
            {...register(formField.label)}
          />
        );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigate("/");
        })}
      >
        {formFields ? (
          formFields.map((field) => (
            <div key={field.id}>{findField(field, errors)}</div>
          ))
        ) : (
          <h1>No Form Found kkkk</h1>
        )}
        <SubmitButton />
      </form>
    </>
  );
};

export default FormBuilder;
