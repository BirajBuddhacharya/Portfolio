import "./App.css";
import { useState } from "react";

function App() {
  const [rotation, setRotation] = useState(0);
  const handleRotation = (rotateValue) => {
    setRotation(rotation + rotateValue);
  } 

  return (
    <>
      <button onClick={() => handleRotation(45)}>Click me</button>
      <div className="rotateDivWrapper">
        <div className="rotateDiv" style={{
          transform: `rotate(${rotation}deg)`
        }}>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
          <div className="flex-child"></div>
        </div>
      </div>
    </>
  );
}

export default App;
