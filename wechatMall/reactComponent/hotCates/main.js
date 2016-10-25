import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
  render
} from 'react-dom';
import Container from './hotCates/hotCates.js';
import MyAlert from '../common/mmhAlert/mmhAlert.js';
class Main extends React.Component {
  render() {
    return (
      <div style={{"height":"100%"}}>
    { /*<MyAlert/>*/ }
        <Container/>
      </div>
    )
  }
};
render(
  <Main />,
  document.getElementById("mmhContainer")
);