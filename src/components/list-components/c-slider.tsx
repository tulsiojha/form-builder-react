import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";
import { Slider } from "../ui/slider";

const CSlider = ({ field, item, style }: IComponent) => {
  return (
    <div className="space-x-2" style={style}>
      <FormItem>
        <div className="flex flex-col gap-2">
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <Slider
              min={0}
              max={100}
              step={5}
              defaultValue={[25]}
              value={[field.value || 0]}
              onValueChange={(vals) => {
                field.onChange(vals[0]);
              }}
              disabled={item.disabled}
            />
          </FormControl>
        </div>
        <FormDescription>{item.description}</FormDescription>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CSlider;
