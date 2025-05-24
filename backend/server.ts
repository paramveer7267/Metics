import express from "express"
import { envVars } from "./config/envVars.js";

const app = express();
const PORT: number = Number(envVars.PORT);

app.use(express.json());

app.use("/",(req,res) => {
  res.send("home page")
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`); // Log the actual port
  // connectDB(); // Connect to the database
});