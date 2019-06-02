import * as React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';
import Timestamp from '../Timestamp';
import Username from '../Username';

const setup = (type = 'received') => {
  return shallow(<Message message={{from: 'guest0001', content: 'hi', time: '11:03', type}}/>)
};

describe('Message component', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).not.toBe(null);
  });

  it('should render a message with username and time when receiving', () => {
    const wrapper = setup();
    expect(wrapper.find(Username).length).toBe(1);
    expect(wrapper.find(Timestamp).length).toBe(1);
  });

  it('should render a message with only time when sending', () => {
    const wrapper = setup('sent');
    expect(wrapper.find(Username).length).toBe(0);
    expect(wrapper.find(Timestamp).length).toBe(1);
  });
});
