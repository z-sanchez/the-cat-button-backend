import { parseGPTResponseToCat } from "../utils/parseGPTResponse";
import testGPTResponses from "./fixtures/testData.json";

test("add 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

describe("Parse GPT Cat Response One", () => {
  const response = testGPTResponses.data[4].text;
  const parsedCat = parseGPTResponseToCat(response);

  test("Trim White Space", () => {
    expect(parsedCat.name[0]).not.toBe(" ");
    expect(parsedCat.name[parsedCat.name.length - 1]).not.toBe(" ");
  });

  test("Strip **", () => {
    expect(parsedCat.name).not.toContain("*");
  });

  test("Parse Age", () => {
    expect(parsedCat.age).toBe(7);
  });
});
