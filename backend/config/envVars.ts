import dotenv from "dotenv"

dotenv.config()

export const envVars = {
  PORT: process.env.PORT || "3000",
  JWT_SECRET:process.env.JWT_SECRET || "my_website",
  NODE_ENV:process.env.NODE_ENV || undefined,
}