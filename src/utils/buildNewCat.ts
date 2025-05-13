import { client } from "../connectors/gpt.js";
import { Cat } from "../models/Cats.js";
import { parseGPTResponseToCat } from "./parseGPTResponse.js";

const mockResponse = {
  id: "resp_681ef5a3fde081918393fcc8d5ab7f6a0cc44107943ecf2a",
  object: "response",
  created_at: 1746859427,
  status: "completed",
  error: null,
  incomplete_details: null,
  instructions: null,
  max_output_tokens: 150,
  model: "gpt-4.1-nano-2025-04-14",
  output: [
    {
      id: "msg_681ef5a418348191905350c45316df6e0cc44107943ecf2a",
      type: "message",
      status: "completed",
      content: [
        {
          type: "output_text",
          annotations: [],
          text: "Name: Sir Whiskerball McFluffington  \nAge: 7 years  \nOccupation: Professional Yarn Detective  \nHobby: Sudden sprinting after invisible mice  \nOrigin: The enchanting city of Muffintop Valley  \nBackstory: Sir Whiskerball was born amidst the legendary Bubblegum Trees of Muffintop Valley, where he developed an extraordinary talent for sniffing out the tiniest specks of glitter. Rumor has it, he once solved the great case of the missing sock, proving his prowess as both a detective and a devoted nap enthusiast.",
        },
      ],
      role: "assistant",
    },
  ],
  parallel_tool_calls: true,
  previous_response_id: null,
  reasoning: {
    effort: null,
    summary: null,
  },
  service_tier: "default",
  store: true,
  temperature: 1,
  text: {
    format: {
      type: "text",
    },
  },
  tool_choice: "auto",
  tools: [],
  top_p: 1,
  truncation: "disabled",
  usage: {
    input_tokens: 66,
    input_tokens_details: {
      cached_tokens: 0,
    },
    output_tokens: 116,
    output_tokens_details: {
      reasoning_tokens: 0,
    },
    total_tokens: 182,
  },
  user: null,
  metadata: {},
  output_text:
    "Name: Sir Whiskerball McFluffington  \nAge: 7 years  \nOccupation: Professional Yarn Detective  \nHobby: Sudden sprinting after invisible mice  \nOrigin: The enchanting city of Muffintop Valley  \nBackstory: Sir Whiskerball was born amidst the legendary Bubblegum Trees of Muffintop Valley, where he developed an extraordinary talent for sniffing out the tiniest specks of glitter. Rumor has it, he once solved the great case of the missing sock, proving his prowess as both a detective and a devoted nap enthusiast.",
};

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
