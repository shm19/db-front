import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import useIsDbSql from "../utils/isSql";

const SqlBlock = ({ block, updateBlock, executeQuery, databaseType }) => {
  const [showResult, setShowResult] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [blockHeight, setBlockHeight] = useState(200); // Height in pixels
  const containerRef = useRef(null);
  const { isDbSql } = useIsDbSql(databaseType);
  console.log("isDbSql:", isDbSql);
  const runCode = async () => {
    const queryResult = await executeQuery(block.content);
    updateBlock(block.content, queryResult);
    setShowResult(true);
  };

  const handleMouseDownHorizontal = (e) => {
    const containerWidth = containerRef.current.offsetWidth;
    const startX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newLeftPanelWidth = Math.min(
        Math.max(((leftPanelWidth / 100) * containerWidth + deltaX) / containerWidth, 0.1),
        0.9
      );
      setLeftPanelWidth(newLeftPanelWidth * 100);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownVertical = (e) => {
    const startY = e.clientY;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newBlockHeight = Math.max(blockHeight + deltaY, 100); // Minimum height of 100px
      setBlockHeight(newBlockHeight);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const renderResult = (result) => {
    switch (result.type) {
      case "string":
        return (
          <pre className="bg-gray-900 text-white p-4 rounded whitespace-pre-wrap">
            {result.content}
          </pre>
        );
      case "array":
        return (
          <div className="grid grid-cols-1 gap-4">
            {result.content.map((item, index) => (
              <pre
                key={index}
                className="bg-gray-100 text-gray-800 p-4 rounded whitespace-pre-wrap dark:bg-gray-700 dark:text-white"
              >
                {JSON.stringify(item, null, 2)}
              </pre>
            ))}
          </div>
        );
      case "object":
        return (
          <pre className="bg-gray-100 text-gray-800 p-4 rounded whitespace-pre-wrap dark:bg-gray-700 dark:text-white">
            {JSON.stringify(result.content, null, 2)}
          </pre>
        );
      case "table":
        if (result.content.length === 0) {
          return <p className="text-gray-500 italic dark:text-gray-400">No rows to display.</p>;
        }
        return (
          <table className="min-w-full border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {Object.keys(result.content[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 text-left dark:text-white">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.content.map((row, rowIndex) => (
                <tr key={rowIndex} className="dark:bg-gray-800">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="border px-4 py-2 dark:text-white">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "message":
        return <p className="text-green-500 dark:text-green-400">{result.content}</p>;
      case "error":
        return <p className="text-red-500 dark:text-red-400">{result.content}</p>;
      default:
        return <p className="text-gray-500 italic dark:text-gray-400">Unknown result type.</p>;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col border rounded-md shadow-md relative dark:bg-gray-800 dark:border-gray-600"
      style={{ height: `${blockHeight}px` }}
    >
      {/* SQL Editor Panel */}
      <div className="flex h-full">
        <div
          className="relative bg-gray-900 dark:bg-gray-700 border-r"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <CodeMirror
            value={block.content}
            extensions={isDbSql ? [sql()] : []}
            onChange={(value) => updateBlock(value)}
            theme="dark"
            placeholder={`Write your ${databaseType} query here...`}
            className="w-full h-full"
          />
          <button
            onClick={runCode}
            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            ▶
          </button>
        </div>

        {/* Resizable Separator (Horizontal) */}
        <div
          className="separator h-full w-2 bg-gray-400 cursor-col-resize dark:bg-gray-600"
          onMouseDown={handleMouseDownHorizontal}
        ></div>

        {/* Results Panel */}
        <div className="flex-grow bg-gray-50 p-4 overflow-y-auto dark:bg-gray-900 dark:text-white">
          {showResult ? (
            renderResult(block.result)
          ) : (
            <p className="text-gray-400 text-sm dark:text-gray-400">
              Click the play button to run this cell
            </p>
          )}
        </div>
      </div>

      {/* Resizable Separator (Vertical) */}
      <div
        className="separator w-full h-2 bg-gray-400 cursor-row-resize dark:bg-gray-600"
        onMouseDown={handleMouseDownVertical}
      ></div>
    </div>
  );
};

export default SqlBlock;
