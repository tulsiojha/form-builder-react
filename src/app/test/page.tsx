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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  "text-input_73583068-27ed-4901-bd62-8259fd8cd203": z.string().optional(),
  "textarea_e3404771-9648-4e91-91b8-92cb45bceae2": z.string().optional(),
  "checkbox_cbc7e36d-5a6a-4543-9678-7f062c963254": z
    .boolean()
    .default(false)
    .optional(),
  "checkbox_8803b802-5237-474e-82a2-3062113c7730": z
    .boolean()
    .default(false)
    .optional(),
  "text-input_14b65632-6e84-43a6-a224-a3d4731c5bd7": z.string().optional(),
  "text-input_7a533cf4-a182-4d93-ae47-3cf2312f955e": z.string().optional(),
  "text-input_a5fcb396-597c-4a10-b59b-05f2483e15e1": z.string().optional(),
  "text-input_9215f9ba-2e39-4065-bfb9-293135f0572b": z.string().optional(),
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
              name="text-input_73583068-27ed-4901-bd62-8259fd8cd203"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" type="text" />
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
              name="textarea_e3404771-9648-4e91-91b8-92cb45bceae2"
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
          <div style={{ gridColumn: "span 25" }}>
            <FormField
              control={form.control}
              name="checkbox_cbc7e36d-5a6a-4543-9678-7f062c963254"
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
          <div style={{ gridColumn: "span 25" }}>
            <FormField
              control={form.control}
              name="checkbox_8803b802-5237-474e-82a2-3062113c7730"
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
          <div style={{ gridColumn: "span 25" }}>
            <FormField
              control={form.control}
              name="text-input_14b65632-6e84-43a6-a224-a3d4731c5bd7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" type="text" />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ gridColumn: "span 25" }}>
            <FormField
              control={form.control}
              name="text-input_7a533cf4-a182-4d93-ae47-3cf2312f955e"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" type="text" />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="text-input_a5fcb396-597c-4a10-b59b-05f2483e15e1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name" type="text" />
              </FormControl>
              <FormDescription>Enter your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text-input_9215f9ba-2e39-4065-bfb9-293135f0572b"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name" type="text" />
              </FormControl>
              <FormDescription>Enter your name</FormDescription>
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
