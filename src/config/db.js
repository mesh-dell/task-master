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

async function addItem(content) {
  const query = "INSERT INTO todos (content) VALUES($1)";
  const values = [content];

  client
    .query(query, values)
    .then((res) => {
      console.log("Todo inserted succesfully");
    })
    .catch((err) => {
      console.error(err);
    });
}


module.exports = { addItem };
