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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  "text-input_110e091d-f277-42e8-be3f-cfb1607b2752": z
    .string()
    .min(3)
    .max(8)
    .nonempty("Required"),
  "text-input_fa5293de-1124-414b-b92d-2da6417db3bf": z
    .string()
    .nonempty("Required"),
  "text-input_50bbba48-097d-4795-af0f-8256bf05048d": z
    .string()
    .min(5)
    .max(10)
    .nonempty("Required"),
  "text-input_372f0d19-0954-473f-8af3-b79501fe80a2": z
    .string()
    .email()
    .nonempty("Required"),
  "textarea_4385a494-593f-4efd-9ed6-676df4bf7561": z.string().optional(),
  "select_e0ce5a46-dd39-4b45-ba36-60083d018ece": z.string().optional(),
  "datepicker_4d981dd2-2a8f-4468-9a63-39c528bbde8e": z.coerce.date().optional(),
  "input-otp_98f057df-ce64-4090-91b2-4a3d9ae6bfa3": z.string().optional(),
  "switch_fcd92327-f678-4799-8351-63449bb1d8e0": z
    .boolean()
    .default(false)
    .optional(),
  "checkbox_b2b111a8-b63c-4318-bea8-884e3ccb0770": z
    .boolean()
    .default(false)
    .optional(),
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
              name="text-input_110e091d-f277-42e8-be3f-cfb1607b2752"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="fname" type="text" />
                  </FormControl>
                  <FormDescription>Enter your fname</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 50" }}>
            <FormField
              control={form.control}
              name="text-input_fa5293de-1124-414b-b92d-2da6417db3bf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="lname" type="text" />
                  </FormControl>
                  <FormDescription>Enter your lname</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="text-input_50bbba48-097d-4795-af0f-8256bf05048d"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*******************"
                  type="password"
                />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text-input_372f0d19-0954-473f-8af3-b79501fe80a2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="someone@domain.com"
                  type="email"
                />
              </FormControl>
              <FormDescription>Enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textarea_4385a494-593f-4efd-9ed6-676df4bf7561"
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
          name="select_e0ce5a46-dd39-4b45-ba36-60083d018ece"
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
        <FormField
          control={form.control}
          name="datepicker_4d981dd2-2a8f-4468-9a63-39c528bbde8e"
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
        <FormField
          control={form.control}
          name="input-otp_98f057df-ce64-4090-91b2-4a3d9ae6bfa3"
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
              <FormDescription>Enter your one-time password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch_fcd92327-f678-4799-8351-63449bb1d8e0"
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
          name="checkbox_b2b111a8-b63c-4318-bea8-884e3ccb0770"
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
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewForm;
