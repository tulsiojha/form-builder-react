import { Checkbox } from "@/components/ui/checkbox";
import { CSSProperties, FormEventHandler, ReactNode } from "react";

type ICheckBox = {
  label?: ReactNode;
  description?: string;
  htmlFor?: string;
  value?: string;
  onChange?: FormEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

const CCheckbox = ({
  label,
  description,
  htmlFor,
  value,
  onChange,
  style,
}: ICheckBox) => {
  return (
    <div className="items-top flex space-x-2" style={style}>
      <Checkbox id={htmlFor} value={value} onChange={onChange} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default CCheckbox;
