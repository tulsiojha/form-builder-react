import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";

const CCheckbox = ({ field, item, style }: IComponent) => {
  return (
    <div className="space-x-2" style={style}>
      <FormItem>
        <div className="flex flex-row items-start gap-2">
          <FormControl>
            <Checkbox {...field} disabled={item.disabled} />
          </FormControl>
          <div className="flex flex-col gap-1">
            <FormLabel>{item.label}</FormLabel>
            {item.description ? (
              <FormDescription>{item.description}</FormDescription>
            ) : null}
          </div>
        </div>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CCheckbox;
