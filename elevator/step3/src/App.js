import React from 'react';
import Elevator from './Elevator/Elevator';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
         <div className="col-xs-12 col-sm-4">
            <Elevator no="1"></Elevator>
         </div>
         <div className="col-xs-12 col-sm-4">
            <Elevator no="2"></Elevator>
         </div>
         <div className="col-xs-12 col-sm-4">
            <Elevator no="3"></Elevator>
         </div>
      </div>
    </div>
  );
}

export default App;
