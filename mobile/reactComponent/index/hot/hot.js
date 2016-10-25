var mmhc = require("./hot.css");
var cNs = require('classnames');
var React = require("react");

var MmhHotM = React.createClass({
  render: function() {
    return (
      <div className={mmhc.hotM}>
        <div className={mmhc.mainbox}>
          <p className={mmhc.text1}>年化收益</p>
          <p className={mmhc.rate}>{this.props.data.annualRate}%</p>
          <p className={mmhc.text2}>理财{this.props.data.minBuy}元起</p>
        </div>
        <p className={mmhc.term}>{this.props.data.term}{this.props.data.termType}</p>
        <a className={mmhc.buy} href={"/invest#"+this.props.data.code} >马上买入</a>
      </div>
    );
  }
});

var MmhHot = React.createClass({
  getInitialState: function() {
    return {
      "MmhHots": []
    }
  },
  render: function() {
    return (
      <div className={cNs(mmhc.mContainer,mmhc.main)}>
        <div className={cNs(mmhc.mRow)}>
          <div className={mmhc.title}>最热</div>
          {
            this.state.MmhHots.map(function(mmhHot,index){
              return <MmhHotM key={index} data={mmhHot}/>
            })
          }
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      type: 'get',
      url: "/productsList",
      // url: "/frontEndSrc/pc/json/index/productsList.json",
      success: function(data) {
        this.setState({
          MmhHots: data
        });
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = MmhHot;