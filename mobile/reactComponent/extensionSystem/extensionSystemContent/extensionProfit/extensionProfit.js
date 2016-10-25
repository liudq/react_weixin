var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./extensionProfit.css");
var tuiguangtouxiang19Img = require("./tuiguangtouxiang_19.png");
var imgPath = require("../../../common/util/path.js").path;

var ExtensionProfit = React.createClass({
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.section1}>
          <div className={mmhc.sec1Top}>
            <img src={tuiguangtouxiang19Img} alt=""/>
            <div>嘎嘎嘎</div>
          </div>
          <div className={mmhc.sec1Center1}>
            <div className={mmhc.sec1Left}>
              <p>我的推广金额(7天)</p>
              <p className={mmhc.sec1p}><i>{this.props.myUserBalance.psJine}</i>元</p>
            </div>
            <div className={mmhc.sec1Right}>
              <p>我的当前花币(7天)</p>
              <p className={mmhc.sec1p}><i>{this.props.myUserBalance.psHuabi}</i>花币</p>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          <div className={mmhc.sec1Center1}>
            <div className={mmhc.sec1Left}>
              <p>累计推广金额</p>
              <p className={mmhc.sec1p}><i>{this.props.myUserBalance.pJine}</i>元</p>
            </div>
            <div className={mmhc.sec1Right}>
              <p>累计获得花币</p>
              <p className={mmhc.sec1p}><i>{this.props.myUserBalance.pHuaBi}</i>花币</p>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          {/*<div className={mmhc.sec1Center1}>
            <div className={mmhc.sec1Left}>
              <p>本月推广任务</p>
              <p className={mmhc.sec1p}><i>1000.00</i>个</p>
            </div>
            <div className={mmhc.sec1Right}>
              <p>已推广</p>
              <p className={mmhc.sec1p}><i>1000.00</i>个</p>
            </div>
            <div className={mmhc.clear}></div>
          </div>*/}
          <div className={mmhc.sec1Bottom}>
            <p>已推广<i>{this.props.myUserBalance.totalCount}</i>个</p>
          </div>
        </div>
        {
           this.props.myUserBalancePaiHang.map(function(myUserBalancePaiHang, index) {
            return  index>1?"":<div key={index} className={mmhc.bottom}>
                      <div className={mmhc.bottomLeft}>
                        <img src={imgPath+myUserBalancePaiHang.promoterHeadUrl} alt=""/>
                      </div>
                      <div className={mmhc.bottomCenter}>
                        <p className={mmhc.bottomp1}>{myUserBalancePaiHang.userName}<i></i></p>
                        <p className={mmhc.bottomp2}>{myUserBalancePaiHang.promoterMobile}</p>
                      </div>
                      <div className={mmhc.bottomRight}>
                        <p className={mmhc.bottomRightp1}>+1.02元</p>
                        <p className={mmhc.bottomRightp2}>2016-01-21</p>
                      </div>
                      <div className={mmhc.clear}></div>
                    </div>
          }.bind(this))
        }
        
        
      </div>
    )
  },
  componentDidMount: function() {

  },
});

module.exports = ExtensionProfit;