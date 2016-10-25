import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
  render
} from 'react-dom';
import DownloadGuide from './downloadGuide';

class Main extends React.Component {
  render() {
    return (
      <DownloadGuide/>
    )
  }
}

render(
  <Main />,
  document.getElementById("mmhContainer")
);