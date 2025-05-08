import app from "./app.js";
import { connectToMongo } from "./connectors/db.js";

connectToMongo().then(() => {
  app.listen(3000, () => {
    console.log(`✅ Server Running`);
  });
});
