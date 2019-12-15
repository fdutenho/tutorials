import React from 'react'
import { shallow } from 'enzyme'

import mainController from './mainController.js'

it('renders without props', () => {
  shallow(<mainController />)
})
