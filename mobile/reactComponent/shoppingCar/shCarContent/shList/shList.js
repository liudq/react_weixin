var cNs = require('classnames');
var React = require("react");
var mmhc = require("./shList.css");
var imgPath = require("../../../common/util/path.js").path;
var greyImg = require("./grey.gif");

var ShList = React.createClass({
  getInitialState: function() {
    return {
      activityList: []
    }
  },
  myDelet: function() {
    var that = this;
    confirm("便宜不等人，请三思而后行", function() {
      $.ajax({
        type: 'get',
        // url: "/json/cart/detail.json",
        url: "/cart/deleteCartById.json?id=" + that.props.cartList.id,
        error: function() {
          alert("请求数据失败");
        },
        success: function(dataJson) {
          if (dataJson.resultcode == true) {
            that.props.updateCartData();
          } else {
            alert("删除失败");
          }
        }.bind(this),
        dataType: "json"
      });
    });
  },
  clickJ: function() {
    if (this.props.cartList.count > 1) {
      var jNumber = this.props.cartList.count - 1;
      $.ajax({
        type: 'post',
        /*url: "/productsList",*/
        url: "/cart/updateCartById.json?id=" + this.props.cartList.id + "&count=" + jNumber,
        error: function() {
          alert("请求数据失败");
        },
        success: function(dataJson) {
          if (dataJson.resultcode == true) {
            this.props.updateCartData();
          } else {
            alert("添加失败")
          }
        }.bind(this),
        dataType: "json"
      });
    };
  },
  clickA: function() {
    var aNumber = this.props.cartList.count + 1;
    $.ajax({
      type: 'post',
      /*url: "/productsList",*/
      url: "/cart/updateCartById.json?id=" + this.props.cartList.id + "&count=" + aNumber,
      error: function() {
        alert("请求数据失败");
      },
      success: function(dataJson) {
        if (dataJson.resultcode == true) {
          this.props.updateCartData();
        } else {
          alert("添加失败")
        }
      }.bind(this),
      dataType: "json"
    });
  },
  changeChoice: function() {
    var ajaxChoiceState = 0;
    if (this.props.cartList.choose == 1) {
      ajaxChoiceState = 0;
    } else {
      ajaxChoiceState = 1;
    };
    $.ajax({
      type: 'get',
      // url: "/productsList",
      url: "/cart/updateCartChooseById.json?choose=" + ajaxChoiceState + "&id=" + this.props.cartList.id,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode == true) {
          this.props.updateCartData();
        } else {
          alert("请求数据失败");
        }
      }.bind(this),
      dataType: "json"
    });
  },
  mySelectFun: function(event) {
    $.ajax({
      url: "/cart/updateActivity.json?activityId=" + event.target.value + "&cartId=" + this.props.cartList.id,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.flag == true || data.flag == "true") {
          location.reload();
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.listDiv}>
        <div className={mmhc.list1}>
          <div onClick={this.changeChoice} className={cNs(mmhc.noChoiceBg,this.props.cartList.choose==1?mmhc.choiceBg:"")}></div>
        </div>
        <div className={mmhc.list2}>
          <img className={mmhc.shListImg} data-src={imgPath+this.props.cartList.product.masterImg} src={greyImg} alt=""/>
        </div>
        <div className={mmhc.list3}>
          <div className={mmhc.list3Name}>{this.props.cartList.product.name1.length>36?this.props.cartList.product.name1.slice(0,36)+"...":this.props.cartList.product.name1}</div>
          <div className={mmhc.list3Name}>{this.props.cartList.specInfo}</div>
          <div className={mmhc.list3Num}>
            <div className={mmhc.list3NumL} onClick={this.clickJ}></div>
            <div className={mmhc.list3NumC}>{this.props.cartList.count}</div>
            <div className={mmhc.list3NumR} onClick={this.clickA} ></div>
            <button onClick={this.myDelet} className = {mmhc.list4Button}>删除</button>
            <div className={mmhc.clear}></div>
            <div className = {mmhc.list4}>
              <div className={mmhc.list4T1}>￥{this.props.cartList.productGoods.mallMobilePrice}</div>
              {/*<div className = {cNs(mmhc.list4T2,mmhc.rightFLoat)}>￥{this.props.cartList.product.marketPrice}</div>*/}
            </div>
            <div className={mmhc.clear}></div>
          </div>
        </div> 
        
        <div className = {mmhc.clear}> </div>
        {
          this.props.activtyId==undefined?"":<select onChange={this.mySelectFun} name="" id={"mySelect"+this.props.activtyId} className={cNs(this.props.activtyId==undefined?mmhc.none:"",mmhc.mySelectCss)}>
                                              {
                                                 this.state.activityList.map(function(activityList, index) {
                                                  return <option key={index} value={activityList.id}>{activityList.activityTitle}</option>
                                                }.bind(this))
                                              }
                                              </select>
        }
        <div className={mmhc.clear}></div>
      </div>
    )
  },
  componentDidMount: function() {
    $("." + mmhc.shListImg).each(function() {
      var height = $(this).offset().top - $(window).scrollTop();
      if (height < 700) {
        $(this).attr("src", $(this).attr("data-src"));
      }
    });
    $(window).scroll(function() {
      $("." + mmhc.shListImg).each(function() {
        var height = $(this).offset().top - $(window).scrollTop();
        if (height < 700) {
          $(this).attr("src", $(this).attr("data-src"));
        }
      });
    });
    if (this.props.activtyId != undefined) {
      $.ajax({
        url: "/cart/availActivity.json?productId=" + this.props.cartList.product.id,
        // url: "/json/cart/availActivity.json?productId=" + this.props.cartList.product.id,
        type: "get",
        error: function() {
          alert("请求数据失败");
        },
        success: function(data) {
          this.setState({
            activityList: data
          }, function() {
            $("#mySelect" + this.props.activtyId).val(this.props.activtyId);
          })
        }.bind(this),
        dataType: "json"
      });
    }
  },
});

module.exports = ShList;