"use client";

import { IItem, ILayout } from "@/utils/types";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getStyle } from "@/utils/commons";
import ViewLayout from "../molecules/view-layout";
import { useCallback } from "react";

const PreView = ({ layouts }: { layouts: ILayout[] }) => {
  const generateSchema = (
    type: "text" | "email" | "number" | "boolean" | "date",
    item: IItem,
  ) => {
    let zz = null;
    switch (type) {
      case "number":
        zz = z.number();
        break;
      case "boolean":
        zz = z.boolean();
        zz = zz.default(false);
        break;
      case "text":
        {
          zz = z.string();
          if (item.required) {
            zz = zz.nonempty("Required");
          }
          if (item.pattern) {
            zz = zz.regex(new RegExp(item.pattern || ""));
          }
        }
        break;
      case "email":
        {
          zz = z.string();
          zz = zz?.email();
          if (item.required) {
            zz = zz.nonempty("Required");
          }
          if (item.pattern) {
            zz = zz.regex(new RegExp(item.pattern || ""));
          }
        }
        break;
      case "date":
        zz = z.coerce.date();
        break;
      default:
    }

    if (!item.required) {
      zz = zz?.optional();
    }
  };
  // generate zod schema for given layouts
  const ss = useCallback(() => {
    const s = layouts
      .flatMap((f) => f.children)
      .reduce((p, c) => {
        switch (c.kind) {
          case "switch":
          case "checkbox":
            {
              let zz:
                | z.ZodBoolean
                | z.ZodOptional<z.ZodBoolean>
                | z.ZodDefault<z.ZodBoolean> = z.boolean();
              if (!c.required) {
                zz = zz.optional();
              } else {
                zz = zz.default(false);
              }
              p[c.id] = zz;
            }
            break;
          case "textarea":
          case "text-input":
            {
              let zz: z.ZodString | z.ZodOptional<z.ZodString> = z.string();
              if (c.type === "email") {
                zz = zz.email();
              }
              if (c.required) {
                zz = zz.nonempty("Required");
              }
              if (c.pattern) {
                zz = zz.regex(new RegExp(c.pattern || ""));
              }
              if (!c.required) {
                zz = zz.optional();
              }
              p[c.id] = zz;
            }
            break;
          case "slider":
            {
              let zz:
                | z.ZodNumber
                | z.ZodOptional<z.ZodNumber>
                | z.ZodDefault<z.ZodNumber>
                | z.ZodDefault<z.ZodOptional<z.ZodNumber>> = z.number();

              if (!c.required) {
                zz = zz.optional();
              }
              zz = zz.default(0);
              p[c.id] = zz;
            }
            break;
          case "input-otp":
            {
              let zz: z.ZodString | z.ZodOptional<z.ZodString> = z.string();
              if (c.required) {
                zz = zz.nonempty("Required");
              }
              if (!c.required) {
                zz = zz.optional();
              }
              p[c.id] = zz;
            }
            break;
          case "datepicker":
            {
              let zz: z.ZodDate | z.ZodOptional<z.ZodDate> = z.coerce.date();
              if (!c.required) {
                zz = zz.optional();
              }
              p[c.id] = zz;
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

  const handleSubmit = (e: any) => {
    console.log(e);
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
    </ViewLayout>
  );
};

export default PreView;
