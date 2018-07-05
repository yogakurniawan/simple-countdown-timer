import React from 'react'
import { configure, mount } from 'enzyme'
import { mountToJson } from 'enzyme-to-json'
import Button from './index'

test('styles the button with a background of the context color', () => {
  const wrapper = mount(<Button>Click Me</Button>, {
    context: { color: 'blue' }
  })
  expect(mountToJson(wrapper)).toMatchSnapshot()
})
