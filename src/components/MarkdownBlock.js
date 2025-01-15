import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownBlock = ({ block, updateBlock }) => {
  return (
    <div className="mb-8">
      {/* Markdown Content */}
      <div className="mx-4 py-4 px-6 border rounded-lg bg-gray-50 border-gray-300 shadow-md transition hover:shadow-lg">
        <div className="flex flex-col w-full">
          {/* Markdown Editor */}
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(e.target.value)}
            placeholder="Write your notes in Markdown..."
            className="w-full bg-white text-gray-800 resize-none border border-gray-300 rounded-md p-3 shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
          />
          {/* Divider Line */}
          <div className="border-t border-gray-300 my-4"></div>
          {/* Markdown Result */}
          <div className="w-full mt-2 prose lg:prose-xl bg-white p-4 rounded-md shadow-inner border border-gray-200">
            <ReactMarkdown>{block.content || "Add some notes here\n\nUse Markdown"}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Add Block Divider */}
      <div className="relative max-w-7xl mx-auto my-4 transition-opacity flex justify-center">
        <div className="border-gray-300 inset-y-1/2 inset-x-1/4 border-t absolute"></div>
        <div className="opacity-0 flex justify-center z-10 w-full hover:opacity-100 duration-300">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 py-2 px-4 flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full flex items-center align-center mx-3"
            onClick={() => updateBlock("code")}
          >
            <span className="text-center mr-1 material-icons" style={{ fontSize: "20px" }}>
              add
            </span>{" "}
            Code
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 py-2 px-4 flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full flex items-center align-center mx-3"
            onClick={() => updateBlock("markdown")}
          >
            <span className="text-center mr-1 material-icons" style={{ fontSize: "20px" }}>
              add
            </span>{" "}
            Markdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownBlock;
