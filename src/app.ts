import * as express from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import databaseConnect from "./database/db";
import { router } from "./routes";
import * as cors from 'cors';

const {error}=dotenv.config();

if(error){
    const [ ,message] = error.message.split(": ");
    console.error(`!!A configuração do .env retornou erro`)
    console.error(`!!    erro: ${message}`)
  }else{
    console.log("||O .env foi configurado devidamente");
  }

const app = express();
const port = process.env.APP_PORT || 5100;

databaseConnect();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", router);


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})