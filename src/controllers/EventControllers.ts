import type { Request, Response } from "express";
import {Events} from "../types/Event";
import { event } from "../types/Event";
// import { title } from "node:process";

let nextId = 2;

let events : Events [] = [];



export const getEvents =  (req : Request, res : Response) => {
    res.status(201).json(events)
};

export const createEvent = (req: Request, res: Response) => { 
 try { 
   const { title, date, description } = req.body; 
 
   // validasi sederhana 
   if (!title || !date || !description) { 
     return res.status(400).json({ 
       message: "Semua field wajib diisi", 
     }); 
   } 
 
   const newEvent: Events = { 
     id: nextId++, 
     title, 
     date, 
     description, 
     isPublished: false, 
   }; 
   
   events.push(newEvent); 
 
   res.status(201).json(newEvent); 
 } catch (error) { 
   res.status(500).json({ 
     message: "Internal Server Error", 
   }); 
 };
}; 

export const getEventById = (req: Request, res: Response) => { 
 const id = Number(req.params.id); 
 
 const event = events.find((e) => e.id === id); 
 
 if (!event) { 
   return res.status(404).json({ 
     message: "Event tidak ditemukan", 
   }); 
 } 
 
 res.json(event); 
}; 

export const UpdateEvent = (req: Request, res:Response) => {
  const id = Number(req.params.id);
  const event =  events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({message : "Event tidak ditemukan"});
  }
  event.title = req.body ?? event.title;
  event.date = req.body ?? event.date;
  event.description = req.body ?? event.description;

  res.json(event)

}

export const deleteEvent = (req : Request, res: Response) => {
  const id = Number(req.params.id);
  events = events.filter((e) => e.id !== id);
  res.json({message : "Event berhasil dihapus"})
}