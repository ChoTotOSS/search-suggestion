'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS_EVENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createData = createData;
exports.handleChange = handleChange;
exports.default = setup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEYS_EVENT = exports.KEYS_EVENT = {
  UP: 38,
  DOWN: 40,
  ESCAPE: 27,
  ENTER: 13
};

function createData(word, data) {
  var re = new RegExp(word.toLowerCase() + '.*\\B', 'g');
  return data.filter(function (item) {
    return re.test(item.name.toLowerCase());
  });
}

function handleChange(e) {
  var value = e.target.value;
  var filterData = [];
  if (value) {
    filterData = createData(value, _data2.default);
  }
  return filterData;
}

function setup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$data = _ref.data,
      data = _ref$data === undefined ? _data2.default : _ref$data,
      _ref$inputProps = _ref.inputProps,
      inputProps = _ref$inputProps === undefined ? {} : _ref$inputProps,
      _ref$itemProps = _ref.itemProps,
      itemProps = _ref$itemProps === undefined ? {} : _ref$itemProps;

  var Children = jest.fn(function (_ref2) {
    var getInputProps = _ref2.getInputProps,
        getListItemProps = _ref2.getListItemProps,
        getItemProps = _ref2.getItemProps,
        inputValue = _ref2.inputValue,
        selectedItem = _ref2.selectedItem,
        highlightedIndex = _ref2.highlightedIndex,
        items = _ref2.items,
        isOpen = _ref2.isOpen,
        clearInputValue = _ref2.clearInputValue;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', getInputProps(_extends({
        placeholder: 'Select your country',
        onChange: handleChange
      }, inputProps))),
      inputValue && _react2.default.createElement(
        'button',
        { id: 'btnClear', onClick: clearInputValue },
        'clear'
      ),
      isOpen && _react2.default.createElement(
        'div',
        getListItemProps(),
        items.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            _extends({}, getItemProps(_extends({ item: item, index: index }, itemProps)), {
              key: item.code,
              style: {
                backgroundColor: highlightedIndex === index ? 'rgb(232, 232, 232)' : 'white',
                fontWeight: selectedItem && selectedItem.code === item.code ? 'bold' : 'normal'
              }
            }),
            item.name
          );
        })
      )
    );
  });

  function BasicAutoComplete(props) {
    return _react2.default.createElement(
      _2.default,
      _extends({ items: data }, props),
      Children
    );
  }
  return {
    BasicAutoComplete: BasicAutoComplete,
    Children: Children
  };
}