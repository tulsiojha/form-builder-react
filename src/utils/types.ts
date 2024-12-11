import { ReactNode } from "react";

export interface IItem {
  id: string;
  kind:
    | "checkbox"
    | "text-input"
    | "textarea"
    | "slider"
    | "switch"
    | "radiogroup";
  displayName: string;
  icon: ReactNode;
  label?: string;
  description?: string;
  placeholder?: string;
}

export interface ILayout {
  id: string;
  layout: true;
  children: IItem[];
}
