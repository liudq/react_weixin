require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../../common/util/init.css");
var React = require('react');
var ReactDom = require('react-dom');
var cNs = require('classnames');
var mmhc = require('./categoryPage.css');
var imgPath = require('../../common/util/path.js').path;
var fpHomePath = require('../../common/util/path.js').fpHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var CategoryPage = React.createClass({
  getInitialState: function() {
    return {
      leftList: [],
      rightMain: [],
      rightMain2: [],
      bannerImg: ""
    }
  },
  fnCate2: function(event) {
    var dataId = event.target.getAttribute("data-id");
    $.ajax({
      url: jsonPath.path + "/cate/1slist/detail_v20.json?cate1sId=" + dataId,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data2) {
        if (data2.success == true) {
          this.setState({
            rightMain: data2.result.rst.cates2,
            rightMain2: data2.result.rst.brandDtos,
            bannerImg: data2.result.rst.systemAdvert.adPic
          });
        } else {
          alert(data2.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={cNs(mmhc.container,mmhc.clearfix)}>
        <div className={mmhc.leftTabCon} id="navbar">
          <ul className={mmhc.oneLevelCon}>
            {
              this.state.leftList.map(function(cate1,index){
                return <li onClick={this.fnCate2} className={index==0?mmhc.on:""} key={index} data-id={cate1.id}>{cate1.name}</li>
              }.bind(this))
            }
          </ul>
        </div>
        <div className={mmhc.rightCon}>
          <div className={mmhc.imgCon}>
            <img src={imgPath+this.state.bannerImg} alt=""/>
          </div>
            {
              this.state.rightMain.map(function(cate2,index){
                return index!=0?<div key={index}className={mmhc.twoLevelCon}>
                          <div className={cNs(mmhc.twoLevelTit,mmhc.clearfix)}>
                            <p className={mmhc.fl}></p>
                            <div className={mmhc.threeLevelName}>
                              <h2 >{cate2.name}</h2>
                            </div>
                            <p className={mmhc.fl}></p>
                          </div>
                          <ul className={cNs(mmhc.threeLevelCon,mmhc.clearfix)}>
                            {
                              cate2.cate3s.map(function(cate3s,index){
                                return <li key={index}> 
                                        <a href={"/wechatMall/classificationFirstPagecl.html?cate3sId="+cate3s.id}>
                                          <div className={mmhc.brandImgCon}>
                                            <img src={imgPath+cate3s.catePath} alt=""/>
                                          </div>
                                          <h3 className={mmhc.brandName}>{cate3s.name}</h3>
                                        </a>
                                      </li>
                              }.bind(this))
                            }
                          </ul>
                        </div>:""
              }.bind(this))
            }
            {
              this.state.rightMain2.map(function(brandDtos,index){
                return index!=0?<div key={index}className={mmhc.twoLevelCon}>
                          <div className={cNs(mmhc.twoLevelTit,mmhc.clearfix)}>
                            <p className={mmhc.fl}></p>
                            <div className={mmhc.threeLevelName}>
                              <h2 >{brandDtos.cate3sName}</h2>
                            </div>
                            <p className={mmhc.fl}></p>
                          </div>
                          <ul className={cNs(mmhc.threeLevelCon,mmhc.clearfix)}>
                            {
                            brandDtos.brands.map(function(brands,index){
                                return <li key={index}> 
                                        <a href={"/wechatMall/classificationFirstPagecl.html?brandId="+brands.id+"&cate3sId="+brandDtos.cate3sId}>
                                          <div className={mmhc.brandImgCon}>
                                            <img src={imgPath+brands.image} alt=""/>
                                          </div>
                                          <h3 className={mmhc.brandName}>{brands.name}</h3>
                                        </a>
                                      </li>
                              }.bind(this))
                            }
                          </ul>
                        </div>:""
              }.bind(this))
            }
          </div>
      </div>
    )
  },
  componentDidMount: function() {
    var wHeight = ($(window).height());
    $("." + mmhc.leftTabCon).css("height", wHeight);
    $(window).scroll(function() {
      var top = (document.documentElement.scrollTop + (document.documentElement.clientHeight - $(DivId).offsetHeight) / 2) + "px";

      $("#navbar").css({
        "top": top,
        "left": 0
      })
    });

    $.ajax({
      url: jsonPath.path + "/catelist.json?",
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          leftList: data.list,
          initId: data.list[0].id
        }, function() {
          $("." + mmhc.oneLevelCon).children().each(function(index) {
            $(this).click(function() {
              $("." + mmhc.oneLevelCon).children().removeClass(mmhc.on);
              $(this).addClass(mmhc.on);
            });
          });
          $.ajax({
            url: jsonPath.path + "/cate/1slist/detail_v20.json?cate1sId=" + this.state.initId,
            type: "get",
            error: function() {
              alert("请求数据失败");
            },
            success: function(data2) {
              if (data2.success == true) {
                this.setState({
                  rightMain: data2.result.rst.cates2,
                  rightMain2: data2.result.rst.brandDtos,
                  bannerImg: data2.result.rst.systemAdvert.adPic
                });
              } else {
                alert(data2.message);
              }
            }.bind(this),
            dataType: "json"
          });
        });
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = CategoryPage;