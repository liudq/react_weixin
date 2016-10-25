import React from 'react';
import mmhc from './index.css';
import cNs from 'classnames';

import jsonPath from '../../common/util/jsonPath.js';
import logo from "./img/logo.jpg";
import ios from "./img/iphone.jpg";
import android from "./img/android.jpg";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }
  render() {
    return (
      <div className={mmhc.main}>
        <div className={mmhc.main3dContainer}>
          <div className={mmhc.leftRope}>
            <section className={mmhc.leftRopeTop}></section>
            <em className={mmhc.leftRopeCircle}></em>
          </div>
          <div className={mmhc.rightRope}>
            <section className={mmhc.leftRopeTop}></section>
            <em className={mmhc.leftRopeCircle}></em>
          </div>
          <div className={mmhc.mainPanel}>
            <img className={mmhc.logo} src={logo} alt=""/>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app" className={mmhc.downloadBtn}>
              <img className={mmhc.downloadImg} src={ios} alt=""/>
              <section className={mmhc.downloadText}>IOS下载</section>
            </a>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app" className={mmhc.downloadBtn}>
              <img className={mmhc.downloadImg} src={android} alt=""/>
              <section className={mmhc.downloadText}>Android下载</section>
            </a>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {

  }
}

export
default Main;