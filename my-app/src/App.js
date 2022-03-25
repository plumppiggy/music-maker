import React, { Component } from "react";
import './App.css';
import './index.css';
import Login from "./spotify-auth/client/Login";
import Dashboard from './Dashboard.js';

class App extends Component {
  render() {
    return (
      <div className = "app">
           {code ? <Dashboard code={code} /> : <Login />}
      </div>
    );
  }
}

// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')


export default App;
