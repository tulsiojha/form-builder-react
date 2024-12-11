"use client";

import CodeBlock from "../atoms/code-block";

const JsonView = ({ items }: { items: any }) => {
  return (
    <div className="flex flex-col gap-3">
      <CodeBlock code={JSON.stringify(items, null, 2)} language="json" />
    </div>
  );
};

export default JsonView;
