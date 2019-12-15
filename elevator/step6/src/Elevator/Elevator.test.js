import React from 'react'
import { shallow } from 'enzyme'

import Elevator from './Elevator.js'

it('renders without props', () => {
  shallow(<Elevator />)
})
