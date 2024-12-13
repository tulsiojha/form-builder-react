import JsonView from "@/components/compounds/json-view";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { data } from "./mock-data";

describe("Json section", () => {
  it("renders Json section with text input", () => {
    render(<JsonView layouts={data} />);

    const heading = screen.getByText(`"Name"`);

    expect(heading).toBeInTheDocument();
  });
});
