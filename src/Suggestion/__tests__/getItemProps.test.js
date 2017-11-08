import React from 'react';

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
import Enzyme, { mount } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';

import setup, { createData } from '../fixtures/setup';
import countries from '../fixtures/data';

const { describe, it } = global;
Enzyme.configure({ adapter: new Adapter() });

describe('getItemProps()', () => {
  it('Event - onClick on item', () => {
    const handleSelectItemSpy = spy();

    const { BasicAutoComplete, Children } = setup({
      itemProps: {
        handleSelectItem: handleSelectItemSpy,
      },
    });
    const div = global.document.createElement('div');
    let keyWord = 'pa';
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={item => item.name} />,
      { attachTo: div },
    );
    const input = wrapper.find('#__inputItemProps');

    let filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    let selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(handleSelectItemSpy.calledOnce).toBe(true);
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: selectedItem.name,
      }),
    );

    // Change 2
    keyWord = 'a';
    filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    selectedItem = filterData[2];

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item2 = wrapper.find('#item_2');
    item2.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: selectedItem.name,
      }),
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has handleSelectItem as type string', () => {
    const handleSelectItemSpy = '';

    const { BasicAutoComplete, Children } = setup({
      itemProps: {
        handleSelectItem: handleSelectItemSpy,
      },
    });
    const div = global.document.createElement('div');
    let keyWord = 'pa';
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={item => item.name} />,
      { attachTo: div },
    );
    const input = wrapper.find('#__inputItemProps');

    let filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    let selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: selectedItem.name,
      }),
    );

    // Change 2
    keyWord = 'a';
    filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    selectedItem = filterData[2];

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item2 = wrapper.find('#item_2');
    item2.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: selectedItem.name,
      }),
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has getDisplayName() return null', () => {
    const handleSelectItemSpy = '';

    const { BasicAutoComplete, Children } = setup({
      itemProps: {
        handleSelectItem: handleSelectItemSpy,
      },
    });
    const div = global.document.createElement('div');
    let keyWord = 'pa';
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={() => null} />,
      { attachTo: div },
    );
    const input = wrapper.find('#__inputItemProps');

    let filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    let selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: '',
      }),
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has no getDisplayName()', () => {
    const handleSelectItemSpy = '';

    const { BasicAutoComplete, Children } = setup({
      itemProps: {
        handleSelectItem: handleSelectItemSpy,
      },
    });
    const div = global.document.createElement('div');
    let keyWord = 'pa';
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete />,
      { attachTo: div },
    );
    const input = wrapper.find('#__inputItemProps');

    let filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    let selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData,
      }),
    );

    const item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        inputValue: keyWord,
      }),
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });
});
