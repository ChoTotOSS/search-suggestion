import React from 'react';
import withRedux from 'next-redux-wrapper';
import Home from '../containers/Home';
import { initStore } from '../store';

class Index extends React.Component {
  render() {
    return <Home {...this.props} />;
  }
}
export default withRedux(initStore, null, null)(Index);
