import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import { envVars } from "./config/envVars.ts";
import userRoutes from "./routes/auth.user.route.ts";



const app = express();


const PORT: number = Number(envVars.PORT);

app.use(express.json());
app.use(cors());
app.use(helmet()); //helmet is security middleware that helps you protect your website by setting various HTTP headers
app.use(morgan("dev")) //log the requests

app.use("/api/v1/auth/user", userRoutes)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`); // Log the actual port
  // connectDB(); // Connect to the database
});