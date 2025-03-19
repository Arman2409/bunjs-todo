import express from "express"
import { PrismaClient, type Todo } from "@prisma/client"

const todoRouter = express.Router();
const prisma = new PrismaClient();

todoRouter.get("/", async (_, res) => {
    try {
        const todos = await prisma.todo.findMany();

        res.status(200).send(todos);
    } catch (err) {
        console.warn(`Failed to get todos: ${err}`);
    }
})

todoRouter.post("/", async (req, res) => {
    try {
        const { title, description } = { ...req.body as Todo }

        const newTodo = await prisma.todo.create({
            data: {
                title,
                description
            }
        })

        res.status(201).send(newTodo);
    } catch (err) {
        console.warn(`Failed to create todo: ${err}`);
    }
})

export default todoRouter;
