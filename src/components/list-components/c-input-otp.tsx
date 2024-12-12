import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IComponent } from "@/utils/types";

const CInputOTP = ({ field, item, style }: IComponent) => {
  return (
    <div className="space-x-2" style={style}>
      <FormItem>
        <div className="flex flex-col gap-2">
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <InputOTP
              maxLength={6}
              {...field}
              value={field.value}
              onChange={field.onChange}
              disabled={item.disabled}
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
        <FormDescription>{item.description}</FormDescription>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default CInputOTP;
