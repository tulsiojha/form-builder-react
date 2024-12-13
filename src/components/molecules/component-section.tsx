"use client";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { components } from "@/utils/data";
import { IItem } from "@/utils/types";

const ComponentSection = ({
  onItemClick,
}: {
  onItemClick: (item: IItem) => void;
}) => {
  const [items, setItems] = useState<typeof components>([]);

  useEffect(() => {
    setItems(components);
  }, []);

  return (
    <ReactSortable
      list={items}
      setList={setItems}
      {...{
        group: {
          name: "grouping",
          pull: "clone",
          put: false,
        },
        clone: (item: IItem) => ({ ...item, id: `${item.kind}_${uuid()}` }),
        sort: false,
      }}
      className="md:min-h-[200px] w-full flex flex-row md:flex-col gap-2"
    >
      {items.map((item) => (
        <button
          key={item.id}
          className="h-10 border border-gray-200 rounded flex flex-row gap-2 items-center px-2 bg-white cursor-pointer"
          onClick={() => {
            onItemClick?.(item);
          }}
        >
          <span>{item.icon}</span>
          <span className="text-sm">{item.displayName}</span>
        </button>
      ))}
    </ReactSortable>
  );
};

export default ComponentSection;
