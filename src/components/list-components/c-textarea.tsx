import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";
import { Textarea } from "../ui/textarea";

const CTextArea = ({ style, field, item }: IComponent) => {
  return (
    <div className="grid items-center gap-1.5" style={style}>
      <FormItem>
        <FormLabel>
          {item.label}
          {item.required ? "*" : null}
        </FormLabel>
        <FormControl>
          <Textarea
            {...field}
            disabled={item.disabled}
            placeholder={item.placeholder}
          />
        </FormControl>
        <FormDescription>{item.description}</FormDescription>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CTextArea;
