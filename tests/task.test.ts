import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { ITaskRepository } from "../src/repository/task-repository";
import { Task } from "../src/entities/task";
import express from "express";
import { TaskController } from "../src/controller/task-controller";
import { json } from "body-parser";

describe("Task controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTaskRepository: Pick<ITaskRepository, "create" | "index"> = {
    create: jest.fn<ITaskRepository["create"]>(),
    index: jest.fn<ITaskRepository["index"]>(),
  };

  const app = express();
  app.use(json());

  const taskController = new TaskController(mockTaskRepository);
  app.get("/api/v1/task", taskController.index);
  app.post("/api/v1/task", taskController.create);

  it("should list all tasks ", async () => {
    const tasks: Task[] = [
      {
        title: "first task",
        description: "this is the first task",
      },
    ];

    jest.mocked(mockTaskRepository.index).mockResolvedValue(tasks);

    const response = await request(app).get("/api/v1/task");

    expect(response.status).toBe(200);
    expect(mockTaskRepository.index).toHaveBeenCalledTimes(1);
    expect(response.body.tasks).toBeInstanceOf(Array<Task>);
  });

  it("should create a  task", async () => {
    const isTaskCreated: boolean = true;

    jest.mocked(mockTaskRepository.create).mockResolvedValue(isTaskCreated);

    const response = await request(app).post("/api/v1/task").send({
      title: "first Task",
      description: "This is a description of the first task",
    });
    expect(response.status).toBe(201);
    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
  });
});
