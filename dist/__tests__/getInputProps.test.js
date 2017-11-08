'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _sinon = require('sinon');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _setup9 = require('../fixtures/setup');

var _setup10 = _interopRequireDefault(_setup9);

var _data = require('../fixtures/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('getInputProps()', function () {
  it('Event - keyDown - Up & Down', function () {
    var _setup = (0, _setup10.default)(),
        BasicAutoComplete = _setup.BasicAutoComplete,
        Children = _setup.Children;

    var div = global.document.createElement('div');
    var keyWord = 'pa';
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup9.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      highlightedIndex: 0
    }));

    // Change
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    // not key up & key down
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.ESCAPE });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 0
    }));

    // ⬆️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.UP });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 0
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 1
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 2
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 3
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 4
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 5
    }));

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 5
    }));

    // ⬆️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.UP });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 4
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('Event - keyDown - ESC', function () {
    var _setup2 = (0, _setup10.default)(),
        BasicAutoComplete = _setup2.BasicAutoComplete,
        Children = _setup2.Children;

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null));
    var input = wrapper.find('#__inputItemProps');

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.ESCAPE });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      highlightedIndex: 0
    }));
  });

  it('Event - onChange', function () {
    var _setup3 = (0, _setup10.default)(),
        BasicAutoComplete = _setup3.BasicAutoComplete,
        Children = _setup3.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup9.createData)('pa', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: 'pa',
      items: filterData
    }));

    // empty keyword
    filterData = (0, _setup9.createData)('', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(157);

    input.simulate('change', { target: { value: '' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: '',
      items: filterData
    }));

    // not found keyword
    filterData = (0, _setup9.createData)('babababab', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(0);

    input.simulate('change', { target: { value: 'babababab' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: 'babababab',
      items: filterData
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('Event - onEnter', function () {
    var _setup4 = (0, _setup10.default)(),
        BasicAutoComplete = _setup4.BasicAutoComplete,
        Children = _setup4.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
        return item.name;
      } }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup9.createData)('pa', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: 'pa',
      items: filterData
    }));

    var selectedItem = filterData[1];

    // ⬇️
    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 1
    }));

    input.simulate('keydown', { keyCode: _setup9.KEYS_EVENT.ENTER });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      highlightedIndex: 1,
      inputValue: selectedItem.name
    }));
  });

  it('Event - focus', function () {
    var handleFocusSpy = (0, _sinon.spy)();

    var _setup5 = (0, _setup10.default)({
      inputProps: {
        onFocus: handleFocusSpy
      }
    }),
        BasicAutoComplete = _setup5.BasicAutoComplete,
        Children = _setup5.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
        return item.name;
      } }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');
    input.simulate('focus');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true
    }));
    expect(handleFocusSpy.calledOnce).toBe(true);
  });

  it('Event - blur', function () {
    var handleBlurSpy = (0, _sinon.spy)();

    var _setup6 = (0, _setup10.default)({
      inputProps: {
        onBlur: handleBlurSpy
      }
    }),
        BasicAutoComplete = _setup6.BasicAutoComplete,
        Children = _setup6.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);

    var mapEvents = {};
    document.addEventListener = jest.fn(function (event, cb) {
      mapEvents[event] = cb;
    });

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
          return item.name;
        } })
    ), { attachTo: div });

    var input = wrapper.find('#__inputItemProps');
    input.simulate('focus');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true
    }));

    mapEvents.mousedown({
      target: _reactDom2.default.findDOMNode(wrapper.instance())
    });

    input.simulate('blur');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false
    }));
    expect(handleBlurSpy.calledOnce).toBe(true);
  });

  it('has onChange as string', function () {
    var handleChangeSpy = 'change';

    var _setup7 = (0, _setup10.default)({
      inputProps: {
        onChange: handleChangeSpy
      }
    }),
        BasicAutoComplete = _setup7.BasicAutoComplete,
        Children = _setup7.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup9.createData)('pa', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: 'pa',
      items: filterData
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has onBlur as string', function () {
    var handleBlurSpy = 'blur';

    var _setup8 = (0, _setup10.default)({
      inputProps: {
        onBlur: handleBlurSpy
      }
    }),
        BasicAutoComplete = _setup8.BasicAutoComplete,
        Children = _setup8.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup9.createData)('pa', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('blur');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });
});