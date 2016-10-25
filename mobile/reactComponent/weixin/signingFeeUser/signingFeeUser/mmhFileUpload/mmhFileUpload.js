var React = require("react");
var cNs = require('classnames');
var mmhc = require("./mmhFileUpload.css");
var defaultImg = require('./link.png');
var Main = React.createClass({
  getInitialState: function() {
    return {
      display1: true,
      display2: true,
      display3: false,
      display4: false,
      display5: false,
      display6: false
    }
  },
  img1Handler: function() {
    this.refs.file1.click();
  },
  img2Handler: function() {
    this.refs.file2.click();
  },
  img3Handler: function() {
    this.refs.file3.click();
  },
  img4Handler: function() {
    this.refs.file4.click();
  },
  img5Handler: function() {
    this.refs.file5.click();
  },
  img6Handler: function() {
    this.refs.file6.click();
  },
  render: function() {
    return (
      <div className={mmhc.clearfix}>
        <div className={cNs(mmhc.previewDiv0,this.state.display1==true?mmhc.show:"")}>
          <img width="100%" height="auto" src={defaultImg} onClick={this.img1Handler} className={cNs(mmhc.imgUpLoad,this.state.display1==true?mmhc.show:"",mmhc.imgUpLoad0)} alt=""/>
        </div>
        <div className={cNs(mmhc.previewDiv1,this.state.display2==true?mmhc.show:"")}>
          <img width="100%" height="auto" src={defaultImg} onClick={this.img2Handler} className={cNs(mmhc.imgUpLoad,this.state.display2==true?mmhc.show:"",mmhc.imgUpLoad1)} alt=""/>
        </div>
        {/*<div className={cNs(mmhc.previewDiv2,this.state.display3==true?mmhc.show:"")}>
          <img width="200px" height="200px" src={defaultImg} onClick={this.img3Handler} className={cNs(mmhc.imgUpLoad,this.state.display3==true?mmhc.show:"",mmhc.imgUpLoad2)} alt=""/>
        </div>
        <div className={cNs(mmhc.previewDiv3,this.state.display4==true?mmhc.show:"")}>
          <img width="200px" height="200px" src={defaultImg} onClick={this.img4Handler} className={cNs(mmhc.imgUpLoad,this.state.display4==true?mmhc.show:"",mmhc.imgUpLoad3)} alt=""/>
        </div>
        <div className={cNs(mmhc.previewDiv4,this.state.display5==true?mmhc.show:"")}>
          <img width="200px" height="200px" src={defaultImg} onClick={this.img5Handler} className={cNs(mmhc.imgUpLoad,this.state.display5==true?mmhc.show:"",mmhc.imgUpLoad4)} alt=""/>
        </div>
        <div className={cNs(mmhc.previewDiv5,this.state.display6==true?mmhc.show:"")}>
          <img width="200px" height="200px" src={defaultImg} onClick={this.img6Handler} className={cNs(mmhc.imgUpLoad,this.state.display6==true?mmhc.show:"",mmhc.imgUpLoad5)} alt=""/>
        </div>*/}

        <input name="file0" id="file0" type="file" ref="file1" className={mmhc.fileUpLoad}/>
        <input name="file1" id="file1" type="file" ref="file2" className={mmhc.fileUpLoad}/>
        {/*<input name="file2" id="file2" type="file" ref="file3" className={mmhc.fileUpLoad}/>
        <input name="file3" id="file3" type="file" ref="file4" className={mmhc.fileUpLoad}/>
        <input name="file4" id="file4" type="file" ref="file5" className={mmhc.fileUpLoad}/>
        <input name="file5" id="file5" type="file" ref="file6" className={mmhc.fileUpLoad}/>*/}
      </div>
    )
  },
  componentDidMount: function() {
    var that = this;
    $(function() {
      //===

      //===
      function clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = {
          top: 0,
          left: 0,
          width: width,
          height: height
        };
        if (width > maxWidth || height > maxHeight) {
          rateWidth = width / maxWidth;
          rateHeight = height / maxHeight;
          if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
          } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
          }
        }
        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
      }
      //===
      var fileUpLoad = "." + mmhc.fileUpLoad;
      $(fileUpLoad).each(function() {
        $(this).change(function() {
          var i = $(fileUpLoad).index(this);
          var divClass = "";
          var imgClass = "";
          switch (i) {
            case 0:
              that.setState({
                display2: true
              });
              divClass = "." + mmhc.previewDiv0;
              imgClass = mmhc.imgUpLoad0;
              break;
            case 1:
              that.setState({
                display3: false
              });
              divClass = "." + mmhc.previewDiv1;
              imgClass = mmhc.imgUpLoad1;
              break;
            case 2:
              that.setState({
                display4: true
              });
              divClass = "." + mmhc.previewDiv2;
              imgClass = mmhc.imgUpLoad2;
              break;
            case 3:
              that.setState({
                display5: true
              });
              divClass = "." + mmhc.previewDiv3;
              imgClass = mmhc.imgUpLoad3;
              break;
            case 4:
              that.setState({
                display6: true
              });
              divClass = "." + mmhc.previewDiv4;
              imgClass = mmhc.imgUpLoad4;
              break;
            case 5:
              divClass = "." + mmhc.previewDiv5;
              imgClass = mmhc.imgUpLoad5;
              break;
            default:
              break;
          }
          //===
          file = this;
          var MAXWIDTH = 200;
          var MAXHEIGHT = 200;
          var div = document.querySelector(divClass);
          if (file.files && file.files[0]) {
            div.innerHTML = '<img class=' + imgClass + '>';
            var img = document.querySelector("." + imgClass);
            img.onload = function() {
              var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
              // img.width = rect.width;
              // img.height = rect.height;
              // img.style.marginLeft = rect.left + 'px';
              // img.style.marginTop = rect.top + 'px';
              img.style.width = 100 + "%";
              img.height = 100;
              img.style.marginLeft = 0 + 'px';
              img.style.marginTop = 0 + 'px';
            }
            var reader = new FileReader();
            reader.onload = function(evt) {
              img.src = evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);
          } else {
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img class=' + imgClass + '>';
            var img = document.querySelector("." + imgClass);
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
            div.innerHTML = "<div id=divhead style='width:100%;" + "height:" + rect.height + "px;margin-top:" + rect.top + "px;margin-left:" + rect.left + "px;" + sFilter + src + "\"'></div>";
          }
          //===
        });
      });
    })
  }
});

module.exports = Main;