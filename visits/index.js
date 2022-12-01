import express from "express";
import { createClient } from "redis";

const app = express();
const client = createClient({ url: "redis://redis-server" });
const PORT = "8080";
client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.set("visit", 0);

app.get("/", async (req, res) => {
  process.exit(0);
  let visit = await client.get("visit");
  visit++;
  await client.set("visit", visit);

  res.send(`${visit}`);
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
