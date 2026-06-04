import { Request, Response } from "express";
import prisma from "../lib/Prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "Email dan Password wajib diisi" });
  }

  const exitingUser = await prisma.user.findUnique({
    where: {
      email
    },
  });
  if (!exitingUser) {
    return res.status(404).json({ message: "Email Tidak Terdaftar" });
  }

  const isPasswordValid = await bcrypt.compare(password, exitingUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password Salah" });
    }

    const token = jwt.sign({ userId: exitingUser.id }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });


    res.status(200).json({
      token,
      user: {
        name: exitingUser.name,
        email: exitingUser.email
      },
      message: "Login Berhasil"
    });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).json({ message: "Harus Sesuai" });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email Sudah Terdaftar" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
