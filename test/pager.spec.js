import Pager from '../src/Pager';
import React from 'react';
import { shallow } from 'enzyme';

const setup = () => {
  const props = {
    pageCount: 10,
    onPageChange: jest.fn()
  };

  const wrapper = shallow(<Pager {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Pager', () => {
  const { wrapper } = setup();
  it('Pager Component should be render', () => {
    expect(wrapper.find('.rc-pager').exists());
  });
});
