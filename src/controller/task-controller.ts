import { CreateTask } from "../dto/create-task";
import { Request, Response } from "express";
import { ITaskRepository } from "../repository/task-repository";

export class TaskController {
  constructor(private taskRepository: ITaskRepository) {}

  public index = async (req: Request, res: Response) => {
    try {
      const result = await this.taskRepository.index();

      return res.status(200).json({
        message: "success",
        tasks: result,
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      const createTask: CreateTask = {
        title: title,
        description: description,
      };

      await this.taskRepository.create(createTask);

      return res.status(201).json({
        message: "Task created",
        status: 201,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
  };
}
