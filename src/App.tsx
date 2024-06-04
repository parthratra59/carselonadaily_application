import React from 'react';
import Left from './utils/Left/Left';
import Right from './utils/Right/Right';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="left">
        <Left />
      </div>
      <div className="right">
        <Right />
      </div>
    </div>
  );
};

export default App;
