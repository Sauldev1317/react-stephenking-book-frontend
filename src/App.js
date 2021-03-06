import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './page/Home/index'
import AddBook from './page/Add/index'
import Book from './page/Book/index'


function App() {
  return (
    <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                     <Link to={"/home"}>
                        Home
                      </Link>
                </li>
                <li>
                     <Link to={"/add"}>
                        New Book
                      </Link>
                </li>
              </ul>
            </nav>

            <div className="content">
              <Switch>
                <Route exact path={["/", "/Home"]} component={Home} />
                <Route exact path="/add" component={AddBook} />
                <Route exact path="/book/:id" component={Book} />
              </Switch>
            </div>
          </div>
      </Router>
    </div>
  );
}

export default App;
