"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollIntoView = scrollIntoView;
exports.getNodeById = getNodeById;
var getClosestScrollParent = findParent.bind(null, function (node) {
  return node.scrollHeight > node.clientHeight;
});

function findParent(finder, node, rootNode) {
  if (node !== null && node !== rootNode.parentNode) {
    if (finder(node)) {
      return node;
    } else {
      return findParent(finder, node.parentNode, rootNode);
    }
  } else {
    return null;
  }
}

function scrollIntoView(node, rootNode) {
  var scrollParent = getClosestScrollParent(node, rootNode);
  if (scrollParent === null) {
    return;
  }

  // getComputedStyle is a function belong to "window"
  var scrollParentStyles = getComputedStyle(scrollParent);
  var scrollParentRect = scrollParent.getBoundingClientRect();
  var scrollParentBorderTopWidth = parseInt(scrollParentStyles.borderTopWidth, 10);
  var scrollParentBorderBottomWidth = parseInt(scrollParentStyles.borderBottomWidth, 10);
  var scrollParentTop = scrollParentRect.top + scrollParentBorderTopWidth;
  var nodeRect = node.getBoundingClientRect();
  var nodeOffsetTop = nodeRect.top + scrollParent.scrollTop;
  var nodeTop = nodeOffsetTop - scrollParentTop;
  if (nodeTop < scrollParent.scrollTop) {
    // the item is above the scrollable area
    scrollParent.scrollTop = nodeTop;
  } else if (nodeTop + nodeRect.height + scrollParentBorderTopWidth + scrollParentBorderBottomWidth > scrollParent.scrollTop + scrollParentRect.height) {
    // the item is below the scrollable area
    scrollParent.scrollTop = nodeTop + nodeRect.height - scrollParentRect.height + scrollParentBorderTopWidth + scrollParentBorderBottomWidth;
  }
  // the item is within the scrollable area (do nothing)
}

function getNodeById(id) {
  return document.getElementById(id);
}