const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the db
const db = new sqlite.Database('db.sqlite', (err) => {
  if (err) throw err;
});

// get all tasks
exports.listTasks = (userId) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM tasks WHERE user = ?';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    const tasks = rows.map((t) => (
      {
        id: t.id,
        description: t.description,
        important: t.important,
        private: t.private,
        deadline: t.deadline,
        completed: t.completed,
      }));

    resolve(tasks);
  });
});

// get all tasks marked as important
exports.listImportant = (userId) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM tasks WHERE user = ? AND important = 1';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    const tasks = rows.map((t) => (
      {
        id: t.id,
        description: t.description,
        important: t.important,
        private: t.private,
        deadline: t.deadline,
        completed: t.completed,
      }));

    resolve(tasks);
  });
});

// get all tasks marked as private
exports.listPrivate = (userId) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM tasks WHERE user = ? AND private = 1';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    const tasks = rows.map((t) => (
      {
        id: t.id,
        description: t.description,
        important: t.important,
        private: t.private,
        deadline: t.deadline,
        completed: t.completed,
      }));

    resolve(tasks);
  });
});

// get all tasks marked as today
exports.listToday = (userId) => new Promise((resolve, reject) => {
  let today = new Date();
  today = today.toISOString().slice(0, 10);

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);

  const sql = 'SELECT * FROM tasks WHERE user = ? AND deadline > ? AND deadline < ?';

  db.all(sql, [userId, today, tomorrow], (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    const tasks = rows.map((t) => (
      {
        id: t.id,
        description: t.description,
        important: t.important,
        private: t.private,
        deadline: t.deadline,
        completed: t.completed,
      }));

    resolve(tasks);
  });
});

// TODO: get all tasks with a deadline between TODAY and NEXT 7 DAYS

exports.listNextSevenDays = (userId) => new Promise((resolve, reject) => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);

  let seven = new Date();
  seven.setDate(seven.getDate() + 8);
  seven = seven.toISOString().slice(0, 10);

  const sql = 'SELECT * FROM tasks WHERE user = ? AND deadline > ? AND deadline < ?';

  db.all(sql, [userId, tomorrow, seven], (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    const tasks = rows.map((t) => (
      {
        id: t.id,
        description: t.description,
        important: t.important,
        private: t.private,
        deadline: t.deadline,
        completed: t.completed,
      }));

    resolve(tasks);
  });
});

// add a new task
exports.addTask = (userId, task) => new Promise((resolve, reject) => {
  const sql = 'INSERT INTO tasks (id, description, important, private, deadline, completed, user) VALUES(?,?,?,?,?,?,?)';
  db.run(sql, [
    this.lastID,
    task.description,
    task.important,
    task.private,
    task.deadline,
    0,
    userId],
  (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(this.lastID);
  });
});

// update a task
exports.updateTask = (userId, taskId, task) => new Promise((resolve, reject) => {
  const sql = 'UPDATE tasks SET description=?, important=?, private=?, deadline=?, completed=? WHERE user = ? AND id = ?';
  db.run(sql, [
    task.description,
    task.important,
    task.private,
    task.deadline,
    task.completed,
    userId,
    taskId],
  (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(this.lastID);
  });
});

// mark a task as completed/uncompleted
exports.setState = (userId, taskId) => new Promise((resolve, reject) => {
  const sql = 'UPDATE tasks SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END WHERE user = ? AND id = ?';
  db.run(sql, [userId, taskId], (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(null);
  });
});

// delete a task
exports.deleteTask = (userId, taskId) => new Promise((resolve, reject) => {
  const sql = 'DELETE FROM tasks WHERE user = ? AND id = ?';
  db.run(sql, [userId, taskId], (err) => {
    if (err) {
      reject(err);
    } else resolve(null);
  });
});

// get user
exports.getUser = (email, password) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, row) => {
    if (err) {
      reject(err);
    } else if (row) {
      const user = { id: row.id, username: row.email, name: row.name };
      bcrypt.compare(password, row.password).then((result) => {
        if (result) {
          resolve(user);
        } else {
          resolve(false);
        }
      });
    } else {
      resolve(false);
    }
  });
});

// get user by id
exports.getUserById = (id) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      reject(err);
    } else if (row) {
      const user = { id: row.id, username: row.email, name: row.name };
      resolve(user);
    } else {
      resolve({ err: 'User not found.' });
    }
  });
});
