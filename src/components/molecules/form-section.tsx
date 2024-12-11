"use client";
import { v4 as uuid } from "uuid";
import { IItem, ILayout } from "@/utils/types";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { GripHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Modal from "./modal";

const FormSection = ({
  onItemChanged,
}: {
  onItemChanged: (p: any) => void;
}) => {
  const [items, setItems] = useState<ILayout[]>([]);

  return (
    <div className="relative h-full dot-background overflow-auto w-full pl-4 pr-8 py-4">
      <ReactSortable
        list={items}
        setList={(e) => {
          if (e.length > 0) {
            const tItem = e.map((x) => {
              if (!!x?.layout) {
                return x;
              } else {
                return {
                  layout: true,
                  id: uuid(),
                  children: [{ ...x, id: uuid() }],
                };
              }
            });

            setItems(
              //@ts-ignore
              tItem,
            );
            onItemChanged(tItem);
          }
        }}
        {...{
          group: {
            name: "nested",
            pull: false,
            put: true,
          },
        }}
        direction={"vertical"}
        className="h-full min-h-[200px] flex flex-col gap-2 z-10 relative w-full"
        handle=".drag-handle"
        animation={150}
        ghostClass="vertical-ghost"
      >
        {items.map((item) => {
          return (
            <div key={item.id} className="flex flex-row w-full">
              <div className="shrink-0 drag-handle flex items-center justify-center mr-2  cursor-pointer">
                <GripHorizontalIcon size={18} />
              </div>
              <ReactSortable
                key={item.id}
                list={item.children}
                setList={(d) => {
                  const tItem = items.map((cur) => {
                    if (cur.id === item.id) {
                      return { ...cur, children: d };
                    } else {
                      return cur;
                    }
                  });
                  setItems(tItem);
                  onItemChanged(tItem);
                }}
                animation={150}
                {...{
                  group: {
                    name: "grouping",
                    pull: false,
                    put: true,
                  },
                }}
                direction={"horizontal"}
                className="min-h-10 w-full flex flex-row gap-4"
                ghostClass="horizontal-ghost"
              >
                {item.children.map((i) => (
                  <div
                    key={i.id}
                    className="h-10 max-w-[200px] min-w-[200px] border border-gray-200 rounded flex flex-row gap-2 items-center justify-between px-2 bg-white cursor-pointer"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <span>{i.icon}</span>
                      <span className="text-sm">{i.displayName}</span>
                    </div>
                    <div className="flex flex-row items-center">
                      <Modal
                        data={i}
                        onSubmit={(e) => {
                          const tItem = items.map((cur) => {
                            if (cur.id === item.id) {
                              return {
                                ...cur,
                                children: cur.children.map((c) => {
                                  console.log(i, e);
                                  if (c.id === i.id) {
                                    return { ...i, ...e };
                                  } else {
                                    return c;
                                  }
                                }),
                              };
                            } else {
                              return cur;
                            }
                          });
                          setItems(tItem);
                          onItemChanged(tItem);
                        }}
                      >
                        <button className="rounded hover:bg-black/5 p-1">
                          <PencilIcon size={12} />
                        </button>
                      </Modal>
                      <button
                        className="rounded hover:bg-black/5 p-1"
                        onClick={() => {
                          const layoutChildCounts = items.find(
                            (f) => f.id === item.id,
                          )?.children.length;

                          let tItem = items;
                          if (!!layoutChildCounts && layoutChildCounts > 1) {
                            tItem = items.map((cur) => {
                              if (cur.id === item.id) {
                                return {
                                  ...cur,
                                  children: cur.children.filter(
                                    (f) => f.id != i.id,
                                  ),
                                };
                              } else {
                                return cur;
                              }
                            });
                          } else {
                            tItem = items.filter((f) => f.id !== item.id);
                          }
                          setItems(tItem);
                          onItemChanged(tItem);
                        }}
                      >
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          );
        })}
      </ReactSortable>
      {items.length === 0 ? (
        <div className="absolute flex items-center justify-center left-0 right-0 bottom-0 top-0">
          Drag and drop elements from left panel into here.
        </div>
      ) : null}
    </div>
  );
};

export default FormSection;
