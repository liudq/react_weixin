var cNs = require('classnames');
var React = require("react");
var mmhc = require("./comment.css");
var imgPath = require("../../../common/util/path.js").path;
var pinglunImg03 = require("./pinglun_03.png");
var yuanHeaderImg = require("./yuanHeader.jpg");

var Comment = React.createClass({
  getInitialState: function() {
    return {
      allPingLun: mmhc.activePingLun,
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: "",
      productId: "",
      allCommentList: [],
      highCommentList: [],
      middleCommentList: [],
      lowCommentList: [],
      commentList: [],
      allNumber: "",
      lowNumber: "",
      highNumber: "",
      productId: "",
      middleNumber: ""
    }
  },
  //点击全部评论
  allPingLun: function() {
    this.setState({
      allPingLun: mmhc.activePingLun,
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: "",
      commentList: this.state.allCommentList
    });

  },
  //点击好评
  goodPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: mmhc.activePingLun,
      centerPingLun: "",
      badPingLun: "",
      commentList: this.state.highCommentList
    });

  },
  //点击中评
  centerPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: "",
      centerPingLun: mmhc.activePingLun,
      badPingLun: "",
      commentList: this.state.middleCommentList
    });
  },
  //点击差评
  badPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: mmhc.activePingLun,
      commentList: this.state.lowCommentList
    });
  },

  render: function() {
    return (
      <div className={this.props.comment2}>
        <div className={mmhc.commentSec}>
          <div>
            <div onClick={this.allPingLun} className={cNs(mmhc.comTitle,this.state.allPingLun)}>全部评论 ({this.state.allNumber})</div>
            <div onClick={this.goodPingLun} className={cNs(mmhc.pingLun,this.state.goodPingLun)}>好评({this.state.highNumber})</div>
            <div onClick={this.centerPingLun} className={cNs(mmhc.pingLun,this.state.centerPingLun)}>中评({this.state.middleNumber})</div>
            <div onClick={this.badPingLun} className={cNs(mmhc.pingLun,this.state.badPingLun)}>差评({this.state.lowNumber})</div>
            <div className={mmhc.clear}></div>
          </div>

          {
            this.state.commentList.map(function(commentList, index){
              return <div key={index} className={mmhc.comSingle}>
                      <div className={mmhc.comSingleSec1}>{commentList.updateTime}</div>
                      <div className={mmhc.comSingleSec2}>
                        <div className={mmhc.comSingleHeader}>
                          <img className={mmhc.pinglunImg03} src={yuanHeaderImg} alt=""/>
                        </div>
                        <i className={mmhc.comName}>{commentList.userName}</i>
                        <div className={mmhc.clear}></div>
                      </div>
                      <div className={mmhc.comSinSec3}>{commentList.content}</div>
                    </div>
            }.bind(this))
          }

        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(newPrps) {
    if (this.props.productId != newPrps.productId) {
      this.setState({
        productId: newPrps.productId
      });
      //页面加载时请求评论的全部数据
      $.ajax({
        type: 'get',
        // url: "/json/product/comment/allcomment.json",
        url: "/product/comment/allcomment.json?productId=" + newPrps.productId,
        error: function() {
          alert("请求数据失败");
        }.bind(this),
        success: function(data) {
          this.setState({
            allCommentList: data.allCommentList,
            highCommentList: data.highCommentList,
            middleCommentList: data.middleCommentList,
            lowCommentList: data.lowCommentList,
            commentList: data.allCommentList,
            allNumber: data.allNumber,
            lowNumber: data.lowNumber,
            highNumber: data.highNumber,
            productId: data.productId,
            middleNumber: data.middleNumber
          })
        }.bind(this),
        dataType: "json"
      });
    };
  },
});

module.exports = Comment;