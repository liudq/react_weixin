require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./firstIndex.css");
var morenImg = require("./morenImg.png");
var weekImg = require("./week.png");
var jsonPath = require("../../../common/util/jsonPath.js");

var FirstIndex = React.createClass({
  getInitialState: function() {
    return {
      miaoShuInput: "none", //显示描述的输入框
      miaoShuValue: "输入500字内", //描述内容
      miaoShuNum: 0, //描述字数
      week: "请点击选择",
      sellerNameValue: "",
      result: {},
      masterImg: morenImg, //店铺头图
      notices: "",
      textarea: "",
      days1Etime: "",
      days1Stime: ""
    }
  },

  //下面用于图片上传预览功能
  setImagePreview: function(avalue) {
    var docObj = document.getElementById("doc");

    var imgObjPreview = document.getElementById("preview");
    if (docObj.files && docObj.files[0]) {
      //火狐下，直接设img属性
      imgObjPreview.style.display = 'block';
      imgObjPreview.style.width = '100%';
      imgObjPreview.style.height = '200px';
      //imgObjPreview.src = docObj.files[0].getAsDataURL();

      //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
      imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
      //IE下，使用滤镜
      docObj.select();
      var imgSrc = document.selection.createRange().text;
      var localImagId = document.getElementById("localImag");
      //必须设置初始大小
      localImagId.style.width = "100%";
      localImagId.style.height = "200px";
      //图片异常的捕捉，防止用户修改后缀来伪造图片
      try {
        localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
      } catch (e) {
        alert("您上传的图片格式不正确，请重新选择!");
        return false;
      }
      imgObjPreview.style.display = 'none';
      document.selection.empty();
    }

    $.ajaxFileUpload({
      url: "/mobile/uploadShop.json", //需要链接到服务器地址   
      secureuri: false,
      fileElementId: "doc", //文件选择框的id属性  
      dataType: 'json', //json  
      success: function(data) {
        if (data.success) {
          that.setState({
            masterImg: data.url
          })
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('上传失败！');
      }
    });

    return true;
  },
  upLoadFun: function() {
    this.refs.file1.click();
  },
  //显示描述的输入框
  miaoShuFun: function() {
    this.setState({
      miaoShuInput: "block"
    })
  },
  //点击完成
  completeFun: function() {
    var textarea = ReactDom.findDOMNode(this.refs.textarea).value;
    if (textarea == "") {
      textarea = "输入500字内"
    };
    this.setState({
      miaoShuValue: textarea
    }, function() {
      this.setState({
        miaoShuInput: "none"
      })
    }.bind(this))
  },
  //描述内容值改变时计算字数
  miaoShuInputFun: function() {
    var textarea = ReactDom.findDOMNode(this.refs.textarea).value;
    if (textarea.length > 500) {
      textarea = textarea.slice(0, 500);
    }
    this.setState({
      miaoShuNum: textarea.length,
      textarea: textarea
    })
  },
  sellerNameFun: function(event) {
    this.setState({
      sellerNameValue: event.target.value
    })
  },
  noticesFun: function(event) {
    this.setState({
      notices: event.target.value
    })
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div id="localImag"><img onClick={this.upLoadFun} id="preview" src={this.state.masterImg} width="100%" height="200" style={{"display":"block","height":"180px"}}/></div>
        <input name="doc" type="file" ref="file1" id="doc" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview}/>
        <div className={mmhc.textContent}>
          <div className={cNs(mmhc.section,mmhc.clearfix)}>
            <div className={mmhc.sellerName}>*店铺名称</div>
            <input onChange={this.sellerNameFun} value={this.state.sellerNameValue} placeholder="输入100字内" className={mmhc.nameInput} type="text"/>
          </div>
          <div className={cNs(mmhc.section,mmhc.clearfix)}>
            <div className={mmhc.sellerName}>*店铺描述</div>
            <div onClick={this.miaoShuFun} className={cNs(mmhc.nameInput,mmhc.maxheight)} type="text">{this.state.miaoShuValue}</div>
            <div style={{"display":this.state.miaoShuInput}} className={mmhc.shuRu}>
              <div className={mmhc.textareaDiv}>
                <textarea value={this.state.textarea} onChange={this.miaoShuInputFun} placeholder="输入500字内" ref="textarea" className={mmhc.textarea} name="" id="" cols="30" rows="10"></textarea>
                <div className={cNs(mmhc.page,mmhc.clearfix)}>
                  <div className={mmhc.pageLeft}>
                    <i>{this.state.miaoShuNum}</i>/500
                  </div>
                  <div onClick={this.completeFun} className={mmhc.quDing}>完成</div>
                </div>
              </div>
              <div className={mmhc.textareaBg}></div>
            </div>
          </div>
          <div className={cNs(mmhc.section,mmhc.clearfix)}>
            <div className={mmhc.sellerName}>*店铺公告</div>
            <input onChange={this.noticesFun} value={this.state.notices} placeholder="输入100字内" className={mmhc.nameInput} type="text"/>
          </div>
          <a href={"/cooperativeShops/firstIndexTime.html?week="+encodeURIComponent(this.state.week)+"&days1Etime="+this.state.days1Etime+"&days1Stime="+this.state.days1Stime} className={cNs(mmhc.section,mmhc.clearfix,mmhc.sectionWeek)}>
            <div className={mmhc.sellerName}>*营业时间</div>
            <div className={mmhc.nameInput} type="text">{this.state.week}</div>
            <div className={mmhc.weekA}>
              <img src={weekImg} alt=""/>
            </div>
          </a>
        </div>
        <div className={mmhc.nextStep}>下一步</div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/authc/h5/getO2oKShopInformation.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.success) {
          this.setState({
            result: data.result,
            masterImg: data.result.masterImg,
            sellerNameValue: data.result.shopName,
            miaoShuValue: data.result.intruduction,
            notices: data.result.notices,
            textarea: data.result.intruduction,
            week: data.result.mmhO2oBusinessHours.busDays,
            days1Etime: data.result.mmhO2oBusinessHours.days1Etime,
            days1Stime: data.result.mmhO2oBusinessHours.days1Stime
          })
        } else {
          alert(data.message)
        }
      }.bind(this),
      dataType: "json"
    });

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    };
    var week = GetQueryString("week");
    var week = GetQueryString("days1Etime");
    var week = GetQueryString("days1Stime");
    if (week != this.state.week) {
      this.setState({
        week: week
      })
    };
    if (days1Etime != this.state.days1Etime) {
      this.setState({
        days1Etime: days1Etime
      })
    };
    if (days1Stime != this.state.days1Stime) {
      this.setState({
        days1Stime: days1Stime
      })
    };


  },
});

module.exports = FirstIndex;