import CTextInput from "@/components/list-components/c-text-input";
import { ILayout } from "@/utils/types";
import { TextCursorInputIcon } from "lucide-react";

const data: ILayout[] = [
  {
    id: "2267c945-9917-4b1f-adce-a221729e4e45",
    layout: true,
    children: [
      {
        id: "text-input_a92074cd-282e-4f68-8674-ca2b9bdbb578",
        kind: "text-input",
        label: "Name",
        description: "Enter your name",
        placeholder: "name",
        displayName: "TextInput",
        disabled: false,
        required: false,
        pattern: "",
        type: "text",
        icon: <TextCursorInputIcon size={14} />,
        component: CTextInput,
      },
    ],
  },
];

export { data };
