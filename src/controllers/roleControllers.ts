import {Request, Response} from "express";
import prisma from "../lib/Prisma.js";

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await prisma.role.findMany(); 
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data role" });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = Number(req.params.id);

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return res.status(404).json({
        message: "Role tidak ditemukan",
      });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data role",
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama role wajib diisi",
      });
    }   
    
    const newRole = await prisma.role.create({
        data: {
            name,
        },
    });

    return res.status(201).json(newRole);
    } catch (error) {
        return res.status(500).json({
            message: "Gagal membuat role baru",
        });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const roleId = Number(req.params.id);
        const { name } = req.body;

        const updatedRole = await prisma.role.update({
            where: {
                id: roleId,
            },
            data: {
                name,
            },
        }); 
        return res.status(200).json(updatedRole);
    } catch (error) {       
         return res.status(500).json({
            message: "Gagal memperbarui role",
        });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const roleId = Number(req.params.id);
        await prisma.role.delete({
            where: {
                id: roleId,
            },
        });
        return res.status(200).json({
            message: "Role berhasil dihapus",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal menghapus role",
        });
    }   
};

