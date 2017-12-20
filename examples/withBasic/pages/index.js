import React, { Component } from 'react';
import Suggestion from 'search-suggestion';

const items = ['apple', 'pear', 'orange', 'grape', 'banana'];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: []
    };
  }

  createData = (word, data) => {
    const re = new RegExp(`${word.toLowerCase()}.*\\B`, 'g');
    return data.filter(item => re.test(item.toLowerCase()));
  };

  handleChange = e => {
    const value = e.target.value;
    let filterData = [];
    if (value) {
      filterData = this.createData(value, items);
    }
    this.setState({
      currentData: filterData
    });
  };

  render() {
    return (
      <Suggestion
        getDisplayName={item => item}
        items={this.state.currentData}
        onSelectedItem={item => alert(item)}
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
          <div>
            <input
              {...getInputProps({
                placeholder: 'Select fruit',
                onChange: this.handleChange
              })}
            />
            {isOpen && (
              <div {...getListItemProps()}>
                {items.map((item, index) => (
                  <div
                    {...getItemProps({ item, index })}
                    key={item.code}
                    style={{
                      backgroundColor:
                        highlightedIndex === index
                          ? 'rgb(232, 232, 232)'
                          : 'white',
                      fontWeight:
                        selectedItem && selectedItem === item
                          ? 'bold'
                          : 'normal'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Suggestion>
    );
  }
}

export default Index;
