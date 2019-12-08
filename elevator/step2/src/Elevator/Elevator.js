import React from 'react'
import './style.css'

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const speed = 1000;

class Elevator extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         floor: 0,
         motion: "none",
         door: "open"
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
      this.setState({
         motion: "up"
      });
      sleep(speed).then(() => {
         const newFloor = this.state.floor +1;
         this.setState({
            floor: newFloor,
            motion: "none"
         });
      });
   }

   moveDown(e) {
      e.preventDefault();
      this.setState({
         motion: "down"
      });
      sleep(speed).then(() => {
         const newFloor = this.state.floor -1;
         this.setState({
            floor: newFloor,
            motion: "none"
         });
      });
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
                    <td>level</td><td id="e3-l">{this.state.floor}</td>
                 </tr>
                 <tr>
                    <td>motion</td><td id="e3-m">{this.state.motion}</td>
                 </tr>
                 <tr>
                    <td>door</td><td id="e3-d">{this.state.door}</td>
                 </tr>
               </tbody>
            </table>
         </div>
         <hr/>
         <div className="card">
            <div className="card-header">
               <h3 className="card-title">Commands</h3>
            </div>
            <ul className="list-group list-group-flush">
               <li className="list-group-item"><button onClick={this.openDoor}>open door</button><button onClick={this.closeDoor}>close door</button></li>
               <li className="list-group-item"><button onClick={this.moveUp}>move up</button><button onClick={this.moveDown}>move down</button></li>
            </ul>
         </div>
         <hr/>
      </div>
   )
   }
}

export default Elevator;
