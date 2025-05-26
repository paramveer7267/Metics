import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testuser@example.com",
        password: "testpassword123", // WARNING: This should be hashed in real apps!
        role: "CUSTOMER",
      },
    });

    res.status(201).json({
      message: "Hardcoded user created successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating hardcoded user:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
};




// import { PrismaClient } from '@prisma/client';
// import { Request, Response } from 'express';

// const prisma = new PrismaClient();

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Validate inputs (basic)
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Name, email, and password are required." });
//     }

//     // Create user
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password, // Make sure to hash this in production!
//         role: role || "CUSTOMER",
//       },
//     });

//     res.status(201).json({ message: "User created", user: newUser });
//   } catch (error: any) {
//     if (error.code === 'P2002') {
//       return res.status(409).json({ error: "Email already exists." });
//     }
//     res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// };

