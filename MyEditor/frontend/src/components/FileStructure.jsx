import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useFileContext } from "../FileContext";

const FileStructure = ({ expanded }) => {
  const [createFile, setCreateFile] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [inputValue, setInputValue] = useState();
  const {openFileHandler} = useFileContext()

 const fetchData = async function(){
   const {data} = await axios.get("/api/getFiles")
   setAllFiles(data.files)
}

  useEffect(()=>{
    fetchData()
  },[allFiles.length])

  const createFileHandler = () => {
    setCreateFile(!createFile);
    setCreateFolder(false);
  };

  const createFolderHandler = () => {
    setCreateFolder(!createFolder);
    setCreateFile(false);
  };

  const type = (file) => {
    if (file.indexOf(".")>0) {
      return true;
    }
    return false;
  };

  const inputHandler = (event)=>{
     const fileName = event.target.value;
     setInputValue(fileName);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const saveFile = async function(){
          const response = await axios.post('/api/createFile',{
            fileName:inputValue,
            data:""
          })
          console.log(response.data.message);
          fetchData();
          setInputValue('')
          return response.data.message
      }
      saveFile();
    }
  };

  const deleteHandler = (fileName)=>{
    const deleteFile = async function(){
        console.log(fileName);
        try {
          const response = await axios.delete(`/api/deleteFile/${fileName}`)
          fetchData()
          return response.data
        } catch (error) {
           console.log(error);
        }
    }
    deleteFile()
  }

  return (
    <div
      className={`slider overflow-y-scroll ${
        expanded
          ? "w-2/12 p-2 border-r-[1px] border-gray-500 h-full transition ease-in-out duration-700"
          : "w-0 overflow-hidden"
      } `}
    >
      <div className="flex justify-end gap-1 text-xl w-full">
        <i
          className="ri-file-add-line text-gray-400 cursor-pointer"
          onClick={() => createFileHandler()}
        ></i>
        {/* <i
          className="ri-folder-add-line  text-gray-400 cursor-pointer"
          onClick={() => createFolderHandler()}
        ></i> */}
      </div>
      {createFile ? (
        <input
          type="text"
          placeholder="File name"
          className="rounded-sm outline-none w-full px-1"
          onChange={(e)=>{
            inputHandler(e)
          }}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      ) : (
        ""
      )}
      {createFolder ? (
        <input
          type="text"
          placeholder="Folder name"
          className="rounded-sm outline-none w-full px-1"
        />
      ) : (
        ""
      )}
      {/* file name */}
      
      <div className="">
      {
        allFiles.length>0 ? allFiles.map((file, index)=>{
          return <div className="flex justify-between mt-1 rounded-sm text-gray-300 font-sans px-1 gap-2" key={index}>
          <div className="cursor-pointer w-full hover:text-gray-500 overflow-hidden" onClick={()=>openFileHandler(file)}>
            {
              <i
                className={`ri-${
                  type(file)
                    ? "file-text-line text-blue-700"
                    : "file-text-line text-gray-600"
                } mr-1`}
              ></i>
            }
            {file}
          </div>
          <div>
            <i className="ri-delete-bin-line text-red-500 cursor-pointer" onClick={()=>deleteHandler(file)}></i>
          </div>
        </div>
        }) : ""
      }
      </div>
    </div>
  );
};

export default FileStructure;
