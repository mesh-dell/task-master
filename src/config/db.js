const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Pool } = require("pg");

const pool = new Pool();

async function executeQuery(query, params = []) {
  const client = await pool.connect();

  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// Add new todo item

async function addItem(content) {
  const query = "INSERT INTO todos (content) VALUES($1) RETURNING id";
  const result = await executeQuery(query, [content]);
  console.log(`Todo inserted successfully with id ${result[0].id}`);
}

async function listItems(selector) {
  const status = ["all", "pending", "done"];
  let query = "SELECT * FROM todos";
  const params = [];

  if (!status.includes(selector.toLowerCase())) {
    console.error("Error: Used an invalid selector");
  }

  if (selector.toLowerCase() !== "all") {
    query += " WHERE status = $1";
    params.push(selector.toLowerCase());
  }

  const result = await executeQuery(query, params);
  return result;
}

async function doneItem(id) {
  const query = "UPDATE todos SET status = $1 WHERE id = $2";
  await executeQuery(query, ["done", id]);
  console.log(`Set item ${id} as done`);
}

async function deleteItem(id) {
  const query = "DELETE FROM todos WHERE id = $1";

  await executeQuery(query, [id]);
  console.log(`Deleted item ${id}`);
}

module.exports = { addItem, listItems, doneItem, deleteItem };
