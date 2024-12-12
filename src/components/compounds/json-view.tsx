"use client";

import { ILayout } from "@/utils/types";
import CodeBlock from "../atoms/code-block";
import ViewLayout from "../molecules/view-layout";
import { cleanJson } from "@/utils/commons";

const JsonView = ({ layouts }: { layouts: ILayout[] }) => {
  return (
    <ViewLayout layouts={layouts}>
      <CodeBlock
        code={JSON.stringify(cleanJson({ layouts }), null, 2)}
        language="json"
      />
    </ViewLayout>
  );
};

export default JsonView;
