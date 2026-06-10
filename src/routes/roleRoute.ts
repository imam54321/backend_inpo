import express from "express";
import { getAllRoles, getRoleById, createRole } from "../controllers/roleControllers.js";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.post("/", createRole);

export default router;