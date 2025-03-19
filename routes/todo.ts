import express from "express"
import { changeStatusOne, createOne, deleteOne, getAll, updateOne } from "../handlers/todo";

const todoRouter = express.Router();

todoRouter.get("/", getAll);
todoRouter.post("/", createOne);
todoRouter.get("/done/:id", (req, res) => changeStatusOne(req, res, true))
todoRouter.get("/undone/:id", (req, res) => changeStatusOne(req, res, false))
todoRouter.patch("/:id", updateOne) 
todoRouter.delete("/:id", deleteOne);

export default todoRouter;
