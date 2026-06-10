import express from "express"; 
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import speakerRoutes from "./routes/speakerRoutes.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import roleRoute from "./routes/roleRoute.js";
 
const app = express(); 
const PORT = process.env.PORT || 3000;
 
app.use(cors()); 
app.use(express.json()); 
app.use("/events",eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/roles", roleRoute);
 
app.get("/", (req, res) => { 
 res.send("Backend Invofest"); 
}); 
 

app.listen(PORT, () => { 
 console.log(`Server is running on http://localhost:${PORT}`); 
});