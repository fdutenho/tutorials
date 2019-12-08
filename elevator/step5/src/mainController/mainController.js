import /*React,*/ { PureComponent } from 'react'
import postal from 'postal';
import Constants from '../Constants';

var subscription = null;
var elevatorRoundRobin = 1;

class mainController extends PureComponent {

   constructor(props) {
      super(props);
      subscription = postal.subscribe({
         channel: "commands",
         topic: "calls",
         callback: function(floor, envelope) {
            console.info("mainController: received signal for floor: " + floor);

            //could be more ingelligent ;-)


            console.debug("mainController: publish signal for floor " + floor + " to elevator " + elevatorRoundRobin);
            postal.publish({
               channel: "commands",
               topic: "elevator" + elevatorRoundRobin,
               data: floor
            });
            elevatorRoundRobin++;
            if(elevatorRoundRobin>Constants.maxElevators) elevatorRoundRobin=1;
         }
      });
   }

   componentWillUnmount() {
      subscription.unsubscribe();
   }

}

export default mainController
