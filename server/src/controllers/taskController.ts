import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async ( req: Request, res: Response ): Promise<void> => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,

            }
        });
        res.json(tasks)
    } catch (error){
        res.status(500).json({ message: "Error retrieving tasks " });
    }
};

export const createTask = async ( req: Request, res: Response ): Promise<void> => {
    const { 
            title,
            description,
            status,
            priority,
            tags,
            startDate,
            dueDate,
            points,
            projectId,
            authorUserId,
            assignedUserId,
    } = req.body;
    try {
        const createTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        })
        res.json(createTask)
    } catch (error: any){
        res.status(500).json({ message: `Error creating task ${error}` });
    }
};

export const updateTaskStatu = async ( req: Request, res: Response ): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updateTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
           data: {
            status: status
           }
        });
        res.json(updateTask)
    } catch (error){
        res.status(500).json({ message: "Error retrieving tasks " });
    }
};