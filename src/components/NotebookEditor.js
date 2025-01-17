import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Block from "./Block";
import { NotebookContext } from "../contexts/NotebookContext";

const NotebookEditor = ({ executeQuery }) => {
  const { notebooks, setNotebooks } = useContext(NotebookContext);
  const { id } = useParams();
  const notebook = notebooks.find((nb) => nb.id === id);
  const [isEditing, setIsEditing] = useState(false);

  if (!notebook) {
    return <div className="p-8 text-xl">Notebook not found!</div>;
  }

  const updateNotebook = (updatedNotebook) => {
    setNotebooks(notebooks.map((nb) => (nb.id === updatedNotebook.id ? updatedNotebook : nb)));
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: "",
      result: "",
    };
    updateNotebook({
      ...notebook,
      blocks: [...notebook.blocks, newBlock],
    });
  };

  const updateBlock = (blockId, newContent, result = "") => {
    updateNotebook({
      ...notebook,
      blocks: notebook.blocks.map((block) =>
        block.id === blockId ? { ...block, content: newContent, result } : block
      ),
    });
  };

  const deleteBlock = (blockId) => {
    updateNotebook({
      ...notebook,
      blocks: notebook.blocks.filter((block) => block.id !== blockId),
    });
  };

  return (
    <div className="p-8">
      <div
        className="mb-8 text-3xl font-bold p-2 border-b-2 border-gray-300 hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <input
            value={notebook.name}
            onChange={(e) => updateNotebook({ ...notebook, name: e.target.value })}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-full p-2 outline-none border border-gray-300 rounded-md"
          />
        ) : (
          <div className="mb-8 text-3xl font-bold flex items-center gap-4">
            <span>{notebook.name}</span>
            {notebook?.databaseSettings?.dbType && (
              <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                {notebook?.databaseSettings?.dbType}
              </span>
            )}
          </div>
        )}
      </div>
      {notebook.blocks.map((block) => (
        <div key={block.id} className="relative">
          <Block
            block={block}
            updateBlock={(newContent, result) => updateBlock(block.id, newContent, result)}
            executeQuery={executeQuery}
          />
          <button
            onClick={() => deleteBlock(block.id)}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-700"
          >
            X
          </button>
          {/* Divider */}
          <div className="opacity-0 flex justify-center z-10 w-full hover:opacity-100 duration-300 my-4">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
        </div>
      ))}
      {/* Add Block Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => addBlock("markdown")}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow-md"
        >
          + Markdown
        </button>
        <button
          onClick={() => addBlock("code")}
          className="bg-gray-500 text-white px-6 py-2 rounded shadow-md"
        >
          + Code
        </button>
      </div>
    </div>
  );
};

export default NotebookEditor;
