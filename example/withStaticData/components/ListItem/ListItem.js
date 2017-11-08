import React from 'react';
import styled from 'styled-components';

const ListItemWrapper = styled.div`
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

function ListItem(props) {
  return <ListItemWrapper {...props}>{props.children}</ListItemWrapper>;
}

export default ListItem;
