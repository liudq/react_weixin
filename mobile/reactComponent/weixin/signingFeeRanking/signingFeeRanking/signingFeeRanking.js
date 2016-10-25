require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./signingFeeRanking.css");
var explainImg = require("./explain.png");

var imgMary = require("./mary14.png")
var bannerimgMary = require("./paiHanga.jpg")
var ranking0 = require("./1.png")
var ranking1 = require("./2.png")
var ranking2 = require("./3.png")
var ranking3 = require("./4.png")
var ranking4 = require("./5.png")
var ranking5 = require("./6.png")
var ranking6 = require("./7.png")
var ranking7 = require("./8.png")
var ranking8 = require("./9.png")
var ranking9 = require("./10.png")
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var noData = require("./noData.jpg");

var SigningFeeRanking = React.createClass({
  getInitialState: function() {
    return {
      agree: 1,
      versionTitel: 0,
      yestadayPaiHang: [],
      leijiIncome: "",
      yestadayIncome: "",
      PaiHangDC: "",
      userMobile: "",
      nossf: true,
      paiMing: true,
      newnewleijiIncomet: "",
      newnewyestadayIncome: ""
    }
  },
  fnOne: function() {
    $.ajax({
      // url: jsonPath.path + "/activity/mobile昨日.json",
      url: jsonPath.path + "/mobileYesterday.json",
      type: jsonPath.method,
      error: function() {},
      success: function(data) {

        this.setState({
          activityId: 25,
          yestadayPaiHang: data.yestadayPaiHang,
          leijiIncome: data.leijiIncome,
          yestadayIncome: data.yestadayIncome,
          PaiHangDC: data.PaiHangDC,
          userMobile: data.userMobile
        }, function() {
          var newleijiIncome = this.state.leijiIncome.toFixed(3)
          var newnewleijiIncomet = newleijiIncome.substring(0, newleijiIncome.lastIndexOf('.') + 3)
          var newyestadayIncome = this.state.yestadayIncome.toFixed(3)
          var newnewyestadayIncome = newyestadayIncome.substring(0, newyestadayIncome.lastIndexOf('.') + 3)
          this.setState({
              newnewleijiIncomet: newnewleijiIncomet,
              newnewyestadayIncome: newnewyestadayIncome
            })
            // if(this.state.yestadayPaiHang.length==0){
            //     $("."+mmhc.content).css("display","none")
            //     this.setState({
            //        nossf:false
            //     })
            //  }else{
            //     $("."+mmhc.content).css("display","block")
            //     this.setState({
            //        nossf:true
            //     })
            //  }


          if (this.state.PaiHangDC == 0) {
            this.setState({
              paiMing: false
            })
          } else {
            this.setState({
              paiMing: true
            })
          }
          $("." + mmhc.sec1BotYes).html("昨日收益（元）");
          $("." + mmhc.rankingAA).each(function(index, elem) {
            $("." + mmhc.rankingAA).eq(1).attr("src", ranking1)
            $("." + mmhc.rankingAA).eq(2).attr("src", ranking2)
            $("." + mmhc.rankingAA).eq(3).attr("src", ranking3)
            $("." + mmhc.rankingAA).eq(4).attr("src", ranking4)
            $("." + mmhc.rankingAA).eq(5).attr("src", ranking5)
            $("." + mmhc.rankingAA).eq(6).attr("src", ranking6)
            $("." + mmhc.rankingAA).eq(7).attr("src", ranking7)
            $("." + mmhc.rankingAA).eq(8).attr("src", ranking8)
            $("." + mmhc.rankingAA).eq(9).attr("src", ranking9)
          })
        });

      }.bind(this),
      dataType: "json"
    });
  },
  fnTwo: function() {
    $.ajax({
      // url: jsonPath.path + "/activity/mobile本周.json",
      url: jsonPath.path + "/mobileWeek.json",
      type: jsonPath.method,
      error: function() {},
      success: function(data) {

        this.setState({
          activityId: 25,
          yestadayPaiHang: data.thisWeekPaiHang,
          leijiIncome: data.leijiIncome,
          yestadayIncome: data.thisWeekIncome,
          PaiHangDC: data.PaiHangWC,
          userMobile: data.userMobile
        }, function() {
          var newleijiIncome = this.state.leijiIncome.toFixed(3)
          var newnewleijiIncomet = newleijiIncome.substring(0, newleijiIncome.lastIndexOf('.') + 3)
          var newyestadayIncome = this.state.yestadayIncome.toFixed(3)
          var newnewyestadayIncome = newyestadayIncome.substring(0, newyestadayIncome.lastIndexOf('.') + 3)
          this.setState({
              newnewleijiIncomet: newnewleijiIncomet,
              newnewyestadayIncome: newnewyestadayIncome
            })
            // if(this.state.yestadayPaiHang.length==0){
            //     $("."+mmhc.content).css("display","none")
            //     this.setState({
            //        nossf:false
            //     })
            //  }else{
            //     $("."+mmhc.content).css("display","block")
            //     this.setState({
            //        nossf:true
            //     })
            //  }


          if (this.state.PaiHangDC == 0) {
            this.setState({
              paiMing: false
            })
          } else {
            this.setState({
              paiMing: true
            })
          }
          $("." + mmhc.sec1BotYes).html("本周收益（元）")
          $("." + mmhc.rankingAA).each(function(index, elem) {
            $("." + mmhc.rankingAA).eq(1).attr("src", ranking1)
            $("." + mmhc.rankingAA).eq(2).attr("src", ranking2)
            $("." + mmhc.rankingAA).eq(3).attr("src", ranking3)
            $("." + mmhc.rankingAA).eq(4).attr("src", ranking4)
            $("." + mmhc.rankingAA).eq(5).attr("src", ranking5)
            $("." + mmhc.rankingAA).eq(6).attr("src", ranking6)
            $("." + mmhc.rankingAA).eq(7).attr("src", ranking7)
            $("." + mmhc.rankingAA).eq(8).attr("src", ranking8)
            $("." + mmhc.rankingAA).eq(9).attr("src", ranking9)
          })
        });

      }.bind(this),
      dataType: "json"
    });
  },
  fnThree: function() {
    $.ajax({
      // url: jsonPath.path + "/activity/mobile本月.json",
      url: jsonPath.path + "/mobileMonth.json",
      type: jsonPath.method,
      error: function() {},
      success: function(data) {

        this.setState({
          activityId: 25,
          yestadayPaiHang: data.thisMonthPaiHang,
          leijiIncome: data.leijiIncome,
          yestadayIncome: data.thisMonthIncome,
          PaiHangDC: data.PaiHangMC,
          userMobile: data.userMobile
        }, function() {
          var newleijiIncome = this.state.leijiIncome.toFixed(3)
          var newnewleijiIncomet = newleijiIncome.substring(0, newleijiIncome.lastIndexOf('.') + 3)
          var newyestadayIncome = this.state.yestadayIncome.toFixed(3)
          var newnewyestadayIncome = newyestadayIncome.substring(0, newyestadayIncome.lastIndexOf('.') + 3)
          this.setState({
              newnewleijiIncomet: newnewleijiIncomet,
              newnewyestadayIncome: newnewyestadayIncome
            })
            // if(this.state.yestadayPaiHang.length==0){
            //     $("."+mmhc.content).css("display","none")
            //     this.setState({
            //        nossf:false
            //     })
            //  }else{
            //     $("."+mmhc.content).css("display","block")
            //     this.setState({
            //        nossf:true
            //     })
            //  }


          if (this.state.PaiHangDC == 0) {
            this.setState({
              paiMing: false
            })
          } else {
            this.setState({
              paiMing: true
            })
          }
          $("." + mmhc.sec1BotYes).html("本月收益（元）")
          $("." + mmhc.rankingAA).each(function(index, elem) {
            $("." + mmhc.rankingAA).eq(1).attr("src", ranking1)
            $("." + mmhc.rankingAA).eq(2).attr("src", ranking2)
            $("." + mmhc.rankingAA).eq(3).attr("src", ranking3)
            $("." + mmhc.rankingAA).eq(4).attr("src", ranking4)
            $("." + mmhc.rankingAA).eq(5).attr("src", ranking5)
            $("." + mmhc.rankingAA).eq(6).attr("src", ranking6)
            $("." + mmhc.rankingAA).eq(7).attr("src", ranking7)
            $("." + mmhc.rankingAA).eq(8).attr("src", ranking8)
            $("." + mmhc.rankingAA).eq(9).attr("src", ranking9)
          })
        });



      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.pay}>


        <div className={cNs(mmhc.tab,mmhc.clearfix)}>
          <div onClick={this.fnOne} className={mmhc.tab1}>
            <div data-id="day" className={cNs(mmhc.tabDivActive,mmhc.tabDiv)}>昨日</div>
          </div>
          <div onClick={this.fnTwo} className={mmhc.tab1}>
            <div data-id="week" className={cNs(mmhc.tabDiv)}>本周</div>
          </div>
          <div onClick={this.fnThree} className={mmhc.tab1}>
            <div data-id="month" className={cNs(mmhc.tabDiv)}>本月</div>
          </div>
        </div>

        <div className={mmhc.content}>
          <div id="day" className={mmhc.tabCont}>
            <div className={cNs(mmhc.section1,mmhc.clearfix)}>
              <div className={mmhc.sec1Left}>
                <div className={mmhc.sec1Bot}>{this.state.newnewyestadayIncome}</div>
                <div className={mmhc.sec1BotYes}>昨日收益（元）</div>
              </div>
              <div className={mmhc.sec1Right}>
                <div  className={mmhc.sec2Bot}>{this.state.newnewleijiIncomet}</div>
                <div>累计收益（元）</div>
              </div>
            </div>

            <div className={mmhc.section2}>
              <div className={cNs(mmhc.user,mmhc.clearfix)}>
                <div className={mmhc.fl}>
                  <em className={mmhc.userOne}>{this.state.userMobile}</em>
                  <em className={cNs(mmhc.userOnedf,this.state.paiMing==true?mmhc.xianss:"")}>第{this.state.PaiHangDC}名</em>
                  <em className={cNs(mmhc.userOnedfa,this.state.paiMing==false?mmhc.xianss:"")}>暂无排名</em>
                  </div>
                <div className={cNs(mmhc.userOneMoneyall,mmhc.fr)}>
                  <em><img className={mmhc.userOneMoney} src={imgMary} alt=""/></em>
                  <em className={mmhc.userOneMoneya}>{this.state.newnewyestadayIncome}</em>
                </div>
              </div>

              <div className={mmhc.colorr}></div>

              <div><img className={mmhc.bannerimgMary} src={bannerimgMary} alt=""/></div>

              <div>
                <ul>
                {
                  this.state.yestadayPaiHang.map(function(elem,index){
                    return   <li key={index} className={cNs(mmhc.rankingAALi,mmhc.clearfix,index >= 10 ?mmhc.hiddd:"")}>
                               <div className={mmhc.fl}>

                                <em  className={mmhc.rankingAI}><img className={mmhc.rankingAA} src={ranking0} alt=""/></em><em className={mmhc.rankingAH}>{elem.mobile}</em>
                               </div>
                               <div className={cNs(mmhc.juza,mmhc.fr)}><em><img className={mmhc.userOneMoney} src={imgMary} alt=""/></em><em className={mmhc.userOneMoneya}>{elem.totalIncome.toFixed(2)}</em></div>
                             </li>
                  }.bind(this))
                }
                </ul>
              </div>
            </div>
          </div>
        </div>


        <div className={cNs(mmhc.noDatasi,this.state.nossf==true?"":mmhc.xiaos)}>
          <img src={noData} alt=""/>
        </div>



      </div>
    )
  },
  componentDidMount: function() {
    $("." + mmhc.tabDiv).click(function() {
      $("." + mmhc.tabDiv).removeClass(mmhc.tabDivActive);
      $(this).addClass(mmhc.tabDivActive);
      // $(this).attr("data-id");
    });


    $("." + mmhc.tab1).click(function() {
      var i = $(this).index()
      $("." + mmhc.content).eq(i).addClass(mmhc.hide).siblings().removeClass(mmhc.hide)
    });


    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };


    $.ajax({
      // url: jsonPath.path + "/activity/mobile昨日.json",
      url: jsonPath.path + "/mobileYesterday.json",
      type: jsonPath.method,
      error: function() {},
      success: function(data) {
        this.setState({
          activityId: 25,
          yestadayPaiHang: data.yestadayPaiHang,
          leijiIncome: data.leijiIncome,
          yestadayIncome: data.yestadayIncome,
          PaiHangDC: data.PaiHangDC,
          userMobile: data.userMobile
        }, function() {
          var newleijiIncome = this.state.leijiIncome.toFixed(3)
          var newnewleijiIncomet = newleijiIncome.substring(0, newleijiIncome.lastIndexOf('.') + 3)
          var newyestadayIncome = this.state.yestadayIncome.toFixed(3)
          var newnewyestadayIncome = newyestadayIncome.substring(0, newyestadayIncome.lastIndexOf('.') + 3)
          this.setState({
              newnewleijiIncomet: newnewleijiIncomet,
              newnewyestadayIncome: newnewyestadayIncome
            })
            // if(this.state.yestadayPaiHang.length==0){
            //     $("."+mmhc.content).css("display","none")
            //     this.setState({
            //        nossf:false
            //     })
            //  }else{
            //     $("."+mmhc.content).css("display","block")
            //     this.setState({
            //        nossf:true
            //     })
            //  }


          if (this.state.PaiHangDC == 0) {
            this.setState({
              paiMing: false
            })
          } else {
            this.setState({
              paiMing: true
            })
          }
          $("." + mmhc.rankingAA).each(function(index, elem) {
            $("." + mmhc.rankingAA).eq(1).attr("src", ranking1)
            $("." + mmhc.rankingAA).eq(2).attr("src", ranking2)
            $("." + mmhc.rankingAA).eq(3).attr("src", ranking3)
            $("." + mmhc.rankingAA).eq(4).attr("src", ranking4)
            $("." + mmhc.rankingAA).eq(5).attr("src", ranking5)
            $("." + mmhc.rankingAA).eq(6).attr("src", ranking6)
            $("." + mmhc.rankingAA).eq(7).attr("src", ranking7)
            $("." + mmhc.rankingAA).eq(8).attr("src", ranking8)
            $("." + mmhc.rankingAA).eq(9).attr("src", ranking9)
          })
        });

      }.bind(this),
      dataType: "json"
    });

  },
});

module.exports = SigningFeeRanking;