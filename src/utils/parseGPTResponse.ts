export const parseGPTResponseToCat = (response: string) => {
  const text = response.trim();
  const lines = text.split("\n").filter(Boolean);

  const name = lines[0].split("Name:")[1].replace(/\*/g, "").trim();

  const parsedAge = lines[1]
    .split("Age:")[1]
    .replace(/\*/g, "")
    .trim()
    .split(" ");
  const age = Number(parsedAge[0]);

  const occupation = lines[2].split("Occupation:")[1].replace(/\*/g, "").trim();
  const hobby = lines[3].split("Hobby:")[1].replace(/\*/g, "").trim();
  const origin = lines[4].split("Origin:")[1].replace(/\*/g, "").trim();
  const backstory = lines[5].split("Backstory:")[1].replace(/\*/g, "").trim();

  return {
    name,
    age,
    occupation,
    hobby,
    origin,
    backstory,
  };
};
