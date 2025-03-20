import { PrismaClient, type Todo } from "@prisma/client";
import type { Request, Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/status";
import type { UpdateTodoData } from "../types/handlers";

const prisma = new PrismaClient();

export const getAll = async (
    _: Request,
    res: Response) => {
    try {
        const todos = await prisma.todo.findMany();

        res.status(StatusCode.OK).send(todos);
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_GET_ALL}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_GET_ALL);
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

        res.status(StatusCode.CREATED).send(newTodo);
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_CREATE}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_CREATE);
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

        res.status(StatusCode.NO_CONTENT).end();
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_CHANGE_STATUS}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_CHANGE_STATUS)
    }
}

export const updateOne = async (
    req: Request,
    res: Response) => {
    try {
        const { id } = { ...req.params }
        const { title, description, completed } = { ...req.body as Todo }

        if (!title && !description) {
            res.status(StatusCode.BAD_REQUEST).send("Neither 'title' nor 'description' provided");
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
                res.status(StatusCode.BAD_REQUEST).send("The type of 'completed' should be boolean");
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

        res.status(StatusCode.OK).send(updatedTodo);
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_UPDATE}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_UPDATE)
    }
}

export const deleteOne = async (
    req: Request,
    res: Response) => {
    try {
        const { id } = { ...req.params }

        await prisma.todo.delete({
            where: {
                id
            }
        })

        res.status(StatusCode.NO_CONTENT).end();
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_DELETE}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_DELETE);
    }
}