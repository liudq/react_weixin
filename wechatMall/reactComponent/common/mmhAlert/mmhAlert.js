var React = require("react");
var cNs = require('classnames');
var mmhc = require("./mmhAlert.css");
var Main = React.createClass({
  getInitialState: function() {
    return {
      content: "",
      maskShow: false,
      divShow: false,
      alertCallback: function() {},
      confirmCallback: function() {},
      noShow: false,
      alertOkShow: false,
      confirmOkShow: false
    }
  },
  close: function(event) {
    event.preventDefault();
    this.setState({
      content: "",
      maskShow: false,
      divShow: false,
      noShow: false,
      alertOkShow: false,
      confirmOkShow: false
    });
  },
  alertYesAlert: function(event) {
    event.preventDefault();
    this.setState({
      content: "",
      maskShow: false,
      divShow: false,
      noShow: false,
      alertOkShow: false,
      confirmOkShow: false
    }, this.state.alertCallback);
  },
  alertYesConfirm: function(event) {
    event.preventDefault();
    this.setState({
      content: "",
      maskShow: false,
      divShow: false,
      noShow: false,
      alertOkShow: false,
      confirmOkShow: false
    }, this.state.confirmCallback);
  },
  render: function() {
    return (
      <div>
        <div id={mmhc.alert_mask_div} className={this.state.maskShow===true?mmhc.show:""}></div>
        <div id={mmhc.alert_div} className={this.state.divShow===true?mmhc.show:""}>
          <div id={mmhc.header}>
            <div id={mmhc.title}>提示</div>
            <div id={mmhc.close} onClick={this.close}>×</div>
          </div>
          <div id={mmhc.body}>{this.state.content}</div>
          <div id={mmhc.footer}>
            <a href="" style={{display:this.state.alertOkShow==true?"block":"none"}} className={cNs(mmhc.yes,mmhc.alertOk)} onClick={this.alertYesAlert}>确认</a>
            <a href="" style={{display:this.state.confirmOkShow==true?"block":"none"}} className={cNs(mmhc.yes,mmhc.confirmOk)} onClick={this.alertYesConfirm}>确认</a>
            <a href="" id={mmhc.no} onClick={this.close} className={this.state.noShow===true?mmhc.show:""}>取消</a>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    window.alert = function(mess, callback) {
      this.setState({
        content: mess,
        maskShow: true,
        divShow: true,
        alertOkShow: true,
        confirmOkShow: false,
        noShow: false
      });
      if (callback) {
        this.setState({
          alertCallback: callback
        });
      }
    }.bind(this);

    window.confirm = function(mess, callback) {
      this.setState({
        content: mess,
        maskShow: true,
        divShow: true,
        alertOkShow: false,
        confirmOkShow: true,
        noShow: true
      });
      if (callback) {
        this.setState({
          confirmCallback: callback
        });
      }
    }.bind(this)
  }
});

module.exports = Main;