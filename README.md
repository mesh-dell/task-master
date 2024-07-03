# task-master

Task Master - A CLI-based Todo List Application

### Description

Task Master is a simple command-line interface (CLI) application that allows users to manage their todo list efficiently. Users can add new tasks, mark tasks as done, delete tasks, and list tasks based on their status (all, pending, done).

### Features

- **Add New Todo:** Add a new task to the todo list.
- **List Todo:** View the list of tasks, filtered by all, pending, or done.
- **Mark as Done:** Mark a task as done, updating its status and timestamp.
- **Delete Todo:** Remove a task from the todo list.

### Installation

1. **Clone the repository:**

   ```
   git clone <repository_url>
   cd task-master
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Setup environment:**
   - Create a `.env` file in the root directory and add necessary environment variables.

### Usage

- **Add a new task:**

  ```
  node index.js --new "Task description"
  ```

- **List tasks:**

  ```
  node index.js --list all
  node index.js --list pending
  node index.js --list done
  ```

- **Mark task as done:**

  ```
  node index.js --done <task_id>
  ```

- **Delete a task:**
  ```
  node index.js --delete <task_id>
  ```

### Configuration

- Ensure database configuration (e.g., PostgreSQL) is correctly set up in `config/db.js`.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
