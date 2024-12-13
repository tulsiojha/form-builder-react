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
import { SelectViewport } from "@radix-ui/react-select";

const commonDefault = {
  disabled: false,
  required: false,
  pattern: "",
  type: "",
};

const components: IItem[] = [
  {
    id: `checkbox_${uuid()}`,
    kind: "checkbox",
    displayName: "Checkbox",
    label: "Subscribe to newsletter",
    description: "Stay updated with our latest news and offers",
    placeholder: "checkbox",
    icon: (
      <div className="border border-black rounded">
        <Check size={14} />
      </div>
    ),
    ...commonDefault,
    component: CCheckbox,
  },
  {
    id: "text-input",
    kind: "text-input",
    label: "Name",
    description: "Enter your name",
    placeholder: "name",
    displayName: "TextInput",
    icon: <TextCursorInputIcon size={14} />,
    ...commonDefault,
    component: CTextInput,
    type: "text",
  },
  {
    id: "textarea",
    kind: "textarea",
    label: "Description",
    description: "Tell us about yourself",
    placeholder: "description",
    displayName: "TextArea",
    icon: <LetterTextIcon size={14} />,
    ...commonDefault,
    component: CTextArea,
  },
  {
    id: "slider",
    kind: "slider",
    label: "Slider",
    description: "Description",
    displayName: "Slider",
    icon: <SlidersHorizontalIcon size={14} />,
    ...commonDefault,
    component: CSlider,
  },
  {
    id: "switch",
    kind: "switch",
    label: "Enable Notifications",
    description: "Turn on to receive real-time updates",
    displayName: "Switch",
    icon: <ToggleLeftIcon size={14} />,
    ...commonDefault,
    component: CSwitch,
  },
  {
    id: "input-otp",
    kind: "input-otp",
    label: "Input OTP",
    description: "Enter your one-time password.",
    displayName: "Input OTP",
    icon: <RectangleEllipsisIcon size={14} />,
    ...commonDefault,
    component: CInputOTP,
  },
  {
    id: "datepicker",
    kind: "datepicker",
    label: "Date of birth",
    description: "Your date of birth is used to calculate your age.",
    displayName: "Datepicker",
    placeholder: "Pick a date",
    icon: <Calendar size={14} />,
    ...commonDefault,
    component: CDatepicker,
  },
  {
    id: "select",
    kind: "select",
    label: "Fruits",
    description: "You can select fruits here",
    displayName: "Select",
    placeholder: "Select fruit",
    icon: <List size={14} />,
    ...commonDefault,
    component: CSelect,
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
