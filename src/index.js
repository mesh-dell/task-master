const { program } = require("commander");
const { addItem, listItems, doneItem, deleteItem } = require("./config/db");

program
  .name("task-master")
  .description("A simple todo list application for the CLI.")
  .version("1.0.0");

program
  .option("--new <string>", "add a new todo item")
  .option("--list [all|pending|done]", "list the todo items")
  .option("--done <id>", "to update a todo item")
  .option("--delete <id>", "delete a todo item")
  .action((options) => {
    if (options.new) {
      addItem(options.new);
    }

    if (options.list) {
      listItems(options.list).then((res) => {
        res.forEach((item) => {
          console.log(item);
        });
      });
    }

    if (options.done) {
      doneItem(options.done);
    }

    if (options.delete) {
      deleteItem(options.delete);
    }
  });

program.parse();
