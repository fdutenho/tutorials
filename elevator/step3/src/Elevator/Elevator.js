import React from 'react'
import './style.css'
import { Animate } from 'react-move';
import { easeQuadInOut } from 'd3-ease';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const speed = 1000;
const minFloor = 0;
const maxFloor = 4;
const floorCount = maxFloor + 1 - minFloor;
const elevatorHight = 50;

class Elevator extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         floor: minFloor,
         motion: "wait",
         door: "closed"
      };
      this.openDoor = this.openDoor.bind(this);
      this.closeDoor = this.closeDoor.bind(this);
      this.moveUp = this.moveUp.bind(this);
      this.moveDown = this.moveDown.bind(this);
   }

   closeDoor(e) {
      e.preventDefault();
      this.setState({
         door: "closed"
      });
   }

   openDoor(e) {
      e.preventDefault();
      this.setState({
         door: "open"
      });
   }

   moveUp(e) {
      e.preventDefault();
      if (this.state.floor < maxFloor) {
         if(this.state.door !== "closed") {
            this.setState({
               door: "closed"
            });
         }
         this.setState({
            floor: this.state.floor +1,
            motion: "up"
         });
         sleep(speed).then(() => {
            this.setState({
               motion: "wait",
               door: "open"
            });
         });
      } else {
         this.setState({
            motion: "already at highest floor"
         });
         sleep(speed).then(() => {
            this.setState({
               motion: "wait",
               door: "open"
            });
         });

      }
   }

   moveDown(e) {
      e.preventDefault();
      if (this.state.floor > minFloor) {
         if(this.state.door !== "closed") {
            this.setState({
               door: "closed"
            });
         }
         this.setState({
            floor: this.state.floor -1,
            motion: "down"
         });
         sleep(speed).then(() => {
            this.setState({
               motion: "wait",
               door: "open"
            });
         });
      } else {
         this.setState({
            motion: "already at lowest floor"
         });
         sleep(speed).then(() => {
            this.setState({
               motion: "wait",
               door: "open"
            });
         });

      }
   }

   render() {
      return(
         <div>
         <h1>Elevator {this.props.no}</h1>
         <div className="card">
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
               </tbody>
            </table>
         </div>
         <hr/>
         <div className="card">
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
                     <button type="button" className="btn btn-outline-secondary" onClick={this.moveUp}>move up</button>
                     <button type="button" className="btn btn-outline-secondary" onClick={this.moveDown}>move down</button>
                  </div>
               </li>
            </ul>
         </div>
         <hr/>
            <div className="card">
               <div className="card-header">
                  <h3 className="card-title">Elevator Animation</h3>
               </div>
               <div className="card-body p-0" style={{height: floorCount * elevatorHight}}>
                  <Animate
                     start={() => ({
                        y: (floorCount - this.state.floor -1) * elevatorHight,
                     })}
                     update={() => ({
                        y: [(floorCount - this.state.floor -1) * elevatorHight],
                        timing: { duration: speed, ease: easeQuadInOut},
                     })}
                  >
                     {(state) => {
                        const { y } = state
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
      </div>
   )
   }
}

export default Elevator;
