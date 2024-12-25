import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { ILayout } from "@/utils/types";

const AskAIModal = ({
  children,
  open,
  setOpen,
  onSubmit,
}: {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSubmit?: (data: ILayout[]) => void;
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="sm:max-w-[500px]" disableClose={loading}>
        <DialogHeader>
          <DialogTitle>Ask AI</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-row items-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (input) {
              setLoading(true);
              const res = await fetch(
                "https://form-builder-api.ojhabikash.com.np/api/generate",
                {
                  method: "post",
                  headers: new Headers({
                    "content-type": "application/json",
                  }),

                  body: JSON.stringify({
                    prompt: input,
                  }),
                },
              );
              const data = await res.json();
              if (data.error) {
              } else {
                const tempFormData = data.data.response;
                try {
                  const formData = JSON.parse(tempFormData);
                  if (formData && Array.isArray(formData)) {
                    onSubmit?.(formData);
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            }
            setLoading(false);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ai to generate form"
            disabled={loading}
          />
          <Button disabled={loading} type="submit">
            {loading && <Loader2 className="animate-spin" />}

            <Send size={16} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskAIModal;
