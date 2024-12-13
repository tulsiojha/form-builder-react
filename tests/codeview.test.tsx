import { getCode } from "@/utils/template";
import "@testing-library/jest-dom";
import { data } from "./mock-data";

describe("Code section", () => {
  it("renders Code section with text input", async () => {
    const res = await getCode({ layouts: data });
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, "text/html");
    const input = doc.querySelector("form")?.querySelector("input");
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe("name");
  });
});
