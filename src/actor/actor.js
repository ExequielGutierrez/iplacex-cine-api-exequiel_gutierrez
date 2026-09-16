import { BSONType, ObjectId } from "mongodb";

export const Actor = {
    _id: ObjectId,
    idPelicula: BSONType.STRING,
    nombre: BSONType.STRING,
    edad: BSONType.INT,
    estaRetirado: BSONType.BOOL,
    premios: BSONType.ARRAY,
}