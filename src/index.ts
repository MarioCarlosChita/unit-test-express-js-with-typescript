import express ,{Request,Response}from 'express';
import { container } from './container/container';
import { json } from 'body-parser';

const app = express();  


app.use(json());

app.get('/api/v1/health', (req:Request , res:Response)=>{
return res.status(200).json({
      message:'The api is okey',
      status:200
    }) ;
});

app.get('/api/v1/task', container.controller.taskController.index);
app.post('/api/v1/task', container.controller.taskController.create);

export default app;
