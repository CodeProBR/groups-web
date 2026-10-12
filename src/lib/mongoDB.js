import { MongoClient } from "mongodb";

// cache global por URI (importante para ambiente dev do Next.js)
const globalMongo = globalThis._mongoConnections ?? {};
globalThis._mongoConnections = globalMongo;

export default async function getMongoClient(dbUri) {
  if (!dbUri) {
    throw new Error("Nenhuma URI de banco foi fornecida para getMongoClient()");
  }

  // Se já existe um client conectado para essa URI → reutiliza
  if (globalMongo[dbUri]) {
    return globalMongo[dbUri];
  }

  const client = new MongoClient(dbUri);
  const connectedClient = await client.connect();

  // salva no cache global
  globalMongo[dbUri] = connectedClient;

  return connectedClient;
}

export { getMongoClient as mongodb };
