// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { scrollIntoView } from '../utils';

const { describe, it } = global;
Enzyme.configure({ adapter: new Adapter() });

describe('utils scrollIntoView()', () => {
  it('does not throw with a null node', () => {
    expect(() => scrollIntoView(null)).not.toThrow();
  });

  it('does not throw if the given node is the root node', () => {
    const node = getNode();
    expect(() => scrollIntoView(node, node)).not.toThrow();
  });

  it('does nothing if the node is within the scrollable area', () => {
    const scrollableScrollTop = 2;
    const node = getNode({ height: 10, top: 6 });
    const scrollableNode = getScrollableNode({
      scrollTop: scrollableScrollTop,
      children: [node]
    });
    scrollIntoView(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(scrollableScrollTop);
  });

  it('aligns to top when the node is above the scrollable parent', () => {
    // TODO: make this test a tiny bit more readable/maintainable...
    const nodeTop = 2;
    const scrollableScrollTop = 13;
    const node = getNode({ height: 10, top: nodeTop });
    const scrollableNode = getScrollableNode({
      top: 10,
      scrollTop: scrollableScrollTop,
      children: [node]
    });
    scrollIntoView(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(5);
  });

  it('aligns to bottom when the node is below the scrollable parent', () => {
    const nodeTop = 115;
    const node = getNode({ height: 10, top: nodeTop });
    const scrollableNode = getScrollableNode({
      height: 100,
      children: [node]
    });
    scrollIntoView(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(25);
  });

  it('aligns to bottom when the the node is below the scrollable parent and scrollable parent has a border', () => {
    const nodeTop = 115;
    const node = getNode({ height: 10, top: nodeTop });
    const scrollableNode = getScrollableNode({
      height: 100,
      children: [node],
      borderBottomWidth: '2px',
      borderTopWidth: '2px'
    });
    scrollIntoView(node, scrollableNode);
    expect(scrollableNode.scrollTop).toBe(27);
  });
});

function getScrollableNode(overrides = {}) {
  return getNode({
    height: 100,
    top: 0,
    scrollTop: 0,
    clientHeight: 50,
    scrollHeight: 150,
    ...overrides
  });
}

function getNode(
  {
    top = 0,
    height = 0,
    scrollTop = 0,
    scrollHeight = height,
    clientHeight = height,
    children = [],
    borderBottomWidth = 0,
    borderTopWidth = 0
  } = {}
) {
  const div = document.createElement('div');
  div.getBoundingClientRect = () => ({
    width: 50,
    height,
    top,
    left: 0,
    right: 50,
    bottom: height
  });
  div.style.borderTopWidth = borderTopWidth;
  div.style.borderBottomWidth = borderBottomWidth;
  div.scrollTop = scrollTop;

  Object.defineProperties(div, {
    clientHeight: { value: clientHeight },
    scrollHeight: { value: scrollHeight }
  });
  children.forEach(child => div.appendChild(child));
  return div;
}
