import React from 'react';
import ReactDOM from 'react-dom';

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
import Enzyme, { mount } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';

import setup, { createData, KEYS_EVENT } from '../fixtures/setup';
import countries from '../fixtures/data';

const { describe, it } = global;
Enzyme.configure({ adapter: new Adapter() });

describe('getInputProps()', () => {
  it('Event - keyDown - Up & Down', () => {
    const { BasicAutoComplete, Children } = setup();
    const div = global.document.createElement('div');
    const keyWord = 'pa';
    global.document.body.appendChild(div);
    const wrapper = mount(<BasicAutoComplete />, { attachTo: div });
    const input = wrapper.find('#__inputItemProps');

    const filterData = createData(keyWord, countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        highlightedIndex: 0
      })
    );

    // Change
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        items: filterData
      })
    );

    // not key up & key down
    input.simulate('keydown', { keyCode: KEYS_EVENT.ESCAPE });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 0
      })
    );

    // ⬆️
    input.simulate('keydown', { keyCode: KEYS_EVENT.UP });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 0
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 1
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 2
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 3
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 4
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 5
      })
    );

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 5
      })
    );

    // ⬆️
    input.simulate('keydown', { keyCode: KEYS_EVENT.UP });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        highlightedIndex: 4
      })
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('Event - keyDown - ESC', () => {
    const { BasicAutoComplete, Children } = setup();
    const wrapper = mount(<BasicAutoComplete />);
    const input = wrapper.find('#__inputItemProps');

    // ⬇️
    input.simulate('keydown', { keyCode: KEYS_EVENT.ESCAPE });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        highlightedIndex: 0
      })
    );
  });

  it('Event - onChange', () => {
    const { BasicAutoComplete, Children } = setup();
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(<BasicAutoComplete />, { attachTo: div });
    const input = wrapper.find('#__inputItemProps');

    let filterData = createData('pa', countries);
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

    // empty keyword
    filterData = createData('', countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(157);

    input.simulate('change', { target: { value: '' } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        inputValue: '',
        items: filterData
      })
    );

    // not found keyword
    filterData = createData('babababab', countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(0);

    input.simulate('change', { target: { value: 'babababab' } });
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        inputValue: 'babababab',
        items: filterData
      })
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('Event - onEnter', () => {
    const { BasicAutoComplete, Children } = setup();
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={item => item.name} />,
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
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        selectedItem,
        highlightedIndex: 1,
        inputValue: selectedItem.name
      })
    );
  });

  it('Event - focus', () => {
    const handleFocusSpy = spy();

    const { BasicAutoComplete, Children } = setup({
      inputProps: {
        onFocus: handleFocusSpy
      }
    });
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(
      <BasicAutoComplete getDisplayName={item => item.name} />,
      { attachTo: div }
    );
    const input = wrapper.find('#__inputItemProps');
    input.simulate('focus');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true
      })
    );
    expect(handleFocusSpy.calledOnce).toBe(true);
  });

  it('Event - blur', () => {
    const handleBlurSpy = spy();
    const { BasicAutoComplete, Children } = setup({
      inputProps: {
        onBlur: handleBlurSpy
      }
    });

    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const mapEvents = {};
    document.addEventListener = jest.fn((event, cb) => {
      mapEvents[event] = cb;
    });

    const wrapper = mount(
      <div>
        <BasicAutoComplete getDisplayName={item => item.name} />
      </div>,
      { attachTo: div }
    );

    const input = wrapper.find('#__inputItemProps');
    input.simulate('focus');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true
      })
    );

    mapEvents.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance())
    });

    input.simulate('blur');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false
      })
    );
    expect(handleBlurSpy.calledOnce).toBe(true);
  });

  it('has onChange as string', () => {
    const handleChangeSpy = 'change';

    const { BasicAutoComplete, Children } = setup({
      inputProps: {
        onChange: handleChangeSpy
      }
    });
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(<BasicAutoComplete />, { attachTo: div });
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

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has onBlur as string', () => {
    const handleBlurSpy = 'blur';

    const { BasicAutoComplete, Children } = setup({
      inputProps: {
        onBlur: handleBlurSpy
      }
    });
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(<BasicAutoComplete />, { attachTo: div });
    const input = wrapper.find('#__inputItemProps');

    const filterData = createData('pa', countries);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('blur');
    expect(Children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false
      })
    );

    wrapper.detach();
    global.document.body.removeChild(div);
  });
});

it('Event - custom key down ', () => {
  const handleKeyDownSpy = spy();
  const { BasicAutoComplete } = setup({
    inputProps: {
      onKeyDown: handleKeyDownSpy
    }
  });

  const div = global.document.createElement('div');
  global.document.body.appendChild(div);
  const wrapper = mount(<BasicAutoComplete />, { attachTo: div });
  const input = wrapper.find('#__inputItemProps');

  input.simulate('keydown', { keyCode: KEYS_EVENT.ENTER });
  expect(handleKeyDownSpy.calledOnce).toBe(true);

  wrapper.detach();
  global.document.body.removeChild(div);
});
