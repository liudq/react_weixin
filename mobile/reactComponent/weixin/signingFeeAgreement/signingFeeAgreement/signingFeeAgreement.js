require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./signingFeeAgreement.css");
var argeImg = require("./arge.jpg");
var SigningFeeAgreement = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className={mmhc.pay}>
        <div>合同编号：【】</div>
        <h1 className={mmhc.title}>授权合同</h1>
        <p>北京蜜麻花网络科技有限公司授权_____        获得线上《蜜麻花APP产品》品牌推广权利。</p>
        <p>备注：本授权书正本有效、不得彩印、涂改、转让。北京蜜麻花网络科技有限公司享受本授权书最终解释权。</p>
        <br/>
        <p>甲方（授权方） ：北京蜜麻花网络科技有限公司                          </p>
        <p>营业执照注册号 ：91110106MA002K2R6X                               </p>
        <br/>
        <p>乙方（被授权方）：__                                                    </p>
        <p>营业执照注册号/个人身份证号：                                        </p>
        <p>签订地：北京市丰台区</p>
        <br/>
        <div>条款如下：</div>
        <br/>
        <div>一、商标 </div>
        <p>甲方拥有受到法律保护的商标、商业名称和其它一切标志，包括广告宣传中所使用之商号、标识的独家使用经营权。</p>
        <br/>
        <div>二、授权及范围</div>
        <p>甲方授权乙方在本合同生效期内，在蜜麻花移动APP产品推广中使用甲方品牌，包括：商号和商标（包括图形），以及其他经营标识用于宣传。</p>
        <div>三、双方的权利和义务</div>
        <p>1、乙方须向甲方缴纳人民币                 （大写）作为市场冠名使用费。</p>
        <p>2、乙方在授权期间，获得新的市场冠名费，则冠名使用费的40%为乙方所有。</p>
        <p>3、甲方不参与乙方的经营、管理，乙方在推广蜜麻花APP产品的过程中，乙方名下的推广用户所产生支付订单金额的15%归乙方所有；自甲乙合同签订之日起，以一年为一个统计周期，当乙方推广用户量达到3000个，用户购买转化率不低于8%，则甲方将乙方前期支付的冠名使用费全部返还给乙方。</p>
        <p>4、乙方不得任意改变产品商标的文字、图形或者其组合，不得超越许可范围使用注册商标。</p>
        <p>5、乙方在使用甲方授权品牌时，如引起的经营纠纷、债权债务均由乙方自行承担。</p>
        <br/>
        <div>四、结算账户</div>
        <p>1、账户信息</p>
        <p>甲方银行账户信息：</p>
        <p>公司名称：北京蜜麻花网络科技有限公司</p>
        <p>开户行：中国建设银行北京花园路支行</p>
        <p>户名：北京蜜麻花网络科技有限公司</p>
        <p>账号：11050163530000000056</p>
        <br/>
        <p>乙方银行帐户信息：</p>
        <p>公司名称（如有）：</p>
        <p>开户行：</p>
        <p>户名：</p>
        <p>账号：</p>
        <p>2、双方均需自行缴纳因本协议项下所产生的经营收入的各类税款；双方均需自行负责开展本合作项目所支付的各项费用，本协议作出约定的除外。</p>
        <br/>
        <div>五、合同的生效与终止</div>
        <p>1、本品牌授权使用合同期限为2年，自_     年__  月__  日起至_     年 _  月__  日终止。本协议终止后，甲乙双方如愿继续合作，可延长合作期，由甲、乙双方另签协议确定。</p>
        <br/>
        <div>六、其他 </div>
        <p>1、甲、乙双方如有争议时，应以协商形式予以解决。协商不成时，双方可以在对甲方所管辖的人民法院提起诉讼。</p>
        <p>2、本协议一式两份，甲、乙双方各执一份，由双方签字、盖章后生效，具有同等约束力和法律效力。</p>
        <p>3、本合同履行期间若发生不可抗力因素，甲乙双方互相免除发生不可抗力期间的违约责任。</p>
        <img src={argeImg} alt=""/>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/authc/publish/mark.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {

      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SigningFeeAgreement;