"use client";

import { ILayout } from "@/utils/types";
import CodeBlock from "../atoms/code-block";
import ViewLayout from "../molecules/view-layout";
import { cleanJson } from "@/utils/commons";

const JsonView = ({ layouts }: { layouts: ILayout[] }) => {
  return (
    <ViewLayout layouts={layouts}>
      <div className="absolute left-0 right-0">
        <CodeBlock
          code={JSON.stringify(cleanJson({ layouts }), null, 2)}
          language="json"
        />
      </div>
    </ViewLayout>
  );
};

export default JsonView;
