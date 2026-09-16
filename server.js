import express, { urlencoded } from "express"
import cors from "cors"

import client from "./src/common/db.js"
import peliculaRoutes from "./src/pelicula/routes.js"
import ActorRoutes from "./src/actor/routes.js"

const PORTS = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => { return res.status(200).send("Bienvenido al cine Iplacex") })

app.use("/api", peliculaRoutes);
app.use("/api", ActorRoutes);

await client.connect()
.then(() => { 
    console.log("Conexión a la base de datos establecida correctamente")
    app.listen(PORTS, () => { console.log(`Servidor corriendo en http://localhost:${PORTS}`) })
 })
.catch(() => {
    console.log("Error al conectar a la base de datos")
})
