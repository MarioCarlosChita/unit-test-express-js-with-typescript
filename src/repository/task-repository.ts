import { CreateTask } from "../dto/create-task";
import { Task } from "../entities/task";

export interface ITaskRepository {
  index(): Promise<Task[]>;
  create(createTask: CreateTask): Promise<boolean>;
}

export class TaskRepository implements ITaskRepository {
  private tasks: Array<Task> = [];

  public async index(): Promise<Task[]> {
    return this.tasks;
  }
  public async create(createTask: CreateTask): Promise<boolean> {
    const task: Task = {
      title: createTask.title,
      description: createTask.description,
    };

    this.tasks.push(task);
    
    return true;
  }
}
