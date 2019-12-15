import React, { PureComponent } from 'react'
import Elevator from './Elevator/Elevator';
import Floors from './Floors/Floors';
import mainController from './mainController/mainController';
import './App.css';
import Constants from './Constants';


class App extends PureComponent {

   constructor(props) {
      super(props);
      this.mc = new mainController();
   }

   render() {
      var colsizeE = Math.floor((12-Constants.layout.colsize.floorpanel)/Constants.maxElevators);
      var colsizeF = (12-(colsizeE*Constants.maxElevators));
      console.debug("colsizeE: " + colsizeE);
      console.debug("colsizeF: " + colsizeF);

      const elevators = (key) => {
         var f = [];
         for (let i = 1; i <= Constants.maxElevators; i++) {
            f.push(
               <div key={"elevator"+i} className={"col-xs-12 col-sm-"+colsizeE}>
                  <Elevator no={i} min={Constants.minFloor} max={Constants.maxFloor}></Elevator>
               </div>
            );
         }
         return f;
      }
      return (
         <div className="container-fluid">
            <div className="row">
               <div className={"col-xs-12 col-sm-"+colsizeF}>
                  <Floors min={Constants.minFloor} max={Constants.maxFloor}></Floors>
               </div>
               {elevators()}
            </div>
         </div>
      );
   }
}

export default App;
