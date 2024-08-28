import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { ContextAPI } from "../src/contextAPI";
import Start from "./Start";

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-500">
      <ContextAPI>
        <Toaster richColors="true" position="top-center" />
        <Start />
      </ContextAPI>
    </div>
  );
}

export default App;
