import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
  render
} from 'react-dom';
import MyRebate from './container/index.js';
import MmhAlert from "../common/mmhAlert/mmhAlert.js";

class Main extends React.Component {
  render() {
    return (
      <div style={{"height":"100%"}}>
        <MmhAlert/>
        <MyRebate/>
      </div>


    )
  }
}

render(
  <Main />,
  document.getElementById("mmhContainer")
);