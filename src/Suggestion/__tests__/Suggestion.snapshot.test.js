import React from 'react';
import renderer from 'react-test-renderer';
import Suggestion from '../';

const { describe, it } = global;

describe('Suggestion render list item', () => {
  it('should render list items', () => {
    const tree = renderer
      .create(
        <Suggestion>
          {({ getItemProps }) => (
            <div>
              <span {...getItemProps({ index: 0, item: 0 })}>0</span>
              <span {...getItemProps({ index: 1, item: 1 })}>1</span>
              <span {...getItemProps({ index: 2, item: 2 })}>2</span>
              <span {...getItemProps({ index: 3, item: 3 })}>3</span>
              <span {...getItemProps({ index: 4, item: 4 })}>4</span>
            </div>
          )}
        </Suggestion>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
