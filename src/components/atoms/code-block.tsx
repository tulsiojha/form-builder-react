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
      <pre className="hljs p-3 overflow-auto max-h-[calc(100vh_-_120px)] md:max-h-[calc(100vh_-_114px)]">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <Copy code={code} />
    </div>
  );
};

export default CodeBlock;
