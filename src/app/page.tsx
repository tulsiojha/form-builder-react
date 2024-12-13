"use client";
import CodeView from "@/components/compounds/code-view";
import JsonView from "@/components/compounds/json-view";
import PreView from "@/components/compounds/pre-view";
import TabView from "@/components/compounds/tab-view";
import CTextInput from "@/components/list-components/c-text-input";
import ComponentSection from "@/components/molecules/component-section";
import FormSection from "@/components/molecules/form-section";
import MobileDrawer from "@/components/molecules/mobile-drawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ILayout } from "@/utils/types";
import { Sidebar, TextCursorInputIcon } from "lucide-react";
import { useState } from "react";

const Tabs = ({ layouts }: { layouts: ILayout[] }) => {
  return (
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
  );
};

export default function Home() {
  const [layouts, setLayouts] = useState<ILayout[]>([]);

  return (
    <div
      className="grid grid-rows-[50px,auto] max-h-screen min-h-screen overflow-hidden"
      style={{ maxWidth: "100vw" }}
    >
      <div className="h-full border-b border-black/10 items-center justify-between px-4 flex flex-row sticky top-0 z-50 bg-white">
        <div className="flex-1 text-sm">Dynamic form builder</div>
        <div className="md:hidden">
          <MobileDrawer
            trigger={
              <button className="hover:bg-black/10 rounded-lg p-2">
                <Sidebar size={22} />
              </button>
            }
          >
            <div className="pt-2">
              <Tabs layouts={layouts} />
            </div>
          </MobileDrawer>
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-h-[calc(100vh-50px)] max-w-screen">
        <div className="border-r border-black/10 p-4 box-border overflow-auto hidden md:block md:w-[230px]">
          <ComponentSection />
        </div>
        <div className="md:hidden flex-1" style={{ maxWidth: "100vw" }}>
          <FormSection onItemChanged={setLayouts} />
        </div>
        <div className="h-full hidden md:block w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full border md:min-w-[450px] w-full"
          >
            <ResizablePanel defaultSize={65}>
              <FormSection onItemChanged={setLayouts} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35} minSize={35}>
              <div className="p-4">
                <Tabs layouts={layouts} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
