const getClosestScrollParent = findParent.bind(
  null,
  node => node.scrollHeight > node.clientHeight
);

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

export function scrollIntoView(node, rootNode) {
  const scrollParent = getClosestScrollParent(node, rootNode);
  if (scrollParent === null) {
    return;
  }

  // getComputedStyle is a function belong to "window"
  const scrollParentStyles = getComputedStyle(scrollParent);
  const scrollParentRect = scrollParent.getBoundingClientRect();
  const scrollParentBorderTopWidth = parseInt(
    scrollParentStyles.borderTopWidth,
    10
  );
  const scrollParentBorderBottomWidth = parseInt(
    scrollParentStyles.borderBottomWidth,
    10
  );
  const scrollParentTop = scrollParentRect.top + scrollParentBorderTopWidth;
  const nodeRect = node.getBoundingClientRect();
  const nodeOffsetTop = nodeRect.top + scrollParent.scrollTop;
  const nodeTop = nodeOffsetTop - scrollParentTop;
  if (nodeTop < scrollParent.scrollTop) {
    // the item is above the scrollable area
    scrollParent.scrollTop = nodeTop;
  } else if (
    nodeTop +
      nodeRect.height +
      scrollParentBorderTopWidth +
      scrollParentBorderBottomWidth >
    scrollParent.scrollTop + scrollParentRect.height
  ) {
    // the item is below the scrollable area
    scrollParent.scrollTop =
      nodeTop +
      nodeRect.height -
      scrollParentRect.height +
      scrollParentBorderTopWidth +
      scrollParentBorderBottomWidth;
  }
  // the item is within the scrollable area (do nothing)
}

export function getNodeById(id) {
  return document.getElementById(id);
}
