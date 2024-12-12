import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";
import { Switch } from "../ui/switch";

const CSwitch = ({ style, field, item }: IComponent) => {
  return (
    <div className="grid items-center gap-1.5" style={style}>
      <FormItem>
        <div className="flex flex-row items-start gap-2">
          <FormControl>
            <Switch {...field} disabled={item.disabled} />
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

export default CSwitch;
