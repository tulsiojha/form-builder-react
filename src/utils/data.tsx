import {
  Calendar,
  Check,
  LetterTextIcon,
  List,
  RectangleEllipsisIcon,
  SlidersHorizontalIcon,
  TextCursorInputIcon,
  ToggleLeftIcon,
} from "lucide-react";
import { IItem } from "./types";
import { v4 as uuid } from "uuid";
import CCheckbox from "@/components/list-components/c-checkbox";
import CTextInput from "@/components/list-components/c-text-input";
import CTextArea from "@/components/list-components/c-textarea";
import CSwitch from "@/components/list-components/c-switch";
import CInputOTP from "@/components/list-components/c-input-otp";
import CDatepicker from "@/components/list-components/c-datepicker";
import CSlider from "@/components/list-components/c-slider";
import CSelect from "@/components/list-components/c-select";

const commonDefault = {
  disabled: false,
  required: false,
  pattern: "",
  type: "",
};

export const items = {
  "text-input": {
    icon: <TextCursorInputIcon size={14} />,
    component: CTextInput,
  },
  checkbox: {
    icon: (
      <div className="border border-black rounded">
        <Check size={14} />
      </div>
    ),
    component: CCheckbox,
  },
  textarea: {
    icon: <LetterTextIcon size={14} />,
    component: CTextArea,
  },
  slider: {
    icon: <SlidersHorizontalIcon size={14} />,
    component: CSlider,
  },
  switch: {
    icon: <ToggleLeftIcon size={14} />,
    component: CSwitch,
  },
  "input-otp": {
    icon: <RectangleEllipsisIcon size={14} />,
    component: CInputOTP,
  },
  datepicker: {
    icon: <Calendar size={14} />,
    component: CDatepicker,
  },
  select: {
    icon: <List size={14} />,
    component: CSelect,
  },
};

const components: IItem[] = [
  {
    id: `checkbox_${uuid()}`,
    kind: "checkbox",
    displayName: "Checkbox",
    label: "Subscribe to newsletter",
    description: "Stay updated with our latest news and offers",
    placeholder: "checkbox",
    ...commonDefault,
    ...items["checkbox"],
  },
  {
    id: `text-input_${uuid()}`,
    kind: "text-input",
    label: "Name",
    description: "Enter your name",
    placeholder: "name",
    displayName: "TextInput",
    ...commonDefault,
    type: "text",
    ...items["text-input"],
  },
  {
    id: `textarea_${uuid()}`,
    kind: "textarea",
    label: "Description",
    description: "Tell us about yourself",
    placeholder: "description",
    displayName: "TextArea",
    ...commonDefault,
    ...items["textarea"],
  },
  {
    id: `slider_${uuid()}`,
    kind: "slider",
    label: "Slider",
    description: "Description",
    displayName: "Slider",
    ...commonDefault,
    ...items["slider"],
  },
  {
    id: `switch_${uuid()}`,
    kind: "switch",
    label: "Enable Notifications",
    description: "Turn on to receive real-time updates",
    displayName: "Switch",
    ...commonDefault,
    ...items["switch"],
  },
  {
    id: `input-otp_${uuid()}`,
    kind: "input-otp",
    label: "Input OTP",
    description: "Enter your one-time password.",
    displayName: "Input OTP",
    ...commonDefault,
    ...items["input-otp"],
  },
  {
    id: `datepicker_${uuid()}`,
    kind: "datepicker",
    label: "Date of birth",
    description: "Your date of birth is used to calculate your age.",
    displayName: "Datepicker",
    placeholder: "Pick a date",
    ...commonDefault,
    ...items["datepicker"],
  },
  {
    id: `select_${uuid()}`,
    kind: "select",
    label: "Fruits",
    description: "You can select fruits here",
    displayName: "Select",
    placeholder: "Select fruit",
    ...commonDefault,
    ...items["select"],
  },
];

const imports = {
  checkbox: [`import { Checkbox } from "@/components/ui/checkbox";`],
  "text-input": [`import { Input } from "@/components/ui/input";`],
  textarea: [`import { Textarea } from "@/components/ui/textarea";`],
  slider: [`import { Slider } from "@/components/ui/slider";`],
  switch: [`import { Switch } from "@/components/ui/switch";`],
  "input-otp": [
    `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";`,
  ],
  datepicker: [
    `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";`,
    `import { cn } from "@/lib/utils";`,
    `import { CalendarIcon } from "lucide-react";`,
    `import { Calendar } from "@/components/ui/calendar";`,
    `import { format } from "date-fns";`,
  ],
  select: [
    `import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";`,
  ],
};

export { components, imports };
