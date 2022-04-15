import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class ListController {

  createList = async (req: Request, res: Response) => {
      const { title, description  } = req.body;
      try {
        const challenge = await List.create({
          title,
          description,
        });

        return res.status(200).json({
          message: "Lista criado com sucesso!",
        })
      } catch (error) {
        res.status(400).json({ message: "Falha em criar Lista" })
      }
  };

  updateList = async (req: Request, res: Response) => {
      const { id, title,description } = req.body;
      try {

          const list = await List.findByIdAndUpdate( 
            id,{ title, description },
            { new: true } );

          if (!list)
              return res
                  .status(404)
                  .send({ message: "não foi encontrada a lista selecionada" });

          return res.status(200).send(list);
      } catch (error) {
          return res
              .status(400)
              .send({ message: "Erro ao atualizar lista de tarefas" });
      }
  };

    getOneList = async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
          const response = await List.findById(id).populate("tasks");

          if (!response)
              return res
                  .status(404)
                  .send({ message: "lista não foi encontrada" });

          return res.status(200).send(response);
      } catch (error) {
          console.error({ error: error.message });
          return res
              .status(400)
              .send({ message: "Erro ao buscar lista de tarefas" });
      }
  };

  getLists = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await List.find();
        if (!response)
            return res
                .status(404)
                .send({ message: "Lista não encontrada" });

        return res.status(200).send(response);
    } catch (error) {
        console.error({ error: error.message });
        return res
            .status(400)
            .send({ message: "não foi possível buscar as listas!" });
    }
  };

  deleteList = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const list = await List.findByIdAndDelete(id);
        await Task.deleteMany({ listId: id });

        if (!list)
            return res
                .status(404)
                .send({ message: "Não foi possível encontrar a lista" });

        return res
            .status(200)
            .send({ message: "Lista com tarefas foi excluída" });
    } catch (error) {
        console.error({ error: error.message });
        return res
            .status(400)
            .send({ message: "não foi possível deletar a lista" });
    }
  };

}