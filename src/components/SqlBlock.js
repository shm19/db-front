import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

const SqlBlock = ({ block, updateBlock, executeQuery }) => {
  const [showResult, setShowResult] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage width for the left panel
  const containerRef = useRef(null);

  const runCode = () => {
    const queryResult = executeQuery(block.content);
    updateBlock(block.content, queryResult);
    setShowResult(true);
  };

  const handleMouseDown = (e) => {
    const containerWidth = containerRef.current.offsetWidth;
    const startX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newLeftPanelWidth = Math.min(
        Math.max(((leftPanelWidth / 100) * containerWidth + deltaX) / containerWidth, 0.1),
        0.9
      );
      setLeftPanelWidth(newLeftPanelWidth * 100); // Convert back to percentage
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex h-40 border rounded-md shadow-md relative">
      {/* SQL Editor Panel */}
      <div className="relative bg-gray-900 border-r" style={{ width: `${leftPanelWidth}%` }}>
        <CodeMirror
          value={block.content}
          extensions={[sql()]}
          onChange={(value) => updateBlock(value)}
          theme="dark"
          placeholder="Write your SQL query here..."
          className="w-full h-full"
        />
        <button
          onClick={runCode}
          className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
        >
          ▶
        </button>
      </div>

      {/* Resizable Separator */}
      <div
        className="separator h-full w-2 bg-gray-400 cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>

      {/* Results Panel */}
      <div className="flex-grow bg-gray-50 p-4">
        {showResult ? (
          <div
            className="text-gray-800 text-sm"
            dangerouslySetInnerHTML={{ __html: block.result }}
          />
        ) : (
          <p className="text-gray-400 text-sm">Click the play button to run this cell</p>
        )}
      </div>
    </div>
  );
};

export default SqlBlock;
