<div align="center">
  <img src="https://user-images.githubusercontent.com/6290720/32546955-46d0fb54-c4b3-11e7-9a92-d96fb2b7b1ad.png" alt="downshift logo" title="downshift logo" width="250">
  <br>
  <br>
</div>

[![Build Status](https://travis-ci.org/ChoTotOSS/search-suggestion.svg?branch=master)](https://travis-ci.org/ChoTotOSS/search-suggestion)
[![codecov](https://codecov.io/gh/ChoTotOSS/search-suggestion/branch/master/graph/badge.svg)](https://codecov.io/gh/ChoTotOSS/search-suggestion)
[![npm version](https://badge.fury.io/js/search-suggestion.svg)](https://badge.fury.io/js/search-suggestion)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ChoTotOSS/search-suggestion/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Search Suggestion

Simple lightweight search suggestion component. This component was inspired by
[downshift (paypal)](https://github.com/paypal/downshift) component.

The component applied `Function as Child Components` pattern. You can read more
about this pattern
[here](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9)

## Table content

* [Installation](https://github.com/ChoTotOSS/search-suggestion#installation)
* [Usage](https://github.com/ChoTotOSS/search-suggestion#usage)
* [Examples](https://github.com/ChoTotOSS/search-suggestion#examples)
* [Props](https://github.com/ChoTotOSS/search-suggestion#props)
* [Child callback functions](https://github.com/ChoTotOSS/search-suggestion#child-callback-functions)
* [Actions](https://github.com/ChoTotOSS/search-suggestion#actions)
* [States](https://github.com/ChoTotOSS/search-suggestion#states)
* [Showcase](https://github.com/ChoTotOSS/search-suggestion#showcase)
* [Alternatives](https://github.com/ChoTotOSS/search-suggestion#alternatives)

## Installation

```bash
npm install --save search-suggestion
```

or

```bash
yarn add search-suggestion
```

## Usage

You can check out the basic demo here:
[https://codesandbox.io/s/n45j5zjwyj](https://codesandbox.io/s/n45j5zjwyj)

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import Suggestion from 'search-suggestion';

const items = ['apple', 'pear', 'orange', 'grape', 'banana'];

class App extends Component {
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

  handleChange = value => {
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
            <p>selected item: {selectedItem}</p>
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

render(<App />, document.getElementById('root'));
```

## Examples

* [with simple basic data](https://github.com/ChoTotOSS/search-suggestion/tree/master/examples/withBasic)
* [with simple list object data](https://github.com/ChoTotOSS/search-suggestion/tree/master/examples/withStaticData)
* [with redux](https://github.com/ChoTotOSS/search-suggestion/tree/master/examples/withRedux)

## Props

### items

> `Array` | default is an empty array

Use as a datasource to render list result.

### getDisplayName

> `function(item: any)` => return a text

Use to display text content of selected item.

### onSelectedItem

> `function(item: any)`

Use to set new selected item value and extend the actions based on that selected
item.

## Child callback functions

### getInputProps

> `function({})`

Returns the props you should apply to the `input` element that you render.

### getListItemProps

> `function({})`

Returns the props you should apply to the list item element that you render.

### getItemProps

> `function({})`

Returns the props you should apply to any menu item elements you render.

## Actions

### clearInputValue

> `function()`

Clear current value in `input` element

## States

### inputValue

> `string`

The current value of `input` element

### highlightedIndex

> `int`

The current index of highlighted item

### items

> `array`

The current data of menu

### isOpen

> `boolean`

The menu open state

### selectedItem

The value of selected item

## Showcase

Websites built with Search Suggestion component

### [Chợ tốt](https://www.chotot.com/toan-quoc/mua-ban)

![suggestion](https://user-images.githubusercontent.com/6290720/32546438-b18b9ba4-c4b1-11e7-99d4-e2a7e39191ce.gif)

### [Chợ tốt nhà](https://nha.chotot.com/toan-quoc/du-an-rg0-cg10000)

![new_property_suggestion](https://user-images.githubusercontent.com/6290720/32546472-d117d3d4-c4b1-11e7-9d10-145a0595463e.gif)

## Alternatives

If you don’t agree with the choices made in this project, you might want to
explore alternatives with different tradeoffs. Some of the more popular and
actively maintained ones are:

* [react-select](https://github.com/JedWatson/react-select)
* [react-autocomplete](https://github.com/reactjs/react-autocomplete)
* [downshift](https://github.com/paypal/downshift/)
