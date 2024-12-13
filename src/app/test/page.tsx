"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  "slider_023ce75b-cc37-4f9e-9f98-64f9151139e7": z
    .number()
    .optional()
    .default(0),
  "switch_0e2779f0-9b77-4f9e-9b64-99783ce88cba": z.boolean().optional(),
  "textarea_24727e4c-6ee4-47a7-b8cc-bc24bcf974fd": z.string().optional(),
  "datepicker_605b34ca-c3f7-47ad-8374-4bc2a9fb572b": z.coerce.date(),
});

type ISchema = z.infer<typeof formSchema>;

const NewForm = () => {
  const form = useForm<ISchema>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (e: ISchema) => {
    console.log(e);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 max-w-3xl mx-auto py-16"
      >
        <FormField
          control={form.control}
          name="slider_023ce75b-cc37-4f9e-9f98-64f9151139e7"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel>Slider</FormLabel>
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
                  />
                </FormControl>
              </div>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch_0e2779f0-9b77-4f9e-9b64-99783ce88cba"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-start gap-2">
                <FormControl>
                  <Switch
                    {...field}
                    value=""
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="flex flex-col gap-1">
                  <FormLabel>Enable Notifications</FormLabel>
                  <FormDescription>
                    Turn on to receive real-time updates
                  </FormDescription>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textarea_24727e4c-6ee4-47a7-b8cc-bc24bcf974fd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="description" />
              </FormControl>
              <FormDescription>Tell us about yourself</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datepicker_605b34ca-c3f7-47ad-8374-4bc2a9fb572b"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewForm;
