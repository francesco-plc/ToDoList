import Task from '../models/Task';

const url = 'http://localhost:3000';

async function loadAllTasks() {
  const response = await fetch(`${url}/api/tasks`);
  const tasksJSON = await response.json();
  if (response.ok) {
    const tasks = tasksJSON.map((json) => Task.from(json));
    return tasks;
  } return { err: 'GET error' };
}

async function addNewTask(task) {
  const response = await fetch(`${url}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      /* id: task.id,  */
      description: task.description,
      important: task.important,
      private: task.private,
      deadline: task.deadline,
    }),
  });
  if (response.ok) {
    return null;
  } return { err: 'POST error' };
}

async function deleteTask(id) {
  const response = await fetch(`${url}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return null;
  } return { err: 'POST error' };
}

function updateTask(task) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/tasks/update/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* id: task.id,  */
        description: task.description,
        important: task.important,
        private: task.private,
        deadline: task.deadline,
        completed: task.completed,
      }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => {
            const err = { error: 'Cannot parse server response.' };
            reject(err);
          }); // something else
      }
    }).catch(() => {
      const err = { error: 'Cannot communicate with the server.' };
      reject(err);
    }); // connection errors
  });
}

async function loadImportantTasks() {
  const response = await fetch(`${url}/api/tasks/important`);
  const tasksJSON = await response.json();
  if (response.ok) {
    const tasks = tasksJSON.map((json) => Task.from(json));
    return tasks;
  } return { err: 'GET error' };
}

async function loadTodayTasks() {
  const response = await fetch(`${url}/api/tasks/today`);
  const tasksJSON = await response.json();
  if (response.ok) {
    const tasks = tasksJSON.map((json) => Task.from(json));
    return tasks;
  } return { err: 'GET error' };
}
async function loadNext7DaysTasks() {
  const response = await fetch(`${url}/api/tasks/seven`);
  const tasksJSON = await response.json();
  if (response.ok) {
    const tasks = tasksJSON.map((json) => Task.from(json));
    return tasks;
  } return { err: 'GET error' };
}

async function loadPrivateTasks() {
  const response = await fetch(`${url}/api/tasks/private`);
  const tasksJSON = await response.json();
  if (response.ok) {
    const tasks = tasksJSON.map((json) => Task.from(json));
    return tasks;
  } return { err: 'GET error' };
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/sessions/current`)
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            resolve(userInfo);
          }).catch((err) => reject(err));
        } else {
          reject();
        }
      }).catch((err) => reject(err));
  });
}

function logIn(username, password) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          resolve(user.name);
        }).catch((err) => reject(err));
      } else {
        reject();
      }
    }).catch((err) => reject(err));
  });
}

function logOut() {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/sessions/current`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        reject();
      }
    }).catch((err) => reject(err));
  });
}

const API = {
  loadAllTasks,
  addNewTask,
  deleteTask,
  updateTask,
  loadImportantTasks,
  loadTodayTasks,
  loadNext7DaysTasks,
  loadPrivateTasks,
  getUserInfo,
  logIn,
  logOut,
};

export default API;
