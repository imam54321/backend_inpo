import express from "express"; 
import cors from "cors";
import eventRoutes from "./routes/eventRoutes";
import categoryRoutes from "./routes/categoryRoutes";
 
const app = express(); 
const port = 3000; 
 
app.use(cors()); 
app.use(express.json()); 
app.use("/events",eventRoutes)
app.use("/categories", categoryRoutes)
 
app.get("/", (req, res) => { 
 res.send("Backend Invofest"); 
}); 
 

app.listen(port, () => { 
 console.log(`Server is running on http://localhost:${port}`); 
});