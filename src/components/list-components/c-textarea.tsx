import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { ChangeEventHandler, CSSProperties, ReactNode } from "react";

type ITextArea = {
  label?: ReactNode;
  placeholder?: string;
  htmlFor?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  style?: CSSProperties;
};

const CTextArea = ({
  label = "Name",
  htmlFor = "name",
  placeholder = "Name",
  value,
  onChange,
  style,
}: ITextArea) => {
  return (
    <div className="grid gap-1.5 flex-shrink-0" style={style}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Textarea
        placeholder={placeholder}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CTextArea;
