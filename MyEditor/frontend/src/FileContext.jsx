// FileContext.js
import { createContext, useState, useContext } from 'react';

// Create Context
const FileContext = createContext();

// Custom hook to use the FileContext
export function useFileContext() {
    return useContext(FileContext);
}

// Context Provider Component
export function FileProvider({ children }) {
    const [openFile, setOpenFile] = useState();

    const openFileHandler = (file)=>{
        setOpenFile(file)
     }

    return (
        <FileContext.Provider value={{ openFile, openFileHandler }}>
            {children}
        </FileContext.Provider>
    );
}
