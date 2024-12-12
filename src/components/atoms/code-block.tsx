import hljs from "highlight.js";
import { Copy } from "./copy";

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
      <Copy code={code} />
    </div>
  );
};

export default CodeBlock;
