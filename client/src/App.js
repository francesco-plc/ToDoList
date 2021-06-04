import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AccountInfo, LoginForm } from './components/Account';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';
import API from './api/API';
import AccessAlert from './components/AccessAlert';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showSidebar, setShowSidebar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const routerHistory = useHistory();

  // Rehydrate tasks at mount time
  /* useEffect(() => {
    API.loadAllTasks().then((newT) => { setTasks(newT); });
  }, []);  */

  useEffect(() => {
    API.getUserInfo().then((user) => {
      setUserInfo(user.name);
      setLoggedIn(true);
      setLoading(true);
      setDirty(true);
    }).catch((err) => console.log(err));
  }, []);

  // Rehydrate tasks at mount time, and when tasks are updated
  useEffect(() => {
    if (dirty) {
      API.loadAllTasks(filter)
        .then((fecthedTasks) => {
          console.log('Load Tasks');
          setTasks(fecthedTasks);
          setLoading(false);
          setDirty(false);
        }).catch((err) => {
          setLoading(false);
          setDirty(false);
          console.log(err);
        });
    }
  }, [dirty]);

  const addTask = (task) => {
    setTasks((oldTasks) => [...oldTasks, task]);

    API.addNewTask(task)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    setTasks((currTasks) => currTasks.filter((task) => (task.id !== id)));

    API.deleteTask(id)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const updateTask = (task/* , id */) => {
    setTasks((oldTasks) => oldTasks.map((t) => {
      if (t.id === task.id) return task;
      return t;
    }));

    API.updateTask(task/* , id */)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const changeFilter = (newFilter) => {
    setTasks((currTasks) => currTasks.filter((t) => t.hasProperty(newFilter)));
    setFilter(newFilter);
    setDirty(true);
  };

  const doLogIn = (username, password) => {
    API.logIn(username, password).then((name) => {
      setUserInfo(name);
      setLoggedIn(true);
      setShowAlert(true);
      setLoading(true);
      setDirty(true);
      routerHistory.push('/');
    }).catch((err) => {
      setShowAlert(true);
      console.log(err);
    });
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      setShowAlert(false);
      setLoggedIn(false);
      setUserInfo('');
    }).catch((err) => console.log(err));
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <NavBar
        loggedIn={loggedIn}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        changeFilter={changeFilter}
      />
      <div className="below-nav">
        {(showAlert && (
        <AccessAlert
          loggedIn={loggedIn}
          userInfo={userInfo}
          closeAlert={closeAlert}
        />
        ))}

        {loggedIn
          ? (
            <Switch>
              <Route exact path="/">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/All">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/Important">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/Today">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/Next7Days">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/Private">
                {loading ? <span> 🕗 Please wait, loading your tasks... 🕗 </span>
                  : (
                    <MainContent
                      tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      showSidebar={showSidebar}
                      setShowSidebar={setShowSidebar}
                      filter={filter}
                      changeFilter={changeFilter}
                    />
                  )}
              </Route>
              <Route exact path="/Account">
                <AccountInfo
                  userInfo={userInfo}
                  doLogOut={doLogOut}
                />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          )
          : (<LoginForm doLogIn={doLogIn} />) }
      </div>
    </>
  );
}

export default App;
