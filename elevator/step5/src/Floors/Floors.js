import React, { PureComponent } from 'react';
import postal from 'postal';
//import Constants from '../Constants';

var minFloor = 0;
var maxFloor = 0;
var floorAdjust = 0;
var subscription;

class Floors extends PureComponent {

   constructor(props) {
      super(props);
      minFloor = this.props.min;
      maxFloor = this.props.max;
      floorAdjust = -minFloor;
      this.state = {
         floorButtons: []
      };

      for(let i=minFloor; i<=maxFloor; i++) {
         this.state.floorButtons.push({floor: i, state: false});
      }

      console.debug("state: " + JSON.stringify(this.state));
      subscription = postal.subscribe({
         channel: "progress",
         topic: "floor",
         callback: function(floor, envelope) {
            console.info("floor: received message that an elevator reached floor " + floor);

            if(this.state.floorButtons[(floor+floorAdjust)].state === true) {
               console.info("floors: remove signal for floor " + floor);
               var tempFloorButtons = this.state.floorButtons;
               console.debug("tempState: " + JSON.stringify(tempFloorButtons));
               tempFloorButtons[(floor+floorAdjust)].state = false;
               this.setState({floorButtons: tempFloorButtons});

               console.debug("state: " + JSON.stringify(this.state));
               this.refs["btnFloor"+floor].classList.toggle('btn-outline-secondary');
               this.refs["btnFloor"+floor].classList.toggle('btn-secondary');
            } else {
               console.debug("floors: floor "+ floor + " has no signal");
            }
           }.bind(this)
        });
   }

   callElevator = (floor) => (e) => {
      console.log("floors: elevator called on floor " + floor);
      if(this.state.floorButtons[(floor+floorAdjust)].state === false) {
         console.debug("floors: add signal for floor " + floor);

         var tempFloorButtons = this.state.floorButtons;
         console.debug("tempState: " + JSON.stringify(tempFloorButtons));
         tempFloorButtons[(floor+floorAdjust)].state = true;
         this.setState({floorButtons: tempFloorButtons});

         console.debug("state: " + JSON.stringify(this.state));
         this.refs["btnFloor"+floor].classList.toggle('btn-outline-secondary');
         this.refs["btnFloor"+floor].classList.toggle('btn-secondary');

         console.info("floors: publish signal for floor " + floor);
         postal.publish({
            channel: "commands",
            topic: "calls",
            data: floor
         });
      } else {
         console.log("floors: floor "+ floor + " has already a signal");
      }
   }

   render () {
      const floors = (key) => {
         var f = [];
         for (let i = maxFloor; i >= minFloor; i--) {
            f.push(<tr key={i}><td>floor {i}</td><td><button ref={"btnFloor"+i} type="button" className="btn btn-outline-secondary" onClick={this.callElevator(i)}>call</button></td></tr>);
         }
         return f;
      }
      return (
         <div>
            <h1>Floors</h1>
            <div className="card">
               <div className="card-header text-white bg-primary">
                  <h3 className="card-title">Floor Animation</h3>
               </div>
               <table className="table">
                  <tbody>
                    {floors()}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }

   componentWillUnmount() {
      subscription.unsubscribe();
   }
}


export default Floors
