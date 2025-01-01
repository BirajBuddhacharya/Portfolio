import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="relative w-64 h-64 bg-gray-200 overflow-hidden">
        <div class="absolute w-48 h-48 bg-blue-500 rounded-full left-12 top-12 shadow-lg"></div>
        <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
      </div>
    </>
  );
}

export default App;
