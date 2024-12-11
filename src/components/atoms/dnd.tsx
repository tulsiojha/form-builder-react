"use client";
import { IItem } from "@/utils/types";
import { ReactSortable } from "react-sortablejs";

const Dnd = ({
  dndProps,
  items = [],
  setItems,
}: {
  dndProps?: any;
  items: IItem[];
  setItems: (props: any) => void;
}) => {
  return (
    <ReactSortable
      list={items}
      setList={setItems}
      {...dndProps}
      className="h-[200px] w-[200px] flex flex-col gap-4"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="h-8 w-32 border border-gray-200 rounded flex flex-row gap-2 items-center px-2 bg-white"
        >
          <span>{item.icon}</span>
          <span>{item.displayName}</span>
        </div>
      ))}
    </ReactSortable>
  );
};

export default Dnd;
