


export interface TextareaProps  {
  label: string;
  error?: string;
  size?:string;
  maxLength?:number
}



const TextareaInput: React.FC<TextareaProps> = ({ label, ...rest }) => {
    const{error,size,maxLength}=rest
  return (
    <div className="textarea-container">
      <label htmlFor={label}>{label}</label>
      <textarea
        maxLength={maxLength}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextareaInput;