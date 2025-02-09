const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 9762;

// Allow cross-origin requests (so your React app can talk to this backend)
app.use(cors());
app.use(express.json());

// (Optional) Keep or remove this existing /run-script
app.post("/run-script", (req, res) => {
  const scriptCmd =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to trade 0.01 USDC for ETH"}'`;

  exec(scriptCmd, (error, stdout, stderr) => {
    if (error) {
      console.error("Error running script:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Script output (stdout):", stdout);
    console.error("Script errors (stderr):", stderr);
    return res.json({ message: "Script executed successfully!" });
  });
});

// NEW: Deposit endpoint
app.post("/deposit", (req, res) => {
  // The deposit curl command
  const depositScript =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to deposit 0.01 USDC in a morpho vault."}'`;

  exec(depositScript, (error, stdout, stderr) => {
    if (error) {
      console.error("Error during deposit:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Deposit stdout:", stdout);
    console.error("Deposit stderr:", stderr);
    return res.json({ message: "Deposit script executed successfully!" });
  });
});

// NEW: Withdraw endpoint
app.post("/withdraw", (req, res) => {
  // The withdraw curl command
  const withdrawScript =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to withdraw 0.01 USDC from the morpho vault."}'`;

  exec(withdrawScript, (error, stdout, stderr) => {
    if (error) {
      console.error("Error during withdraw:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Withdraw stdout:", stdout);
    console.error("Withdraw stderr:", stderr);
    return res.json({ message: "Withdraw script executed successfully!" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
