import FormSection from "@/components/molecules/form-section";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("FormSectionEmpty", () => {
  it("renders empty form section", () => {
    render(<FormSection onItemChanged={() => {}} />);

    const heading = screen.getAllByText(
      (c) =>
        c === "Drag and drop elements from left panel into here." ||
        c === "Start adding form item by clicking add button.",
    );

    heading.forEach((h) => {
      expect(h).toBeInTheDocument();
    });
  });
});
