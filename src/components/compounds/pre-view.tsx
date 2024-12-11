"use client";

import { ILayout } from "@/utils/types";
import CCheckbox from "../list-components/c-checkbox";
import CTextInput from "../list-components/c-text-input";
import CTextArea from "../list-components/c-textarea";
import CSlider from "../list-components/c-slider";
import CSwitch from "../list-components/c-switch";

const PreView = ({ layouts }: { layouts: ILayout[] }) => {
  const getSpanForIndex = (
    index: number,
    totalItems: number,
    totalColumns = 100,
  ) => {
    const baseSpan = Math.floor(totalColumns / totalItems);
    const remainder = totalColumns % totalItems;
    return baseSpan + (index < remainder ? 1 : 0);
  };

  const getStyle = (
    index: number,
    totalItems: number,

    totalColumns = 100,
  ) => {
    return {
      style: {
        gridColumn: `span ${getSpanForIndex(index, totalItems, totalColumns)}`,
      },
    };
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      {layouts.map((layout) => {
        return (
          <div
            key={layout.id}
            className="grid space-x-6"
            style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
          >
            {layout.children.map((child, i) => {
              switch (child.kind) {
                case "checkbox":
                  return (
                    <CCheckbox
                      key={child.id}
                      {...child}
                      {...getStyle(i, layout.children.length)}
                    />
                  );
                case "text-input":
                  return (
                    <CTextInput
                      key={child.id}
                      {...child}
                      {...getStyle(i, layout.children.length)}
                    />
                  );
                case "textarea":
                  return (
                    <CTextArea
                      key={child.id}
                      {...child}
                      {...getStyle(i, layout.children.length)}
                    />
                  );
                case "slider":
                  return (
                    <CSlider
                      key={child.id}
                      {...child}
                      {...getStyle(i, layout.children.length)}
                    />
                  );
                case "switch":
                  return (
                    <CSwitch
                      key={child.id}
                      {...child}
                      {...getStyle(i, layout.children.length)}
                    />
                  );
                case "radiogroup":
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PreView;
