var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./todaySpecialPriceContent.css");
var priceImg = require("./price03.png");
var price07Img = require("./price07.png");
var price10Img = require("./price10.png");
var price14Img = require("./price14.png");

var TodaySpecialPriceContent = React.createClass({
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.single}>
          <div className={mmhc.priceImgCss}>
            <img src={priceImg} alt=""/>
            <div className={mmhc.imgSanJiao}>
              <img src={price14Img} alt=""/>
            </div>
          </div>
          <div className={mmhc.goods}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className={mmhc.singleSwiper}>
                      <img src={price07Img} alt=""/>
                      <p>￥1.00</p>
                      <p className={mmhc.oldPrice}>￥199.00</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className={mmhc.singleSwiper}>
                      <img src={price07Img} alt=""/>
                      <p>￥1.00</p>
                      <p className={mmhc.oldPrice}>￥199.00</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className={mmhc.singleSwiper}>
                      <img src={price07Img} alt=""/>
                      <p>￥1.00</p>
                      <p className={mmhc.oldPrice}>￥199.00</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <a href="#" className={cNs(mmhc.singleSwiper,mmhc.price10)}>
                      <img src={price10Img} alt=""/>
                    </a>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TodaySpecialPriceContent;