import React from 'react'
import { shallow } from 'enzyme';
import uuid from 'uuid/v4';
import { AppBase } from './app-base';

describe('AppBase', () => {
  let id;
  let wrapper;

  beforeEach(() => {
    id = uuid();

    wrapper = shallow(
      <AppBase>
        <div id={id} />
      </AppBase>
    );
  });

  it('should render children', () => {
    console.log('wrapper', wrapper);
    console.log('wrapper.debug()', wrapper.debug());

    expect(wrapper.find('div').length).toEqual(1);
  });
});
