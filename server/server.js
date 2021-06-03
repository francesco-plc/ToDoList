const express = require('express');
const morgan = require('morgan'); // logging middleware
const session = require('express-session'); // session middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport');
const passportLocal = require('passport-local');

const dao = require('./dao');

passport.use(new passportLocal.Strategy((username, password, done) => {
  dao.getUser(username, password).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false, { message: 'Wrong username or password' });
    }
  }).catch((err) => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dao.getUserById(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(null, err);
  });
});

const app = express();
const port = 3001;

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'not authenticated' });
};

app.use(morgan('dev'));
app.use(express.json());
app.use(session({
  secret: 'qzwsxedcrfvtgbyhnujmikol',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Retrieve the list of ALL the tasks
app.get('/api/tasks', isLoggedIn, (req, res) => {
  dao.listTasks()
    .then((tasks) => { res.json(tasks); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve the list of all the IMPORTANT tasks
app.get('/api/tasks/important', isLoggedIn, (req, res) => {
  dao.listImportant()
    .then((tasks) => { res.json(tasks); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve the list of all the PRIVATE tasks
app.get('/api/tasks/private', isLoggedIn, (req, res) => {
  dao.listPrivate()
    .then((tasks) => { res.json(tasks); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve the list of all the TODAY tasks
app.get('/api/tasks/today', isLoggedIn, (req, res) => {
  dao.listToday()
    .then((tasks) => { res.json(tasks); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve the list of all the LAST 7 DAYS tasks
app.get('/api/tasks/seven', isLoggedIn, (req, res) => {
  dao.listNextSevenDays()
    .then((tasks) => { res.json(tasks); })
    .catch((error) => { res.status(500).json(error); });
});

// Create a new task
app.post('/api/tasks', isLoggedIn, async (req, res) => {
  const newDeadline = req.body.deadline === '' ? null : req.body.deadline;

  const task = {
    description: req.body.description,
    important: req.body.important,
    private: req.body.private,
    deadline: newDeadline,
  };

  try {
    await dao.addTask(task);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of task: ${task.description}.` });
  }
});

// update a task
app.put('/api/tasks/update/:id', isLoggedIn, async (req, res) => {
  const newDeadline = req.body.deadline === '' ? null : req.body.deadline;

  const task = {
    description: req.body.description,
    important: req.body.important,
    private: req.body.private,
    deadline: newDeadline,
    completed: req.body.completed,
  };

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.updateTask(task, req.params.id);
    res.status(200).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the update of task: ${task.description}.` });
  }
});

// mark a task as completed/uncompleted
app.put('/api/tasks/:id', isLoggedIn, async (req, res) => {
  try {
    await dao.setState(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the updating of the status of task: ${req.params.id}.` });
  }
});

// delete a task
app.delete('/api/tasks/:id', isLoggedIn, async (req, res) => {
  try {
    await dao.deleteTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the deletion of task: ${req.params.id}.` });
  }
});

/**
 * Users APIs
 */

/* POST /api/sessions */
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

/* DELETE /api/sessions/current */
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

/* GET /api/sessions/current */
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});

app.listen(port, () => { console.log(`Server running on http://localhost:${port}/`); });
