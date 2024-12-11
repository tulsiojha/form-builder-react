import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import {
  ChangeEventHandler,
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

type ITextInput = {
  label?: ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  htmlFor?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  style?: CSSProperties;
};

const CTextInput = ({
  label = "Name",
  htmlFor = "name",
  placeholder = "Name",
  type = "text",
  value,
  onChange,
  style,
}: ITextInput) => {
  return (
    <div className="grid items-center gap-1.5" style={style}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        type={type}
        id={htmlFor}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CTextInput;
