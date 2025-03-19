import type { Todo } from "@prisma/client";

export type UpdateTodoData = Omit<Todo, "createdAt" | "updatedAt" | "id">