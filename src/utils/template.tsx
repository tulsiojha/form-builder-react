import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { IItem, ILayout } from "./types";
import { generateStaticZodSchema, getStyle } from "./commons";
import { imports } from "./data";

// Outer template for code generatioon
const wrapperTemplate = ({
  body,
  imports,
  formSchema,
}: {
  body: string;
  imports: string;
  formSchema: string;
}) => `
'use client';

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
${imports}


${formSchema}

type ISchema = z.infer<typeof formSchema>

const NewForm = ()=>{

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
        ${body}
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  )  
}

export default NewForm;
`;

// function to generate zod schema for given layouts
const generateZodSchema = (items: ILayout[]) => {
  const handleGenerate = (item: IItem) => {
    switch (item.kind) {
      case "switch":
      case "checkbox":
        return `"${item.id}":${generateStaticZodSchema("boolean", item)},`;
      case "textarea":
      case "select":
      case "text-input": {
        if (item.type === "email") {
          return `"${item.id}":${generateStaticZodSchema("email", item)},`;
        } else if (item.type === "number") {
          return `"${item.id}":${generateStaticZodSchema("number", item)},`;
        } else {
          return `"${item.id}":${generateStaticZodSchema("text", item)},`;
        }
      }
      case "slider":
        return `"${item.id}":${generateStaticZodSchema("number", item)},`;
      case "input-otp":
        return `"${item.id}":${generateStaticZodSchema("text", item)},`;
      case "datepicker":
        return `"${item.id}":${generateStaticZodSchema("date", item)},`;
      default:
        return "";
    }
  };

  const zodWrapper = (d: string) => {
    return `const formSchema = z.object({${d}});`;
  };

  const schema = items.reduce((prev, current) => {
    return prev + current.children.reduce((p, c) => p + handleGenerate(c), "");
  }, "");

  return zodWrapper(schema);
};

// function to generate imports for given layouts
const generateImportsForItems = (items: ILayout[]) => {
  const t = items
    .flatMap((item) => item.children)
    .reduce((p, c) => {
      return [...p, ...imports[c.kind]];
    }, [] as string[]);
  return [...new Set(t)].join("\n");
};

//function to generate code for given item
const generateItemTemplate = (item: IItem) => {
  let d = "";
  switch (item.kind) {
    case "checkbox":
      d = `<FormItem>
           <div className="flex flex-row items-start gap-2">
            <FormControl>
              <Checkbox 
                {...field} 
                ${item.disabled ? "disabled" : ""}
                value=""
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="flex flex-col gap-1">
              <FormLabel>${item.label}</FormLabel>
              ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            </div>
          </div>
          <FormMessage />
        </FormItem>`;
      break;
    case "switch":
      d = `<FormItem>
           <div className="flex flex-row items-start gap-2">
            <FormControl>
              <Switch 
                {...field} 
                ${item.disabled ? "disabled" : ""}
                value=""
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="flex flex-col gap-1">
              <FormLabel>${item.label}</FormLabel>
              ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            </div>
          </div>
          <FormMessage />
        </FormItem>`;
      break;
    case "text-input":
      d = `<FormItem>
            <FormLabel>${item.label}</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                ${item.disabled ? "disabled" : ""}
                placeholder="${item.placeholder}"
                type="${item.type || "text"}"
              />
            </FormControl>
            <FormDescription>${item.description}</FormDescription>
            <FormMessage />
          </FormItem>`;
      break;
    case "textarea":
      d = `<FormItem>
            <FormLabel>${item.label}</FormLabel>
            <FormControl>
              <Textarea
                {...field} 
                ${item.disabled ? "disabled" : ""}
                placeholder="${item.placeholder}"
              />
            </FormControl>
            <FormDescription>${item.description}</FormDescription>
            <FormMessage />
          </FormItem>`;
      break;
    case "slider":
      d = `<FormItem>
            <div className="flex flex-col gap-2">
              <FormLabel>${item.label}</FormLabel>
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
                  ${item.disabled ? "disabled" : ""}
                />
              </FormControl>
            </div>
            ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            <FormMessage />
          </FormItem>`;
      break;
    case "input-otp":
      d = `<FormItem>
            <div className="flex flex-col gap-2">
              <FormLabel>${item.label}</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  ${item.disabled ? "disabled" : ""}
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
            ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            <FormMessage />
          </FormItem>`;
      break;
    case "datepicker":
      d = `<FormItem className="flex flex-col">
            <FormLabel>${item.label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                    ${item.disabled ? "disabled" : ""}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>${item.placeholder}</span>
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
            ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            <FormMessage />
          </FormItem>`;
      break;
    case "select":
      d = `<FormItem className="flex flex-col">
            <FormLabel>${item.label}</FormLabel>
            <Select
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="${item.placeholder}" />
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
            ${item.description ? `<FormDescription>${item.description}</FormDescription>` : null}
            <FormMessage />
          </FormItem>`;
      break;
    default:
      d = "";
      break;
  }

  const wrapper = () => `<FormField
        control={form.control}
        name="${item.id}"
        render={({ field }) => (${d})}
      />`;

  return wrapper();
};

// generate code for given layouts
const generateCode = (items: ILayout[]) => {
  const wrapWithMain = (d: string) =>
    `<div className="grid space-x-6 items-center" style={{ gridTemplateColumns: "repeat(100, 1fr)" }}>${d}</div>`;

  const wrapWithSecondary = (d: string, index: number, totalItems: number) => {
    return `<div style={{gridColumn:"${getStyle(index, totalItems).style.gridColumn}"}}>${d}</div>`;
  };

  const code = items.reduce((prev, curr) => {
    const childCode = curr.children.reduce((p, c, ci) => {
      const itemCode = generateItemTemplate(c);
      if (curr.children.length > 1) {
        return p + wrapWithSecondary(itemCode, ci, curr.children.length);
      } else {
        return p + itemCode;
      }
    }, "");
    if (curr.children.length > 1) {
      return prev + wrapWithMain(childCode);
    } else {
      return prev + childCode;
    }
  }, "");
  return code;
};

// format the generated code
const formatCode = ({ code }: { code: string }) => {
  return prettier.format(code, {
    parser: "babel-ts",
    //@ts-expect-error: this line should produce ts error but it is intentional
    plugins: [parserBabel, prettierPluginEstree],
  });
};

// get final code
export const getCode = ({ layouts }: { layouts: ILayout[] }) => {
  return formatCode({
    code: wrapperTemplate({
      body: generateCode(layouts),
      imports: generateImportsForItems(layouts),
      formSchema: generateZodSchema(layouts),
    }),
  });
};
