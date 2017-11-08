import React from 'react';

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import setup, { createData } from '../fixtures/setup';
import countries from '../fixtures/data';

const { describe, it } = global;
Enzyme.configure({ adapter: new Adapter() });

describe('getListItemProps()', () => {
  it('should return prop contains "id"', () => {
    const { BasicAutoComplete, Children } = setup();
    let keyWord = 'pa';
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={item => item.name} />,
    );
    const input = wrapper.find('#__inputItemProps');

    const filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );
    const container = wrapper.find('#__listItemProps');
    expect(container.length).toBe(1);
  });
});
