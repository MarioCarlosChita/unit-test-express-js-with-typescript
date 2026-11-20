import { TaskController } from "../controller/task-controller";
import { TaskRepository } from "../repository/task-repository";


const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);


export const container = {
    controller:{
        taskController
    }
}


