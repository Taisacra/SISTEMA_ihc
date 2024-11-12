const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
port = 3600;
const app = express();

const router = express.Router();

const connection = require("../server/database/database");
const UsuarioRouts = require("./routes/usuarioRoutes");
const ChamadoRouts = require("./routes/chamadoRoutes");
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
 

const start = async () =>{
    try {
        await connection.authenticate();
        console.log("Conexão estabelecida com sucesso.");
        await connection.sync({force: false});
        console.log("Tabelas sicronizadas.");
    } catch (error) {
        console.error("Não foi possivel conectar ao banco de dados: ", error)
    }
};

start();

app.use("/usuario", UsuarioRouts);
app.use("/chamado", ChamadoRouts);

app.use("/", router);

app.listen(port, ()=>{
    console.log(`A aplicação está rodando ${port}`);
})