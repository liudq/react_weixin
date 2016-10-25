var cNs = require('classnames');
var React = require("react");
var mmhc = require("./index.css");
// var ReactDom = require ('react-dom');

var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");


var imgsj = require("./up_yellow.png");
var imgsai = require("./list_saii.png");
var commodityImg = require("./sfg.jpg");

var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var newLoadingS = require("./newLoading.gif");
var noData = require("./nothingclass.png");

var ScreenAssembly = require("../../classificationScreencl/classificationScreencl/index.js");

var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      activityId:"",
      productListVOs:[],
      priceRanking:"3",
      pageClass:"1",
      pageClassa:"1",
      pageClassb:"1",
      pageClassc:"1",
      pageClassd:"1",
      sortOne:"0",
      sortTwo:"1",
      sortThree:"2",
      sortFour:"3",
      sortFive:"4",
      xianss:false,
      screenAssemblyb:false,
      filteraa:"",
      brandId:0,
      openAA:0,
      openBB:0,
      openCC:0,
      openDD:0,
      finalAyycc:"",
      PriceRangeCMin1:0,
      PriceRangeCMin2:0,
      noDataa:true,
      brandIdMove:0
    }
  },
  fnActOne: function() {
    // console.log(this.state.brandId)
    // console.log(this.state.cate3sId)
    // $("."+mmhc.loadMore).css("display","block");

   // console.log(this.state.openAA)

    // function GetQueryString(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   var r = window.location.search.substr(1).match(reg);
    //   if (r != null) return unescape(r[2]);
    //   return null;
    // };
    // var cate3sId = GetQueryString("cate3sId");
    // var brandId = GetQueryString("brandId");
    // var openAA = GetQueryString("openAA");
    // var openBB = GetQueryString("openBB");
    // var openCC = GetQueryString("openCC");
    // var openDD = GetQueryString("openDD");
    // var PriceRangeCMin1 = GetQueryString("PriceRangeCMin1");
    // var PriceRangeCMin2 = GetQueryString("PriceRangeCMin2");
    // var filtera = GetQueryString("filtera");
    // var filterb = GetQueryString("filterb");

// console.log(filtera)
    // if(PriceRangeCMin1 == undefined){
    //   PriceRangeCMin1 = "0"
    // }

    // if(PriceRangeCMin2 == undefined){
    //   PriceRangeCMin2 = "0"
    // }

    // if(filtera == null){
    //   this.setState({
    //     filtera:"0"
    //   })
    //   filtera=0
    // }else{
    //   this.setState({
    //     filtera:filtera
    //   })
    // }
// console.log(this.state.filtera)


   // var filteraa = "-"+filtera
   // var filteraa = filtera
// console.log(filteraa)
   // if(filteraa == -0){
   //    filteraa = ""
   // }else if(filteraa == "-undefined"){
   //    filteraa = ""
   // }


   //  this.setState({
   //    filteraa:filteraa
   //  })



    // if(filterb == undefined){
    //   this.setState({
    //     filterb:"0"
    //   })
    //   filterb=0
    // }else{
    //   this.setState({
    //     filterb:filterb
    //   })
    // }

    // var brandId = 5
    // if(brandId == undefined){
    //   this.setState({
    //     brandId:"0"
    //   })
    //   brandId=0
    // }else{
    //   this.setState({
    //     brandId:brandId
    //   })
    //   brandId=brandId
    // }
// console.log(brandId)

    // if(openAA == null || openAA == ""){
    //   openAA = 0;
    // }
    // if(openBB == null || openBB == ""){
    //   openBB = 0;
    // }
    // if(openCC == null || openCC == ""){
    //   openCC = 0;
    // }
    // if(openDD == null || openDD == ""){
    //   openDD = 0;
    // }




    this.setState({
      pageClass:"1"
      // cate3sId:cate3sId
    })
    $.ajax({
      // url: jsonPath.path + "/activity/listjson-1033-1-0-0-0-0-0-0-0_0.json?activityId=" + 25,
      // url: jsonPath.path + "/v20/listjson-cateId-分页-排序-自营-有货-品牌-包邮-海外购-起价_结束价.json",
      // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-"+this.state.sortThree+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
      url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-2-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
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
            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //   // console.log(111111111)
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }

            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }



        });
      }.bind(this),
      dataType: "json"
    });
    $("."+mmhc.subjectbody).animate({
      scrollTop: 0
    }, 800);

  },
  fnActTwo: function() {
    // console.log(this.state.pageClass)
    // function GetQueryString(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   var r = window.location.search.substr(1).match(reg);
    //   if (r != null) return unescape(r[2]);
    //   return null;
    // };
    // var cate3sId = GetQueryString("cate3sId");
    // var brandId = GetQueryString("brandId");
    // var openAA = GetQueryString("openAA");
    // var openBB = GetQueryString("openBB");
    // var openCC = GetQueryString("openCC");
    // var openDD = GetQueryString("openDD");
    // var PriceRangeCMin1 = GetQueryString("PriceRangeCMin1");
    // var PriceRangeCMin2 = GetQueryString("PriceRangeCMin2");
    // var filtera = GetQueryString("filtera");
    // var filterb = GetQueryString("filterb");

// console.log(filtera)
    // if(PriceRangeCMin1 == undefined){
    //   PriceRangeCMin1 = "0"
    // }

    // if(PriceRangeCMin2 == undefined){
    //   PriceRangeCMin2 = "0"
    // }

    // if(filtera == null){
    //   this.setState({
    //     filtera:"0"
    //   })
    //   filtera=0
    // }else{
    //   this.setState({
    //     filtera:filtera
    //   })
    // }
// console.log(this.state.filtera)


   // var filteraa = "-"+filtera
   // var filteraa = filtera
// console.log(filteraa)
   // if(filteraa == -0){
   //    filteraa = ""
   // }else if(filteraa == "-undefined"){
   //    filteraa = ""
   // }


    // if(filterb == undefined){
    //   this.setState({
    //     filterb:"0"
    //   })
    //   filterb=0
    // }else{
    //   this.setState({
    //     filterb:filterb
    //   })
    // }

    // var brandId = 5
    // if(brandId == undefined){
    //   this.setState({
    //     brandId:"0"
    //   })
    //   brandId=0
    // }else{
    //   this.setState({
    //     brandId:brandId
    //   })
    //   brandId=brandId
    // }
// console.log(brandId)

    // if(openAA == null){
    //   openAA = 0;
    // }
    // if(openBB == null){
    //   openBB = 0;
    // }
    // if(openCC == null){
    //   openCC = 0;
    // }
    // if(openDD == null){
    //   openDD = 0;
    // }




    this.setState({
      pageClassa:"1"
      // cate3sId:cate3sId
     })

    $.ajax({
      // url: jsonPath.path + "/v20/listjson-cateId-分页-排序-自营-有货-品牌-包邮-海外购-起价_结束价.json",
      // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-0-0-0-0-0-0-0_0.json",
      // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-0-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
      url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-0-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
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
            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }

            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }



        });
      }.bind(this),
      dataType: "json"
    });
    $("."+mmhc.subjectbody).animate({
      scrollTop: 0
    }, 800);

  },
  fnActThree: function() {

    // function GetQueryString(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   var r = window.location.search.substr(1).match(reg);
    //   if (r != null) return unescape(r[2]);
    //   return null;
    // };
    // var cate3sId = GetQueryString("cate3sId");
    // var brandId = GetQueryString("brandId");
    // var openAA = GetQueryString("openAA");
    // var openBB = GetQueryString("openBB");
    // var openCC = GetQueryString("openCC");
    // var openDD = GetQueryString("openDD");
    // var PriceRangeCMin1 = GetQueryString("PriceRangeCMin1");
    // var PriceRangeCMin2 = GetQueryString("PriceRangeCMin2");
    // var filtera = GetQueryString("filtera");
    // var filterb = GetQueryString("filterb");

// console.log(filtera)
    // if(PriceRangeCMin1 == undefined){
    //   PriceRangeCMin1 = "0"
    // }

    // if(PriceRangeCMin2 == undefined){
    //   PriceRangeCMin2 = "0"
    // }

    // if(filtera == null){
    //   this.setState({
    //     filtera:"0"
    //   })
    //   filtera=0
    // }else{
    //   this.setState({
    //     filtera:filtera
    //   })
    // }
// console.log(this.state.filtera)


   // var filteraa = "-"+filtera
   // var filteraa = filtera
// console.log(filteraa)
   // if(filteraa == -0){
   //    filteraa = ""
   // }else if(filteraa == "-undefined"){
   //    filteraa = ""
   // }


   //  if(filterb == undefined){
   //    this.setState({
   //      filterb:"0"
   //    })
   //    filterb=0
   //  }else{
   //    this.setState({
   //      filterb:filterb
   //    })
   //  }

    // var brandId = 5
    // if(brandId == undefined){
    //   this.setState({
    //     brandId:"0"
    //   })
    //   brandId=0
    // }else{
    //   this.setState({
    //     brandId:brandId
    //   })
    //   brandId=brandId
    // }
// console.log(brandId)

    // if(openAA == null){
    //   openAA = 0;
    // }
    // if(openBB == null){
    //   openBB = 0;
    // }
    // if(openCC == null){
    //   openCC = 0;
    // }
    // if(openDD == null){
    //   openDD = 0;
    // }



      this.setState({
        priceRanking : this.state.priceRanking=="3"?"4":"3",
        pageClassb:"1",
        pageClassc:"1"
        // cate3sId:cate3sId
      })

    $.ajax({
      // url: jsonPath.path + "/activity/listjson-1033-1-0-0-0-0-0-0-0_0.json?activityId=" + 25,
      // url: jsonPath.path + "/v20/listjson-cateId-分页-排序-自营-有货-品牌-包邮-海外购-起价_结束价.json",
      // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-2-0-0-" + this.state.brandId + "-0-0-0_0.json",
      // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-"+ this.state.priceRanking+"-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
      url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-"+ this.state.priceRanking+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
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
            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }

            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }



        });
      }.bind(this),
      dataType: "json"
    });
    $("."+mmhc.subjectbody).animate({
      scrollTop: 0
    }, 800);

  },
  fnActFour: function() {
    // window.location.href="/wechatMall/classificationScreencl.html?cate3sId=" + this.state.cate3sId+"&brandId="+this.state.brandId;
    // $("."+mmhc.ScreenAssemblya).css("display","block")
    this.setState({
      screenAssemblyb:true
    },function(){
      // console.log(this.state.screenAssemblyb)
    })


  },

  onChildChanged: function (newState) {
    this.setState({
      screenAssemblyb: newState
    },function(){
      // console.log(this.state.screenAssemblyb)
    });

  },

  fnActFive: function() {
    var dataId = $("." + mmhc.biaoja).attr("data-id");
    var dataIdd = $("." + mmhc.biaojxx).attr("data-idd")
    var dataIddd = $("." + mmhc.biaojxxx).attr("data-iddd")
    // var dataIdda = dataIdd


     // console.log(this.state.PriceRangeCMin1+"52")
     // console.log(this.state.brandId+"581")

     // console.log(dataIdd)
     // console.log(dataIddd)
     // console.log(this.state.pageClass)


     if(dataId == undefined){
     // console.log(this.state.brandId+"582")

         this.setState({
           pageClassd:++this.state.pageClassd,
           })
          // function GetQueryString(name) {
          //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          //   var r = window.location.search.substr(1).match(reg);
          //   if (r != null) return unescape(r[2]);
          //   return null;
          // };
          // var cate3sId = GetQueryString("cate3sId");
          // var brandId = GetQueryString("brandId");
          // var openAA = GetQueryString("openAA");
          // var openBB = GetQueryString("openBB");
          // var openCC = GetQueryString("openCC");
          // var openDD = GetQueryString("openDD");
          // var PriceRangeCMin1 = GetQueryString("PriceRangeCMin1");
          // var PriceRangeCMin2 = GetQueryString("PriceRangeCMin2");
          // var filtera = GetQueryString("filtera");
          // var filterb = GetQueryString("filterb");

          // if(PriceRangeCMin1 == undefined){
          //   PriceRangeCMin1 = "0"
          // }
          // if(PriceRangeCMin2 == undefined){
          //   PriceRangeCMin2 = "0"
          // }
          // if(filtera == null){
          //   this.setState({
          //     filtera:"0"
          //   })
          //   filtera=0
          // }else{
          //   this.setState({
          //     filtera:filtera
          //   })
          // }

         // var filteraa = "-"+filtera
         // if(filteraa == -0){
         //    filteraa = ""
         // }else if(filteraa == "-undefined"){
         //    filteraa = ""
         // }


          // if(filterb == undefined){
          //   this.setState({
          //     filterb:"0"
          //   })
          //   filterb=0
          // }else{
          //   this.setState({
          //     filterb:filterb
          //   })
          // }

          // var brandId = 5
          // if(brandId == undefined){
          //   this.setState({
          //     brandId:"0"
          //   })
          //   // brandId=0
          // }else{
          //   this.setState({
          //     brandId:brandId
          //   })
            // brandId=brandId
          // }
     // console.log(this.state.brandId+"583")

      // console.log(brandId)

          // if(openAA == null){
          //   openAA = 0;
          // }
          // if(openBB == null){
          //   openBB = 0;
          // }
          // if(openCC == null){
          //   openCC = 0;
          // }
          // if(openDD == null){
          //   openDD = 0;
          // }



          this.setState({
              // cate3sId:cate3sId,
              brandId:this.state.brandId
            },function(){
                   // console.log(this.state.brandId+"58888")
                   if(dataIddd == 9){
                        this.setState({
                          pageClassb:++this.state.pageClassb,
                           })
                        $.ajax({
                          // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClassb+"-4-0-0-" + this.state.brandId + "-0-0-0_0.json",
                          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassb+"-401-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
                          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassb+"-4-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
                          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
                          // type: jsonPath.method,
                          type: "get",
                          error:function(){
                            // alert(123)
                          },
                          success: function(data) {
                            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
                            this.setState({
                              activityId: "",
                              productListVOs:this.state.productListVOs
                            },function(){
                               // console.log(this.state.pageClassb)
                              if(this.state.pageClassb == data.pageSum){
                                $("."+mmhc.loadMore).css("display","none");
                              }


                            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
                            //     $("."+mmhc.loadMore).css("display","none")
                            //     $("."+mmhc.noDataClass).css("display","block")
                            //  }

                            //  if($("."+mmhc.commodityU1).html() == ""){
                            //     $("."+mmhc.loadMore).css("display","none")
                            //     $("."+mmhc.noDataClass).css("display","block")
                            // }

                            if(this.state.productListVOs.length==0){
                               this.setState({
                                noDataa:false
                               })
                            }else{
                               noDataa:true
                            }



                            });
                          }.bind(this),
                          dataType: "json"
                        });
                      }else if(dataIdd == 10){
                        this.setState({
                          pageClassc:++this.state.pageClassc,
                           })
                        $.ajax({
                          // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClassc+"-3-0-0-" + this.state.brandId + "-0-0-0_0.json",
                          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-301-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
                          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-3-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
                          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
                          // type: jsonPath.method,
                          type: "get",
                          error:function(){
                            // alert(123)
                          },
                          success: function(data) {
                            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
                            this.setState({
                              activityId: "",
                              productListVOs:this.state.productListVOs
                            },function(){
                             if(this.state.pageClassc == data.pageSum){
                              $("."+mmhc.loadMore).css("display","none");
                            }

                          //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          //  }

                          //  if($("."+mmhc.commodityU1).html() == ""){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          // }

                            if(this.state.productListVOs.length==0){
                               this.setState({
                                noDataa:false
                               })
                            }else{
                               noDataa:true
                            }


                            });
                          }.bind(this),
                          dataType: "json"
                        });
                      }else if(dataId == undefined){
                        // console.log(this.state.brandId+"584")
                        // console.log(this.state.finalAyycc)
                      this.setState({
                        pageClass:++this.state.pageClass,
                         })
                      $.ajax({
                        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-2-0-0-" + this.state.brandId + "-0-0-0_0.json",
                        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClass+"-"+this.state.sortThree+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
                        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-20550-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
                        url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-2-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
                        // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
                        // type: jsonPath.method,
                        type: "get",
                        error:function(){
                          // alert(123)
                        },
                        success: function(data) {
                          Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);

                          this.setState({
                              activityId: "",
                              productListVOs:this.state.productListVOs
                          },function(){
                            if(this.state.pageClass == data.pageSum){
                              $("."+mmhc.loadMore).css("display","none");
                            }

                          //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          //  }

                          //  if($("."+mmhc.commodityU1).html() == ""){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          // }

                            if(this.state.productListVOs.length==0){
                               this.setState({
                                noDataa:false
                               })
                            }else{
                               noDataa:true
                            }




                          });
                        }.bind(this),
                        dataType: "json"
                      });
                      }else  if(dataId == 2){
                        this.setState({
                        pageClass:++this.state.pageClass,
                         })
                       $.ajax({
                        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-2-0-0-" + this.state.brandId + "-0-0-0_0.json",
                        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClass+"-"+this.state.sortThree+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
                        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-200-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
                        url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-2-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
                        // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
                        // type: jsonPath.method,
                        type: "get",
                        error:function(){
                          // alert(123)
                        },
                        success: function(data) {
                          Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);

                          this.setState({
                              activityId: "",
                              productListVOs:this.state.productListVOs
                          },function(){

                            if(this.state.pageClass == data.pageSum){
                              $("."+mmhc.loadMore).css("display","none");
                            }

                          //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          //  }

                          //  if($("."+mmhc.commodityU1).html() == ""){
                          //     $("."+mmhc.loadMore).css("display","none")
                          //     $("."+mmhc.noDataClass).css("display","block")
                          // }

                            if(this.state.productListVOs.length==0){
                               this.setState({
                                noDataa:false
                               })
                            }else{
                               noDataa:true
                            }



                          });
                        }.bind(this),
                        dataType: "json"
                      });
                      }else if(dataId == 0){
                        this.setState({
                          pageClassa:++this.state.pageClassa,
                           })
                        $.ajax({
                          // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClassa+"-"+this.state.sortOne+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
                          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassa+"-201-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
                          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassa+"-2-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
                          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
                          // type: jsonPath.method,
                          type: "get",
                          error:function(){
                            // alert(123)
                          },
                          success: function(data) {
                            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
                            this.setState({
                              activityId: "",
                              productListVOs:this.state.productListVOs
                            },function(){
                              if(this.state.pageClassa == data.pageSum){
                                $("."+mmhc.loadMore).css("display","none");
                              }

                            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
                            //     $("."+mmhc.loadMore).css("display","none")
                            //     $("."+mmhc.noDataClass).css("display","block")
                            //  }

                            //  if($("."+mmhc.commodityU1).html() == ""){
                            //     $("."+mmhc.loadMore).css("display","none")
                            //     $("."+mmhc.noDataClass).css("display","block")
                            // }

                              if(this.state.productListVOs.length==0){
                                 this.setState({
                                  noDataa:false
                                 })
                              }else{
                                 noDataa:true
                              }


                            });
                          }.bind(this),
                          dataType: "json"
                        });
                      }

            })

            // if($("."+mmhc.commodityU1).html() == ""){
            //    break;
            // }

     }else if(dataId == 2){
      this.setState({
        pageClass:++this.state.pageClass,
         })
      $.ajax({
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-2-0-0-" + this.state.brandId + "-0-0-0_0.json",
        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId + "-"+this.state.pageClass+"-"+this.state.sortThree+"-055-0-" + this.state.brandId + "-0-0-0_0.json",
        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-"+this.state.sortThree+"-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
        url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClass+"-"+this.state.sortThree+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
        // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
        // type: jsonPath.method,
        type: "get",
        error:function(){
          // alert(123)
        },
        success: function(data) {
          Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);

          this.setState({
              activityId: "",
              productListVOs:this.state.productListVOs
          },function(){

            if(this.state.pageClass == data.pageSum){
              $("."+mmhc.loadMore).css("display","none");
            }


            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }



            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }

          });
        }.bind(this),
        dataType: "json"
      });
      }else if(dataId == 0){
        this.setState({
          pageClassa:++this.state.pageClassa,
           })
        $.ajax({
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassa+"-"+this.state.sortOne+"-056-0-" + this.state.brandId + "-0-0-0_0.json",
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassa+"-"+this.state.sortOne+"-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassa+"-"+this.state.sortOne+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
          // type: jsonPath.method,
          type: "get",
          error:function(){
            // alert(123)
          },
          success: function(data) {
            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
            this.setState({
              activityId: "",
              productListVOs:this.state.productListVOs
            },function(){
              if(this.state.pageClassa == data.pageSum){
                $("."+mmhc.loadMore).css("display","none");
              }

            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }


            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }


            });
          }.bind(this),
          dataType: "json"
        });
      }else if(this.state.priceRanking==3){
        // console.log(123)
        this.setState({
          pageClassb:++this.state.pageClassb
           })
        $.ajax({
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassb+"-4-057-0-" + this.state.brandId + "-0-0-0_0.json",
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassb+"-"+this.state.sortFive+"-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassb+"-"+this.state.sortFive+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
          // type: jsonPath.method,
          type: "get",
          error:function(){
            // alert(123)
          },
          success: function(data) {
            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
            this.setState({
              activityId: "",
              productListVOs:this.state.productListVOs
            },function(){
              if(this.state.pageClassb == data.pageSum){
                $("."+mmhc.loadMore).css("display","none");
              }

            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }

            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }




            });
          }.bind(this),
          dataType: "json"
        });
      }else if(this.state.priceRanking==4){
        // console.log(234)
        this.setState({
          pageClassc:++this.state.pageClassc
           })
        $.ajax({
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-3-058-0-" + this.state.brandId + "-0-0-0_0.json",
          // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-"+this.state.sortFour+"-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
          url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-"+this.state.sortFour+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
          // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
          // type: jsonPath.method,
          type: "get",
          error:function(){
            // alert(123)
          },
          success: function(data) {
            Array.prototype.push.apply(this.state.productListVOs, data.productListVOs);
            this.setState({
              activityId: "",
              productListVOs:this.state.productListVOs
            },function(){
             if(this.state.pageClassc == data.pageSum){
              $("."+mmhc.loadMore).css("display","none");
            }

            //  if(this.state.productListVOs.length==0||this.state.productListVOs.length=="0"){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            //  }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }

            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }




            });
          }.bind(this),
          dataType: "json"
        });
      }

  },
  testCallFun:function(openAA,openBB,openCC,openDD,PriceRangeCMin1,PriceRangeCMin2,finalAyycc,voList,noDataa,indexXX,pageClass,pageClassa,pageClassb,pageClassc,pageClassd){
    // console.log(openAA);

    this.setState({
      openAA:openAA,
      openBB:openBB,
      openCC:openCC,
      openDD:openDD,
      PriceRangeCMin1:PriceRangeCMin1,
      PriceRangeCMin2:PriceRangeCMin2,
      finalAyycc:finalAyycc,
      productListVOs:voList,
      noDataa:noDataa,
      brandId:indexXX,
      pageClass:pageClass,
      pageClassa:pageClassa,
      pageClassb:pageClassb,
      pageClassc:pageClassc,
      pageClassd:pageClassd
    })
  },
  render: function() {
    return (

      <div className={mmhc.subjectbody}>
        <div className={mmhc.Navigationaa}></div>
        <div className={mmhc.Navigationa}>
          <ul className={mmhc.clearfix}>
            <li className={cNs(mmhc.NavigationaU1L1,mmhc.fl)}>
              <p onClick={this.fnActOne} className={mmhc.biaoj} data-id="2">新品</p>
              <p className={cNs(mmhc.NavigationaXiaH,this.state.xianss==true || this.state.xianss=="true"?"":mmhc.on)}></p>
            </li>
            <li className={cNs(mmhc.NavigationaU1L1,mmhc.fl)}>
              <p onClick={this.fnActTwo} className={mmhc.biaoj} data-id="0">销量</p>
              <p className={mmhc.NavigationaXiaH}></p>
            </li>
            <li className={cNs(mmhc.NavigationaU1L1,mmhc.fl)}>
              <div className={mmhc.NavigationaTub}>
                <p onClick={this.fnActThree} className={cNs(mmhc.biaoj,mmhc.biaojx,mmhc.biaojxx)} data-idd="10" data-iddd="9">价格</p>
                <p className={mmhc.NavigationaXiaH}></p>
              </div>
              <p className={mmhc.NavigationaTub}><img className={mmhc.NavigationaSanj} src={imgsj} alt=""/></p>
            </li>
            <li className={cNs(mmhc.NavigationaU1L1,mmhc.fl)}>
              <div className={mmhc.NavigationaTub}>
                <p onClick={this.fnActFour}>筛选</p>
                <p className={cNs(mmhc.NavigationaXiaH,this.state.xianss==true||this.state.xianss=="true"?mmhc.on:"")}></p>
              </div>
              <p className={mmhc.NavigationaTub}><img src={imgsai} alt=""/></p>
            </li>
          </ul>
        </div>


        <div className={mmhc.commodity}>
          <div>
            <ul className={cNs(mmhc.commodityU1,mmhc.clearfix)}>
            {
              this.state.productListVOs.map(function(elem,index){
                return    <li key={index} className={cNs(mmhc.commodityU1L1,mmhc.fl)}>
                            <a href={"/wechatMall/detail.html?prdCode="+elem.id+"&activityId="+this.state.activityId}>
                              <div className={mmhc.commodityU1L1Tu}><img src={imgPath+elem.masterImg} alt=""/></div>
                            </a>
                            <div className={mmhc.commodityU1L1Name}>{elem.name1}</div>
                            <div className={mmhc.commodityU1L1Moneyc}><em className={mmhc.commodityU1L1Moneya}>￥</em><em className={mmhc.commodityU1L1Moneyb}>{elem.malMobilePrice?elem.malMobilePrice:0}</em></div>
                          </li>
              }.bind(this))
            }
            </ul>
          </div>

        </div>

        <div onClick={this.fnActFive} className={cNs(mmhc.loadMore,this.state.noDataa == true||this.state.noDataa == "true"?"":mmhc.hiddlea)}>点击加载更多</div>


        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}


        <div className={mmhc.loadingA}></div>
        <div className={mmhc.loadingB}><img className={mmhc.loadingBTu} src={newLoadingS} alt=""/></div>

        <div className={cNs(mmhc.noDataClass,this.state.noDataa == true||this.state.noDataa == "true"?"":mmhc.showa)}><img src={noData} alt=""/></div>

        <div className={cNs(mmhc.ScreenAssemblya,this.state.screenAssemblyb==false||this.state.screenAssemblyb=="false"?"":mmhc.showa)}>
          <ScreenAssembly testCallFun={this.testCallFun} filteraap={this.state.filteraa} brandIdpaa={this.state.brandIdMove} brandIdp={this.state.brandId} initialChecked={this.state.screenAssemblyb} callbackParent={this.onChildChanged}/>
        </div>

      </div>



    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var cate3sId = GetQueryString("cate3sId");
    var brandId = GetQueryString("brandId");
    var openAA = GetQueryString("openAA");
    var openBB = GetQueryString("openBB");
    var openCC = GetQueryString("openCC");
    var openDD = GetQueryString("openDD");
    var PriceRangeCMin1 = GetQueryString("PriceRangeCMin1");
    var PriceRangeCMin2 = GetQueryString("PriceRangeCMin2");
    var filtera = GetQueryString("filtera");
    var filterb = GetQueryString("filterb");
    var xianss = GetQueryString("xianss");
    // this.state.xianss = xianss;
    // console.log(this.state.xianss)

// console.log(filtera)
    if(PriceRangeCMin1 == undefined){
      PriceRangeCMin1 = "0"
    }

    if(PriceRangeCMin2 == undefined){
      PriceRangeCMin2 = "0"
    }

    if(filtera == null || filtera == undefined){
      this.setState({
        filtera:"0"
      })
      filtera=0
    }else{
      this.setState({
        filtera:filtera
      })
    }

    // this.state.filtera = filtera
// console.log(this.state.filtera)


   var filteraa = "-"+filtera
   // var filteraa = filtera
   // console.log(filteraa)

   if(filteraa == -0 || filteraa == -"0"){
      filteraa = ""
   }else if(filteraa == "-undefined"){
      filteraa = ""
   }
   this.state.filteraa = filteraa
   // console.log(this.state.filteraa)

    if(filterb == undefined){
      this.setState({
        filterb:"0"
      })
      filterb=0
    }else{
      this.setState({
        filterb:filterb
      })
    }

     // brandId = 5
     // this.state.brandId = 5

    // if(brandId == undefined || brandId == ""){
    //   this.state.brandId = 0
    // }else{
    //   this.state.brandId = brandId
    //   // brandId=brandId
    // }


    if(brandId == undefined || brandId == ""){
      this.setState({
        brandId:0
      })
    }else{
      this.setState({
        brandId:brandId
      })
    }




    // var ddd = 5
    //
    // var that =this;

    // this.setState({
    //   brandId:100,
    //   brandIdMove:200
    // },function(){
    //   // alert(22);
    //   // console.log(that.state.brandId+"comdid")
    //   // console.log(that.state.brandIdMove+"brandIdMove")
    // })

    // this.setState({
    //   brandId:ddd
    // },function(){
    //   console.log(this.state.brandId+"22")
    // })



    // if(brandId == undefined || brandId == ""){
    //   this.setState({
    //     brandId:"0"
    //   })
    // }else{
    //   console.log(888)
    //   this.setState({
    //     brandId:brandId
    //   },function(){
    //   console.log(this.state.brandId)
    //   })
    //   // brandId=brandId
    // }


      // this.setState({
      //   brandId:this.state.brandId
      // })

// console.log(this.state.brandId+"10")

    if(openAA == null){
      openAA = 0;
    }
    if(openBB == null){
      openBB = 0;
    }
    if(openCC == null){
      openCC = 0;
    }
    if(openDD == null){
      openDD = 0;
    }

    // console.log(openCC)
    this.setState({
      cate3sId:cate3sId,
      xianss:xianss,
      filteraa:filteraa
    },function(){
      $.ajax({
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId"-1-2-0-0-0-0-0-0_0.json",
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+"-"+filtera+".json",
        // url: jsonPath.path + "/v20/listjson-"+ this.state.cate3sId + "-1-"+this.state.sortOne+"-0-0-" + this.state.brandId + "-0-0-0_0.json",
        // url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-1-2-"+openCC+"-"+openAA+"-"+brandId+"-"+openBB+"-"+openDD+"-"+PriceRangeCMin1+"_"+PriceRangeCMin2+filteraa+".json",
        url: jsonPath.path + "/wechatMall/v20/listjson-"+ this.state.cate3sId+"-"+this.state.pageClassc+"-"+this.state.sortThree+"-"+this.state.openCC+"-"+this.state.openAA+"-"+this.state.brandId+"-"+this.state.openBB+"-"+this.state.openDD+"-"+this.state.PriceRangeCMin1+"_"+this.state.PriceRangeCMin2+this.state.finalAyycc+".json",
        // url: jsonPath.path + "/activity/listjson.json?activityId=" + 25,
        // url: jsonPath.path + "/activity/listjson1.json?activityId=" + 25,
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
             if(this.state.pageClass == data.pageSum){
              $("."+mmhc.loadMore).css("display","none");
            }


            if(this.state.productListVOs.length==0){
               this.setState({
                noDataa:false
               })
            }else{
               noDataa:true
            }



             // if(this.state.productListVOs.length==0 || this.state.productListVOs.length=="0"){
             //    $("."+mmhc.loadMore).css("display","none")
             //    $("."+mmhc.noDataClass).css("display","block")
             // }

            //  if($("."+mmhc.commodityU1).html() == ""){
            //     $("."+mmhc.loadMore).css("display","none")
            //     $("."+mmhc.noDataClass).css("display","block")
            // }


            });



            $("."+mmhc.loadingA).css("display","none")
            $("."+mmhc.loadingB).css("display","none")



        }.bind(this),
        dataType: "json"
      });


    })

    var apkState = GetQueryString("apk");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 10;
    }



    $("."+mmhc.subjectbody).scroll(function() {
      if ($("."+mmhc.subjectbody).scrollTop() > 150) {
        $("." + mmhc.fixUpCss).addClass(mmhc.block);
        $("." + mmhc.backImgA).addClass(mmhc.block);
      } else {
        $("." + mmhc.fixUpCss).removeClass(mmhc.block);
        $("." + mmhc.backImgA).removeClass(mmhc.block);
      }
    });


    $("." + mmhc.fixUpCss).click(function(event) {
      $("."+mmhc.subjectbody).animate({
        scrollTop: 0
      }, 800);
    });


    $("."+mmhc.NavigationaU1L1).click(function(){
      $(this).find("."+mmhc.NavigationaXiaH).addClass(mmhc.on);
      $(this).siblings().find("."+mmhc.NavigationaXiaH).removeClass(mmhc.on);
    })


    $("."+mmhc.NavigationaU1L1).eq(2).on("click",function(){
        $("."+mmhc.NavigationaSanj).toggleClass(mmhc.NavigationaSanja)
    })


    $("."+mmhc.NavigationaU1L1).click(function(){
      $(this).find("."+mmhc.biaoj).addClass(mmhc.biaoja)
      $(this).siblings().find("."+mmhc.biaoj).removeClass(mmhc.biaoja);
    })

    $("."+mmhc.NavigationaU1L1).click(function(){
      $(this).find("."+mmhc.biaojx).toggleClass(mmhc.biaojxx)
      $(this).find("."+mmhc.biaojx).toggleClass(mmhc.biaojxxx)
      // $(this).find("."+mmhc.biaojx).addClass(mmhc.biaojxxx)
      // $(this).find("."+mmhc.biaojx).removeClass(mmhc.biaojxx)
      // $("."+mmhc.NavigationaU1L1).click(function(){
      //    $(this).find("."+mmhc.biaojx).addClass(mmhc.biaojxx)
      //    $(this).find("."+mmhc.biaojx).removeClass(mmhc.biaojxxx)
      // })
    })


  }
});

module.exports = ActivityChildOne;
