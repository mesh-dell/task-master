require("dotenv").config();
const pg = require("pg");
const { Client } = pg;

const client = new Client();

client.connect();

// Add new todo item

function addItem(content) {
  const query = "INSERT INTO todos (content) VALUES($1)";
  const values = [content];

  client
    .query(query, values)
    .then(() => {
      console.log("Todo inserted succesfully");
      client.end();
    })
    .catch((err) => {
      console.error(err);
    });
}

function listItems(id, selector) {
  const query = "SELECT * FROM todos WHERE id = $1 AND status = $2";
  switch (selector) {
    case "all": {
      client
        .query(query, [id, "all"])
        .then((res) => {
          const rows = res.rows();
          rows.forEach((row) => {
            console.log(row);
          });
          client.end();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }
    case "pending": {
      client
        .query(query, [id, "pending"])
        .then((res) => {
          const rows = res.rows();
          rows.forEach((row) => {
            console.log(row);
          });
          client.end();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }
    case "done": {
      client
        .query(query, [id, "done"])
        .then((res) => {
          const rows = res.rows();
          rows.forEach((row) => {
            console.log(row);
          });
          client.end();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }
    default: {
      console.error("Error: Used an invalid selector");
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
    });
}

module.exports = { addItem, listItems, doneItem, deleteItem };
