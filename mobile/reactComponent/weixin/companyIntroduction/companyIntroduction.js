require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var CompanyIntroduction = React.createClass({
    render: function() {
        return (
            <div className={mmhc.content}>
            <p>北京蜜麻花网络科技有限公司(以下简称“蜜麻花”)成立于2015年，依托北京元汇天下投资管理有限公司深厚的金融背景，为国内首家同时使用互联网工具和金融工具并结合线下体验店的电子商务平台，在国内迅速崛起。经营范围主要包括母婴产品销售、物流仓储、金融中介、信息咨询、母婴产业链整合及政府批准的其他业务。<br/>
战略发展初期，蜜麻花将选定母婴产品作为市场主营的核心业务，支持入驻厂商实现库房、场地，为入驻企业提供储存、保管、装卸搬运、配送货物等服务；目前，蜜麻花已经和数百家知名品牌构建了全方位的战略合作关系。<br/>
中期，蜜麻花将开展自营业务，建立自己的仓储物流体系；<br/>
后期，蜜麻花将运用资本运作平台，将重心转向线下产业链的整合。产业链布局包括早教、医疗、保险以及实体母婴用品的控股等战略合作。
旗下包括：电子商务事业部，交互社区事业部，金融事业部，制造业事业部，传媒事业部，品牌连锁事业部等。</p>
        {/*<p>北京蜜麻花网络科技有限公司（简称：蜜麻花），注册资金3000万 （RMB），是一家集互联网消费金融业务相结合的双营发展企业。通过对互联网工具、金融工具的理解、利用与创新，成功击破传统理财、购物的单一模式，实现理财购物一体化的经营风格。其经营模式为母婴垂直的电商平台，经营范围包括母婴产品销售；物流仓储；金融中介；信息咨询；母婴产业链整合及政府批准的其他业务。通过技术维护、推广服务、运营管理等为入驻人提供相应贷款、股权投资、担保服务等融资服务和融资支持服务，并提供母婴产品和金融收益及授信的相关服务等。</p>
        <p>
蜜麻花运用独特的商业模式和创新的“互联网+金融”平台为“妈妈”和母婴用品商家创造价值，更好的服务于生产消费产业结构。即，提高用户资金使用效率，进而降低商品采购成本，提高生活品质。</p>
<p>
蜜麻花专为三/四线城市家庭提供母婴产品及服务。为引入金融端口发挥作用，在于更好的服务生产消费链条，即，在线上提升居民资金使用效率，解决了照顾宝宝和保障家庭生活品质等问题；又在线下则为优质热销母婴供应商创造了更好的生存发展环境。项目筹备，计划于开曼群岛注册成立，办公地址选在北京大兴新区即北京电子商务中心（简称北京 CED）</p>
<p>
【 目前，北京CED已经聚集电子商务服务企业上千家，京东、 本来生活网、好药师、云基地、 腾讯电子商务华北运营总部项目、阿里巴巴集团菜鸟网络智能物流骨干网项目、中国云产业园项目等纷纷签约新区 】</p> 
<p>
蜜麻花将选定母婴产品作为市场主营的核心业务，支持入驻厂商实现库房、场地，为入驻企业提供储存、保管、装卸搬运、配送货物等服务。运算入驻获利空间极高。其中授信消费和中介服务项目，一是改变用户（投资者）的消费模式和消费习惯，提高生活品质；二是改善国产母婴产业链格局，向集中化、品牌化、规模化发展。</p>
<p>
另外，为发挥母婴市场的推动作用，对于育儿知识的普及，蜜麻花将线下设立体验中心接受系统培训。实行线下体验中心与早教合作机构合作开办。为准妈妈课堂做早教服务提供导流窗口，蜜麻花承诺不向用户（投资者）收取费用。并实践家庭医生业务，致力于医患资源重新分配，提供一个更高效更合理的婴幼儿疾病护理措施。以及寻求权威教育机构，针对0-6岁教育阶段的早教战略合作实施等。</p>
<p>
作为初创企业，蜜麻花将统筹医疗机构等市场调研，实行地推业务宣传，以借500入驻商家为准进行产品的郑重发布。待产品上线后，运营推广战略基本定调为：线上导流量、新媒体做品牌、线下做扩展。尝试各种渠道，不断测试出一种最有效的方法，以触燃爆发点，不断放大，不断分析，等待爆发。蜜麻花致力于用最小的投入把品牌效果最大化。</p>
<p>
蜜麻花原母公司元汇天下投资管理有限公司向元汇集团代持定增实现元汇集团控股原母公司，原母公司更名元汇资本，获得资本市场全牌照，负责元汇集团国内外后台资本运作。主要业务是结合蜜麻花金融服务平台对蜜麻花入驻企业进行产业控股，通过合并重组，实现母婴产业链整合，达到“整合行业资源、优化产业结构，让产能更高效的服务消费、让消费更直接的引导产能”的最初创业宗旨。</p>*/}
      </div>
        )
    },
});

module.exports = CompanyIntroduction;