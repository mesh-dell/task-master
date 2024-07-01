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
