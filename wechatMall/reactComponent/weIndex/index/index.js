import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';
import lsitImgPath from './list.png';
import selfImgPath from './self.png';
import jsonPath from '../../common/util/jsonPath.js';
import upImg from './up.png';
import carImg from './myCar.png';
import logoImg from './myLogo.png';
import shadowImg from './newLoading.gif';
import moreImg from './more.png';
import cancleImg from './cancle.png';

// var upImg = require("./up.png");
// var backBottomImg = require("./back.png");


var imgPath = require("../../common/util/path.js").path;
var cutText = function(text, myLength) {
	if (text.length > myLength * 1) {
		return text.slice(0, myLength * 1) + "...";
	} else {
		return text;
	}
}



class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shopeflag: true,
			goodsflag: true,
			floorsCount: 1,
			pageNo: 1,
			bannersData: [],
			floorsData: []
		};
	}
	change() {
		$("." + mmhc.headList).toggleClass(mmhc.block)
	}

	close(event) {
		event.stopPropagation();
		$("." + mmhc.fixBottom).css({
			"display": "none"
		})
		$("." + mmhc.fixBottomBg).css({
			"display": "none"
		})

	}
	download(event) {
			event.stopPropagation();
			window.location.href = "/wechatMall/downloadGuide.html";
		}
		// goodsAdd(event) {
		// 	var floorId = $(event.target).parents("." + mmhc.floor).attr("data-id");
		// 	window.location.href = "hotCates.html?floorId=" + floorId;

	// }
	// moreMess(event) {
	// 	this.state.pageNo++;
	// 	$.ajax({
	// 		url: jsonPath.path + '/indexFloorD.json',
	// 		// url: jsonPath.path + '/indexFloor.json?pageNo=' + this.state.pageNo,
	// 		type: jsonPath.method,
	// 		dataType: 'json',
	// 		success: function(data) {

	// 			Array.prototype.push.apply(this.state.floorsData, data.result);
	// 			this.setState({
	// 				floorsData: this.state.floorsData
	// 			}, function() {
	// 				var mySwiper2 = new Swiper('.swiper-container2', {
	// 					slidesPerView: 3.5,
	// 					paginationType: 'fraction',
	// 				});
	// 			});

	// 			var floorsLeng = $("." + mmhc.floor).length;
	// 			// console.log("ddd" + floorsLeng);
	// 			if (this.state.floorsCount <= floorsLeng) {
	// 				$("." + mmhc.moreBottom).css({
	// 					"display": "none"
	// 				})
	// 			}
	// 		}.bind(this)
	// 	});
	// }


	render() {
		return (
			<div className={mmhc.box}>
				<div className={cNs(mmhc.head,mmhc.clearfix)}>
					<img className={mmhc.self} src={selfImgPath} onClick={this.change.bind(this)}/>
					蜜麻花
					<a href="/wechatMall/categoryPage.html"><img className={mmhc.imgList} src={lsitImgPath} alt=""/></a>
					<ul className={mmhc.headList}>
						<li><a href="/wechatMall/authc/myOrder.html">我的订单</a></li>
						<li><a href="/wechatMall/authc/myRebate.html">我的钱包</a></li>
					</ul>
				</div>
				<div className={mmhc.headFix}></div>
				{/*轮播图*/}
				<div className={cNs("swiper-container",mmhc.banner,"swiper-container1")}>
			    <div className="swiper-wrapper">
						{
							this.state.bannersData.map(function(res,index){
								return	<div className="swiper-slide" key={index}>
													<a href={res.linkUrl}>
														<img src={imgPath+res.image} alt=""/>
													</a>
					       			 </div>
							}.bind(this))
						}	
			    </div>
			    <div className={cNs("swiper-pagination",mmhc.swiperPagination,"swiper-p1")}></div>
				</div>
					{	/*商品楼层*/
						this.state.floorsData.map(function(list,index){
							// 判断商品的有无
							if(list.productList==''||list.productList.length<8){
								this.state.shopeflag=false;
							}else{
								this.state.shopeflag=true;
							}

							return <div className={mmhc.floor} key={index} data-id={index}> 
											{
												list.advertisementList.map(function(list1,index){

													return list.advertisementList!=""?<a href={'/wechatMall/hotCates.html?floorId='+list.id} className={cNs(mmhc.goodsAd)} key={index}>
																		<img src={imgPath+list1.image} alt=""/>
																	</a>:<div className={mmhc.xiaoshi}></div>
												}.bind(this))
											}
											<div className={cNs("swiper-container",mmhc.goodsList,"swiper-container2")}>
										    <div className="swiper-wrapper">
											    {
											    	/*循环商品*/
											    	list.productList.slice(0,8).map(function(mesg,index){				
									    				return list.productList!=''?<div className={cNs("swiper-slide",mmhc.slide)}  data-id={mesg.product.id} key={index}>
									    								<a href={"/wechatMall/detail.html?prdCode="+mesg.product.id+"&tabNum=0&returnUrl=/wechatMall/weIndex.html"}>
																       	<img src={imgPath+mesg.product.masterImg} alt=""/>
																       	<p className={mmhc.listConten}>{cutText(mesg.product.name1,15)}</p>
																       	<p className={mmhc.price1}><span>￥</span><span>{mesg.product.malMobilePrice}</span></p>

																       	

															      	</a>
															      </div>:<div className={mmhc.xiaoshi}></div>
											    	}.bind(this))
											    }
											    <a href={'/wechatMall/hotCates.html?floorId='+list.id} className={cNs("swiper-slide",mmhc.slide,this.state.shopeflag==false?mmhc.xiaoshi:"")}>
											      <img src={moreImg} alt=""/>
										      </a>
									    	</div>
											</div>
										</div>
						}.bind(this))
					}
				<img className={mmhc.fixUpCss} src={upImg} alt=""/>


        <a href="/wechatMall/authc/shoppingCar.html">
        	<div className={mmhc.shopCar} >
        	 <img src={carImg} alt=""/>
        	</div>
        </a>
				 {/*底部下载链接*/}
				<div className={mmhc.fixBottomBg}></div>
				<div className={mmhc.fixBottom} onClick={this.download.bind(this)}>
					<div>
						<img src={logoImg}  className={mmhc.logo} alt=""/>
					</div>
					<div className={mmhc.content}>
						<p>宝宝的成长一路有我们的陪伴</p>
						<p>100%正品保障</p>
					</div>
					<div className={mmhc.download}>
						<p>立即下载</p>
					</div>
					<div className={mmhc.close} onClick={this.close.bind(this)}><img src={cancleImg} alt=""/></div>
				</div>

			{/*点击加载更多*/}
		 	<div className={mmhc.moreBottom}>加载中...</div> 
			{/*页面进入时加载*/}
				<div className={mmhc.shadow}></div>
				<div className={mmhc.shadow1}>
          <img src={shadowImg} className={mmhc.loading}/>
        </div>
			</div>
		)
	}

	componentDidMount() {
		// var floorsLeng = 0;
		var moreFlag = true;
		$(window).scroll(function() {
			var that = this;
			var scrollTop = $(document).scrollTop();
			var documentHeight = $(document).height();
			var windowHeight = $(window).height();
			if ($(window).scrollTop() > 150) {
				$("." + mmhc.fixUpCss).addClass(mmhc.blocka);
			} else {
				$("." + mmhc.fixUpCss).removeClass(mmhc.blocka);
			}
			if (scrollTop + windowHeight > documentHeight - 10) {
				function moreMess(event) {
					that.state.pageNo++;
					$.ajax({
						// url: jsonPath.path + '/indexFloorD.json?pageNo=' + that.state.pageNo,
						url: jsonPath.path + '/indexFloor.json?pageNo=' + that.state.pageNo,
						type: jsonPath.method,
						dataType: 'json',
						success: function(data) {
							Array.prototype.push.apply(that.state.floorsData, data.result);
							that.setState({
								floorsData: that.state.floorsData
							}, function() {
								var mySwiper2 = new Swiper('.swiper-container2', {
									slidesPerView: 3.5,
									paginationType: 'fraction',
								});
								moreFlag = true;
							});
						}.bind(this)
					});
				}
				var floorsLeng = $("." + mmhc.floor).length;
				//判断是否加载

				if (moreFlag == true && floorsLeng < that.state.floorsCount) {
					moreFlag = false;
					moreMess();
				} else {
					moreFlag = false;
				}
				if (floorsLeng == that.state.floorsCount) {
					$("." + mmhc.moreBottom).html("已经看到最后啦");
				}
			}
		}.bind(this));

		$("." + mmhc.fixUpCss).click(function(event) {
			$('html,body').animate({
				scrollTop: 0
			}, 800);
		});
		$.ajax({
			// url: jsonPath.path + '/indexD.json',
			url: jsonPath.path + '/indexJsonWeixin.json',
			type: jsonPath.method,
			dataType: 'json',
			success: function(data) {
				$("." + mmhc.shadow1).css({
					"display": "none"
				});
				$("." + mmhc.shadow).css({
					"display": "none"
				});

				this.setState({
					bannersData: data.banners,
					floorsData: data.floors,
					floorsCount: data.floorsCount
				}, function() {
					/*初始化swiper*/
					var mySwiper = new Swiper('.swiper-container1', {
						autoplay: 1500,
						direction: 'horizontal',
						loop: true,
						// 如果需要分页器
						pagination: '.swiper-p1',
					});
					var mySwiper2 = new Swiper('.swiper-container2', {
						slidesPerView: 3.5,
						paginationType: 'fraction',
					});
				});
			}.bind(this),
			error: function() {
				$("." + mmhc.shadow1).css({
					"display": "none"
				});
				$("." + mmhc.shadow).css({
					"display": "none"
				});
				$("." + mmhc.moreBottom).css({
					"display": "none"
				});
				// alert("数据请求失败");
			}
		});

	}
}

export
default Main;