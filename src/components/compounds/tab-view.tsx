import {
  Tabs as NativeTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ReactNode } from "react";

type ITabs = {
  triggers: { label: ReactNode; value: string }[];
  contents: { render: ReactNode; value: string }[];
  defaultValue: string;
};
const TabView = ({ triggers = [], contents = [], defaultValue }: ITabs) => {
  return (
    <NativeTabs defaultValue={defaultValue}>
      <TabsList className="grid w-full grid-cols-3 sticky top-0 max-w-[300px]">
        {triggers.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((c) => (
        <TabsContent key={c.value} value={c.value}>
          {c.render}
        </TabsContent>
      ))}
    </NativeTabs>
  );
};

export default TabView;
