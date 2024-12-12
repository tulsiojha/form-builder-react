import { ILayout } from "./types";

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

const cleanJson = ({ layouts }: { layouts: ILayout[] }) => {
  return layouts.map((layout) => {
    return {
      id: layout.id,
      layout: layout.layout,
      children: layout.children.map((item) => ({
        id: item.id,
        kind: item.kind,
        description: item.description,
        placeholder: item.placeholder,
        displayName: item.displayName,
        disabled: item.disabled,
        required: item.required,
        pattern: item.pattern,
        type: item.type,
      })),
    };
  });
};

export { getSpanForIndex, getStyle, cleanJson };
