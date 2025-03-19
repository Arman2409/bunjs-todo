import { PrismaClient, type Todo } from "@prisma/client";
import type { Request, Response } from "express";
import type { UpdateTodoData } from "../types/handlers";

const prisma = new PrismaClient();

export const getAll = async (
    _: Request,
    res: Response) => {
    try {
        const todos = await prisma.todo.findMany();

        res.status(200).send(todos);
    } catch (err) {
        console.warn(`Failed to get todos: ${err}`);
    }
}

export const createOne = async (
    req: Request,
    res: Response) => {
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
}

export const changeStatusOne = async (
    req: Request,
    res: Response,
    status: boolean) => {
    try {
        const { id } = { ...req.params }

        await prisma.todo.update({
            where: {
                id
            },
            data: {
                completed: status
            }
        })

        res.status(204).end();
    } catch (err) {
        console.warn(`Failed to delete todo: ${err}`);
    }
}

export const updateOne = async (
    req: Request,
    res: Response) => {
    try {
        const { id } = { ...req.params }
        const { title, description, completed } = { ...req.body as Todo }

        if (!title && !description) {
            res.status(400).send("Neither 'title' nor 'description' provided");
        }

        const updateData: UpdateTodoData = {} as UpdateTodoData;

        if (title) {
            updateData.title = title;
        }
        if (description) {
            updateData.description = description;
        }
        if(completed) {
            if(typeof completed !== "boolean") {
                res.status(400).send("The type of 'completed' should be boolean");
                return;
            }

            updateData.completed = completed;
        }

        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: updateData
        })

        res.status(200).send(updatedTodo);
    } catch (err) {
        console.warn(`Failed to update todo: ${err}`);
    }
}

export const deleteOne = async (
    req: Request,
    res: Response) => {
    try {
        const { id } = { ...req.params }

        console.log({ id });


        await prisma.todo.delete({
            where: {
                id
            }
        })

        res.status(204).end();
    } catch (err) {
        console.warn(`Failed to delete todo: ${err}`);
    }
}