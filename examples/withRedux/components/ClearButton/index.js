import React from 'react';
import styled from 'styled-components';

const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 5px;
  cursor: pointer;
  outline: none;
  padding: 0;
`;

function ClearButton(props) {
  const { onClick } = props;
  return (
    <ControllerButton onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="none"
        width={20}
        height={20}
        fill="#000000"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </ControllerButton>
  );
}
export default ClearButton;
