'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;


describe('Suggestion render list item', function () {
  it('should render list items', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      _2.default,
      null,
      function (_ref) {
        var getItemProps = _ref.getItemProps;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            getItemProps({ index: 0, item: 0 }),
            '0'
          ),
          _react2.default.createElement(
            'span',
            getItemProps({ index: 1, item: 1 }),
            '1'
          ),
          _react2.default.createElement(
            'span',
            getItemProps({ index: 2, item: 2 }),
            '2'
          ),
          _react2.default.createElement(
            'span',
            getItemProps({ index: 3, item: 3 }),
            '3'
          ),
          _react2.default.createElement(
            'span',
            getItemProps({ index: 4, item: 4 }),
            '4'
          )
        );
      }
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});