import React, { useRef } from "react";


interface FileUploaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string[];
  label:string;
  error?:string
}

const FileUploader: React.FC<FileUploaderProps> = ({ accept, onChange,label,error }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileRef.current?.click();
  };
  return (
    <>
      <input
        type="file"
        ref={fileRef}
        onChange={onChange}
        style={{ display: "none" }}
        accept={accept.join(",")}
      />
       

      <button onClick={handleButtonClick} className="px-3 py-1 bg-cyan-950 text-white rounded" >{label}</button>
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>

    </>
  );
};

export default FileUploader;
