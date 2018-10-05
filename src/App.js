import React, { Component } from 'react';
import './App.css';
import FormComponent from './Components/FormComponent';
class App extends Component {
  render() {
    return (
      <div className="outer">
         <FormComponent></FormComponent>
      </div>
    );
  }
}

export default App;
