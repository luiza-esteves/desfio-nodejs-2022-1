import { Router, Request, Response } from "express";
import ListController from "../controllers/ListController";

const listRoutes = Router();

const listController = new ListController();

listRoutes.get("/all", (req: Request, res: Response)=>{
    listController.getLists(req, res);
});

listRoutes.get("/:id", (req: Request, res: Response)=>{
    listController.getOneList(req, res);
});

listRoutes.post("/create", (req, res) => {
    listController.createList(req, res);
});

listRoutes.delete("/", (req, res) => {
    listController.deleteList(req, res);
});

listRoutes.patch("/", (req, res) => {
    listController.updateList(req, res);
});



export default listRoutes;