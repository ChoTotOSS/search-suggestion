import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  cursor: text;
  &:before {
    content: '';
    height: 1px;
    background-color: black;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transition: backgroundColor 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  &:after {
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    content: '';
    position: absolute;
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    background-color: #2962ff;
    ${props => props.isFocus && { transform: 'scaleX(1)' }};
  }
  &:hover {
    &:before {
      height: 2px;
    }
  }
`;

const TextField = styled.input`
  height: 1em;
  -webkit-appearance: textfield;
  width: 100%;
  padding: 7px 0;
  border: 0;
  margin: 0;
  display: block;
  box-sizing: content-box;
  background: none;
  vertical-align: middle;
  outline: none;
`;

class InputItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false
    };
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ isFocus: true });
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({ isFocus: false });
  };

  render() {
    const { isFocus } = this.state;
    const inputProps = {
      ...this.props,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };

    return (
      <InputWrapper isFocus={isFocus}>
        <TextField {...inputProps} />
      </InputWrapper>
    );
  }
}

export default InputItem;
