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
  const { amount, fromToken, toToken } = req.body;
  
  const scriptCmd =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to trade ${amount} ${fromToken} for ${toToken}"}'`;

  exec(scriptCmd, (error, stdout, stderr) => {
    if (error) {
      console.error("Error running script:", error.message);
      return res.status(500).json({ error: error.message });
    }
    
    console.log("Script output (stdout):", stdout);
    console.error("Script errors (stderr):", stderr);
    
    // Return the raw response to be parsed on the frontend
    return res.json({ 
      message: "Script executed successfully!",
      agentResponse: stdout
    });
  });
});

// NEW: Deposit endpoint
app.post("/deposit", (req, res) => {
  const { amount } = req.body;
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  // The deposit curl command with dynamic amount
  const depositScript =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to deposit ${amount} USDC in a morpho vault."}'`;

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
  const { amount } = req.body;
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  // The withdraw curl command with dynamic amount
  const withdrawScript =
    `curl -X POST http://127.0.0.1:6000/send_prompt ` +
    `-H "Content-Type: application/json" ` +
    `-d '{"prompt":"You have to withdraw ${amount} USDC from the morpho vault."}'`;

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
