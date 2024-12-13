import {
  Tabs as NativeTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ITabs } from "@/utils/types";

const TabView = ({ triggers = [], contents = [], defaultValue }: ITabs) => {
  return (
    <NativeTabs defaultValue={defaultValue} className="h-full">
      <TabsList className="grid w-full grid-cols-3 max-w-[300px] items-center justify-center md:m-auto">
        {triggers.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((c) => (
        <TabsContent
          key={c.value}
          value={c.value}
          className="overflow-auto h-[calc(100vh_-_114px)] min-h-full"
        >
          {c.render}
        </TabsContent>
      ))}
    </NativeTabs>
  );
};

export default TabView;
