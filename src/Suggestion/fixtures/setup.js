import React from 'react';

import Suggestion from '../';
import countries from './data';

export const KEYS_EVENT = {
  UP: 38,
  DOWN: 40,
  ESCAPE: 27,
  ENTER: 13
};

export function createData(word, data) {
  const re = new RegExp(`${word.toLowerCase()}.*\\B`, 'g');
  return data.filter(item => re.test(item.name.toLowerCase()));
}

export function handleChange(e) {
  const value = e.target.value;
  let filterData = [];
  if (value) {
    filterData = createData(value, countries);
  }
  return filterData;
}

export default function setup({
  data = countries,
  inputProps = {},
  itemProps = {}
} = {}) {
  const Children = jest.fn(
    ({
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
            placeholder: 'Select your country',
            onChange: handleChange,
            ...inputProps
          })}
        />

        {inputValue && (
          <button id="btnClear" onClick={clearInputValue}>
            clear
          </button>
        )}

        {isOpen && (
          <div {...getListItemProps()}>
            {items.map((item, index) => {
              return (
                <div
                  {...getItemProps({ item, index, ...itemProps })}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  );

  function BasicAutoComplete(props) {
    return (
      <Suggestion items={data} {...props}>
        {Children}
      </Suggestion>
    );
  }
  return {
    BasicAutoComplete,
    Children
  };
}
