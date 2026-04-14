import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (data: any) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (user) throw new Error("USER_ALREADY_EXISTS");
    return await prisma.user.create({
      data: {
        ...data,
        birthDate: new Date(data.birthDate),
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Wrong password");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string, currentUser: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error("USER_NOT_FOUND");

    if (currentUser.role !== "ADMIN" && currentUser.userId !== id) {
      throw new Error("Forbidden");
    }

    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (currentUser: any) => {
  try {
    if (currentUser.role !== "ADMIN") {
      throw new Error("Only admin");
    }

    return await prisma.user.findMany();
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (id: string, currentUser: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error("USER_NOT_FOUND");

    if (currentUser.role !== "ADMIN" && currentUser.userId !== id) {
      throw new Error("Forbidden");
    }

    return await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  } catch (error) {
    throw error;
  }
};
