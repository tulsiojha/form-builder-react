import { CSSProperties, FormEventHandler, ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type ISlider = {
  label?: ReactNode;
  placeholder?: string;
  htmlFor?: string;
  value?: number[];
  onChange?: FormEventHandler<HTMLInputElement>;
  style?: CSSProperties;
};

const CSlider = ({ label, htmlFor, onChange, value, style }: ISlider) => {
  return (
    <div className="grid items-center gap-1.5" style={style}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Slider id={htmlFor} value={value} onChange={onChange} />
    </div>
  );
};

export default CSlider;
