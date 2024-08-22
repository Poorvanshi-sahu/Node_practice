import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { FileProvider } from "./FileContext";
import { Toaster } from 'sonner';

function App() {
  return (
    <>
    
     <FileProvider>
      <div className="h-screen w-full bg-[#191D17] overflow-x-hidden">
        <Navbar />
        <div className="flex">
          <Home />
        </div>
      </div>
      <Toaster richColors />
      </FileProvider>
    </>
  );
}

export default App;
