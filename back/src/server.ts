import express, {Express} from "express";
import http from "http";
import router from "./routes/routes";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/",router);

const httpServer = http.createServer(app);
const PORT : any = 3333;

httpServer.listen(PORT, () => 
    console.log(`O servidor esta rodando na porta ${PORT}`)
);