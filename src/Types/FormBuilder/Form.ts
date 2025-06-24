export interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  size?:number;
  maxLenght?:number;
  minLength?:number;
  options?: Options[];
}

export interface Options {
 label: string, value: string 
}