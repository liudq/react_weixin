var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./proCate.css");
var jsonPath = require("../../common/util/jsonPath.js");
var CateNames = React.createClass({
  toUrl: function() {
    window.location.href = "/flagshipStore?sellerCateId=" + this.props.data.sellerId + "&pid=" + this.props.data.id;
  },
  render: function() {
    return (
      <li><a href="javascript:;" onClick={this.toUrl}>{this.props.data.name}</a></li>
    )
  }
});

var Cate = React.createClass({
  render: function() {
    return (
      <div className={mmhc.cateM}>
        <div className={CNs(mmhc.cateTit,mmhc.clearfix)}>
          <h3 >{this.props.data.name}</h3>
          <a href={"/flagshipStore?sellerCateId=" + this.props.data.sellerId }>查看全部</a>
        </div>
        <ul className={CNs(mmhc.cateSec,mmhc.clearfix)}>
          {
            this.props.data.childs.map(function(nameList,index){
              return <CateNames key={index} data={nameList}/>;
            }.bind(this))
          }
        </ul>
      </div>
    )
  }
});

var ProCate = React.createClass({
  getInitialState: function() {
    return {
      cates: [],
      bok: true
    }
  },
  showHide: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  render: function() {
    return (
      <div className={mmhc.bgr}>
        <section className={CNs(mmhc.proSearch,mmhc.clearfix)}>
          <a className={mmhc.back} href="javascript:history.back()"></a>
          <p className={mmhc.tit}>产品分类</p>
          <div className={mmhc.more} onClick={this.showHide}></div>
          <ul className={CNs(mmhc.goMore,this.state.bok==true?mmhc.hide:mmhc.show)}>
            <li><a className={mmhc.homePage} href="homepage">首页</a></li>
            <li><a className={mmhc.goSerch} href="search">搜索</a></li>
            <li><a className={mmhc.goCate} href="assortment">分类</a></li>
            <li><a className={mmhc.goBuyCar} href="/authc/shoppingCar">购物车</a></li>
          </ul>
        </section>
        <section className={mmhc.allPro}>
          <a className={mmhc.allProW}href="">全部商品</a>
        </section>
        <section className={mmhc.cateCon}>
          {
            this.state.cates.map(function(cateList,index){
              return <Cate key={index} data={cateList}/>;
            }.bind(this))
          }
        </section>
      </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
  },
  componentDidMount: function() {
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var urlParam1 = getUrlParam('sellerId');
    var urlParam2 = getUrlParam('pid');
    $.ajax({
      /*url: "/json/store/cate/pid.json",
      type: "get",*/
      url: jsonPath.path + '/store/cate/pid.json',
      type: jsonPath.method,
      data: {
        sellerId: urlParam1,
        pid: urlParam2
      },
      success: function(data) {
        this.setState({
          cates: data.result
        });
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = ProCate;