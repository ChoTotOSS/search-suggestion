import React from 'react';

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
import Enzyme, { mount } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';

import setup, { createData, KEYS_EVENT } from '../fixtures/setup';
import countries from '../fixtures/data';
import Suggestion from '../';

const { describe, it } = global;
Enzyme.configure({ adapter: new Adapter() });

describe('<Suggestion />', () => {
  it('calls componentDidMount() lifecycle method', () => {
    const { BasicAutoComplete } = setup();
    const componentDidMountSpy = spy(Suggestion.prototype, 'componentDidMount');
    const wrapper = mount(
      <BasicAutoComplete
        initInputValue="hello world"
        getDisplayName={item => item.name}
      />
    );
    expect(Suggestion.prototype.componentDidMount.calledOnce).toBe(true);
    componentDidMountSpy.restore();
  });

  it('calls componentWillReceiveProps() lifecycle method', () => {
    const { BasicAutoComplete } = setup();
    const componentWillReceivePropsSpy = spy(
      Suggestion.prototype,
      'componentWillReceiveProps'
    );
    const wrapper = mount(
      <BasicAutoComplete
        initInputValue="hello world"
        getDisplayName={item => item.name}
      />
    );
    expect(Suggestion.prototype.componentWillReceiveProps.calledOnce).toBe(
      false
    );
    wrapper.setProps({
      initInputValue: null
    });
    expect(Suggestion.prototype.componentWillReceiveProps.calledOnce).toBe(
      true
    );
    componentWillReceivePropsSpy.restore();
  });

  it('passs onSelectedItem prop into <AutoComplete /> component', () => {
    const handleSelectedItemSpy = spy();
    const { BasicAutoComplete, Children } = setup();
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete
        onSelectedItem={handleSelectedItemSpy}
        getDisplayName={item => item.name}
      />,
      { attachTo: div }
    );
    const input = wrapper.find('#__inputItemProps');

    const filterData = createData('pa', countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        inputValue: 'pa',
        items: filterData
      })
    );

    const selectedItem = filterData[1];

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 1
      })
    );

    input.simulate('keydown', { keyCode: KEYS_EVENT.ENTER });
    expect(handleSelectedItemSpy.calledOnce).toBe(true);
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        highlightedIndex: 1,
        inputValue: selectedItem.name
      })
    );
  });

  it('clear all data after click clear button', () => {
    const handleSelectedItemSpy = spy();
    const { BasicAutoComplete, Children } = setup();
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete
        onSelectedItem={handleSelectedItemSpy}
        getDisplayName={item => item.name}
      />,
      { attachTo: div }
    );
    const input = wrapper.find('#__inputItemProps');

    const filterData = createData('pa', countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        inputValue: 'pa',
        items: filterData
      })
    );
    const btnClear = wrapper.find('#btnClear');
    const selectedItem = filterData[1];

    // ⬇️
    btnClear.simulate('click', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inputValue: ''
      })
    );

    const btnClearAfterClear = wrapper.find('#btnClear');
    expect(btnClearAfterClear.length).toBe(0);
  });
});
