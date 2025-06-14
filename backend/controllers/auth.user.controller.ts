import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Sign-up controller
export const userSignup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role} =
      req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const nameRegex = /^[A-Za-z\s'-]{6,20}$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain only letters and be 6 to 20 characters long",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format example@example.com",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one special letter and one number",
      });
    }

    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the user data
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "CUSTOMER", // Default role is CUSTOMER if not provided
      },
    });
    
    // Generate token and set cookie
    generateTokenAndSetCookie(
      newUser.id,
      newUser.role,
      res
    );
    
    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err: any) {
  if (err.code === 'P2002') {
    return res.status(400).json({ message: "Email already exists." });
  }
  res.status(500).json({ message: "Server error", details: err.message });
}
};

// Login controller
export async function userLogin(req: Request, res: Response): Promise<any> {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists using email
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password match
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user.id, user.role, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user,
        password: "", // Remove password from the response
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Logout controller
export async function userLogout(req: Request, res: Response): Promise<any> {
  try {
    // Clear the cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// Note: Ensure that you have proper error handling and logging in place for production use.
// Also, consider using environment variables for sensitive information like JWT secret and database connection strings.
// Make sure to test the endpoints thoroughly and handle edge cases.
// You may also want to implement rate limiting and other security measures to protect your API endpoints.
// This code is a basic implementation of user authentication using Prisma, bcrypt, and JWT.
// You can extend it further by adding features like email verification, password reset, etc.
// Additionally, consider implementing role-based access control (RBAC) if your application requires different permissions for different user roles.
   