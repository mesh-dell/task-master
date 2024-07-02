require("dotenv").config();
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
  const query = "SELECT * FROM todos WHERE status = $1";
  switch (selector) {
    case status[0]: {
      const result = await executeQuery(query, [status[0]]);
      result.forEach((item) => {
        console.log(item);
      });
      break;
    }
    case status[1]: {
      const result = await executeQuery(query, [status[1]]);
      result.forEach((item) => {
        console.log(item);
      });
      break;
    }
    case status[2]: {
      const result = await executeQuery(query, [status[2]]);
      result.forEach((item) => {
        console.log(item);
      });
      break;
    }
    default: {
      console.error("Error: Used an invalid selector");
      client.end();
    }
  }
}

function doneItem(id) {
  const query = "UPDATE todos SET status = done WHERE id = $1";
  client
    .query(query, [id])
    .then(() => {
      console.log(`Set item ${id} as done`);
      client.end();
    })
    .catch((err) => {
      console.error(err);
      client.end();
    });
}

function deleteItem(id) {
  const query = "DELETE FROM todos WHERE id = $1";

  client
    .query(query, [id])
    .then(() => {
      console.log(`Deleted item ${id}`);
      client.end();
    })
    .catch((err) => {
      console.error(err);
      client.end();
    });
}

module.exports = { addItem, listItems, doneItem, deleteItem };
