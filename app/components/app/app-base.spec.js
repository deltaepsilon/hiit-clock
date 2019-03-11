import React from 'react';
import { shallow } from 'enzyme';
import { AppBase } from './app-base';

describe('AppBase', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AppBase>
        <div />
      </AppBase>
    );
  });

  it('should render children', () => {
    expect(wrapper.find('div').length > 1).toEqual(true);
  });
});
