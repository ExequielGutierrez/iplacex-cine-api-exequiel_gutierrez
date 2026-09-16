import { ObjectId } from "mongodb"
import client from "../common/db.js"
import { Actor } from "./actor.js"

const actorCollection = client.db("cine-db").collection("actores")
const peliculaCollection = client.db("cine-db").collection("peliculas")

async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = Actor;

    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;

    try {
        let oid = ObjectId.createFromHexString(data.idPelicula);

        await peliculaCollection.findOne({ _id: oid })
        .then(async (pelicula) => {
            if (pelicula == null) {
                return res.status(404).send("No se encontró la pelicula con el id proporcionado (Null)");
            }

            actor.idPelicula = pelicula._id.toString();

            await actorCollection.insertOne(actor)
            .then((result) => {
                if (result == null) {
                    return res.status(400).send("Error al insertar el actor");
                }

                return res.status(201).send(result);
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    } catch (error) {
        await peliculaCollection.findOne({ nombre: data.idPelicula })
        .then(async (pelicula) => {
            if (pelicula == null) {
                return res.status(400).send("Id mal formado.");
            }

            actor.idPelicula = pelicula._id.toString();

            await actorCollection.insertOne(actor)
            .then((result) => {
                if (result == null) {
                    return res.status(400).send("Error al insertar el actor");
                }

                return res.status(201).send(result);
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message });
        });
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => {
        return res.status(200).send(data);
    })
    .catch((error) => {
        res.status(500).send({ error: error.message });
    });
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);

        await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if (data == null) {
                return res.status(404).send("No se encontró el actor con el id proporcionado (Null)");
            }

            return res.status(200).send(data);
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
    } catch (error) {
        return res.status(400).send("Id mal formado.");
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    let id = req.params.pelicula || req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);

        await peliculaCollection.findOne({ _id: oid })
        .then(async (pelicula) => {
            if (pelicula == null) {
                return res.status(404).send("No se encontró la pelicula con el id proporcionado (Null)");
            }

            await actorCollection.find({ idPelicula: pelicula._id.toString() }).toArray()
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
    } catch (error) {
        return res.status(400).send("Id mal formado.");
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest,
    handleGetActoresByPeliculaRequest: handleGetActoresByPeliculaIdRequest
}
