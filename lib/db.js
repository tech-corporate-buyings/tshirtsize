import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global.mongoClientPromise) {
    client = new MongoClient(uri);
    global.mongoClientPromise = client.connect();
  }

  clientPromise = global.mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function getCollection() {
  const client = await clientPromise;

  return client.db("tshirtsize").collection("tshirtsize_entries");
}

export async function readEntries() {
  const collection = await getCollection();

  return await collection.find({}).sort({ _id: -1 }).toArray();
}

export async function appendEntry({ name, size }) {
  const collection = await getCollection();

  const cleanName = name.trim();

  const existing = await collection.findOne({
    name: cleanName,
  });

  if (existing) {
    return {
      ok: false,
      error: "Entry already exists",
    };
  }

  const entry = {
    name: cleanName,
    size,
    submittedAt: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  await collection.insertOne(entry);

  return {
    ok: true,
  };
}

export async function deleteAllEntries() {
  const collection = await getCollection();

  await collection.deleteMany({});
}