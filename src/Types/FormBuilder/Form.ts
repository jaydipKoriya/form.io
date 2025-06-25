export interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  size?:number;
  maxLength?:number;
  minLength?:number;
  options?: Options[];
}

export interface Options {
 label: string, value: string 
}
export interface FormArray {
  formId: number;
  formElement: Field[];
}

