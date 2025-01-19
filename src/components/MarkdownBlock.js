import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownBlock = ({ block, updateBlock }) => {
  return (
    <div>
      {/* Markdown Content */}
      <div className="border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-md transition hover:shadow-lg dark:hover:shadow-xl">
        <div className="flex w-full">
          {/* Markdown Editor */}
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(e.target.value)}
            placeholder="Write your notes in Markdown..."
            className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none border border-gray-300 dark:border-gray-500 rounded-md p-3 shadow-inner outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            rows={5}
          />
          {/* Divider Line */}
          <div className="border-t border-gray-300 dark:border-gray-500 my-2"></div>
          {/* Markdown Result */}
          <div className="w-full prose lg:prose-xl bg-white dark:bg-gray-800 p-4 rounded-md shadow-inner border border-gray-200 dark:border-gray-600 dark:text-gray-100">
            <ReactMarkdown>{block.content || "Add some notes here\n\nUse Markdown"}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownBlock;
