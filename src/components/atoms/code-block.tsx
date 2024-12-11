import hljs from "highlight.js";

const CodeBlock = ({
  language = "jsx",
  code,
}: {
  language?: string;
  code: string;
}) => {
  const highlightedCode = hljs.highlight(code, { language }).value;

  return (
    <div className="relative">
      <pre className="hljs p-3 overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
