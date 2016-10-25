var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./doTask.css");
var jsonPath = require("../../common/util/jsonPath.js");
var RankingList = require("../rankingList/rankingList.js");
var imgPath = require("../../common/util/path.js").path;
var ban1 = require("./banner.png");
var TaskList = React.createClass({
  getInitialState: function() {
    return {
      go: "去领取"
    }
  },
  toFin: function() {
    if (this.props.data.taskState == "") {
      window.location.href = "www.baidu.com";
    } else {
      $.ajax({
        type: jsonPath.method,
        url: jsonPath.path + "/member/userMessage.json",
        data: {
          userCode: this.state.userCode,
          taskCode: this.props.data.code
        },
        success: function(data) {
          this.setState({
            userCode: data.userCode
          })
        }.bind(this),
        dataType: "json"
      });
      $.ajax({
        type: jsonPath.method,
        url: jsonPath.path + "/member/getIntegral.json",
        success: function(data) {
          if (data == true) {
            alert("恭喜您~积分领取成功啦")
            this.setState({
              go: "已完成"
            })
          } else {
            alert("领取失败")
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  render: function() {
    return (
      <li className={CNs(mmhc.task,mmhc.clearfix)}>
        <p>{this.props.data.taskName}+{this.props.data.taskValue}</p>
        <a className={CNs(this.state.go=="已完成"?mmhc.finished:mmhc.a,this.props.data.taskState==""?mmhc.toFinish:mmhc.getReward)} onClick={this.toFin}>{this.props.data.taskState==""?"去完成":this.state.go}</a>
      </li>
    )
  }
});
var MyTask = React.createClass({
  getInitialState: function() {
    return {
      userMessages: {},
      myState: {},
      taskDtoLists: [],
      bok: true
    }
  },
  fnAboutMe: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  fnAboutRankList: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  render: function() {
    return (
      <div className={mmhc.brandBox}>
        <div className={CNs(mmhc.topBack,mmhc.clearfix)}>
          <a href="javascript:history.back()"></a>
          <h3>任务系统</h3>
        </div>       
        <ol className={CNs(mmhc.tabCon,mmhc.clearfix)}>
          <li className={this.state.bok==true?mmhc.active:""} onClick={this.fnAboutMe}><a href="javascript:;">我的</a></li>
          <li className={CNs(mmhc.borLine,this.state.bok==true?"":mmhc.active)} onClick={this.fnAboutRankList}><a href="javascript:;">排行榜</a></li>
        </ol>
        <div className={CNs(mmhc.myTaskCon,this.state.bok==true?mmhc.show:mmhc.hide)}>
          <div className={mmhc.myInfo}>
            <div className={mmhc.myName}>
              <img src={imgPath+"/images/user/"+this.state.userMessages.userCode+"/"+this.state.userMessages.userCode+".png"} alt=""/>
              <p>{this.state.userMessages.name}</p>
            </div>
            <div className={CNs(mmhc.myScore,mmhc.clearfix)}>
              <p>我的当前积分：<i>{this.state.myState.value}</i></p>
              <p className={mmhc.fr}>领先<i>{this.state.myState.percent}</i>用户</p>
            </div>
          </div>
          <div className={mmhc.myBanner}>
            <img src={ban1} alt=""/>
          </div>
          <ul className={mmhc.taskCon}>
            {
              this.state.taskDtoLists.map(function(taskDtoLists,index){
                return <TaskList key={index} data={taskDtoLists}/>;
              }.bind(this))
            }
          </ul>
        </div>
        <div className={this.state.bok==true?mmhc.hide:mmhc.show}>
          <RankingList/>
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
        data.percent = data.percent * 100 + "%";
        this.setState({
          myState: data,
          taskDtoLists: data.taskDtoList
        });

      }.bind(this),
      dataType: "json"
    });
    $.ajax({
      type: jsonPath.method,
      url: jsonPath.path + "/member/userMessage.json",
      success: function(data) {
        this.setState({
          userMessages: data
        })
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = MyTask;