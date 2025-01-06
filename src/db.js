import { openDB } from "idb";

const DB_NAME = "TodoDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

export const addTodo = async (todo) => {
  const db = await initDB();
  await db.add(STORE_NAME, todo);
};

export const getTodos = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateTodo = async (id, updates) => {
  const db = await initDB();
  const todo = await db.get(STORE_NAME, id);
  const updatedTodo = { ...todo, ...updates };
  await db.put(STORE_NAME, updatedTodo);
};

export const deleteTodo = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
