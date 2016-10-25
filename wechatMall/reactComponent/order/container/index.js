import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';

import MainComponent from '../carOrder/carOrder.js';
import BottomDownload from '../../common/downloadGuide';
import LeftMenu from '../../common/leftMenu';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return (
      <div id="swiper-container" className={cNs("swiper-container",mmhc.swiperContainer)}>
          <div className={cNs("swiper-wrapper",mmhc.swiperWrapper)}>
              <div style={{"display":"none"}} className={cNs("swiper-slide",mmhc.swiperSlide,mmhc.slideLeft)}>
                <LeftMenu/>
              </div>
              <div className={cNs("swiper-slide",mmhc.swiperSlide,mmhc.slideRight)}>
                <div className={mmhc.myContainer}>
                  <div className={mmhc.myContainerT}></div>
                  <div className={mmhc.myContainerC}>
                    <MainComponent/>
                  </div>
                  <div className={mmhc.myContainerB}>
                    <BottomDownload/>
                  </div>
                </div>
              </div>
          </div>
      </div>
    )
  }
  componentDidMount() {
    var swiper = new Swiper('#swiper-container', {
      slidesPerView: 'auto',
      paginationClickable: true,
      spaceBetween: 10,
      initialSlide: 1,
      onSlideChangeStart: function() {}
    });
    $("." + mmhc.slideRight).on('mousedown', function(e) {
      // e.preventDefault();
      swiper.slideTo($(this).index());
    });
  }
}

export
default Main;