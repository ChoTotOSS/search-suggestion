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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('getItemProps()', function () {
  it('Event - onClick on item', function () {
    var handleSelectItemSpy = (0, _sinon.spy)();

    var _setup = (0, _setup6.default)({
      itemProps: {
        handleSelectItem: handleSelectItemSpy
      }
    }),
        BasicAutoComplete = _setup.BasicAutoComplete,
        Children = _setup.Children;

    var div = global.document.createElement('div');
    var keyWord = 'pa';
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
        return item.name;
      } }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    var selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(handleSelectItemSpy.calledOnce).toBe(true);
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: selectedItem.name
    }));

    // Change 2
    keyWord = 'a';
    filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    selectedItem = filterData[2];

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item2 = wrapper.find('#item_2');
    item2.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: selectedItem.name
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has handleSelectItem as type string', function () {
    var handleSelectItemSpy = '';

    var _setup2 = (0, _setup6.default)({
      itemProps: {
        handleSelectItem: handleSelectItemSpy
      }
    }),
        BasicAutoComplete = _setup2.BasicAutoComplete,
        Children = _setup2.Children;

    var div = global.document.createElement('div');
    var keyWord = 'pa';
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
        return item.name;
      } }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    var selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: selectedItem.name
    }));

    // Change 2
    keyWord = 'a';
    filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    selectedItem = filterData[2];

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item2 = wrapper.find('#item_2');
    item2.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: selectedItem.name
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has getDisplayName() return null', function () {
    var handleSelectItemSpy = '';

    var _setup3 = (0, _setup6.default)({
      itemProps: {
        handleSelectItem: handleSelectItemSpy
      }
    }),
        BasicAutoComplete = _setup3.BasicAutoComplete,
        Children = _setup3.Children;

    var div = global.document.createElement('div');
    var keyWord = 'pa';
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName() {
        return null;
      } }), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    var selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: ''
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });

  it('has no getDisplayName()', function () {
    var handleSelectItemSpy = '';

    var _setup4 = (0, _setup6.default)({
      itemProps: {
        handleSelectItem: handleSelectItemSpy
      }
    }),
        BasicAutoComplete = _setup4.BasicAutoComplete,
        Children = _setup4.Children;

    var div = global.document.createElement('div');
    var keyWord = 'pa';
    global.document.body.appendChild(div);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, null), { attachTo: div });
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup5.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    var selectedItem = filterData[1];

    expect(filterData.length).toBe(6);

    // Change 1
    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));

    var item1 = wrapper.find('#item_1');
    item1.simulate('click');
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: false,
      selectedItem: selectedItem,
      inputValue: keyWord
    }));

    wrapper.detach();
    global.document.body.removeChild(div);
  });
});