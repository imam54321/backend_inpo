import express from "express"; 
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import speakerRoutes from "./routes/speakerRoutes.js";
import authRoute from "./routes/authRoute.js";
 
const app = express(); 
const PORT = process.env.PORT || 3000;
 
app.use(cors()); 
app.use(express.json()); 
app.use("/events",eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);
app.use("/auth", authRoute);
 
app.get("/", (req, res) => { 
 res.send("Backend Invofest"); 
}); 
 

app.listen(PORT, () => { 
 console.log(`Server is running on http://localhost:${PORT}`); 
});