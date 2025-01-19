import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Block from "./Block";
import { NotebookContext } from "../contexts/NotebookContext";
import DatabaseSchema from "./DatabaseSchema";

const NotebookEditor = ({ executeQuery }) => {
  const { notebooks, setNotebooks } = useContext(NotebookContext);
  const { id } = useParams();
  const notebook = notebooks.find((nb) => nb.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [reRender, setReRender] = useState(false);

  if (!notebook) {
    return <div className="p-8 text-xl text-red-600">Notebook not found!</div>;
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

  const isSchemaChangingQuery = (query) => {
    const schemaKeywords = ["CREATE TABLE", "DROP TABLE", "ALTER TABLE"];
    return schemaKeywords.some((keyword) => query.toUpperCase().includes(keyword));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Notebook Header */}
      <div
        className="mb-8 border-b-2 border-gray-300 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100"
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{notebook.name}</h1>
            {notebook?.databaseSettings?.dbType && (
              <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                {notebook?.databaseSettings?.dbType}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Database Schema */}
      <DatabaseSchema databaseSettings={notebook.databaseSettings} reRender={reRender} />

      {/* Blocks Section */}
      <div className="space-y-6">
        {notebook.blocks.map((block) => (
          <div
            key={block.id}
            className="relative bg-white border border-gray-300 rounded-md shadow-md"
          >
            <Block
              block={block}
              databaseType={notebook.databaseSettings.dbType}
              updateBlock={(newContent, result) => updateBlock(block.id, newContent, result)}
              executeQuery={(query) => {
                const result = executeQuery(query, notebook.databaseSettings);
                if (isSchemaChangingQuery(query)) {
                  setReRender((prev) => !prev);
                }
                return result;
              }}
            />
            {/* Delete Button */}
            <button
              onClick={() => deleteBlock(block.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition-transform transform hover:scale-105"
              title="Delete Block"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Add Block Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => addBlock("markdown")}
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition-all"
        >
          + Add Markdown Block
        </button>
        <button
          onClick={() => addBlock("code")}
          className="flex-1 bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all"
        >
          + Add SQL Block
        </button>
      </div>
    </div>
  );
};

export default NotebookEditor;
