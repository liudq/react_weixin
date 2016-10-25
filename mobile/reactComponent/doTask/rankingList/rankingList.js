var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./rankingList.css");
var pic1 = require("./UHeadProtrait1.png");
var imgPath = require("../../common/util/path.js").path;
var UserList = React.createClass({
  render: function() {
    return (
      <li className={CNs(mmhc.clearfix)}>
        <i>{this.props.num+1}</i>
        <a href="javascript:;"><img src={imgPath+"/images/user/"+this.props.data.code+"/"+this.props.data.code+".png"} alt=""/></a>
        <p>{this.props.data.mobile}</p>
        <p className={mmhc.fr}>{this.props.data.integral}积分</p>
      </li>
    )
  }
});
var RankingList = React.createClass({
  getInitialState: function() {
    return {
      userLists: [{}, {}, {}],
      userLists1: []
    }
  },
  render: function() {
    return (
      <div className={mmhc.con}>
        <h4 className={mmhc.tit}>积分排行榜</h4>
        <div className={mmhc.ranklist}>
          <ul className={CNs(mmhc.topThree,mmhc.calerfix)}>
            <li className={mmhc.second}>
              <div>
                <i className={mmhc.crown2}></i>
                <img className={mmhc.pro}src={imgPath+"/images/user/"+this.state.userLists[0].code+"/"+this.state.userLists[0].code+".png"} alt=""/>
              </div>
              <p>2</p>
              <p>{this.state.userLists[0].mobile}</p>
              <p>{this.state.userLists[0].integral}积分</p>
            </li>
            <li className={mmhc.first}>
              <div>
                <i className={mmhc.crown1}></i>
                <img className={mmhc.pro}src={imgPath+"/images/user/"+this.state.userLists[1].code+"/"+this.state.userLists[1].code+".png"} alt=""/>
              </div>
              <p>1</p>
              <p>{this.state.userLists[1].mobile}</p>
              <p>{this.state.userLists[1].integral}积分</p>
            </li>
            <li className={mmhc.three}>
              <div>
                <i className={mmhc.crown3}></i>
                <img className={mmhc.pro}src={imgPath+"/images/user/"+this.state.userLists[2].code+"/"+this.state.userLists[2].code+".png"} alt=""/>
              </div>
              <p>3</p>
              <p>{this.state.userLists[2].mobile}</p>
              <p>{this.state.userLists[2].integral}积分</p>
            </li>
          </ul>
          <ul className={mmhc.followUp}>
            {
              this.state.userLists1.map(function(userList,index){
                return index>2?<UserList num={index} key={index} data={userList}/>:"";
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/member/task.json',
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          userLists: data.userList,
          userLists1: data.userList
        });
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = RankingList;