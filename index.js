const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;


app.post("/slack", async (req, res) => {
  const { text, user_name } = req.body;

  // ✅ Send response immediately to Slack (so it doesn't timeout)
  res.send(`✅ Flow received: "${text}" from @${user_name}`);

  try {
    // 🔁 Send to n8n webhook (customize later)
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      user: user_name,
      command: text,
    });
  } catch (err) {
    console.error("Failed to send to n8n:", err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FlowPilot backend listening on port ${PORT}`);
});

