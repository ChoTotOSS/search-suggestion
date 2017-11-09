import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Suggestion from 'search-suggestion';

import InputItem from '../../components/InputItem';
import ListItem from '../../components/ListItem/ListItem.js';
import Item from '../../components/ListItem/Item.js';
import ClearButton from '../../components/ClearButton';

import { fetchData, resetSearch } from './actions';

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

const Div = styled.div`
  position: relative;
`;

const LoadingWrapper = styled.div`
  text-align: center;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: []
    };
  }

  handleChange = keyword => {
    const { dispatch } = this.props;
    if (keyword) {
      dispatch(fetchData(keyword));
    } else {
      dispatch(resetSearch());
    }
  };
  render() {
    const { home: { data, fetching } } = this.props;
    return (
      <AppWrapper>
        <Suggestion getDisplayName={item => item.title} items={data}>
          {({
            getInputProps,
            getListItemProps,
            getItemProps,
            inputValue,
            highlightedIndex,
            items,
            isOpen,
            selectedItem,
            clearInputValue
          }) => (
            <Div>
              <InputItem
                {...getInputProps({
                  placeholder: 'Search hacker news by Title',
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

              {fetching && (
                <LoadingWrapper>
                  <img src="/static/loading.gif" alt="loading" />
                </LoadingWrapper>
              )}

              {isOpen && (
                <ListItem {...getListItemProps()}>
                  {items.map((item, index) => (
                    <Item
                      {...getItemProps({ item, index })}
                      key={item.objectID}
                      style={{
                        backgroundColor:
                          highlightedIndex === index
                            ? 'rgb(232, 232, 232)'
                            : 'white',
                        fontWeight:
                          selectedItem && selectedItem.title === item.title
                            ? 'bold'
                            : 'normal'
                      }}
                    >
                      {item.title}
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

const mapStateToProps = state => {
  return {
    home: state.home
  };
};

export default connect(mapStateToProps, null)(Home);
