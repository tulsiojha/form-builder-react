import FormSection from "@/components/molecules/form-section";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { data } from "./mock-data";

describe("FormSection", () => {
  it("renders form section with text input", () => {
    render(<FormSection onItemChanged={() => {}} layouts={data} />);

    const heading = screen.getByText("TextInput");

    expect(heading).toBeInTheDocument();
  });
});
