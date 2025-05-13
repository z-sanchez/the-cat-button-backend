import { client } from "../connectors/gpt.js";
import { Cat } from "../models/Cats.js";
import { parseGPTResponseToCat } from "./parseGPTResponse.js";

export const buildNewCat = async () => {
  const imageSource = await fetch(
    `https://api.unsplash.com/photos/random?query=cats&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  ).then((response) => response.json());

  const prompt = `
    Generate a unique and whimsical cat profile with:
    - Name
    - Age (1-15 years)
    - Occupation (funny, quirky)
    - Hobby (cat-related)
    - Origin (fictional place)
    - Backstory (2-3 sentences)
  `;

  const gptResponse = await client.responses.create({
    model: "gpt-4.1",
    input: prompt,
    max_output_tokens: 150,
  });

  const parsedCat = parseGPTResponseToCat(gptResponse.output_text);

  const newCat = new Cat({
    imageSource: imageSource.urls.regular,
    name: parsedCat.name,
    age: parsedCat.age,
    occupation: parsedCat.occupation,
    hobby: parsedCat.hobby,
    origin: parsedCat.origin,
    backstory: parsedCat.backstory,
  });

  newCat.save();

  return newCat;
};
