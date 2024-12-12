"use client";
import { getCode } from "@/utils/template";
import { ILayout } from "@/utils/types";
import { useEffect, useState } from "react";
import CodeBlock from "../atoms/code-block";
import ViewLayout from "../molecules/view-layout";

const CodeView = ({ layouts }: { layouts: ILayout[] }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      setCode(await getCode({ layouts }));
    })();
  }, [layouts]);

  return (
    <ViewLayout layouts={layouts}>
      <div>
        <CodeBlock code={code} language="jsx" />
      </div>
    </ViewLayout>
  );
};

export default CodeView;
