import { client } from "../connectors/gpt.js";
import { Cat } from "../models/Cats.js";
import { isValidCat, parseGPTResponseToCat } from "./parseGPTResponse.js";

const useMockUnsplashURL = Boolean(process.env.MOCK_UNSPLASH_URL);

export const buildNewCat = async () => {
  try {
    const imageSource = !useMockUnsplashURL
      ? await fetch(
          `https://api.unsplash.com/photos/random?query=cats&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        ).then((response) => response.json())
      : "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const prompt = `You are a whimsical cat profile generator. Respond with only the following format:

    **Name:** <cat name>  
    **Age:** <1-15 years>  
    **Occupation:** <funny/quirky job>  
    **Hobby:** <cat-related hobby>  
    **Origin:** <fictional place>  
    **Backstory:** <2-3 sentences>

    Make it creative, weird, and delightful, but formatted exactly as above.
`;

    const gptResponse = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      temperature: 1.2,
      max_output_tokens: 300,
    });

    const parsedCat = parseGPTResponseToCat(gptResponse.output_text);

    const newCatDetails = {
      imageSource: !useMockUnsplashURL ? imageSource.urls.regular : imageSource,
      name: parsedCat.name,
      age: parsedCat.age,
      occupation: parsedCat.occupation,
      hobby: parsedCat.hobby,
      origin: parsedCat.origin,
      backstory: parsedCat.backstory,
    };

    if (isValidCat(newCatDetails)) {
      const newCatDBObject = new Cat(newCatDetails);

      newCatDBObject.save();
      return newCatDBObject;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
