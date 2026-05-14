import express from "express"; 
import { getEvents, createEvent,getEventById, UpdateEvent, deleteEvent, 
} from "../controllers/EventControllers"; 
 
const router = express.Router(); 
 
router.get("/", getEvents); 
router.post("/", createEvent); 
router.get("/:id", getEventById); 
router.put("/",UpdateEvent)
router.delete("/:id", deleteEvent)
 
export default router;