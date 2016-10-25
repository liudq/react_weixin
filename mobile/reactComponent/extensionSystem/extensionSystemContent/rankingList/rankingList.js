var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./rankingList.css");
var tuiguang03Img = require("./tuiguang_03.png");
var tuiguang06Img = require("./tuiguangtouxiang_06.png");

var RankingList = React.createClass({
  render: function() {
    return (
      <div classnames={mmhc.content}>
        <div className={cNs(mmhc.numberOne,this.props.paiHangNum==0?mmhc.none:"")}>
          <div className={mmhc.numberOneLeft}>1</div>
          <div className={mmhc.numberOneHeader}>
            <img src={tuiguang06Img} alt=""/>
          </div>
          <div className={mmhc.numberOneUser}>
            <p className={mmhc.numberOneName}>{this.props.paihang[0].userName}</p>
            <p className={mmhc.numberOnePrice}>累计获得:{this.props.paihang[0].allExtensBalance}元</p>
          </div>
          <div className={cNs(mmhc.numberOneUser,mmhc.numberOneRight)}>
            <p className={mmhc.numberOneName}>推广{this.props.paihang[0].totalPromote}人</p>
            <p className={mmhc.numberOnePrice}>{this.props.paihang[0].aggBalance}花币</p>
          </div>
          <div className={mmhc.clear}></div>
        </div>
        <div className={cNs(mmhc.numberOne,mmhc.numberSecond,this.props.paiHangNum<=1?mmhc.none:"")}>
          <div className={mmhc.numberOneLeft}>2</div>
          <div className={cNs(mmhc.numberOneHeader,mmhc.numberSecondHeader)}>
            <img src={tuiguang06Img} alt=""/>
          </div>
          <div className={mmhc.numberOneUser}>
            <p className={mmhc.numberOneName}>{this.props.paihang[1].userName}</p>
            <p className={mmhc.numberOnePrice}>累计获得:{this.props.paihang[1].allExtensBalance}元</p>
          </div>
          <div className={cNs(mmhc.numberOneUser,mmhc.numberOneRight)}>
            <p className={mmhc.numberOneName}>推广{this.props.paihang[1].totalPromote}人</p>
            <p className={mmhc.numberOnePrice}>{this.props.paihang[1].aggBalance}花币</p>
          </div>
          <div className={mmhc.clear}></div>
        </div>
        <div className={cNs(mmhc.numberOne,mmhc.numberThird,this.props.paiHangNum<=2?mmhc.none:"")}>
          <div className={mmhc.numberOneLeft}>3</div>
          <div className={cNs(mmhc.numberOneHeader,mmhc.numberThirdHeader)}>
            <img src={tuiguang06Img} alt=""/>
          </div>
          <div className={mmhc.numberOneUser}>
            <p className={mmhc.numberOneName}>{this.props.paihang[2].userName}</p>
            <p className={mmhc.numberOnePrice}>累计获得:{this.props.paihang[2].allExtensBalance}元</p>
          </div>
          <div className={cNs(mmhc.numberOneUser,mmhc.numberOneRight)}>
            <p className={mmhc.numberOneName}>推广{this.props.paihang[2].totalPromote}人</p>
            <p className={mmhc.numberOnePrice}>{this.props.paihang[2].aggBalance}花币</p>
          </div>
          <div className={mmhc.clear}></div>
        </div>
        {
           this.props.paihang.map(function(paihang, index) {
            return  index<4?"":<div key={index} className={cNs(mmhc.numberOne,mmhc.numberOther,mmhc.mySelf)}>
                      <div className={cNs(mmhc.numberOneLeft,mmhc.numberOneOther)}>{index}</div>
                      <div className={cNs(mmhc.numberOtherHeader)}>
                        <img src={tuiguang06Img} alt=""/>
                      </div>
                      <div className={mmhc.numberOneUser}>
                        <p className={mmhc.numberOneName}>{paihang.userName}</p>
                        <p className={mmhc.numberOnePrice}>累计获得:{paihang.allExtensBalance}元</p>
                      </div>
                      <div className={cNs(mmhc.numberOneUser,mmhc.numberOneRight)}>
                        <p className={mmhc.numberOneName}>推广{paihang.totalPromote}人</p>
                        <p className={mmhc.numberOnePrice}>{paihang.aggBalance}花币</p>
                      </div>
                      <div className={mmhc.clear}></div>
                    </div>
          }.bind(this))
        }
        
      </div>
    )
  }
});

module.exports = RankingList;