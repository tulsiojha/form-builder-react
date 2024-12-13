"use client";
import { v4 as uuid } from "uuid";
import { IItem, ILayout } from "@/utils/types";

import { ReactSortable } from "react-sortablejs";
import { GripHorizontalIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";
import Modal from "./modal";
import ComponentModal from "./modal-components";
import { FieldValues } from "react-hook-form";

const FormSection = ({
  onItemChanged,
  layouts = [],
}: {
  onItemChanged: (p: ILayout[]) => void;
  layouts?: ILayout[];
}) => {
  const handleRowLayout = (e: ILayout[]) => {
    if (e.length > 0) {
      const tItem = e.map((x) => {
        if (!!x?.layout) {
          return x;
        } else {
          return {
            layout: true,
            id: uuid(),
            //@ts-expect-error: this is valid condition as drop element can be ILayout or IItem
            children: [{ ...x, id: `${x.kind}_${uuid()}` }],
          };
        }
      });

      //@ts-expect-error: this is valid condition as drop element can be ILayout or IItem
      onItemChanged(tItem);
    }
  };

  const handleColumnLayout = (d: IItem[], layout: ILayout) => {
    // add into existing layout if dragged into existing canvas
    const tItem = layouts.map((cur) => {
      if (cur.id === layout.id) {
        return { ...cur, children: d };
      } else {
        return cur;
      }
    });
    onItemChanged(tItem);
  };

  const editItem = (e: FieldValues, layout: ILayout, item: IItem) => {
    // modify item properties
    const tItem = layouts.map((cur) => {
      if (cur.id === layout.id) {
        return {
          ...cur,
          children: cur.children.map((c) => {
            if (c.id === item.id) {
              return { ...item, ...e };
            } else {
              return c;
            }
          }),
        };
      } else {
        return cur;
      }
    });
    onItemChanged(tItem);
  };

  const deleteItem = (layout: ILayout, item: IItem) => {
    // delete item
    const layoutChildCounts = layouts.find((f) => f.id === layout.id)?.children
      .length;

    let tItem = layouts;
    if (!!layoutChildCounts && layoutChildCounts > 1) {
      tItem = layouts.map((cur) => {
        if (cur.id === layout.id) {
          return {
            ...cur,
            children: cur.children.filter((f) => f.id != item.id),
          };
        } else {
          return cur;
        }
      });
    } else {
      tItem = layouts.filter((f) => f.id !== layout.id);
    }
    onItemChanged(tItem);
  };

  const addItem = (layout: ILayout, item: IItem) => {
    // add item via modal
    const tItem = layouts.map((cur) => {
      if (cur.id === layout.id) {
        return {
          ...cur,
          children: [
            ...cur.children,
            { ...item, id: `${item.kind}_${uuid()}` },
          ],
        };
      } else {
        return cur;
      }
    });
    onItemChanged(tItem);
  };

  const addLayout = (item: IItem) => {
    //add layout with component via modal
    const layout = {
      layout: true,
      id: uuid(),
      children: [item],
    };
    const lts = [...layouts, layout];
    onItemChanged(lts);
  };

  return (
    <div className="relative h-full dot-background overflow-auto w-full pl-4 pr-8 py-4">
      <ReactSortable
        list={layouts}
        setList={handleRowLayout}
        {...{
          group: {
            name: "nested",
            pull: false,
            put: true,
          },
        }}
        direction={"vertical"}
        className="md:h-full md:min-h-[200px] flex flex-col gap-2 z-10 relative w-full"
        handle=".drag-handle"
        animation={150}
        ghostClass="vertical-ghost"
        filter={".no-drag"}
      >
        {layouts.map((layout) => {
          return (
            <div key={layout.id} className="flex flex-row w-full">
              <div className="shrink-0 drag-handle flex items-center justify-center mr-2  cursor-pointer">
                <GripHorizontalIcon size={18} />
              </div>
              <ReactSortable
                key={layout.id}
                list={layout.children}
                setList={(d) => {
                  handleColumnLayout(d, layout);
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
                className="min-h-10 w-full flex flex-row gap-4 border border-black/10 border-dotted"
                ghostClass="horizontal-ghost"
                filter={".no-drag"}
              >
                {layout.children.map((i) => (
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
                          editItem(e, layout, i);
                        }}
                      >
                        <button className="rounded hover:bg-black/5 p-1">
                          <PencilIcon size={12} />
                        </button>
                      </Modal>
                      <button
                        className="rounded hover:bg-black/5 p-1"
                        onClick={() => {
                          deleteItem(layout, i);
                        }}
                      >
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center ml-2 no-drag">
                  <ComponentModal
                    onSubmit={(e) => {
                      addItem(layout, e);
                    }}
                  >
                    <button className="h-[36px] text-slate-800 hover:text-black aspect-square flex items-center justify-center bg-black/5 backdrop-blur-md mr-2 rounded-full">
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </ComponentModal>
                </div>
              </ReactSortable>
            </div>
          );
        })}
        <div className="flex items-center mt-4 z-50 no-drag md:hidden">
          <ComponentModal
            onSubmit={(e) => {
              addLayout(e);
            }}
          >
            <button className="h-[36px] text-slate-800 hover:text-black aspect-square flex items-center justify-center bg-black/5 backdrop-blur-md mr-2 rounded-full">
              <Plus size={20} strokeWidth={3} />
            </button>
          </ComponentModal>
        </div>
      </ReactSortable>

      {layouts.length === 0 ? (
        <div className="absolute flex items-center justify-center left-0 right-0 bottom-0 top-0">
          <span className="hidden md:block">
            Drag and drop elements from left panel into here.
          </span>
          <span className="md:hidden">
            Start adding form item by clicking add button.
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FormSection;
