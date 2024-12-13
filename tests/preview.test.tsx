import PreView from "@/components/compounds/pre-view";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { data } from "./mock-data";

describe("Preview section", () => {
  it("renders preview section with text input", () => {
    render(<PreView layouts={data} />);

    const heading = screen.getByText("Name");

    expect(heading).toBeInTheDocument();
  });
});
