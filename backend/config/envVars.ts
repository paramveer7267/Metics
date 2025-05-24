import dotenv from "dotenv"

dotenv.config()

export const envVars = {
  PORT: process.env.PORT || "3000",
}