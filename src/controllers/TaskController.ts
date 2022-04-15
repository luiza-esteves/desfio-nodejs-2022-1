import { Request, Response } from "express";
import Task from "../models/Task";
import List from "../models/List";

export default class TaskController {
    getAllTasks = async (req: Request, res: Response) => {
        try {
          const response = await Task.find().populate("List")
          res.status(200).json({ response });
        } catch (error) {
          res.status(400).json({ message: "Falha ao listar challenges" });
        }
    };

    updateTask = async (req: Request, res: Response) => {
        try {
          const response = await Task.findByIdAndUpdate(req.body.id,req.body,
              {
                new: true,
              }
            );
            if (!response)
                return res
                    .status(404)
                    .send({ message: "não foi encontrada a tarefa" });
  
            return res.status(200).send(response);
        } catch (error) {
            return res
                .status(400)
                .send({ message: "não foi possível atualizar a tarefa" });
        }
    };

    createTask = async (req: Request, res: Response) => {
        const { title, description, listId  } = req.body;
        try {

        const task = await Task.create({
            title,
            description,
            listId
        });

        const list = await List.findById(listId);
        
        await list.updateTask({
            $addToSet: {
                tasks: task._id
            }});
        await list.save();
        
        return res.status(200).json({
            message: "Task criado com sucesso!",
        })
        } catch (error) {
        res.status(400).json({ message: "Falha em criar Task" })
        }
    };

  deleteTask = async (req: Request, res: Response) => {
      const { id } = req.body;
      try {
          const response = await Task.findByIdAndDelete(id);
          if (!response)
              return res
                  .status(404)
                  .send({ message: "tarefa não foi encontrada" });
          return res
              .status(200)
              .send({ message: "tarefa excluida" });
      } catch (error) {
          return res
              .status(400)
              .send({ message: "não foi possível excluir a tarefa" });
      }
  };

}