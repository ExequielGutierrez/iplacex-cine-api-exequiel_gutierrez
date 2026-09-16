import { MongoClient, ServerApiVersion } from "mongodb"

const uri = "mongodb+srv://exequielgutierrez_db_user:6uU3bRnPskUQ3WDJ@cluster-express.jna6wq7.mongodb.net/?appName=cluster-express"
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export default client
