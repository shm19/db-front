import React from "react";

import MarkdownBlock from "./MarkdownBlock";
import SqlBlock from "./SqlBlock";

const Block = ({ block, updateBlock, executeQuery, databaseType }) => {
  return (
    <div className="mb-8">
      {block.type === "code" && (
        <SqlBlock
          block={block}
          updateBlock={updateBlock}
          executeQuery={executeQuery}
          databaseType={databaseType}
        />
      )}
      {block.type === "markdown" && <MarkdownBlock block={block} updateBlock={updateBlock} />}
    </div>
  );
};

export default Block;
