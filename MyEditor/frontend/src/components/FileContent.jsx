import React, { useEffect, useState } from "react";
import { useFileContext } from "../FileContext";
import axios from "axios";
import { toast } from 'sonner';

const FileContent = () => {
  const { openFile } = useFileContext();
  const [fileTypedData, setFileTypedData] = useState("");

  const fileDataHandler = (event) => {
    const val = event.target.value;
    setFileTypedData(val);
  };

  useEffect(() => {
    if (openFile) {
      const readFile = async () => {
        const response = await axios.get(`/api/readFile/${openFile}`);
        setFileTypedData(response.data.data);
      };
      readFile();
    }
  }, [openFile]);


  const saveFile = async (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      try {
        const response = await axios.post("/api/updateFile", {
          fileName: openFile,
          fileContent: fileTypedData,
        });
        
        
        toast.success(response.data.message, {
          cancel: {
            label: 'Close',
            onClick: () => console.log('x'),
          },
          position:'top-center'
        });
  
      } catch (error) {
        toast.error(error.message, {
          cancel: {
            label: 'Close',
            onClick: () => console.log('x'),
          },
          position:'top-center'
        });
      }
    }
  };

  return (
    <div className="w-full text-gray-300 relative">
      <div className="header py-1.5 border-b-[1px] text-gray-300 bg-[#191D17] px-2 relative z-20">
        {openFile ? openFile : "No file Open"}
      </div>
      <textarea
        name="fileContent"
        className="absolute top-0 h-full w-full resize-none bg-gray-800 outline-none px-2 pt-10 py-3 z-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300"
        onChange={fileDataHandler}
        value={!openFile ? "No file selected" : fileTypedData}
        disabled={!openFile}
        onKeyDown={saveFile}
      ></textarea>
      
    </div>
  );
};

export default FileContent;
