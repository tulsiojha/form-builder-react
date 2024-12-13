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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  "datepicker_91c4ccb8-400e-441c-9b38-0dc1ce1a78d9": z.coerce.date().optional(),
  "datepicker_f84d7460-3dd2-4155-993e-8a3f6fcedfc4": z.coerce.date().optional(),
  "select_c7743c4c-0d99-4c32-a58e-6a718a5fc612": z.string().optional(),
  "select_f5bf783f-fb3e-4412-8d95-a598e26bfd32": z.string().optional(),
  "input-otp_908321cd-4c47-4164-9fd7-8344faca6666": z.string().optional(),
  "input-otp_3be16ade-de3e-451e-a484-77681e0c7a12": z.string().optional(),
  "switch_99a3ff2f-c9ad-4b86-b71b-9497117cd9d4": z
    .boolean()
    .default(false)
    .optional(),
  "switch_be5c5816-c0f8-429f-b1c8-f7efabbb9c77": z
    .boolean()
    .default(false)
    .optional(),
  "textarea_21c341ed-d5ce-439c-9cc9-e8e1bd408a0c": z.string().optional(),
  "textarea_2b893db6-1db3-4896-87ff-62e87283c08f": z.string().optional(),
  "text-input_ea4e2142-3e8d-4436-93fe-32f1e6c86f14": z.string().optional(),
  "text-input_36fd6a8a-ae6b-4532-bf44-3ce85cdaaa8f": z.string().optional(),
  "checkbox_1b4b693f-e072-4672-aae2-c4faad285fa1": z
    .boolean()
    .default(false)
    .optional(),
  "checkbox_4cba5b92-05eb-4541-8a92-6018a56d511e": z
    .boolean()
    .default(false)
    .optional(),
  "slider_34bd86a6-8085-4eb8-b161-6bf2af06fb95": z.number().optional(),
  "slider_850456ec-5750-4c46-a27d-31c64d4df11e": z.number().optional(),
});

type ISchema = z.infer<typeof formSchema>;

const NewForm = () => {
  const form = useForm<ISchema>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (e: ISchema) => {
    console.log(e);
    alert(JSON.stringify(e, null, 2));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 max-w-3xl mx-auto py-16"
      >
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="datepicker_91c4ccb8-400e-441c-9b38-0dc1ce1a78d9"
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
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="datepicker_f84d7460-3dd2-4155-993e-8a3f6fcedfc4"
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
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="select_c7743c4c-0d99-4c32-a58e-6a718a5fc612"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fruits</FormLabel>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select fruit" />
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
                  <FormDescription>You can select fruits here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="select_f5bf783f-fb3e-4412-8d95-a598e26bfd32"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fruits</FormLabel>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select fruit" />
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
                  <FormDescription>You can select fruits here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="input-otp_908321cd-4c47-4164-9fd7-8344faca6666"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Input OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Enter your one-time password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="input-otp_3be16ade-de3e-451e-a484-77681e0c7a12"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Input OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Enter your one-time password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="switch_99a3ff2f-c9ad-4b86-b71b-9497117cd9d4"
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
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="switch_be5c5816-c0f8-429f-b1c8-f7efabbb9c77"
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
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="textarea_21c341ed-d5ce-439c-9cc9-e8e1bd408a0c"
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
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="textarea_2b893db6-1db3-4896-87ff-62e87283c08f"
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
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="text-input_ea4e2142-3e8d-4436-93fe-32f1e6c86f14"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="text-input_36fd6a8a-ae6b-4532-bf44-3ce85cdaaa8f"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="checkbox_1b4b693f-e072-4672-aae2-c4faad285fa1"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-start gap-2">
                    <FormControl>
                      <Checkbox
                        {...field}
                        value=""
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex flex-col gap-1">
                      <FormLabel>Subscribe to newsletter</FormLabel>
                      <FormDescription>
                        Stay updated with our latest news and offers
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="checkbox_4cba5b92-05eb-4541-8a92-6018a56d511e"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-start gap-2">
                    <FormControl>
                      <Checkbox
                        {...field}
                        value=""
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex flex-col gap-1">
                      <FormLabel>Subscribe to newsletter</FormLabel>
                      <FormDescription>
                        Stay updated with our latest news and offers
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          className="grid space-x-6 items-center"
          style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
        >
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="slider_34bd86a6-8085-4eb8-b161-6bf2af06fb95"
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
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="slider_850456ec-5750-4c46-a27d-31c64d4df11e"
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
          </div>
        </div>
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewForm;
