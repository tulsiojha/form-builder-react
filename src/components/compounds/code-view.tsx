"use client";
import { getCode } from "@/utils/template";
import { ILayout } from "@/utils/types";
import { useEffect, useState } from "react";
import CodeBlock from "../atoms/code-block";

const CodeView = ({ items }: { items: ILayout[] }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      setCode(await getCode({ items }));
    })();
  }, [items]);

  return (
    <div>
      <CodeBlock code={code} language="jsx" />
    </div>
  );
};

export default CodeView;
