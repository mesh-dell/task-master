const { program } = require("commander");

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
    console.log(options);
  });

program.parse();
