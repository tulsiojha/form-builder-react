import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

import { IItem, ILayout } from "./types";

const wrapperTemplate = ({
  body,
  imports,
  formSchema,
}: {
  body: string;
  imports: string;
  formSchema: string;
}) => `
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
${imports}


const formSchema = z.object(${formSchema});

type ISchema = z.infer<typeof formSchema>

const App = ()=>{

  const form = useForm<ISchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
    },
  });

  const handleSubmit = (e: ISchema) => {

  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
        >
        ${body}
      </form>
    </Form>
  )  
}
`;

const generateImportsForItems = (items: ILayout[]) => {
  const handleGenerate = (item: IItem) => {
    switch (item.kind) {
      case "checkbox":
        return `import { Checkbox } from "@/components/ui/checkbox";`;
      case "text-input":
        return `import { Input } from "@/components/ui/input";`;
      case "textarea":
        return `import { Textarea } from "@/components/ui/textarea";`;
      case "slider":
        return `import { Slider } from "@/components/ui/slider";`;
      case "switch":
        return `import { Switch } from "@/components/ui/switch";`;
      case "radiogroup":
        return ``;
      default:
        return "";
    }
  };

  const imports = items.reduce((prev, current) => {
    return prev + current.children.reduce((p, c) => p + handleGenerate(c), "");
  }, "");
  return imports;
};

const generateItemTemplate = (item: IItem) => {
  switch (item.kind) {
    case "checkbox":
      return `<FormField
        control={form.control}
        name="checkbox"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Checkbox {...field}/>
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />`;
    case "text-input":
      return `<FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />`;
    default:
      return "";
  }
};

const generateCode = (items: ILayout[]) => {
  const wrapWithMain = (d: string, n: number) =>
    `<div className="grid grid-cols-${n}">${d}</div>`;

  const wrapWithSecondary = (d: string) => `<div>${d}</div>`;

  const code = items.reduce((prev, curr) => {
    const childCode = curr.children.reduce((p, c) => {
      const itemCode = generateItemTemplate(c);
      if (curr.children.length > 1) {
        return p + wrapWithSecondary(itemCode);
      } else {
        return p + itemCode;
      }
    }, "");
    if (curr.children.length > 1) {
      return prev + wrapWithMain(childCode, curr.children.length);
    } else {
      return prev + childCode;
    }
  }, "");
  return code;
};

const formatCode = ({ code }: { code: string }) => {
  return prettier.format(code, {
    parser: "babel-ts",
    //@ts-ignore
    plugins: [parserBabel, prettierPluginEstree],
  });
};

export const getCode = ({ items }: { items: ILayout[] }) => {
  return formatCode({
    code: wrapperTemplate({
      body: generateCode(items),
      imports: generateImportsForItems(items),
      formSchema: "",
    }),
  });
};
