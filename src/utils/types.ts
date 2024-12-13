import { CSSProperties, JSX, ReactNode } from "react";

export interface IItem {
  id: string;
  kind:
    | "checkbox"
    | "text-input"
    | "textarea"
    | "slider"
    | "switch"
    | "input-otp"
    | "datepicker"
    | "select";
  displayName: string;
  icon: ReactNode;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  type?: string;
  component: (props: IComponent) => JSX.Element;
}

export interface ILayout {
  id: string;
  layout: boolean;
  children: IItem[];
}

export interface IComponent {
  item: IItem;
  field: any;
  style?: CSSProperties;
}

export interface ISelect {
  items: { label: string; value: string }[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export interface ITabs {
  triggers: { label: ReactNode; value: string }[];
  contents: { render: ReactNode; value: string }[];
  defaultValue: string;
}
