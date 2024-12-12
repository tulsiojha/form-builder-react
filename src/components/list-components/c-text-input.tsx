import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";

const CTextInput = ({ style, field, item }: IComponent) => {
  return (
    <div className="grid items-center gap-1.5" style={style}>
      <FormItem>
        <FormLabel>
          {item.label}
          {item.required ? "*" : null}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            disabled={item.disabled}
            placeholder={item.placeholder}
            type={item.type || "text"}
          />
        </FormControl>
        <FormDescription>{item.description}</FormDescription>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CTextInput;
