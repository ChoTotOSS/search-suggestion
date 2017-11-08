'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _setup2 = require('../fixtures/setup');

var _setup3 = _interopRequireDefault(_setup2);

var _data = require('../fixtures/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
var _global = global,
    describe = _global.describe,
    it = _global.it;

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('getListItemProps()', function () {
  it('should return prop contains "id"', function () {
    var _setup = (0, _setup3.default)(),
        BasicAutoComplete = _setup.BasicAutoComplete,
        Children = _setup.Children;

    var keyWord = 'pa';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BasicAutoComplete, { getDisplayName: function getDisplayName(item) {
        return item.name;
      } }));
    var input = wrapper.find('#__inputItemProps');

    var filterData = (0, _setup2.createData)(keyWord, _data2.default);
    wrapper.setProps({ items: filterData });

    input.simulate('change', { target: { value: keyWord } });
    expect(Children).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      items: filterData
    }));
    var container = wrapper.find('#__listItemProps');
    expect(container.length).toBe(1);
  });
});