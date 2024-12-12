"use client";
import { useRef, useState } from "react";
import { CodeCheckIcon, CopyIcon } from "./icons";

export const Copy = ({ code }: { code: string }) => {
  const [copyI, setCopyI] = useState(<CopyIcon size={16} />);
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      onClick={() => {
        setCopyI(<CodeCheckIcon size={16} />);
        navigator.clipboard.writeText(code).then(() => {
          setTimeout(() => {
            setCopyI(<CopyIcon size={16} />);
          }, 1000);
        });
      }}
      className="block cursor-pointer absolute text-foreground-light hover:text-foreground bg-popup-bg border border-popup-border top-3 right-4 p-1.5 rounded-md"
    >
      {copyI}
    </span>
  );
};
