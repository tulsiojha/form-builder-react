import { ILayout } from "@/utils/types";
import { ReactNode } from "react";
import Placeholder from "../atoms/placeholder";

const ViewLayout = ({
  layouts,
  children,
}: {
  layouts: ILayout[];
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3 relative">
      {layouts.length > 0 ? <>{children}</> : <Placeholder />}
    </div>
  );
};

export default ViewLayout;
