import /*React,*/ { PureComponent } from 'react'
import postal from 'postal';
//import Constants from '../Constants';

var subscription = null;

class mainController extends PureComponent {

   constructor(props) {
      super(props);
      var elevState = [];
      subscription = postal.subscribe({
         channel: "commands",
         topic: "calls",
         callback: function(floor, envelope) {
            console.info("mainController: received signal for floor: " + floor);

            //could be more ingelligent ;-)

            var elevatorToSendTo = 1;
            for (let e in elevState) {
                  if(Math.abs(elevState[e]-floor)<Math.abs(elevState[elevatorToSendTo]-floor)) {
                     elevatorToSendTo = e;
                  }
            }

            console.debug("mainController: publish signal for floor " + floor + " to elevator " + elevatorToSendTo);
            postal.publish({
               channel: "commands",
               topic: "elevator" + elevatorToSendTo,
               data: floor
            });
         }
      });

      subscription = postal.subscribe({
         channel: "progress",
         topic: "floor",
         callback: function(data, envelope) {
            console.info("mainController: received message that an elevator reached floor " + JSON.stringify(data));
            elevState[data.elevator]=data.floor;
            console.debug("mainController: elevState=" + elevState.join(", "));
           }
        });
   }

   componentWillUnmount() {
      subscription.unsubscribe();
   }

}

export default mainController
