'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYS_EVENT = {
  UP: 38,
  DOWN: 40,
  ESCAPE: 27,
  ENTER: 13
};

var Suggestion = function (_React$Component) {
  _inherits(Suggestion, _React$Component);

  function Suggestion(props) {
    _classCallCheck(this, Suggestion);

    var _this = _possibleConstructorReturn(this, (Suggestion.__proto__ || Object.getPrototypeOf(Suggestion)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      inputValue: '',
      dataLength: 0,
      currentValue: null,
      selectedItem: null,
      isOutsideClick: false,
      isOpen: false,
      highlightedIndex: 0
    };
    return _this;
  }

  _createClass(Suggestion, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.clickOutside);
      if (this.props.initInputValue) {
        this.setState({
          inputValue: this.props.initInputValue,
          dataLength: this.props.items.length
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items.length !== this.props.items.length) {
        this.setState({
          dataLength: nextProps.items.length
        });
      }
      if (nextProps.initInputValue !== this.props.initInputValue) {
        this.setState({
          inputValue: nextProps.initInputValue || ''
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.clickOutside);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          inputValue = _state.inputValue,
          selectedItem = _state.selectedItem,
          isOpen = _state.isOpen,
          highlightedIndex = _state.highlightedIndex;
      var _props = this.props,
          items = _props.items,
          _props$id = _props.id,
          id = _props$id === undefined ? 'autoComplete' : _props$id;

      return _react2.default.createElement(
        'div',
        { id: id, ref: function ref(el) {
            return _this2.__autoComplete = el;
          } },
        this.props.children({
          getInputProps: this.getInputProps,
          getItemProps: this.getItemProps,
          getListItemProps: this.getListItemProps,
          clearInputValue: this.clearInputValue,
          inputValue: inputValue,
          selectedItem: selectedItem,
          isOpen: isOpen,
          items: items,
          highlightedIndex: highlightedIndex
        })
      );
    }
  }]);

  return Suggestion;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (e) {
    _this3.setState({
      inputValue: e.target.value,
      isOpen: true
    });
  };

  this.onBlurInput = function (e) {
    if (_this3.state.isOutsideClick) {
      _this3.setState({
        isOpen: false
      });
    }
  };

  this.onFocusInput = function (e) {
    _this3.setState({
      isOutsideClick: false,
      isOpen: true
    });
  };

  this.onSelectItem = function (item) {
    var displayName = {};
    if (_this3.props.getDisplayName) {
      displayName = {
        inputValue: _this3.props.getDisplayName(item) || ''
      };
    }

    if (_this3.props.onSelectedItem) {
      _this3.props.onSelectedItem(item);
    }

    _this3.setState(_extends({
      selectedItem: item,
      isOpen: false
    }, displayName));
  };

  this.onKeyDown = function (e) {
    var itemIndex = _this3.state.highlightedIndex;
    if (_this3.state.isOpen && !_this3.state.isOutsideClick) {
      switch (e.keyCode) {
        case KEYS_EVENT.UP:
          {
            itemIndex--;
            if (itemIndex < 0) {
              itemIndex = 0;
            }
          }
          break;
        case KEYS_EVENT.DOWN:
          {
            itemIndex++;
            if (itemIndex + 1 > _this3.state.dataLength) {
              itemIndex = _this3.state.dataLength - 1;
            }
          }
          break;
        case KEYS_EVENT.ENTER:
          {
            _this3.onSelectItem(_this3.props.items[itemIndex]);
          }
          break;
        default:
          itemIndex = -1;
          break;
      }

      var item = (0, _utils.getNodeById)('item_' + itemIndex);
      if (!item) return;
      var container = (0, _utils.getNodeById)('__listItemProps');
      (0, _utils.scrollIntoView)(item, container);

      _this3.setState({
        highlightedIndex: itemIndex
      });
    }
  };

  this.getInputProps = function (props) {
    var handleChange = props.onChange,
        handleBlur = props.onBlur,
        handleFocus = props.onFocus,
        handleKeyDown = props.onKeyDown,
        placeholder = props.placeholder;
    var inputValue = _this3.state.inputValue;


    var onKeyDown = function onKeyDown(e) {
      _this3.onKeyDown(e);
      if (typeof handleKeyDown === 'function') {
        handleKeyDown(e);
      }
    };

    var onChange = function onChange(e) {
      _this3.onChange(e);
      if (typeof handleChange === 'function') {
        handleChange(e.target.value);
      }
    };

    var onBlur = function onBlur(e) {
      _this3.onBlurInput(e);
      if (typeof handleBlur === 'function') {
        handleBlur(e.target.value);
      }
    };

    var onFocus = function onFocus(e) {
      _this3.onFocusInput(e);
      if (typeof handleFocus === 'function') {
        handleFocus(e.target.value);
      }
    };

    return _extends({}, props, {
      id: '__inputItemProps',
      placeholder: placeholder,
      onKeyDown: onKeyDown,
      onChange: onChange,
      onBlur: onBlur,
      onFocus: onFocus,
      value: inputValue
    });
  };

  this.getListItemProps = function (props) {
    return {
      id: '__listItemProps'
    };
  };

  this.getItemProps = function (props) {
    var item = props.item,
        index = props.index,
        handleSelectItem = props.handleSelectItem;

    var onClick = function onClick(e) {
      _this3.onSelectItem(item);
      if (typeof handleSelectItem === 'function') {
        handleSelectItem(e.target.value);
      }
    };

    return {
      onClick: onClick,
      id: 'item_' + index
    };
  };

  this.clickOutside = function (e) {
    if (_this3.__autoComplete && !_this3.__autoComplete.contains(e.target)) {
      _this3.setState({
        isOutsideClick: true,
        isOpen: false
      });
    }
  };

  this.clearInputValue = function () {
    _this3.setState({
      inputValue: ''
    });
  };
};

Suggestion.propTypes = {
  children: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.array.isRequired,
  initInputValue: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  id: _propTypes2.default.string,
  onSelectedItem: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  handleSelectItem: _propTypes2.default.func,
  getDisplayName: _propTypes2.default.func
};

Suggestion.defaultProps = {
  items: []
};

exports.default = Suggestion;