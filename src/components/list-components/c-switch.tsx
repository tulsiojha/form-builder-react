import { CSSProperties, FormEventHandler, ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ISwitch = {
  label?: ReactNode;
  placeholder?: string;
  htmlFor?: string;
  value?: string;
  onChange?: FormEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

const CSwitch = ({ label, value, onChange, htmlFor, style }: ISwitch) => {
  return (
    <div className="flex items-center space-x-2" style={style}>
      <Switch id={htmlFor} value={value} onChange={onChange} />
      <Label htmlFor={htmlFor}>{label}</Label>
    </div>
  );
};

export default CSwitch;
