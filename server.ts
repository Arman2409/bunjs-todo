import express from "express";
import dotenv from "dotenv";

import todoRouter from "./routes/todo";

dotenv.config();

const app = express();

app.use(express.json())

app.get("/", (_ , res) => {
    res.send("Server running!")
})

app.use("/todos", todoRouter);

const port =  process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})