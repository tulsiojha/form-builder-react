"use client";
import CodeView from "@/components/compounds/code-view";
import JsonView from "@/components/compounds/json-view";
import PreView from "@/components/compounds/pre-view";
import TabView from "@/components/compounds/tab-view";
import ComponentSection from "@/components/molecules/component-section";
import FormSection from "@/components/molecules/form-section";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ILayout } from "@/utils/types";
import { useState } from "react";

export default function Home() {
  const [layouts, setLayouts] = useState<ILayout[]>([]);

  return (
    <div className="grid grid-rows-[50px,auto] max-h-screen min-h-screen">
      <div className="h-full border-b border-black/10"></div>
      <div className="grid grid-cols-[206px,auto] max-h-[calc(100vh-50px)]">
        <div className="border-r border-black/10 p-4 box-border overflow-auto">
          <ComponentSection />
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full border md:min-w-[450px] w-full"
        >
          <ResizablePanel defaultSize={65}>
            <FormSection onItemChanged={setLayouts} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={35}
            minSize={35}
            className="!overflow-auto"
          >
            <div className="p-4">
              <TabView
                defaultValue="preview"
                triggers={[
                  { label: "Preview", value: "preview" },
                  { label: "Json", value: "json" },
                  { label: "Code", value: "code" },
                ]}
                contents={[
                  { render: <PreView layouts={layouts} />, value: "preview" },
                  { render: <JsonView layouts={layouts} />, value: "json" },
                  { render: <CodeView layouts={layouts} />, value: "code" },
                ]}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
