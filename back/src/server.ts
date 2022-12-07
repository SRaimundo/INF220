import express, {Express} from "express";
import http from "http";
import router from "./routes/routes";

const app: Express = express();

app.use(express.json());

app.use("/",router);

const httpServer = http.createServer(app);
const PORT : any = 3000;

httpServer.listen(PORT, () => 
    console.log(`O servidor esta rodando na porta ${PORT}`)
);