const crypto = require("crypto");
const express = require("express");
const path = require("path");
const { Datastore } = require("@google-cloud/datastore");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.get("/url/{hash}", (req, res) => {});

app.post("/", async (req, res) => {
  if (!req.body.url)
    return res.status(422).json({ error: "missing/invalid field `url`" });

  const short = crypto
    .createHash("sha256")
    .update(req.body.url)
    .digest("hex")
    .substring(0, 7);

  return res
    .status(200)
    .json({ url: `https://url-shortner.mohsin.ninja/${short}` });

  const client = new Datastore();
  const [exists] = await client.runQuery(
    client.createQuery("url").filter("original", req.body.url)
  );

  if (exists) return res.status(409).json({ error: "already shortened" });

  await client.save({
    key: client.key("original"),
    data: { url: req.body.url, short },
  });

  return res.status(200).json({ short });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port ${process.env.PORT || 3000}`);
});
