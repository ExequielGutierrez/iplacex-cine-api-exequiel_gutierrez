import { BSONType, ObjectId } from "mongodb";

export const Pelicula = {
    _id: ObjectId,
    nombre: BSONType.STRING,
    generos: BSONType.ARRAY,
    anioEstreno: BSONType.INT,

}