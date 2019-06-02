import {shallow} from 'enzyme';
import * as React from 'react';
import Settings from './SettingsPage';

const setup = () => {
  return shallow(<Settings />)
};

describe('Settings', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).not.toBe(null)
  });
});
