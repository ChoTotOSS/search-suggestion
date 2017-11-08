'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16


var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('utils scrollIntoView()', function () {
  it('does not throw with a null node', function () {
    expect(function () {
      return (0, _utils.scrollIntoView)(null);
    }).not.toThrow();
  });

  it('does not throw if the given node is the root node', function () {
    var node = getNode();
    expect(function () {
      return (0, _utils.scrollIntoView)(node, node);
    }).not.toThrow();
  });

  it('does nothing if the node is within the scrollable area', function () {
    var scrollableScrollTop = 2;
    var node = getNode({ height: 10, top: 6 });
    var scrollableNode = getScrollableNode({
      scrollTop: scrollableScrollTop,
      children: [node]
    });
    (0, _utils.scrollIntoView)(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(scrollableScrollTop);
  });

  it('aligns to top when the node is above the scrollable parent', function () {
    // TODO: make this test a tiny bit more readable/maintainable...
    var nodeTop = 2;
    var scrollableScrollTop = 13;
    var node = getNode({ height: 10, top: nodeTop });
    var scrollableNode = getScrollableNode({
      top: 10,
      scrollTop: scrollableScrollTop,
      children: [node]
    });
    (0, _utils.scrollIntoView)(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(5);
  });

  it('aligns to bottom when the node is below the scrollable parent', function () {
    var nodeTop = 115;
    var node = getNode({ height: 10, top: nodeTop });
    var scrollableNode = getScrollableNode({
      height: 100,
      children: [node]
    });
    (0, _utils.scrollIntoView)(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(25);
  });

  it('aligns to bottom when the the node is below the scrollable parent and scrollable parent has a border', function () {
    var nodeTop = 115;
    var node = getNode({ height: 10, top: nodeTop });
    var scrollableNode = getScrollableNode({
      height: 100,
      children: [node],
      borderBottomWidth: '2px',
      borderTopWidth: '2px'
    });
    (0, _utils.scrollIntoView)(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(27);
  });
});

function getScrollableNode() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return getNode(_extends({
    height: 100,
    top: 0,
    scrollTop: 0,
    clientHeight: 50,
    scrollHeight: 150
  }, overrides));
}

function getNode() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 0 : _ref$top,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 0 : _ref$height,
      _ref$scrollTop = _ref.scrollTop,
      scrollTop = _ref$scrollTop === undefined ? 0 : _ref$scrollTop,
      _ref$scrollHeight = _ref.scrollHeight,
      scrollHeight = _ref$scrollHeight === undefined ? height : _ref$scrollHeight,
      _ref$clientHeight = _ref.clientHeight,
      clientHeight = _ref$clientHeight === undefined ? height : _ref$clientHeight,
      _ref$children = _ref.children,
      children = _ref$children === undefined ? [] : _ref$children,
      _ref$borderBottomWidt = _ref.borderBottomWidth,
      borderBottomWidth = _ref$borderBottomWidt === undefined ? 0 : _ref$borderBottomWidt,
      _ref$borderTopWidth = _ref.borderTopWidth,
      borderTopWidth = _ref$borderTopWidth === undefined ? 0 : _ref$borderTopWidth;

  var div = document.createElement('div');
  div.getBoundingClientRect = function () {
    return {
      width: 50,
      height: height,
      top: top,
      left: 0,
      right: 50,
      bottom: height
    };
  };
  div.style.borderTopWidth = borderTopWidth;
  div.style.borderBottomWidth = borderBottomWidth;
  div.scrollTop = scrollTop;

  Object.defineProperties(div, {
    clientHeight: { value: clientHeight },
    scrollHeight: { value: scrollHeight }
  });
  children.forEach(function (child) {
    return div.appendChild(child);
  });
  return div;
}