import { Cat } from "../types/Cat";
import { isValidCat } from "../utils/parseGPTResponse";

describe("Validate New Cat Fields", () => {
  let cat = {
    age: 0,
    name: "Cat Name",
    imageSource: "https://fake-cat-image-url",
    occupation: "Occupation For Cat",
    hobby: "Hobby for Cat",
    origin: "Origin Story",
    backstory: "Cat Backstory",
  };

  test("Should pass, all cat fields valid", () => {
    expect(isValidCat(cat)).toBeTruthy;
  });

  test("Should fail, age is not a number", () => {
    expect(isValidCat({ ...cat, age: "0" })).toBeTruthy;
  });

  test("Should fail, occupation is empty", () => {
    expect(isValidCat({ ...cat, occupation: "" })).toBeTruthy;
  });

  test("Should fail, image source is empty", () => {
    expect(isValidCat({ ...cat, imageSource: "" })).toBeTruthy;
  });

  test("Should fail, hobby is empty", () => {
    expect(isValidCat({ ...cat, hobby: "" })).toBeTruthy;
  });

  test("Should fail, origin is empty", () => {
    expect(isValidCat({ ...cat, origin: "" })).toBeTruthy;
  });

  test("Should fail, backstory is empty", () => {
    expect(isValidCat({ ...cat, backstory: "" })).toBeTruthy;
  });

  test("Should fail, name is empty", () => {
    expect(isValidCat({ ...cat, name: "" })).toBeTruthy;
  });
});
