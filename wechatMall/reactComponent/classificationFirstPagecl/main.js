import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
  render
} from 'react-dom';
import MyRebate from './container/index.js';

class Main extends React.Component {
  render() {
    return (
      <MyRebate/>
    )
  }
}

render(
  <Main />,
  document.getElementById("mmhContainer")
);