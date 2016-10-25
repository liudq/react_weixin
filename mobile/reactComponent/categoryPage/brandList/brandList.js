var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./brandList.css");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
//var myLoadPic = require("./Loading5.gif");
var BrandList = React.createClass({
  render: function() {
    return (
      <li>
        <a href={"/brandProductList.html?brandId=" + this.props.data.id}>
          <img className={mmhc.brandPic} src={this.props.data.image} alt="brandLogo"/>
          <h4 className={mmhc.brandName}>{this.props.data.name}</h4>
        </a>
      </li>
    )
  }
});
var CategoryList = React.createClass({
  getInitialState: function() {
    return {
      bannerPics: "",
      productCate: {},
      tits: "",
      brandLists: [],
      urlParam: {},
      bok: true
    }
  },
  render: function() {
    return (
      <div className={mmhc.brandBox}>
        <img className={mmhc.bannerPic} src={imgPath+this.state.bannerPics} alt="活动"/>
        {/*<div className={"swiper-container"}>
          <ul className={CNs("swiper-wrapper",mmhc.bannerBox,mmhc.clearfix)}>
            <li className={"swiper-slide"}>
              <a href="javascript:;">
                <img className={mmhc.bannerPic} src={this.state.imgServer+this.state.bannerPics} alt="活动1"/>
              </a>
            </li>
            <li className={"swiper-slide"}>
              <a href="javascript:;">
                <img className={mmhc.bannerPic} src={this.state.imgServer+this.state.bannerPics} alt="活动2"/>
              </a>
            </li>
          </ul>
          <div className={"swiper-pagination"}></div>
        </div>*/}
        <h3 className={mmhc.tit}>{this.state.productCate.name}</h3>
        <ul className={CNs(mmhc.branList,mmhc.clearfix)}>         
          {
            this.state.brandLists.map(function(brandList,index){
              return <BrandList key={index} data={brandList}/>;
            })
          }
        </ul>
        {/*<div className={mmhc.myLoadMask}></div>
        <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>*/}
      </div>
    )
  },
  componentDidMount: function() {

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    }
    var urlParam = getUrlParam('productCateId');
    $.ajax({
      // url: "/frontEndSrc/mobile/json/categoryPage/categoryPage.json",
      url: jsonPath.path + '/cate/brand/detail.json',
      type: jsonPath.method,
      success: function(data) {
        for (var i = 0; i < data.brands.length; i++) {
          data.brands[i].image = imgPath + data.brands[i].image;
        }
        this.setState({
          bannerPics: data.bannerImgPath,
          brandLists: data.brands,
          productCate: data.productCate
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this),
      dataType: "json",
      data: {
        "productCateId": urlParam
      }
    });
  }
});
module.exports = CategoryList;