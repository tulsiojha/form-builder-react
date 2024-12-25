"use client";
import CodeView from "@/components/compounds/code-view";
import JsonView from "@/components/compounds/json-view";
import PreView from "@/components/compounds/pre-view";
import TabView from "@/components/compounds/tab-view";
import AskAIModal from "@/components/molecules/ask-modal";
import ComponentSection from "@/components/molecules/component-section";
import FormSection from "@/components/molecules/form-section";
import MobileDrawer from "@/components/molecules/mobile-drawer";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { items } from "@/utils/data";
import { ILayout } from "@/utils/types";
import { LucideGithub, Sidebar, Wand2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuid } from "uuid";

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
  const [askAIModal, setAskAIModal] = useState(false);

  return (
    <div
      className="grid grid-rows-[50px,auto] max-h-screen min-h-screen overflow-hidden"
      style={{ maxWidth: "100vw" }}
    >
      <div className="h-[50px] border-b border-black/10 items-center justify-between px-4 flex flex-row sticky top-0 z-50 bg-white">
        <div className="flex-1 text-sm font-bold">Dynamic form builder</div>
        <div className="flex flex-row items-center gap-1">
          <div>
            <Button variant={"ghost"} asChild>
              <Link href={"https://github.com/tulsiojha/form-builder-react"}>
                <LucideGithub size={22} />
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <MobileDrawer
              trigger={
                <Button variant={"ghost"}>
                  <Sidebar size={22} />
                </Button>
              }
            >
              <div className="pt-2">
                <Tabs layouts={layouts} />
              </div>
            </MobileDrawer>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-h-[calc(100vh_-_50px)] max-w-screen">
        <div className="border-r border-black/10 p-4 box-border overflow-auto hidden md:block md:w-[230px]">
          <ComponentSection
            onItemClick={(item) => {
              setLayouts((p) => [
                ...p,
                { layout: true, id: uuid(), children: [item] },
              ]);
            }}
          />
        </div>
        <div
          className="md:hidden flex-1 max-h-[calc(100vh_-_50px)]"
          style={{ maxWidth: "100vw" }}
        >
          <FormSection onItemChanged={setLayouts} layouts={layouts} />
        </div>
        <div className="h-full hidden md:block w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full border w-full"
          >
            <ResizablePanel defaultSize={65} maxSize={65}>
              <FormSection onItemChanged={setLayouts} layouts={layouts} />
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
      <div className="z-50 absolute bottom-5 right-5 shadow-lg">
        <Button size={"icon"} onClick={() => setAskAIModal(true)}>
          <Wand2Icon size={20} />
        </Button>
      </div>
      <AskAIModal
        open={askAIModal}
        setOpen={setAskAIModal}
        onSubmit={(e) => {
          const xx = e.map((m) => ({
            ...m,
            children: m.children.map((mm) => {
              return {
                ...mm,
                icon: items[mm.kind].icon,
                component: items[mm.kind].component,
              };
            }),
          }));
          setLayouts(xx);
          setAskAIModal(false);
        }}
      />
    </div>
  );
}
