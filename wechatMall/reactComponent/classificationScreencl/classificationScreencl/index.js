var cNs = require('classnames');
var React = require("react");
var mmhc = require("./index.css");
// var ReactDom = require ('react-dom');

var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");

// var backImg = require("./order2.png");
// var back2Img = require("./back2.png");
// var sshareImg = require("./share.png");
// var share2Img = require("./share2.png");


var kaiImg = require("./on.png");
var guanImg = require("./out.png");
var allImg = require("./aѡ.jpg");


Array.prototype.baobaorRemove = function(dx) {
  if (isNaN(dx) || dx > this.length) {
    return false;
  }
  this.splice(dx, 1);
}



var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      // apkState: "",
      productTypeAttrsAll:[],
      productBrands:[],
      filtera:[],
      filterb:[],
      filterAll:{},
      openA:"1",
      openB:"1",
      openC:"1",
      openD:"1",
      // indexX:"",
      finalAyy:[],
      finalAyyb:[],
      indexX:"0",
      biaojj:true,
      screenAssemblyb: this.props.initialChecked,
      finalAyycc:"",
      brandId:0,
      brandIda:0
    }
  },
  onTextChange: function () {
    var newState = !this.props.initialChecked;
    // console.log("123"+newState)
    // console.log("123"+this.props.initialChecked)
    this.setState({
      screenAssemblyb: newState
    });
    // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
    this.props.callbackParent(newState);
  },
  fnActOne: function() {
    this.setState({
      openA:this.state.openA=="1"?"0":"1"
    });

     // console.log(this.state.openA)
  },
  fnActTwo: function() {
    this.setState({
      openB:this.state.openB=="1"?"0":"1"
    });

     // console.log(this.state.openB)
  },
  fnActThree: function() {
    this.setState({
      openC:this.state.openC=="1"?"0":"1"
    });

     // console.log(this.state.openC)
  },
  fnActFour: function() {
    this.setState({
      openD:this.state.openD=="1"?"0":"1"
    });

     // console.log(this.state.openD)
  },
  fnActFCancel: function() {
    window.location.reload()


  },
  fnActDetermine: function() {
    // var tabId = $(event.target).attr("data-ida");
    // var bhIdd = $(event.target).attr("data-idf");
    // var goodsIdStateEnd = $(event.target).attr("data-idb");
     var openAA = $("."+mmhc.switchaL1A).attr("data-ida")
     var openBB = $("."+mmhc.switchaL1B).attr("data-idb")
     var openCC = $("."+mmhc.switchaL1C).attr("data-idc")
     var openDD = $("."+mmhc.switchaL1D).attr("data-idd")

     var pageClass = 1
     var pageClassa = 1
     var pageClassb = 1
     var pageClassc = 1
     var pageClassd = 1


     // console.log(openAA)
     // console.log(openBB)
     // console.log(openCC)
     // console.log(openDD)
     //

     var PriceRangeCMin1 = $("."+mmhc.PriceRangeCMin1).val();
     var PriceRangeCMin2 = $("."+mmhc.PriceRangeCMin2).val();
     if(PriceRangeCMin1 == "最低价格" || PriceRangeCMin1 == ""){
       PriceRangeCMin1 = 0
     }else{
      PriceRangeCMin1 = PriceRangeCMin1
     }
     if(PriceRangeCMin2 == "最高价格" || PriceRangeCMin2 == ""){
       PriceRangeCMin2 = 0
     }else{
      PriceRangeCMin2 = PriceRangeCMin2
     }

      this.setState({
        screenAssemblyb:false
        // brandId:this.state.brandId
      },function(){
// console.log(this.state.brandId+"shid")

      })

      this.onTextChange()

// console.log(this.state.indexX+"就是")


    // window.location.href="http://192.168.0.164:9098/classificationFirstPagecl?openAA="+openAA+"&openBB="+openBB+"&openCC="+openCC+"&openDD="+openDD+"&PriceRangeCMin1="+PriceRangeCMin1+"&PriceRangeCMin2="+PriceRangeCMin2+"&brandId="+this.state.indexX+"&filtera="+this.state.finalAyyc+"&cate3sId="+this.state.cate3sId+"&xianss=true";
    // window.location.href="/wechatMall/classificationFirstPagecl.html?openAA="+openAA+"&openBB="+openBB+"&openCC="+openCC+"&openDD="+openDD+"&PriceRangeCMin1="+PriceRangeCMin1+"&PriceRangeCMin2="+PriceRangeCMin2+"&brandId="+this.state.indexX+"&filtera="+this.state.finalAyyc+"&cate3sId="+this.state.cate3sId;

      $.ajax({
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId"-1-2-0-0-0-0-0-0_0.json",
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+"-"+filtera+".json",
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-"+this.state.sortOne+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+this.state.brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+this.state.filteraa+".json",
        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+this.state.brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+this.state.finalAyycc+".json",
        url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+this.state.indexX+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+this.state.finalAyycc+".json",
        // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
        // type: jsonPath.method,
        type: "get",
        error:function(){
          // alert(123)
        },
        success: function(data) {
          this.setState({
              activityId: "",
              productListVOs:data.productListVOs
          },function(){
            // console.log(this.state.indexX+"888")
            var noDataa = true
            if(this.state.productListVOs.length==0){
               noDataa = false
            }else{
               noDataa = true
            }
            // console.log(noDataa)
            // this.props.testCallFun(openAA,openBB,openCC,openDD,PriceRangeCMin1,PriceRangeCMin2,this.state.finalAyycc,this.state.productListVOs,noDataa,this.state.indexX);
            this.props.testCallFun(openAA,openBB,openCC,openDD,PriceRangeCMin1,PriceRangeCMin2,this.state.finalAyycc,this.state.productListVOs,noDataa,this.state.indexX,pageClass,pageClassa,pageClassb,pageClassc,pageClassd);
             if(this.state.pageClassc == data.pageSum){
              $("."+mmhc.loadMore).css("display","none");
            }
            });

            $("."+mmhc.loadingA).css("display","none")
            $("."+mmhc.loadingB).css("display","none")

            if($("."+mmhc.commodityU1).html() == ""){
              $("."+mmhc.loadMore).css("display","none")
              $("."+mmhc.noData).css("display","block")
            }



        }.bind(this),
        dataType: "json"
      });



  },
  fnActFSix: function() {
    var indexX = $("."+mmhc.brandAllbOpenl1a).attr("data-idv");
    this.state.indexX = indexX
    if(this.state.indexX == "" || this.state.indexX ==undefined){
      this.state.indexX = 0
    }else{
          this.state.indexX = indexX
    }
    // console.log(this.state.indexX)

  },
  fnActFSeven: function(even) {
    var flag=false;
    var isP=$(even.target).hasClass(mmhc.brandAllbOpenl1Name);
    if(isP){
      var hasActive=$(even.target).parent().hasClass(mmhc.brandAllbOpenl1a);
      if(hasActive){
        $(even.target).parent().removeClass(mmhc.brandAllbOpenl1a);
        flag=false;
      }else{
        $(even.target).parent().siblings().removeClass(mmhc.brandAllbOpenl1a);
        $(even.target).parent().addClass(mmhc.brandAllbOpenl1a);
        flag=true;
      }
    }else{
      var hasActive=$(even.target).hasClass(mmhc.brandAllbOpenl1a);
      if(hasActive){
        $(even.target).removeClass(mmhc.brandAllbOpenl1a);
        flag=false;
      }else{
        $(even.target).siblings().removeClass(mmhc.brandAllbOpenl1a);
        $(even.target).addClass(mmhc.brandAllbOpenl1a);
        flag=true;
      }
    }

    var filtera = $("."+mmhc.brandAllass).attr("data-ide");
    var filterb =null;
    var filterbOld=null;
    // this.state.filtera.push(filtera);
    if(flag){
      filterb= $("."+mmhc.brandAllbOpenl1sss).attr("data-idg");
    }else{
      filterb=null;
      filterbOld= $("."+mmhc.brandAllbOpenl1sss).attr("data-idg");
    }

    // this.state.filterb = filterb
    // this.state.filterb.push(filterb)

    var finalArr=this.state.finalAyy;
    var myValue=filtera+"_"+filterb;
    var myValueOld=filtera+"_"+filterbOld;
    // if(filtera == undefined || filterb == undefined){
    //   myValue = "";
    // }

    var flag=100;
    var ii=0;
    for(var i=0;i<finalArr.length;i++){
      var myA= finalArr[i].split("_")[0];
      if(myA==filtera){
        flag=0;
        ii=i;
        if(filterb==null){
          flag=1;
          ii=i;
          break;
        }
      }else{
        if(filterb==null){
          flag=1;
          var iii=finalArr.indexOf(myValueOld);
          ii=iii;
          break;
        }
      }
    }
    if(flag==0){
      // console.log(11111);
      this.state.finalAyy.baobaorRemove(ii);
      this.state.finalAyy.push(myValue);
    }else if(flag==1){
      // console.log(2222);
      this.state.finalAyy.baobaorRemove(ii);
    }else{
      // console.log(3333);
      this.state.finalAyy.push(myValue);
    }






     var flagi = false;
     var classArrG = $("."+mmhc.brandAllbOpenl1ss).attr("class").toString().split(" ");


    // console.log(this.state.finalAyy);


    var finalAyya = this.state.finalAyy
    var finalAyyc = finalAyya.join("-")
    var finalAyycc = "-"+finalAyya.join("-")
    // console.log(finalAyyc)
    this.state.finalAyyc = finalAyyc
    this.state.finalAyycc = finalAyycc
    // console.log(this.state.finalAyyc)


  },
  stopPP:function(){
    return false;
  },
  render: function() {
    return (
      <div className={mmhc.subjectbody}>
        <div className={mmhc.titleScreena}>
          <em onClick={this.fnActFCancel} className={mmhc.titleCancela}>取消</em><em className={mmhc.titleScreenaz}>筛选</em>
        </div>
        <div>
          <ul className={mmhc.switchaU1}>
            <li onClick={this.fnActOne} data-ida={this.state.openA==1?0:1} className={cNs(mmhc.switchaL1,mmhc.switchaL1A,mmhc.clearfix)}>
             <em className={mmhc.fl}>仅看有货</em><em className={cNs(mmhc.switchaL1Img,mmhc.fr)}></em>
            </li>
            <li onClick={this.fnActTwo} data-idb={this.state.openB==1?0:1} className={cNs(mmhc.switchaL1,mmhc.switchaL1B,mmhc.clearfix)}>
             <em className={mmhc.fl}>仅看包邮</em><em className={cNs(mmhc.switchaL1Img,mmhc.fr)}></em>
            </li>
            <li onClick={this.fnActThree} data-idc={this.state.openC==1?0:1} className={cNs(mmhc.switchaL1,mmhc.switchaL1C,mmhc.clearfix)}>
             <em className={mmhc.fl}>蜜麻花自营</em><em className={cNs(mmhc.switchaL1Img,mmhc.fr)}></em>
            </li>
            <li onClick={this.fnActFour} data-idd={this.state.openD==1?0:1} className={cNs(mmhc.switchaL1,mmhc.switchaL1D,mmhc.clearfix)}>
             <em className={mmhc.fl}>海外购</em><em className={cNs(mmhc.switchaL1Img,mmhc.fr)}></em>
            </li>
          </ul>
        </div>
        <div className={cNs(mmhc.PriceRangeA,mmhc.clearfix)}>
          <div className={cNs(mmhc.PriceRangeB,mmhc.fl)}>价格区间</div>
          <div className={cNs(mmhc.PriceRangeC,mmhc.fr)}>
            <input className={cNs(mmhc.PriceRangeCMin,mmhc.PriceRangeCMin1)} type="text"/>----<input className={cNs(mmhc.PriceRangeCMin,mmhc.PriceRangeCMin2)} type="text"/>
          </div>
        </div>

        <div>
          <div className={cNs(mmhc.brandAll,mmhc.clearfix)}>
            <div className={mmhc.fl}>品牌</div>
            <div className={cNs(mmhc.brandAllball,mmhc.fr)}>全部<em className={mmhc.brandAllb}><img className={mmhc.brandAllbf} src={allImg} alt=""/></em></div>
          </div>
          <div className={mmhc.brandAllbOpen}>
            <ul className={cNs(mmhc.brandAllbOpenU1,mmhc.clearfix)}>
            {
              this.state.productBrands.map(function(elem,index){
                return  <li onClick={this.fnActFSix} data-idv={elem.id} key={index} id={"tab"+index} className={cNs(mmhc.brandAllbOpenl1,mmhc.brandAllbOpenl1First,mmhc.fl)}>
                          <p className={mmhc.brandAllbOpenl1Name} onClick={this.stopPP}>{elem.name}</p>
                        </li>
              }.bind(this))
            }
            </ul>
          </div>
        </div>


        {
          this.state.productTypeAttrsAll.map(function(elem,index){
            return  <div key={index}>
                      <div className={cNs(mmhc.brandAll,mmhc.clearfix)}>
                        <div className={cNs(mmhc.brandAllas,mmhc.fl)} data-ide={elem.id}>{elem.name}</div>
                        <div className={cNs(mmhc.brandAllball,mmhc.fr)}>全部<em className={mmhc.brandAllb}><img className={mmhc.brandAllbf} src={allImg} alt=""/></em></div>
                      </div>
                      <div className={cNs(mmhc.brandAllbOpen,mmhc.brandAllbOpens)}>
                        <ul className={cNs(mmhc.brandAllbOpenU1,mmhc.clearfix)}>
                      {
                        elem.value.split(",").map(function(elem,index){
                          return  <li onClick={this.fnActFSeven} key={index} data-idg={index} className={cNs(mmhc.brandAllbOpenl1,mmhc.brandAllbOpenl1ss,mmhc.fl)}>
                                    <p className={mmhc.brandAllbOpenl1Name}>{elem}</p>
                                  </li>
                        }.bind(this))
                      }
                        </ul>
                      </div>
                    </div>
          }.bind(this))
        }


        <div className={mmhc.confirmover}>
          <div onClick={this.fnActDetermine} className={mmhc.confirmovera}>确认</div>
        </div>


      </div>

    )
  },
  componentDidMount: function() {
  // componentWillReceiveProps: function(next) {
  // shouldComponentUpdate: function() {


    // this.setState({
    //   asddd:100
    // },function(){
    //   console.log(this.state.asddd+"co5")
    // })







    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var cate3sId = GetQueryString("cate3sId");
    var brandId = GetQueryString("brandId");
    var brandIda = GetQueryString("brandId");
    // var brandId = this.props.brandIdp
    // var brandIdMove = this.props.brandIdpaa


    // var brandIdMove = next.brandIdpaa


    var filteraa = this.props.filteraap
   // console.log(filteraa)
   // console.log(brandIdMove+"brandIdMove")
     // if(brandId == ""){
     //    brandId = 0
     // }


// console.log(brandId+"我是")


    if(brandId == null || brandId == ""){
      this.setState({
        indexX:"0"
      })
      // brandId=0
    }else{
      this.setState({
        indexX:brandId
      },function(){
      // console.log(this.state.indexX+"2")

      })
      // brandId=brandId
    }


    if(brandIda == null || brandIda == ""){
      this.setState({
        brandIda:0
      },function(){
      })
    }else{
      this.setState({
        brandIda:brandIda
      },function(){
      })
    }








    this.setState({
      cate3sId:cate3sId,
      brandId:brandId,
      filteraa:filteraa
    },function(){
      // console.log(this.state.brandId+"13")
          $.ajax({
      url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId + "-1-2-0-0-" + this.state.brandIda + "-0-0-0_0.json",
      // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
      // type: jsonPath.method,
      type: "get",
      error:function(){
        // alert(123)
      },
      success: function(data) {
        this.setState({
            productTypeAttrsAll: data.productTypeAttrsAll,
            productBrands: data.productBrands,
            activityId: 25
        },function(){


          // 开关按钮
           $("."+mmhc.switchaL1Img).click(function(){
             $(this).toggleClass(mmhc.switchaL1Img1)
             // $(this).find("img").css("height","30px")
             // $(this).find("img").style("src"={guanImg})
           })

           // all小三角,all展开
           $("."+mmhc.brandAllball).click(function(){
             $(this).find("."+mmhc.brandAllbf).toggleClass(mmhc.brandAllbf1);
             $(this).parent().siblings().find("."+mmhc.brandAllbOpenU1).toggleClass(mmhc.brandAllbOpenU1a);
           })


           // 每个样式
           $("."+mmhc.brandAllbOpenl1First).click(function(){
             var flagc = false;
             // var flagc = 1;
             var classArr = $(this).attr("class").toString().split(" ");
             for(var i = 0; i < classArr.length;i++){
                if(classArr[i]=="index__brandAllbOpenl1a___3BOLz"){
                flagc=true;
                // flagc=0;
               }
             }
             if(!flagc){
                $(this).addClass(mmhc.brandAllbOpenl1a).siblings().removeClass(mmhc.brandAllbOpenl1a);
               }else {
                $(this).removeClass(mmhc.brandAllbOpenl1a)
                }
           })



           $("."+mmhc.brandAllbOpens).click(function(){
              $(this).siblings().find($("."+mmhc.brandAllas)).addClass(mmhc.brandAllass)
              $(this).parent().siblings().find($("."+mmhc.brandAll)).find($("."+mmhc.brandAllas)).removeClass(mmhc.brandAllass)
           })

           $("."+mmhc.brandAllbOpenl1ss).click(function(){
              $(this).addClass(mmhc.brandAllbOpenl1sss).siblings().removeClass(mmhc.brandAllbOpenl1sss);
              $(this).parent().parent().parent().siblings().find($("."+mmhc.brandAllbOpenl1ss)).removeClass(mmhc.brandAllbOpenl1sss);
           })

           // 价格区间
           $("."+mmhc.PriceRangeCMin1).val("最低价格");
           $("."+mmhc.PriceRangeCMin2).val("最高价格");
           $("."+mmhc.PriceRangeCMin).click(function(){
            $(this).val("")
           })



        });
      }.bind(this),
      dataType: "json"
    });
    })


    var activityId = GetQueryString("activityId");
    // if (apkState == 1) {
    //   this.setState({
    //     apkState: 1
    //   });
    // };
    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 10;
    }


  }
});

module.exports = ActivityChildOne;
