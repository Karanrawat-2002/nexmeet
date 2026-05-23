import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", process.env.PORT || 8000)
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/testing", (req, res)=>{
    res.send("Congratulations! Your server is ready to use. ");
})
app.use("/api/v1/users", userRoutes);

const start = async () => {
    const mongoUri = process.env.MONGO_URL;

    try {
        const connectionDb = await mongoose.connect(mongoUri, {
            dbName: "nexmeet"
        });

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        console.log(`MONGO Connected DB Name: ${connectionDb.connection.name}`);

        // handle listen errors (e.g. address in use) gracefully
        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                console.error(`Port ${app.get('port')} is already in use`);
                process.exit(1);
            }
            console.error('Server error:', err);
            process.exit(1);
        });

        server.listen(app.get("port"), () => {
            console.log("LISTENING ON PORT", app.get("port"));
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

start();