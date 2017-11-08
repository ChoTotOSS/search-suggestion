import React, { Component } from 'react';
import styled from 'styled-components';
import Suggestion from 'search-suggestion';
import InputItem from '../components/InputItem';
import ListItem from '../components/ListItem/ListItem.js';
import Item from '../components/ListItem/Item.js';
import ClearButton from '../components/ClearButton';
import countries from '../countries';

const AppWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  width: 80%;
  margin: 0 auto;
  input {
    font-size: 16px;
  }
`;
const Div = styled.div`position: relative;`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      currentData: []
    };
  }

  createData = (word, data) => {
    const re = new RegExp(`${word.toLowerCase()}.*\\B`, 'g');
    return data.filter(item => re.test(item.name.toLowerCase()));
  };

  handleChange = value => {
    let filterData = [];
    if (value) {
      filterData = this.createData(value, countries);
    }
    this.setState({
      currentData: filterData
    });
  };

  handleSelectedItem = item => {
    this.setState({
      selectedItem: item
    });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <AppWrapper>
        <p>
          {selectedItem.code} - {selectedItem.name}
        </p>
        <Suggestion
          getDisplayName={item => item.name}
          items={this.state.currentData}
          onSelectedItem={item => this.handleSelectedItem(item)}
        >
          {({
            getInputProps,
            getListItemProps,
            getItemProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            items,
            isOpen,
            clearInputValue
          }) => (
            <Div>
              <InputItem
                {...getInputProps({
                  placeholder: 'Select country',
                  onChange: this.handleChange
                })}
              />
              {inputValue && (
                <ClearButton
                  onClick={() => {
                    clearInputValue();
                    this.handleChange('');
                  }}
                />
              )}

              {isOpen && (
                <ListItem {...getListItemProps()}>
                  {items.map((item, index) => (
                    <Item
                      {...getItemProps({ item, index })}
                      key={item.code}
                      style={{
                        backgroundColor:
                          highlightedIndex === index
                            ? 'rgb(232, 232, 232)'
                            : 'white',
                        fontWeight:
                          selectedItem && selectedItem.code === item.code
                            ? 'bold'
                            : 'normal'
                      }}
                    >
                      {item.name}
                    </Item>
                  ))}
                </ListItem>
              )}
            </Div>
          )}
        </Suggestion>
      </AppWrapper>
    );
  }
}

export default App;
