import { Request, Response } from "express";
import prisma from "../lib/Prisma.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
        select: {   
            id: true,
            name: true,
            email: true,
            role: true,
        }

    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pengguna" });
  } 
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id); 

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data pengguna",
    });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password || !roleId) {  
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: {
          connect: {
            id: 1,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat pengguna baru" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const { name, email, password, roleId } = req.body; 
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: {
          connect: {
            id: roleId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal memperbarui pengguna",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {  
  try {
    const userId = Number(req.params.id);

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(200).json({
      message: "Pengguna berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menghapus pengguna",
    });
  }
};