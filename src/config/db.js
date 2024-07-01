require("dotenv").config();
const pg = require("pg");
const { Client } = pg;

const client = new Client();

client.connect();

client.query("SELECT * FROM todos", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows);
  }
  client.end();
});

// Add new todo item

function addItem(content) {
  const query = "INSERT INTO todos (content) VALUES($1)";
  const values = [content];

  client
    .query(query, values)
    .then(() => {
      console.log("Todo inserted succesfully");
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

module.exports = { addItem, listItems };
