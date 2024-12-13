import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const CDatepicker = ({ field, item, style }: IComponent) => {
  return (
    <div className="space-x-2" style={style}>
      <FormItem className="flex flex-col">
        <FormLabel>{item.label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
                disabled={item.disabled}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{item.placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {item.description ? (
          <FormDescription>{item.description}</FormDescription>
        ) : null}
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CDatepicker;
