import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownBlock = ({ block, updateBlock }) => {
  return (
    <div>
      {/* Markdown Content */}
      <div className="border rounded-lg bg-gray-50 border-gray-300 shadow-md transition hover:shadow-lg">
        <div className="flex w-full">
          {/* Markdown Editor */}
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(e.target.value)}
            placeholder="Write your notes in Markdown..."
            className="w-full bg-white text-gray-800 resize-none border border-gray-300 rounded-md p-3 shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
          />
          {/* Divider Line */}
          <div className="border-t border-gray-300 my-2"></div>
          {/* Markdown Result */}
          <div className="w-full prose lg:prose-xl bg-white p-4 rounded-md shadow-inner border border-gray-200">
            <ReactMarkdown>{block.content || "Add some notes here\n\nUse Markdown"}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownBlock;
