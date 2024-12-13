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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  "text-input_139e11a0-c6c9-427a-b8e3-84fe3dad6294": z
    .string()
    .min(1)
    .max(10)
    .nonempty("Required")
    .regex(new RegExp("affds")),
  "checkbox_8738a79d-d957-409f-818e-6b61addb06c5": z
    .boolean()
    .default(false)
    .optional(),
  "textarea_f90cb995-1124-4e88-b967-31d2d9132f21": z.string().optional(),
  "input-otp_a5c1c059-f473-4569-9e6e-f826dedde8b6": z.string().optional(),
  "select_37402439-448f-45b2-92ef-fe2a715f4ec5": z.string().optional(),
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
        <FormField
          control={form.control}
          name="text-input_139e11a0-c6c9-427a-b8e3-84fe3dad6294"
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
        <FormField
          control={form.control}
          name="checkbox_8738a79d-d957-409f-818e-6b61addb06c5"
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
        <FormField
          control={form.control}
          name="textarea_f90cb995-1124-4e88-b967-31d2d9132f21"
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
          name="input-otp_a5c1c059-f473-4569-9e6e-f826dedde8b6"
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
          name="select_37402439-448f-45b2-92ef-fe2a715f4ec5"
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
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewForm;
