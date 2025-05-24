import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(req:any,res:any) {
  const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
      role: "CUSTOMER", // assuming 'role' is an enum in your Prisma schema
  }
  
res.send(user)
  
}

