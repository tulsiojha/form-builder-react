import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";

const CSelect = ({ field, item, style }: IComponent) => {
  return (
    <div className="space-x-2" style={style}>
      <FormItem>
        <div className="flex flex-col gap-2">
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={item.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </div>
        {item.description ? (
          <FormDescription>{item.description}</FormDescription>
        ) : null}
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CSelect;
