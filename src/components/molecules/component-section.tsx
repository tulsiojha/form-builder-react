"use client";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { IItem } from "@/utils/types";
import {
  Check,
  LetterTextIcon,
  SlidersHorizontalIcon,
  TextCursorInputIcon,
  ToggleLeftIcon,
} from "lucide-react";
import { ReactSortable } from "react-sortablejs";

const components: IItem[] = [
  {
    id: "checkbox",
    kind: "checkbox",
    displayName: "Checkbox",
    label: "Checkbox",
    description: "Checkbox description",
    placeholder: "checkbox",
    icon: (
      <div className="border border-black rounded">
        <Check size={14} />
      </div>
    ),
  },
  {
    id: "text-input",
    kind: "text-input",
    label: "Name",
    description: "Name to be displayed",
    placeholder: "Name",
    displayName: "TextInput",
    icon: <TextCursorInputIcon size={14} />,
  },
  {
    id: "textarea",
    kind: "textarea",
    label: "Address",
    description: "Current address",
    placeholder: "address",
    displayName: "TextArea",
    icon: <LetterTextIcon size={14} />,
  },
  {
    id: "slider",
    kind: "slider",
    label: "Slider",
    description: "Description",
    displayName: "Slider",
    icon: <SlidersHorizontalIcon size={14} />,
  },
  {
    id: "switch",
    kind: "switch",
    label: "Name",
    description: "Name to be displayed",
    displayName: "Switch",
    icon: <ToggleLeftIcon size={14} />,
  },
];

const ComponentSection = () => {
  const [items, setItems] = useState(components);
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
        clone: (item: any) => ({ ...item, id: uuid() }),
        sort: false,
      }}
      className="min-h-[200px] w-full flex flex-col gap-2"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="h-10 border border-gray-200 rounded flex flex-row gap-2 items-center px-2 bg-white cursor-pointer"
        >
          <span>{item.icon}</span>
          <span className="text-sm">{item.displayName}</span>
        </div>
      ))}
    </ReactSortable>
  );
};

export default ComponentSection;
