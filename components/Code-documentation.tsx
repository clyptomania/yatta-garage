// components/CodeDocumentation.js
import React from "react";

const CodeDocumentation = ({ onResize }) => {
  return (
    <div
      className="h-screen bg-black text-white resize-drag"
      onMouseDown={(e) => onResize(e)}
    >
      Code
    </div>
  );
};

export default CodeDocumentation;
