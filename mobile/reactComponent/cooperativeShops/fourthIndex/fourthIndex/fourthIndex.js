require("../../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./fourthIndex.css");
var morenImg = require("./img/other.png");
var sfzz = require("./img/zz.png");
var sfzf = require("./img/zf.png");
var FourthIndex = React.createClass({
  getInitialState: function() {
    return {
      bok2: false,
      bok3: false,
      bok4: false,
      bok5: false,
      bok6: false,
      bok7: false,
      bok8: false,
      bok9: false,
      bok10: false,
      bok11: false,
      next: true
    }
  },
  setImagePreview: function(avalue) {
    var docObj = document.getElementById("doc");
    var imgObjPreview = document.getElementById("preview");
    if (docObj.files && docObj.files[0]) {
      imgObjPreview.style.display = 'block';
      imgObjPreview.style.width = '100%';
      imgObjPreview.style.height = '7.5rem';
      imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
      docObj.select();
      imgObjPreview.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok2: true
    });
  },
  setImagePreview2: function(avalue) {
    var docObj2 = document.getElementById("doc2");
    var imgObjPreview2 = document.getElementById("preview2");
    if (docObj2.files && docObj2.files[0]) {
      imgObjPreview2.style.display = 'block';
      imgObjPreview2.style.width = '100%';
      imgObjPreview2.style.height = '10rem';
      imgObjPreview2.src = window.URL.createObjectURL(docObj2.files[0]);
    } else {
      docObj2.select();
      imgObjPreview2.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok3: true
    });
  },
  setImagePreview3: function(avalue) {
    var docObj3 = document.getElementById("doc3");
    var imgObjPreview3 = document.getElementById("preview3");
    if (docObj3.files && docObj3.files[0]) {
      imgObjPreview3.style.display = 'block';
      imgObjPreview3.style.width = '100%';
      imgObjPreview3.style.height = '10rem';
      imgObjPreview3.src = window.URL.createObjectURL(docObj3.files[0]);
    } else {
      docObj3.select();
      imgObjPreview3.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok4: true
    });
  },
  setImagePreview4: function(avalue) {
    var docObj4 = document.getElementById("doc4");
    var imgObjPreview4 = document.getElementById("preview4");
    if (docObj4.files && docObj4.files[0]) {
      imgObjPreview4.style.display = 'block';
      imgObjPreview4.style.width = '100%';
      imgObjPreview4.style.height = '10rem';
      imgObjPreview4.src = window.URL.createObjectURL(docObj4.files[0]);
    } else {
      docObj4.select();
      imgObjPreview4.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok5: true
    });
  },
  setImagePreview5: function(avalue) {
    var docObj5 = document.getElementById("doc5");
    var imgObjPreview5 = document.getElementById("preview5");
    if (docObj5.files && docObj5.files[0]) {
      imgObjPreview5.style.display = 'block';
      imgObjPreview5.style.width = '100%';
      imgObjPreview5.style.height = '10rem';
      imgObjPreview5.src = window.URL.createObjectURL(docObj5.files[0]);
    } else {
      docObj5.select();
      imgObjPreview5.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok6: true
    });
  },
  setImagePreview6: function(avalue) {
    var docObj6 = document.getElementById("doc6");
    var imgObjPreview6 = document.getElementById("preview6");
    if (docObj6.files && docObj6.files[0]) {
      imgObjPreview6.style.display = 'block';
      imgObjPreview6.style.width = '100%';
      imgObjPreview6.style.height = '10rem';
      imgObjPreview6.src = window.URL.createObjectURL(docObj6.files[0]);
    } else {
      docObj6.select();
      imgObjPreview6.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok7: true
    });
  },
  setImagePreview7: function(avalue) {
    var docObj7 = document.getElementById("doc7");
    var imgObjPreview7 = document.getElementById("preview7");
    if (docObj7.files && docObj7.files[0]) {
      imgObjPreview7.style.display = 'block';
      imgObjPreview7.style.width = '100%';
      imgObjPreview7.style.height = '10rem';
      imgObjPreview7.src = window.URL.createObjectURL(docObj7.files[0]);
    } else {
      docObj7.select();
      imgObjPreview7.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok8: true
    });
  },
  setImagePreview8: function(avalue) {
    var docObj8 = document.getElementById("doc8");
    var imgObjPreview8 = document.getElementById("preview8");
    if (docObj8.files && docObj8.files[0]) {
      imgObjPreview8.style.display = 'block';
      imgObjPreview8.style.width = '100%';
      imgObjPreview8.style.height = '10rem';
      imgObjPreview8.src = window.URL.createObjectURL(docObj8.files[0]);
    } else {
      docObj8.select();
      imgObjPreview8.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok9: true
    });
  },
  setImagePreview9: function(avalue) {
    var docObj9 = document.getElementById("doc9");
    var imgObjPreview9 = document.getElementById("preview9");
    if (docObj9.files && docObj9.files[0]) {
      imgObjPreview9.style.display = 'block';
      imgObjPreview9.style.width = '100%';
      imgObjPreview9.style.height = '100';
      imgObjPreview9.src = window.URL.createObjectURL(docObj9.files[0]);
    } else {
      docObj9.select();
      imgObjPreview9.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok10: true
    });
  },
  setImagePreview10: function(avalue) {
    var docObj10 = document.getElementById("doc10");
    var imgObjPreview10 = document.getElementById("preview10");
    if (docObj10.files && docObj10.files[0]) {
      imgObjPreview10.style.display = 'block';
      imgObjPreview10.style.width = '100%';
      imgObjPreview10.style.height = '10rem';
      imgObjPreview10.src = window.URL.createObjectURL(docObj10.files[0]);
    } else {
      docObj10.select();
      imgObjPreview10.style.display = 'none';
      document.selection.empty();
    }
    this.setState({
      bok11: true
    });
  },
  upLoadFun: function() {
    this.refs.file1.click();
  },
  upLoadFun2: function() {
    this.refs.file2.click();
  },
  upLoadFun3: function() {
    this.refs.file3.click();
  },
  upLoadFun4: function() {
    this.refs.file4.click();
  },
  upLoadFun5: function() {
    this.refs.file5.click();
  },
  upLoadFun6: function() {
    this.refs.file6.click();
  },
  upLoadFun7: function() {
    this.refs.file7.click();
  },
  upLoadFun8: function() {
    this.refs.file8.click();
  },
  upLoadFun9: function() {
    this.refs.file9.click();
  },
  upLoadFun10: function() {
    this.refs.file10.click();
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <form >
          <div className={cNs(mmhc.inpBox,mmhc.clearfix)}>
            <h5>*法人代表：</h5>
            <input type="text"/>
          </div>
          <div className={cNs(mmhc.inpBox,mmhc.clearfix)}>
            <h5>*联系电话：</h5>
            <input type="text"/>
          </div>
          <div className={cNs(mmhc.inpBox,mmhc.clearfix)}>
            <h5>*身份证号：</h5>
            <input type="text"/>
          </div>
          <div className={cNs(mmhc.inpBox,mmhc.clearfix)}>
            <h5>组织机构代码：</h5>
            <input type="text"/>
          </div>
          <div className={cNs(mmhc.inpBox3,mmhc.clearfix)}>
            <h5>*上传法人身份证：</h5>
            <div className={mmhc.other} >
              <div className={mmhc.addPic}>
                <div  className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok11==true?mmhc.show:mmhc.hide)}></p>
                  <img className={mmhc.preview} onClick={this.upLoadFun11} id="preview11" src={sfzz} width="100%" height="7.5rem" style={{"display":"block","height":"7.5rem"}}/>
                </div>
                <input className={mmhc.doc} name="file11" type="file" ref="file11" id="doc11" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview11}/>
              </div>
              <div className={mmhc.addPic}>
                <div className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok22==true?mmhc.show:mmhc.hide)}></p>
                  <img className={mmhc.preview} onClick={this.upLoadFun22} id="preview22" src={sfzf} width="100%" height="7.5rem" style={{"display":"block","height":"7.5rem"}}/>
                </div>
                <input className={mmhc.doc} name="file22" type="file" ref="file22" id="doc22" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview22}/>
              </div>
            </div>
          </div>
          <div className={cNs(mmhc.inpBox2,mmhc.clearfix)}>
            <h5>其他相关证件：</h5>
            <div className={mmhc.other} >
              <div className={mmhc.addPic}>
                <div id="localImag" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok2==true?mmhc.show:mmhc.hide)}></p>
                  <img className={mmhc.preview} onClick={this.upLoadFun} id="preview" src={morenImg} width="100%" height="7.5rem" style={{"display":"block","height":"7.5rem"}}/>
                </div>
                <input className={mmhc.doc} name="file0" type="file" ref="file1" id="doc" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok2==true?mmhc.show:mmhc.hide)}>
                <div id="localImag2" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok3==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun2} id="preview2" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file2" type="file" ref="file2" id="doc2" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview2}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok3==true?mmhc.show:mmhc.hide)}>
                <div id="localImag3" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok4==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun3} id="preview3" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file3" type="file" ref="file3" id="doc3" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview3}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok4==true?mmhc.show:mmhc.hide)}>
                <div id="localImag4" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok5==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun4} id="preview4" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file4" type="file" ref="file4" id="doc4" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview4}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok5==true?mmhc.show:mmhc.hide)}>
                <div id="localImag5" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok6==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun5} id="preview5" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file5" type="file" ref="file5" id="doc5" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview5}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok6==true?mmhc.show:mmhc.hide)}>
                <div id="localImag6" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok7==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun6} id="preview6" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file6" type="file" ref="file6" id="doc6" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview6}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok7==true?mmhc.show:mmhc.hide)}>
                <div id="localImag7" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok8==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun7} id="preview7" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file7" type="file" ref="file7" id="doc7" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview7}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok8==true?mmhc.show:mmhc.hide)}>
                <div id="localImag8" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok9==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun8} id="preview8" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file8" type="file" ref="file8" id="doc8" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview8}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok9==true?mmhc.show:mmhc.hide)}>
                <div id="localImag9" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok10==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun9} id="preview9" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file9" type="file" ref="file9" id="doc9" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview9}/>
              </div>
              <div className={cNs(mmhc.addPic,this.state.bok10==true?mmhc.show:mmhc.hide)}>
                <div id="localImag10" className={mmhc.localImag}>
                  <p className={cNs(mmhc.close,this.state.bok11==true?mmhc.show:mmhc.hide)}></p>
                  <img onClick={this.upLoadFun10} id="preview10" src={morenImg} width="100%" height="10rem" style={{"display":"block","height":"10rem"}}/>
                </div>
                <input name="file10" type="file" ref="file10" id="doc10" style={{"width":"100%","display":"none"}} onChange={this.setImagePreview10}/>
              </div>
            </div>
          </div>
        </form>
        <div className={cNs(mmhc.nextSet,this.state.next==true?mmhc.show:mmhc.hide)}>提交</div>    
      </div>
    )
  },
  componentDidMount: function() {
    $(function() {
      var count = 0;
      $("." + mmhc.addPic).click(function() {
        count++;
        // if (count <= 10) {
        //   var newobj = $("<div class='newPic'>" +
        //     "<p class='close'>x</p>" +
        //     "</div>");
        //   $(this).before(newobj);
        //   var newImg = document.createElement("img");
        //   //newImg.src = "./add1.png"
        //   newImg.src = "http://www.baidu.com/img/bdlogo.gif"; //给img元素的src属性赋值    
        //   newobj.append(newImg); //为dom添加子元素img  
        //   newImg.className = "addImg"
        // }
        // if (count >= 1) {
        //   $("." + mmhc.nextSet).css("display", "block")
        // }
      });
    })

  },
});

module.exports = FourthIndex;