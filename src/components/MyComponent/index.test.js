import React from 'react'
import { shallow } from 'enzyme'
import MyComponent from './index'

it('should create an entry in component state', () => {
  const component = shallow(<MyComponent />)
  const form = component.find('input')
  form.props().onChange({target: {
    name: 'myName',
    value: 'myValue'
  }})
  const state = component.state('input')
  expect(state).toBeDefined()
  expect(state).toBe('myValue')
})
