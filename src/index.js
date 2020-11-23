import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import { Route, Switch } from "react-router-dom"

import './index.css';
import App from './App';
import Results from "./Components/Results/Results";
import UserData from "./Components/UserData/UserData"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={App} exact/>
        <Route path='/result' component={Results} exact/>
        <Route path='/userData' component={UserData} exact/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
