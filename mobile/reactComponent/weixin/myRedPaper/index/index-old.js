var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");

var myPic = require("./img/userImg.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      myRedPaperList: [],
      sumAmt: 0.00
    }
  },
  shareHandler: function() {
    this.setState({
      maskFlag: true
    })
  },
  shareHideHandler: function() {
    this.setState({
      maskFlag: false
    })
  },
  sliceMobile: function(num) {
    return num.slice(0, 4) + "-" + num.slice(7);
  },
  render: function() {
    return (
      <div className={mmhc.main}>
        <div className={mmhc.huabiBG}>
          {this.state.sumAmt}
        </div>
        <div className={mmhc.redSwiperPadd}>
          <div id="my_red_paper_container" className={cNs("swiper-container","swiper-container-horizontal",mmhc.redSwiper)}>
            <div className={cNs("swiper-wrapper")}>
              {
                this.state.myRedPaperList.map(function(RedPaper,index){
                  return <div key={index} className={cNs("swiper-slide",mmhc.swiperSlideRed)}>
                          <img className={mmhc.myPic} src={myPic} alt=""/>
                          <p className={mmhc.mobile}>{this.sliceMobile(RedPaper.user.mobile)}</p>
                          <em className={mmhc.amount}>{RedPaper.amt}元</em>
                         </div>
                }.bind(this))
              }
            </div>
          </div>
        </div>

        <a className={mmhc.shareBtn} onClick={this.shareHandler} href="javascript:void(0)">分享</a>
        
        <p className={mmhc.textMess}>
          分享给好友，再赚一笔。<br/>
          把“注册就得现金红包”的活动分享给好友，好友成功注册后您即可获得随机领取花币红包。
        </p>

        <div onClick={this.shareHideHandler} className={cNs(mmhc.shareMask,this.state.maskFlag==true?mmhc.show:"")}></div>
      </div>
    )
  },
  componentDidMount: function() {
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    }
    var userCode = getQueryString("userCode");
    $.ajax({
      url: jsonPath.path + '/listBackCash.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        userCode: userCode
      },
      success: function(data) {
        this.setState({
          myRedPaperList: data.bcashs,
          sumAmt: data.sumAmt
        }, function() {
          var swiper = new Swiper('#my_red_paper_container', {
            slidesPerView: 5,
            paginationClickable: true,
            spaceBetween: 10
          });
        });
      }.bind(this)
    });
  }
});

module.exports = Main;