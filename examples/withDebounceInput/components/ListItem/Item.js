import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgb(232, 232, 232);
  }
`;

function Item(props) {
  return <ItemWrapper {...props}>{props.children}</ItemWrapper>;
}

export default Item;
