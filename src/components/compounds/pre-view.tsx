"use client";

import { ILayout } from "@/utils/types";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema, getStyle } from "@/utils/commons";
import ViewLayout from "../molecules/view-layout";
import { useCallback, useState } from "react";
import MessageModal from "../molecules/modal-message";
import CodeBlock from "../atoms/code-block";

const PreView = ({ layouts }: { layouts: ILayout[] }) => {
  // generate zod schema for given layouts
  const ss = useCallback(() => {
    const s = layouts
      .flatMap((f) => f.children)
      .reduce((p, c) => {
        switch (c.kind) {
          case "switch":
          case "checkbox":
            {
              p[c.id] = generateSchema("boolean", c);
            }
            break;
          case "textarea":
          case "select":
          case "text-input":
            {
              if (c.type === "email") {
                p[c.id] = generateSchema("email", c);
              } else if (c.type === "number") {
                p[c.id] = generateSchema("number", c);
              } else {
                p[c.id] = generateSchema("text", c);
              }
            }
            break;
          case "slider":
            {
              p[c.id] = generateSchema("number", c);
            }
            break;
          case "input-otp":
            {
              p[c.id] = generateSchema("text", c);
            }
            break;
          case "datepicker":
            {
              p[c.id] = generateSchema("date", c);
            }
            break;
        }
        return p;
      }, {} as z.ZodRawShape);

    return z.object(s);
  }, [layouts]);

  const form = useForm({
    resolver: zodResolver(ss()),
  });

  const [value, setValue] = useState("");

  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const handleSubmit = (e: { [key: string]: string | number | boolean }) => {
    setValue(JSON.stringify(e, null, 2));
    setMessageModalOpen(true);
  };

  return (
    <ViewLayout layouts={layouts}>
      <Form {...form}>
        <form
          className="flex flex-col gap-6 max-w-3xl"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-6 pt-4">
            {layouts.map((layout) => {
              return (
                <div
                  key={layout.id}
                  className="grid space-x-6 items-center"
                  style={{ gridTemplateColumns: "repeat(100, 1fr)" }}
                >
                  {layout.children.map((child, i) => {
                    const CChild = child.component;
                    return (
                      <FormField
                        key={child.id}
                        control={form.control}
                        name={child.id}
                        render={({ field }) => (
                          <CChild
                            item={child}
                            field={field}
                            {...getStyle(i, layout.children.length)}
                          />
                        )}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </form>
      </Form>
      <MessageModal setOpen={setMessageModalOpen} open={messageModalOpen}>
        <CodeBlock code={value} language="json" />
      </MessageModal>
    </ViewLayout>
  );
};

export default PreView;
