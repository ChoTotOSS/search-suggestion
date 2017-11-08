'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _sinon = require('sinon');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _setup5 = require('../fixtures/setup');

var _setup6 = _interopRequireDefault(_setup5);

var _data = require('../fixtures/data');

var _data2 = _interopRequireDefault(_data);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
var _global = global,
    describe = _global.describe,
    it = _global.it;

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('<Suggestion />', function () {
  it('calls componentDidMount() lifecycle method', function () {
    var _setup = (0, _setup6.default)(),
        BasicAutoComplete = _setup.BasicAutoComplete;

    var componentDidMountSpy = (0, _sinon.spy)(_2.default.prototype, 'componentDidMount');
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, {
      initInputValue: 'hello world',
      getDisplayName: function getDisplayName(item) {
        return item.name;
      }
    }));
    expect(_2.default.prototype.componentDidMount.calledOnce).toBe(true);
    componentDidMountSpy.restore();
  });

  it('calls componentWillReceiveProps() lifecycle method', function () {
    var _setup2 = (0, _setup6.default)(),
        BasicAutoComplete = _setup2.BasicAutoComplete;

    var componentWillReceivePropsSpy = (0, _sinon.spy)(_2.default.prototype, 'componentWillReceiveProps');
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, {
      initInputValue: 'hello world',
      getDisplayName: function getDisplayName(item) {
        return item.name;
      }
    }));
    expect(_2.default.prototype.componentWillReceiveProps.calledOnce).toBe(false);
    wrapper.setProps({
      initInputValue: null
    });
    expect(_2.default.prototype.componentWillReceiveProps.calledOnce).toBe(true);
    componentWillReceivePropsSpy.restore();
  });

  it('passs onSelectedItem prop into <AutoComplete /> component', function () {
    var handleSelectedItemSpy = (0, _sinon.spy)();

    var _setup3 = (0, _setup6.default)(),
        BasicAutoComplete = _setup3.BasicAutoComplete,
        Children = _setup3.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, {
      onSelectedItem: handleSelectedItemSpy,
      getDisplayName: function getDisplayName(item) {
        return item.name;
      }
    }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)('pa', _data2.default);
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
    input.simulate('keydown', { keyCode: _setup5.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      highlightedIndex: 1
    }));

    input.simulate('keydown', { keyCode: _setup5.KEYS_EVENT.ENTER });
    expect(handleSelectedItemSpy.calledOnce).toBe(true);
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      highlightedIndex: 1,
      inputValue: selectedItem.name
    }));
  });

  it('clear all data after click clear button', function () {
    var handleSelectedItemSpy = (0, _sinon.spy)();

    var _setup4 = (0, _setup6.default)(),
        BasicAutoComplete = _setup4.BasicAutoComplete,
        Children = _setup4.Children;

    var div = global.document.createElement('div');
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, {
      onSelectedItem: handleSelectedItemSpy,
      getDisplayName: function getDisplayName(item) {
        return item.name;
      }
    }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)('pa', _data2.default);
    wrapper.setProps({ items: filterData });

    expect(filterData.length).toBe(6);

    input.simulate('change', { target: { value: 'pa' } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      inputValue: 'pa',
      items: filterData
    }));
    var btnClear = wrapper.find('#btnClear');
    var selectedItem = filterData[1];

    // ⬇️
    btnClear.simulate('click', { keyCode: _setup5.KEYS_EVENT.DOWN });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      inputValue: ''
    }));

    var btnClearAfterClear = wrapper.find('#btnClear');
    expect(btnClearAfterClear.length).toBe(0);
  });
});