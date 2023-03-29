import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import "typeface-montserrat"
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
      <Router >
          <Switch>
              <Route exact path="/">
                  {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
              </Route>
              <Route path="/dashboard" >
                  <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
