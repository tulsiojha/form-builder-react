import { IItem, ILayout } from "./types";
import * as z from "zod";

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
        label: item.label,
        kind: item.kind,
        description: item.description,
        placeholder: item.placeholder,
        displayName: item.displayName,
        disabled: item.disabled,
        required: item.required,
        pattern: item.pattern,
        type: item.type,
        min: item.min,
        max: item.max,
      })),
    };
  });
};

const generateSchema = (
  type: "text" | "email" | "number" | "boolean" | "date",
  item: IItem,
) => {
  let zz = null;
  switch (type) {
    case "number":
      zz = z.number();
      if (item.min) {
        zz = zz.min(parseInt(item.min, 10) || 0);
      }
      if (item.max) {
        zz = zz.max(parseInt(item.max, 10) || 0);
      }
      break;
    case "boolean":
      zz = z.boolean();
      zz = zz.default(false);
      break;
    case "date":
      zz = z.coerce.date();
      break;
    case "email":
      {
        zz = z.string();
        zz = zz?.email();
        if (item.required) {
          zz = zz.nonempty("Required");
        }
        if (item.pattern) {
          zz = zz.regex(new RegExp(item.pattern || ""));
        }
      }
      break;
    case "text":
      {
        zz = z.string();
        if (item.min) {
          zz = zz.min(parseInt(item.min, 10) || 0);
        }
        if (item.max) {
          zz = zz.max(parseInt(item.max, 10) || 0);
        }
        if (item.required) {
          zz = zz.nonempty("Required");
        }
        if (item.pattern) {
          zz = zz.regex(new RegExp(item.pattern || ""));
        }
      }
      break;
    default:
      {
        zz = z.any();
      }
      break;
  }

  if (!item.required) {
    zz = zz?.optional();
  }

  return zz;
};

const generateStaticZodSchema = (
  type: "text" | "email" | "number" | "boolean" | "date",
  item: IItem,
) => {
  let zz = "z";
  switch (type) {
    case "number":
      zz += ".number()";
      if (item.min) {
        zz += `.min(${parseInt(item.min, 10) || 0})`;
      }
      if (item.max) {
        zz += `.max(${parseInt(item.max, 10) || 0})`;
      }
      break;
    case "boolean":
      zz += ".boolean()";
      zz += ".default(false)";
      break;
    case "date":
      zz += ".coerce.date()";
      break;
    case "email":
      {
        zz += ".string()";
        zz += ".email()";
        if (item.required) {
          zz += `.nonempty("Required")`;
        }
        if (item.pattern) {
          zz += `.regex(new RegExp("${item.pattern || ""}"))`;
        }
      }
      break;
    case "text":
      {
        zz += ".string()";
        if (item.min) {
          zz += `.min(${parseInt(item.min, 10) || 0})`;
        }
        if (item.max) {
          zz += `.max(${parseInt(item.max, 10) || 0})`;
        }
        if (item.required) {
          zz += `.nonempty("Required")`;
        }
        if (item.pattern) {
          zz += `.regex(new RegExp("${item.pattern || ""}"))`;
        }
      }
      break;
    default:
      {
        zz += ".any()";
      }
      break;
  }

  if (!item.required) {
    zz += ".optional()";
  }

  return zz;
};

export {
  getSpanForIndex,
  getStyle,
  cleanJson,
  generateSchema,
  generateStaticZodSchema,
};
