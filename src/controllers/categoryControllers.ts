import type { Request, Response } from "express";
import { Category } from "../types/Category";
import { event } from "../types/Event";
// import { Events } from "../types/Event";
// import { events } from "../types/Event";

let nextId = 2;
let categories : Category[] = [
    {
        id:1,
        category : "Mahasiswa Universitas Harkat"
    }
];


export const  getCategory = (req : Request, res : Response) => {
    res.json(categories);
};

export const createCategory = (req : Request, res : Response) => {
    try {
        const {category} = req.body;
    
    if(!category) {
        return res.status(404).json({
            message:"Category Wajib Diisi"
        });
    }
       const newCategory: Category = { 
         id: nextId++, 
         category, 
    };
    categories.push(newCategory);
    res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error",
        });
    };
};

export const getCategoryById = (req : Request, res : Response) => {
    const id =Number(req.params.id);

    const categorie = categories.find((e) => e.id === id);

    if(!event) {
        return res.status(404).json({
            message:"Category Tidak Ditemukan",
        });
    }
    res.json(categorie);
};

export const updateCategory = (req:Request, res : Response) => {
    const id = Number(req.params.id);
    const categorie = categories.find((e) => e.id === id);

    if (!categorie) {
        return res.status(400).json({
            message : "category tidak ditemukan"
        });
    }
    categorie.category = req.body ?? categorie.category;

    res.json(categorie)
}
export const deleteCategory = (req:Request, res:Response) => {
    const id = Number(req.params.id);
    categories = categories.filter((e) => e.id === id);
    res.json({message : "Category Berhasil Dihapus"})
}