import React from 'react';
import mmhc from './index.css';
import cNs from 'classnames';

import jsonPath from '../../common/util/jsonPath.js';
import logo from "./img/logo.jpg";
import ios from "./img/iphone.jpg";
import android from "./img/android.jpg";
import honeybee from "./img/logo.png";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: ""
    };
  }
  render() {
    return (
      <div className={mmhc.main}>
        <div className={mmhc.honeybeeMain}>
          <img className={mmhc.honeybee} src={honeybee} alt=""/>
          <p className={mmhc.honeybeeDis1}>
            点击下方
            <em className={mmhc.honeybeeBtn1}>按</em>
            <em className={mmhc.honeybeeBtn2}>钮</em>
          </p>
          <p className={mmhc.honeybeeDis2}>下载蜜麻花APP</p>
        </div>
        <div className={mmhc.swing3DMain}>
          <div className={mmhc.ropeLeft}></div>
          <div className={mmhc.ropeRight}></div>
          <div className={mmhc.board}>
            <figure className={mmhc.front}></figure>
            <figure className={mmhc.top}></figure>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app" className={mmhc.ios}>
              <img src={ios} width="80px" alt=""/>
            </a>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app" className={mmhc.android}>
              <img src={android} width="80px" alt=""/>
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