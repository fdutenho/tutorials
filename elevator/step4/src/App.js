import React, { PureComponent } from 'react'
import Elevator from './Elevator/Elevator';
import Floors from './Floors/Floors';
import './App.css';
import Constants from './Constants';


class App extends PureComponent {

   render() {
      const elevators = (key) => {
         var f = [];
         for (let i = 1; i <= Constants.maxElevators; i++) {
            f.push(
               <div key={"elevator"+i} className="col-xs-12 col-sm-3">
                  <Elevator no={i} min={Constants.minFloor} max={Constants.maxFloor}></Elevator>
               </div>
            );
         }
         return f;
      }
      return (
         <div className="container-fluid">
            <div className="row">
               {elevators()}
               <div className="col-xs-12 col-sm-3">
                  <Floors min={Constants.minFloor} max={Constants.maxFloor}></Floors>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
