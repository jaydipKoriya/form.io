import React, { useRef } from "react";
import type { RefCallBack } from "react-hook-form";

interface FileUploaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string[];
  label:string
}

const FileUploader: React.FC<FileUploaderProps> = ({ accept, onChange,label }) => {
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
    </>
  );
};

export default FileUploader;
