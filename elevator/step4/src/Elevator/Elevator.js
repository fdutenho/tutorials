import React, { PureComponent } from 'react'
import './style.css'
import { Animate } from 'react-move';
import { easeQuadInOut } from 'd3-ease';
import Constants from '../Constants';


function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const elevatorHight = 50;
var minFloor = 0;
var maxFloor = 0;
var floorCount = 0;
var floorAdjust = 0;
var subscription = null;

class Elevator extends PureComponent {

   constructor(props) {
      super(props);
      minFloor = this.props.min;
      maxFloor = this.props.max;
      floorCount = maxFloor + 1 - minFloor;
      floorAdjust = -minFloor;

      this.state = {
         floor: minFloor,
         motion: "wait",
         door: "closed",
         commandStack: []
      };
      this.openDoor = this.openDoor.bind(this);
      this.closeDoor = this.closeDoor.bind(this);
      this.move = this.move.bind(this);
   }

   gotoFloor(e=null, f) {
      return new Promise((resolve, reject) => {
         console.info("elevator"+this.props.no +": gotoFloor " + f);
         var floorDiff = f - this.state.floor;
         console.debug("elevator"+this.props.no +": " +floorDiff + " up/down");
         this.move(e, floorDiff).then(
            function(res) {
               resolve("elevator"+this.props.no +": reached floor " +f);
            }.bind(this)
         );
      });
   }

   closeDoor(e=null) {
      return new Promise((resolve, reject) => {
         if(e!=null) e.preventDefault();
         this.setState({
            door: "closed"
         });
         resolve("door closed");
      });
   }

   openDoor(e=null) {
      return new Promise((resolve, reject) => {
         if(e!=null) e.preventDefault();
         this.setState({
            door: "open"
         });
         resolve("door open");
      });
   }

   move(e=null, floors=1) {
      if(e!=null) e.preventDefault();
      return new Promise((resolve, reject) => {
         var motionText= "up";
         if (floors<0) {
             motionText = "down";
         }

         if((this.state.floor + floors) > maxFloor) {
            console.warn("can't move that much upwards");
            floors = maxFloor - this.state.floor;
            console.debug("adjusted floors: " + floors);
         }
         if((this.state.floor + floors) < minFloor) {
            console.warn("can't move that much downwards");
            floors = minFloor - this.state.floor;
            console.debug("adjusted floors: " + floors);
         }

         new Promise(
            function(resolve, reject) {
               if(this.state.door !== "closed") {
                  this.setState({
                     door: "closed"
                  });
               }
               resolve("door closed");
            }.bind(this)
         )
         .then(
            function(val) {
               return new Promise((resolve, reject) => {
                  this.setState({
                     floor: this.state.floor + floors,
                     motion: motionText
                  });
                  resolve("moved to floor" + this.state.floor);
               });
            }.bind(this)
         )
         .then(
            function(val) {
               sleep(Constants.speed).then(() => {
                  console.info("elevator"+this.props.no + " reached floor " + this.state.floor);
                  this.setState({
                     motion: "wait",
                     door: "open"
                  },function(){
                     console.debug("elevator"+this.props.no +": commandStack=" + this.state.commandStack.join(", "));
                     if(this.state.commandStack.length>0) {
                        console.info("elevator"+this.props.no +": has commands in commandStack, process it " + this.state.commandStack.join(", "));
                        var floor = this.state.commandStack.pop();
                        this.gotoFloor(null, floor).then(function(res) {
                           console.info("elevator"+this.props.no +" reached it's target floor");
                        }.bind(this));
                     } else {
                        console.info("elevator"+this.props.no +": has an empty commandStack, nothing to do " + this.state.commandStack.join(", "));
                     }
                  });
               });
            }.bind(this)
         );
      });
   }

   moveUp(e=null,floors=1) {
      if(e!=null) e.preventDefault();
      this.move(e, floors).then(
         function() {
            console.debug("moved 1 up");
         }
      );
   }

   moveDown(e=null,floors=-1) {
      if(e!=null) e.preventDefault();
      this.move(e, floors).then(
         function() {
            console.debug("move 1 down");
         }
      );
   }

   addToCommandStack(floor) {
      if(typeof(this.state.commandStack.find(v => v===floor)) === "undefined") {
         console.info("elevator"+this.props.no +": add floor " + floor + " to command stack");
         this.setState({
            commandStack: [floor, ...this.state.commandStack]
         }, function() {
            console.debug("elevator"+this.props.no +": command stack " + this.state.commandStack.join(", "));
            if(this.state.commandStack.length===1) {
               console.info("elevator"+this.props.no +": start processing the commandStack " + this.state.commandStack.join(", "));
               this.gotoFloor(null, floor);
            }
         }.bind(this));
      } else {
         console.warn("elevator"+this.props.no +": floor "+ floor + " already in comannd stack");
      }
   }

   clickPanel = (floor) => (e) => {
      if(e!=null) e.preventDefault();
      if(this.state.floor!==floor) {
         this.addToCommandStack(floor);
      }
   }

   componentWillUnmount() {
      subscription.unsubscribe();
   }

   render() {
      const panelButtons = (key) => {
         var f = [];
         for (let i = maxFloor; i>=minFloor; i--) {
            f.push(<button key={"panelButton"+i} ref={"btnFloor"+i} type="button" className="btn btn-outline-secondary col-6" onClick={this.clickPanel(i)}>{i}</button>);
         }
         return f;
      }
      return(
         <div>
            <h1>Elevator {this.props.no}</h1>
            <div className="card" ref={"panel"+this.props.no}>
               <div className="card-header">
                  <h3 className="card-title">Control Panel</h3>
               </div>
               <div className="card-body">
                  {panelButtons()}
               </div>
            </div>
            <hr/>
            <div className="card" ref={"elevatorAnimation"+this.props.no}>
               <div className="card-header">
                  <h3 className="card-title">Elevator Animation</h3>
               </div>
               <div className="card-body p-0" style={{height: floorCount * elevatorHight}}>
                  <Animate
                     start={() => ({
                        y: (floorCount - this.state.floor -1 - floorAdjust) * elevatorHight
                     })}
                     update={() => ({
                        y: [(floorCount - this.state.floor -1 - floorAdjust) * elevatorHight],
                        timing: { duration: Constants.speed, ease: easeQuadInOut}
                     })}
                  >
                     {(state) => {
                        const { y } = state;
                        let bg = "grey";
                        switch (this.state.motion) {
                           case "up": bg = "green";break;
                           case "wait": bg = "lightgrey";break;
                           case "down": bg = "orange";break;
                           default: bg = "red";
                        }
                        return (
                           <div className="elevator p-2"
                              style={{
                                 height: elevatorHight,
                                 backgroundColor: bg,
                                 WebkitTransform: `translate3d(0, ${y}px, 0)`,
                                 transform: `translate3d(0, ${y}px, 0)`,
                              }}
                           >
                              e{this.props.no}: {this.state.floor} | {this.state.motion} | door {this.state.door}
                           </div>
                        )
                     }}
                  </Animate>
               </div>
            </div>
            <hr/>
            <div className="card" ref={"status"+this.props.no}>
               <div className="card-header">
                  <h3 className="card-title">Status</h3>
               </div>
               <table className="table">
                  <tbody>
                     <tr>
                        <td>level</td><td>{this.state.floor}</td>
                     </tr>
                     <tr>
                        <td>motion</td><td>{this.state.motion}</td>
                     </tr>
                     <tr>
                        <td>door</td><td>{this.state.door}</td>
                     </tr>
                     <tr>
                        <td>stack</td><td>{this.state.commandStack.join(", ")}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <hr/>
            <div className="card" ref={"adminCommand"+this.props.no}>
               <div className="card-header">
                  <h3 className="card-title">Admin Commands</h3>
               </div>
               <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                     <div className="btn-group w-100" role="group">
                        <button type="button" className="btn btn-outline-secondary" onClick={this.openDoor}>open door</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.closeDoor}>close door</button>
                     </div>
                  </li>
                  <li className="list-group-item">
                     <div className="btn-group w-100" role="group">
                        <button type="button" className="btn btn-outline-secondary" onClick={this.moveUp.bind(this)}>move up</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.moveDown.bind(this)}>move down</button>
                     </div>
                  </li>
               </ul>
            </div>
            <hr/>
         </div>
      )
   }
}

export default Elevator;
