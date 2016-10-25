var CNs = require('classnames');
var React = require("react");
var mmhc = require("./activityFree.css");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var backImg = require("./order2.png");
var sshareImg = require("./share.png");
var bannerImg = require("./banner.png");
var activityImg = require("./activity.png");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var back2Img = require("./back2.png");
var share2Img = require("./share2.png");
var ActivityFree = React.createClass({
  getInitialState: function() {
    return {
      fromHome: "",
      act: mmhc.on,
      oneDayOne: [],
      oneDayTwo: [],
      oneDayThree: [],
      oneDayFour: [],
      bok: true,
      versionTitel: 0
    }
  },
  fnFD: function() {
    this.setState({
      act: mmhc.on,
      act2: "",
      act3: "",
      act4: "",
      act5: ""
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.oneDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            bok: true,
            oneDayOne: data.oneDay.tenAM,
            oneDayTwo: data.oneDay.twoPM,
            oneDayThree: data.oneDay.sixPM,
            oneDayFour: data.oneDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  },
  fnSD: function() {
    this.setState({
      act: "",
      act2: mmhc.on,
      act3: "",
      act4: "",
      act5: ""
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.twoDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            bok: true,
            oneDayOne: data.twoDay.tenAM,
            oneDayTwo: data.twoDay.twoPM,
            oneDayThree: data.twoDay.sixPM,
            oneDayFour: data.twoDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  },
  fnTD: function() {
    this.setState({
      act: "",
      act2: "",
      act3: mmhc.on,
      act4: "",
      act5: ""
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.threeDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            bok: true,
            oneDayOne: data.threeDay.tenAM,
            oneDayTwo: data.threeDay.twoPM,
            oneDayThree: data.threeDay.sixPM,
            oneDayFour: data.threeDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  },
  fnFoD: function() {
    this.setState({
      act: "",
      act2: "",
      act3: "",
      act4: mmhc.on,
      act5: ""
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.fourDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            bok: true,
            oneDayOne: data.fourDay.tenAM,
            oneDayTwo: data.fourDay.twoPM,
            oneDayThree: data.fourDay.sixPM,
            oneDayFour: data.fourDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  },
  fnFrD: function() {
    this.setState({
      act: "",
      act2: "",
      act3: "",
      act4: "",
      act5: mmhc.on
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.fiveDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            bok: true,
            oneDayOne: data.fiveDay.tenAM,
            oneDayTwo: data.fiveDay.twoPM,
            oneDayThree: data.fiveDay.sixPM,
            oneDayFour: data.fiveDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={CNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
          {this.state.fromHome==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
          母亲节返场 中奖名单
        </div>
        <div className={mmhc.banner}>         
          <img src={bannerImg} alt=""/>
        </div>
        <div className={mmhc.titCon}>
          <h3><span>母亲节返场</span><span>免单获得者</span></h3>
          <p>全天整点支付前五名</p>
        </div>
        <ul className={CNs(mmhc.tabCon,mmhc.clearfix)}>
          <li className={this.state.act} onClick={this.fnFD}>5月18日</li>
          <li className={this.state.act2} onClick={this.fnSD}>5月19日</li>
          <li className={this.state.act3} onClick={this.fnTD}>5月20日</li>
          <li className={this.state.act4} onClick={this.fnFoD}>5月21日</li>
          <li className={this.state.act5} onClick={this.fnFrD}>5月22日</li>
        </ul>
        <div className={mmhc.titCon}>
          <h3><span>各时段付款前5名</span></h3>
          <p>恭喜以下客户获得免单（免单金额直接存入至账户余额）</p>
        </div>
        <ul className={CNs(mmhc.timeCon,mmhc.clearfix)}>
          <li><p>10点</p></li>
          <li><p>14点</p></li>
          <li><p>18点</p></li>
          <li><p>22点</p></li>
        </ul>
        <p className={CNs(this.state.bok==false?mmhc.show:mmhc.hide,mmhc.tipNone)}>暂无数据~</p>
        <ul className={CNs(this.state.bok==true?mmhc.show:mmhc.hide,mmhc.nameCon,mmhc.clearfix)}>
          <li>
            {
              this.state.oneDayOne.map(function(phoList,index){
                return <p key={index} data={phoList}>{phoList}</p>;
              }.bind(this))
            }
          </li>
          <li>
            {
              this.state.oneDayTwo.map(function(phoList,index){
                return <p key={index} data={phoList}>{phoList}</p>;
              }.bind(this))
            }
          </li>
          <li>
            {
              this.state.oneDayThree.map(function(phoList,index){
                return <p key={index} data={phoList}>{phoList}</p>;
              }.bind(this))
            }
          </li>
          <li>
            {
              this.state.oneDayFour.map(function(phoList,index){
                return <p key={index} data={phoList}>{phoList}</p>;
              }.bind(this))
            }
          </li>
        </ul>       
      </div>
    )
  },
  componentDidMount: function() {
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    this.setState({
      fromHome: fromHome,
    });
    $.ajax({
      url: "/static/json/winnersList.json",
      type: "get",
      success: function(data) {
        if (!data.oneDay) {
          this.setState({
            bok: false
          });
        } else {
          this.setState({
            oneDayOne: data.oneDay.tenAM,
            oneDayTwo: data.oneDay.twoPM,
            oneDayThree: data.oneDay.sixPM,
            oneDayFour: data.oneDay.tenPM
          });
        }
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityFree;