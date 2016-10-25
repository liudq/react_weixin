var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./myTeam.css");
var tuiguangtouxiang12Img = require("./tuiguangtouxiang_12.png");

var MyTeamState = React.createClass({
  render: function() {
    return (
      <div className={mmhc.content}>

        {
           this.props.promoteList.map(function(promoteList, index) {
            return  <div key={index} className={mmhc.singleContent}>
                      <div className={mmhc.singleLeft}>
                        <img src={tuiguangtouxiang12Img}alt=""/>
                      </div>
                      <div className={mmhc.singleRight}>
                        <div className={mmhc.singleRightSec1}>
                          <div className={mmhc.sec1Left}>
                            <p className={mmhc.sec1LeftP1}>{promoteList.userName}<i> (直接关系)</i></p>
                            <p className={mmhc.sec1LeftP2}>{promoteList.promoterMobile}</p>
                          </div>
                          <div className={mmhc.sec1Right}>
                            <p className={mmhc.sec1LeftP1}>+{promoteList.zhijieJine}元</p>
                            <p className={mmhc.sec1LeftP2}>+{promoteList.zhijieHuabi}花币</p>
                          </div>
                          <div className={mmhc.clear}></div>
                        </div>
                        <div className={mmhc.singleRightSec2}>
                          <div className={mmhc.sec1Left}>
                            <p className={mmhc.sec1LeftP1}>推广<i className={mmhc.num}>{promoteList.promoteNount}</i>人<i> (间接关系)</i></p>
                          </div>
                          <div className={mmhc.sec1Right}>
                            <p className={mmhc.sec1LeftP1}>+{promoteList.jianjieJine}元</p>
                            <p className={mmhc.sec1LeftP2}>+{promoteList.jianjieHuaBi}花币</p>
                          </div>
                        </div>
                      </div>
                      <div className={mmhc.clear}></div>
                    </div>
          }.bind(this))
        }
        
      </div>
    )
  }
});

module.exports = MyTeamState;