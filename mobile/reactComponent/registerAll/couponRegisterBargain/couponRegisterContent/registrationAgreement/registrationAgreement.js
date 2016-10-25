var React = require("react");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./registrationAgreement.css");
var backImg = require("./order2.png");
var quitImg = require("./quit.png");

var RegistrationAgreement = React.createClass({
  quit: function() {
    this.props.agreementQuit1();
  },
  render: function() {
    return (
      <div className={cNs(mmhc.agreement,this.props.agreementQuit)}>
        <div className={mmhc.title}>
          <a onClick={this.quit} href="javascript:void(0)" className={mmhc.back}><img className={mmhc.backImg} src={backImg} alt=""/></a>
          注册协议
          <div onClick={this.quit} className={mmhc.quit}><img className={mmhc.backImg} src={quitImg} alt=""/></div>  
        </div>
        <div className={mmhc.content}>
          <h1 className={mmhc.h1}>蜜麻花服务条款</h1>
          {/*<h1 className={mmhc.time}>2015-06-01 15:37</h1>*/}
          <div className={mmhc.agreementContent}>
          <p>
            <strong>1. 介绍</strong><br/>
欢迎来到蜜麻花!<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请在使用这个网站之前仔细阅读下面的网站使用规则和条款（以下简称“规则和条款”），通过访问、浏览或使用该网站，您确认您已经阅读过并完全理解规则和条款，也同意受这些规则和条款的约束，而且您同意遵守所有可适用的法律和法规。请您把电子版规则和条款保存在您的电脑中并打印一份出来以便自己使用和日后查看。如果您不同意以这些规则和条款, 请不要使用本网站。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如您有意见、问题或对这些规则和条款有所关注,请通过以下电子邮件地址service@mimahua.com与我们取得联系。<br/>
 <br/>
<strong>2. 您的会员资格</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了使用本网站, 您必须成为蜜麻花的一名会员。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在注册过程中, 将为您创建一个设置密码保护的个人帐户，在拥有该个人帐户后，您将可以正式使用本网站并订购商品，并且仅供您个人使用的，不可转让或分配给任何其他人。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从您的个人帐户建立开始, 您要负责护保好您的帐户机密及所有密码。在蜜麻花注册后，您将承担对发生在您的帐户注册或密码之下的所有责任，和承担所有可能造成损失的后果, 以及承担所有因此而造成蜜麻花宝贝损失的赔偿责任，除非这些的损失是由于蜜麻花的重大过失或过错造成的。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在蜜麻花注册后，您还须承担以下义务:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 每次使用本网站结束后，请确保您已经退出了帐户； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 当发现有对您的个人帐户和密码有未经授权而被使用及其他不安全使用的情况，请立即通知蜜麻花； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 维护并及时更新您的个人帐户信息，确保其真实性、准确性、最新性和完整性；如果蜜麻花有确实的理由怀疑您的信息是不真实的、不精确的、不是最新的或不完全的蜜麻花将有权或暂停或终止您的个人帐户，并有权拒绝您使用本网站。为了确保您的个人信息的准确性，请经常查看您个人帐户中的信息； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花将不能也不会对因为您个人不遵照第二章第一节的规定执行情况而导致的损失承担赔偿责任。<br/>
 <br/>
<strong>2.2. 谁可以成为会员?</strong>  <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成为蜜麻花的会员，您必须符合以下五个必要条件:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 您必须是年满18周岁，如果您是未成年人必须得到一名家长或监护人的同意，并且这名家长或监护人已经代表您成为会员； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您有签订合同的民事行为能力和相应的民事权利能力； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 您必须保证，您使用本网站的目的是和贸易行为、生意行为和专业行为无关的； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 您在注册表格中所有栏目中填写的信息必须是真实、准确、最新和完整的； <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. 您必须同意受现在的使用规则和条款的约束。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花有权接受或拒绝任何人的注册申请并无须提供理由。蜜麻花有权随时用任何手段来限制发展会员的数量。<br/>
 <br/>
<strong>2.3. 怎样成为会员？</strong><br/>    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要想成为会员，您必须填写这里的空白注册表。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一旦您通过填写相关信息成功创建个人帐户并且接受销售与使用条款, 您从此将被视为本网站的会员。完成注册过程后，您即可参加销售活动并享受各种优惠。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您注册表里提供的地址必须是您合法登记的地址或是您的办公地址。该地址将成为您的住所地址并被用做默认帐单送达地址。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每个手机号码、每个收货地址仅对应一个会员账户。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包含但不限于以下行为，视为虚假注册：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.以同一手机号码注册多个账户；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.多个账户使用同一收货地址。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花有权取消虚假注册账户在蜜麻花上消费的权利。<br/>
 <br/>
<strong>2.4. 当我的个人帐户发生问题时</strong>  <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的个人账户使用发生了任何问题（如，密码丢失或者页面故障），您所需要做的就是给我们以下电子邮件地址service@mimahua.com发一封电子邮件尽可能具体地阐述您的问题，我们将尽可能快地帮您解决问题。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花可以在无须通知的情况下随时终止、变更、暂停或停止本网站，包括本网站的任何栏目的使用。<br/>
 <br/>
<strong>3. 通过蜜麻花购物</strong> <br/>   
<strong>3.1. 商品描述</strong>   <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除非另有规定，所有网站上出售的商品均为正宗的、全新的商品，没有瑕疵，质量保证优良。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花直接与品牌供应商及他们授权的经销商合作来创立各项活动，这些公司是关于这些商品信息的唯一来源。蜜麻花与他们一起，努力尽可能准确、详尽地描述每一件商品。然而蜜麻花不能保证网站上所有商品的描述和其他相关内容是准确、完整、可靠、有效和没有错误的。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需要特别说明的是，由于用不同的网络浏览器或不同的计算机显示屏观看时网页显示的差异，蜜麻花上促销的商品在图像和颜色方面可能跟真实的物品不尽一致。因此，所有显示的图片、视频和其他商品显示方法仅限于图示目的，在任何情况下不得认为是合同的组成部分。假如供出售的商品跟网站上的描述不同，蜜麻花不能也不会对其负责，对您唯一的补救措施是根据本使用规则和条款第3章第9节的规定在没有使用的情况下退回该商品。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果蜜麻花收到了错误情况及忽略情况报告，本网站将会尽最大努力尽快更正它。<br/>
 <br/>
<strong>3.2. 商品价格</strong>  <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花上显示的所有价格都是以中国货币元（人民币）为计价单位，包括所有的税费，但不包括运费。结帐之前运费会自动计算包含在订单总价之内。有些网站上售出的商品可能需要特别的运输（例如体积特别大的商品）。在商品详情页面里您可以找到所有的相关信息。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花有权随时修改价格的权利而无须事先通知。支付价格为下订单时的有效价格，并且在您下订单之后马上收到的订单确认邮件中再次写明的价格。在由于排版错误或供应商提供价格信息错误的情况下以不正确的价格列出来的商品，蜜麻花有拒绝或取消任何对以不正确的价格列出来的商品所下订单的权利。<br/>
 <br/>
<strong>3.3. 向蜜麻花下订单 </strong> <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为蜜麻花的一名会员，通过向蜜麻花下订单您就可以购买网站上有的任何一件商品。请记住通过登录、使用或购买网站上的商品，即证明您已经仔细阅读了本使用规则和条款，理解这些使用规则和条款并完全接受所有的使用规则和条款。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花保留对单个商品的总出售数量进行限制及对单个订单的商品购买数量进行限制的权利。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要下订单的话，您必须把您想要购买数量的所有商品放入您的购物袋。您在网站下了订单后，仅表示我司网站系统接收到了您下单的订单，只有我司将订单上的商品向您发出时，我们和您之间的订购合同才成立。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除非另有证明，蜜麻花储存在其的服务器上的数据是蜜麻花和其会员之间交易的唯一有效证据。<br/>
 <br/>
<strong>3.4. 商品的实用性 </strong>   <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花致力于为您提供最好的服务。然而，尽管蜜麻花努力了，有时仍会发生这种情况，在承诺了您的订单以后，蜜麻花发现所订购的商品全部或部分缺货。在这种情况下，蜜麻花会就缺货的商品详细情况与您联系，并提供您选择的机会来取消整个订单或用代替商品来替换缺货的物品来变更订单。如果您在收到此类通知15天之内没有取消订单，蜜麻花将把有货的商品送达或者在没有一件订购的商品有货的情况下取消该订单。在任何情况下，由于商品的缺货对您或第三方带来的任何损失，蜜麻花不负任何责任。<br/>
 <br/>
<strong>3.5. 交货 </strong>   <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您所订购的货物将被送至订单表格上注明的送货地址。如果无论什么原因货物不能送达到送货地址，蜜麻花都将会尽快跟您取得联系并可能请您更改送货地址。假如从我们第一次试图跟您联系之日7天内您没有提供答复，蜜麻花有权取消该订单。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花致力于向顾客提供最好的服务，在承诺了您的要约后会尽快送达货物。您的货物一般在下订后的5~7个工作日内送达。然而，由于合理的或不可避免的送货延迟对您或第三方带来的任何损失，蜜麻花不负任何责任。在这种情况下，蜜麻花将尽快地把任何可预知的延迟情况通知您，并在此时请您选择是否取消订单。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在您收到订购货物的同时，请您书面签收证明您收到了完好状态的商品。如果包装出现破损，请拒收。<br/>
 <br/>
<strong>3.6. 付款及所有权 </strong>  <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本站按先付款后送货的形式，在任何情况下, 只有在您支付了所有款项以后, 您才会是货物的拥有人，我们将选用有信誉的快递公司送货到您的手中。<br/>
 <br/>
<strong>3.7. 代金券</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了奖励提高蜜麻花的知名度的会员，蜜麻花奖励他们代金券。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代金券在单张订单中可以使用的最高数量以及代金券的有效期都是有限的。详情请在蜜麻花网站的帮助中心的代金券部分里找到，代金券的获得、使用均应遵守本条款及本网站不时公布的相关规则。<br/>
 <br/>
<strong>3.8 我想退回订单</strong>   <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花致力于使您的购物经历尽可能愉快并免于争议。因此，如果您对订购不满意，您可以退回所有或部分物品，退回物品价格在扣除作为退货运费后返还给您。订单使用代金券的，蜜麻花将会按照活动规则予以返还。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品送达后14天内，您必须主动联系蜜麻花客服告知蜜麻花您要退货。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花有权拒绝不符合《退换货政策》的所有退货。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仅当蜜麻花确认以上规定的这些条款得到了适时的遵从后，蜜麻花将启动返还货款金额的程序。蜜麻花收到退货后30天内，所有的退款均遵循蜜麻花退换货政策操作。一旦实现退款，您将收到一封确认和终止程序的站内信息。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的退货与本使用规则和条款规定不符，您将没有资格得到任何退款。不过，您仍有资格自行支付费用（包括运费）以便接收已经退回到蜜麻花的商品。如果您不想接收已经退回到蜜麻花的商品，蜜麻花有权保有这些商品并保留已经收到的金额。<br/>
 <br/>
<strong>3.9 保证</strong>  <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花上面陈列的货物完全符合中华人民共和国的相关法律法规的规定。蜜麻花直接与品牌供应商或者他们授权的经销商合作，他们保证其商品是正宗的。您在蜜麻花上找到的商品描述均由品牌供应商或者他们授权的经销商提供，仅由他们对其真实性负责。您应该系统性地参照货物描述找出他们的特征，对于任何种类的直接或间接的、实质或非实质的由于商品的使用造成的损失，蜜麻花概不负责。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;某些通过蜜麻花销售的商品可能由品牌供应商附加了特别的保证。在这种情况下，您将会在商品详情页面上找到所有的相关信息。
 <br/>
<strong>4. 不承担责任的事项</strong>  <br/>  
<strong>4.1. 声明</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于所有的在本网站上获得的或通过本网站所能获得的商品、服务和信息内容，本网站不提供任何形式明确的或隐含的担保或保证，包括但不限于以上所述所有商品、服务和信息的可销性及对于特定目的、资格及不侵权范畴的遵守性。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花不保证本网站内的所有信息是准确、有效、可靠或可利用的，也不保证上述所有信息没有侵犯任何第三方的合法权益。蜜麻花也不保证本网站的网址、服务器或本网站发送的电子邮件内没有病毒或破坏性插件。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花不能也不会是对您或他人的以下任何损失或损伤负责，无论是任何自然的、 直接的、 间接的、必然的、特别的、惩罚性的损失或其它由于本网站上销售的商品的故障或不正确使用造成的损伤和损害。本网站也不对品牌供应商对其制造的商品的修理及更换后所造成的任何损失或损害负责。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除了以上的陈述，无论何种原因蜜麻花对您的购买行为的赔偿金额将不会超过您为此次购买行为已经支付或者应该支付给蜜麻花的费用的总额。蜜麻花也不能因为对商品描述上的小的错误或忽略承担赔偿责任。
 <br/>
<strong>4.2. 关于和其他网站的链接</strong> <br/>   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花网站内所包含的链接和蜜麻花无关。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即便蜜麻花提供与其他网站的链接，蜜麻花也不认可和推荐对上述链接网站的使用，同时蜜麻花对上述链接网站上的内容及销售的商品与服务，也不提供任何形式的担保和保证。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花不对上述链接网站及其网页内容进行管理和监督，因此蜜麻花不对这些链接站点的内容承担责任，也不对这些网站对会员的隐私和个人信息的管理承担责任。蜜麻花不代表也不代理上述链接网站，并且也不对这些链接网站承担担保责任。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当您通过蜜麻花的链接连接到这些网站时，请您务必提高警惕，并且仔细阅读他们的网站使用规则及隐私条款。 <br/>
 <br/>
<strong>5. 隐私条款</strong> <br/>   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花承诺尊重您的隐私和您的个人信息安全。蜜麻花并且承诺尽可能地为您提供最佳的服务。比如，蜜麻花会利用通过网站运作而收集到的这些信息，来制定您的个性化沟通方式和购物经历、也可以更好地对您的客户服务调查做出反应、对您的订单和帐户信息及客户服务需求与您进行沟通、就蜜麻花网站中的商品和活动与您进行沟通以及为了其他推广宣传目的、优化管理、促销、调查等其他本网站的特别项目使用这些信息。蜜麻花也可以用这样的信息来阻止可能的被禁止项目和非法活动，用以加强使用规则和条款的实施，并用以解决争议和保护其合法的私有财产权益及解决涉及蜜麻花的交易活动而产生的问题。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此您在此明确同意蜜麻花来收集、保存、使用和透露您的个人信息。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花不可以向任何其他人出售或出租您的个人信息。但如果是为经营目的需要的，蜜麻花可以将信息交付给一些服务提供商只在为蜜麻花的经营来使用。例如，他们负责处理蜜麻花的装运业务、数据管理业务、电子邮件发送业务、市场调查业务、信息分析业务和促销管理业务。买卖蜜麻花网站上的商品，查阅数据资料、销售信函、市场调查、分析报告和促销手段。蜜麻花提供给其服务提供商的个人信息的前提是他们需要这些信息来完成其服务并同时承诺尽可能保护您的个人信息。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在极少数情况下，蜜麻花可以透露特定的信息，例如，政府机构请求、法院调查令等法律规定的情况，以及为执行本网站的政策或保护他人的权益、财产和安全。蜜麻花也会和那些协助进行诈骗防范和调查的公司共享信息。下在法律范围内响应法院指令，以便加强本网站的管理政策或保护他人的权利、财产或保险。蜜麻花同时与公司分享信息协助保护或调查。蜜麻花不会提供信息给那些推销和商业目的公司或代理机构行。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花会将非常认真地保护您的个人信息。然而，尽管蜜麻花已经尽力了，但是仍有第三方通过非法手段在中途截取发送的信息的风险。这在所有互联网使用中都是真实存在的。以至于蜜麻花无法完全保证您传送的任何信息的安全。发送任何信息的风险都您都须承担。特别是，蜜麻花将采取所有合理的预防措施来确保您的订购和付款详细信息的安全，除非蜜麻花存在 疏忽，否则蜜麻花将不承担因您提供的信息被非法侵入而造成您和第三方的相应损失。 <br/>
 <br/>
<strong>6. 知识产权 </strong>  <br/> 
<strong>6.1. 版权（著作权）</strong><br/>    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有出现在本网站上的内容包括但不限于：编码、商标、服务标志、商号、图形、美术品、照片、肖像、文字内容、音频片断、按钮图标已及计算机软件、标识、数码下载、数据汇编都是蜜麻花或其内容提供者的财产，受到中华人民共和国版权相关法律法规的保护。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您仅在符合本网站使用目的的前提下被许可浏览和使用本网站，即以个人名义购买商品供个人使用的目的。其他方式的使用都是被严格禁止的，包括但不限于以下方式：复制、修改、销售、传送、再版、删除、添加、展览、记入或演示本网站的内容或以其他方式部分地或整体地非法使用本网站的内容。特别是，严格禁止以将商品转卖他人的目的在本网站购买商品，并且严格禁止部分地或全部地复制蜜麻花的目录。在没有经过蜜麻花明确的书面许可的情况下，是不允许使用在标签及其他“隐藏文字内容”中使用蜜麻花的名称及商标的。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您必须同意，在没有得到本网站明确的书面许可的前提下，不得用机器人插件、蜘蛛程序、推土机程序或其他自动化的方法手段来访问本网站。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花拥有专属的权利来授权或禁止任何复制本网站的内容（无论是直接地或非直接地，临时性地或永久性地，通过其他手段或用其他形式、整体地或部分地）。因此，在使用本网站时，只允许您显示网页及其内容。<br/>
 <br/>
<strong>6.2. 商标</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果没有蜜麻花事先的书面同意，蜜麻花是不会通过暗示的方式或通过特许授权的形式允许任何个人和单位使用蜜麻花网站的商标、服务标志、商号和标识，已及其他在网站上显示的相关内容。蜜麻花禁止将蜜麻花标识作为其他网站的链接使用，除非这样的链接事先得到了蜜麻花的书面许可。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册的和未注册的私人信息是归蜜麻花和其特许人所有和控制的，因此，任何个人和单位以任何形式不正确使用都会承担侵权、盗用及其他法律后果的相应责任。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任何非法和未经授权的使用上述商标的行为，都是被禁止的，而且还要承担相应的严重法律后果。绝对禁止为从上述商标的专有特征和商业声誉中获取不正当利益而使用上述的商标和其他在蜜麻花上标识的行为，以至损害商标和商标所有人利益。<br/>
 <br/>
<strong>6.3. 注解、回复和提交</strong>   <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任何发送到蜜麻花的信息、材料、建议、想法和注解都将视为私密的、私有的、商业秘密的信息。并且通过提交这些信息，您明确授权蜜麻花不可撤销的不受限的权利来使用、修改、复制、传送、显示和发布这些信息用作任何目的。除非根据法律的规定，蜜麻花将不会在未得到您事先书面同意的前提下使用您的名字及和您名字直接相关的信息、材料、建议、观点和注解。<br/>
 <br/>
<strong>7. 个人帐户管理、终止使用和争议解决</strong>    <br/>
<strong>7.1. 个人帐户管理</strong>     <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您同意在符合法律法规及本条款规定的情况下使用个人帐户，蜜麻花有可能在某些情况（例如：您违反本条款和/或其它公开规则，或者您严重违背社会公德、提供虚假注册身份信息或者有其他违反法律禁止性规定的行为或不正当行为等）下暂时冻结、永久冻结、修改、删除您的个人账户或者采取其他处理措施。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特别地，您了解并同意，蜜麻花个人帐户、积分、代金券等互联网产品及服务所有权归属蜜麻花，会员在满足蜜麻花公布的规则的前提下有权使用上述产品及服务，基于此您承诺，非经蜜麻花同意，将不会将蜜麻花各项产品及服务用于商业用途（例如：销售蜜麻花个人帐户、销售个人帐户下积分、代金券等）。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在使用蜜麻花服务过程中，如果您或您的个人帐户存在涉嫌欺诈、商业牟利、不恰当或不诚实地使用服务或者其他违反本条款和/或其他公开规则的行为（包括但不限于使用作弊软件获取积分及/或代金券、贩卖个人帐号、积分及/或代金券、盗号、协助盗号等），蜜麻花有权拒绝为您继续提供服务，永久冻结您的个人帐户，并根据具体情况并有权对该等个人帐号中因上述手段而产生、获得的一切虚拟产品予以清零。<br/>
 <br/>
<strong>7.2. 终止使用</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未经许可使用网站、内容材料和知识产权，欺骗性的、污言秽语的等非法行为，及对蜜麻花进行诽谤的，本网站及品牌供应商将有权终止您连接、浏览使用本网站的权利及从本网购买商品的权利。此外，如果您转售商品或者蜜麻花有理由可以相信您在转售商品，蜜麻花有权立即终止您的个人帐户，并且无须事前通知，也不对此承担任何责任。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花保留权利根据自己独立的判断来终止或限制您对本网的使用，并且无须提前通知、无须任何理由、无须对此承担任何责任。<br/>
 <br/>
<strong>7.3. 适用的法律</strong>  <br/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本网站的使用规则和条款适用中华人民共和国的相关法律法规的规定，并且用中华人民共和国的法律解释。<br/>
 <br/>
<strong>7.4. 争议解决</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您和蜜麻花及合伙人之间的任何争端和争议，双方同意，将争议提交蜜麻花所在地人民法院管辖。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发生争议时，您同意双方争议的事实判断以蜜麻花的系统数据为准，蜜麻花保证该数据的真实性。<br/>
 <br/>
<strong>7.5. 免责</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除非适用的相关法律另有规定，蜜麻花及其分支机构、主管、官员、雇员、代理人、订约人、继任者和委派人都无须对因使用本网站和其他链接网站所造成的损害承担任何责任。该免责条款适用于您或他人遭受的直接的、间接的、相应而生的、额外的、惩罚性的等各类损失，也适用于利润丧失、经营中断和数据信息丢失的损失。即使蜜麻花事前被提醒有上述损失的，蜜麻花也不承担赔偿责任。<br/>
 <br/>
<strong>8. 最终条款 </strong>   <br/>
<strong>8.1 可分性</strong>    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花如未能及时行使或执行本使用规则和条款中的任何权利和规定并不构成对这些权利和规定的放弃。假如本使用规则和条款中的一条或几条条款被视为是无约束力的、无效的、或任何原因造成无法执行的，那一条或那几条将被视为是可分割开的，且不会影响到其余任何条款的有效性和可执行性。那一部分条款应该用与本使用规则和条款适用的法律相一致地方式来解释，来尽可能接近地反映各方的最初意图。<br/>
 <br/>
<strong>8.2. 解释</strong><br/>    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本使用规则和条款中包含的各部分的标题仅为方便起见使用，不得被视为是对本使用规则和条款中规定的意思或构架的一种控制或影响。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在必要的地方，单数要被解释为包含复数和反之亦然。同样地，在必要的地方，阳性要被解释为包含阴性和反之亦然。<br/>
 <br/>
<strong>8.3. 本使用规则和条款的修订</strong>   <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花保留随时修订本使用规则和条款的权利，这些修订一旦公布在本网站上就立即生效。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在此您必须明确地同意定时查看本使用规则和条款来了解这些修订。您同意，继续使用本网站将被视为您确实地接受任何修订过的使用规则和条款。您可以通过查看本使用规则和条款结尾 “最后修订” 后面注明的日期来检查本使用规则和条款是否作了修订。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您不同意遵守本使用规则和条款的任何修订版本，您必须发电子邮件至service@mimahua.com把您的决定通知蜜麻花并且您将不再被授权使用本网站。您的个人帐户随后即被终止。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外，在任何时候，不论任何原因，本使用规则和条款或其部分可以不经通知由蜜麻花终止。<br/>
 <br/>
<strong>8.4. 所有共识 </strong>  <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本使用规则和条款构成您和蜜麻花之间的所有共识，并对使用本网站和从本网站购物的行为进行约束，并取代之前您和蜜麻花之间关于使用本网站的之前形成的共识。您也要遵守关于邀请人地位和本网站其他服务的附加规则和条款。<br/>
 <br/>
<strong>9. 定义</strong>   <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蜜麻花特指：北京蜜麻花网络科技有限公司 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品牌供应商 特指：与蜜麻花达成协议来组织一个活动并通过本网站出售商品和服务的公司。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购物车 特指：装有您选中但未购买的商品的虚拟购物车。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;送货地址 特指：特定的订单将被送达的地址。有别于住所地址，无限制数量的会员可以有同一个送货地址（例如，几个会员在同一个办公室上班，他们希望把订单送到那里）。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品 特指：由品牌供应商提供并在蜜麻花上出售的商品和服务。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;活动 特指：蜜麻花为她的会员组织的任何销售和营销运作。通过点击“首页”上显示的标语来访问一个活动。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积金 特指：确认收货后，消费金额将计入积金，以积金为基数开始返还<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分 特指：确认收货后，每日返利的1/2充至积分，即可转花币消费也可转可提现金<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可提现特指：确认收货后，每日返利的1/2充至可提现，≥100元即可提现到银行卡，不可再消费 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单 特指：由结帐程序生成的包含所有销售合同详情的表格。这份文件将被用作所有可能发生的与会员购买有关的询问、请求和争议的参考。<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未处理订单确认 特指：由蜜麻花发出的通知会员订单已收到但还未被审核的订单记录。这份文件不构成销售合同的承诺。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单确认合格 特指：由蜜麻花发出的通知会员他/她的订单已被接收并审核合格的订单记录。这份文件构成蜜麻花对销售合同的承诺。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;送货单 特指：附在装有会员订购商品的包裹上的单据，摘要说明了所装的每一个商品的对照和数量。如发生退换货必须寄回。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;个人帐户 特指：使用注册表格在网站上注册的会员开立的帐户。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;会员中心 特指：注册会员查询账户积金、返利、花币等会员权益。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址 特指：会员作为常住人口在合法登记的地址。每一个住所地址必须是个人的且最多能被2个会员共同使用。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邀请人 特指：成功邀请了一个朋友、同事或亲戚成为蜜麻花会员的会员。 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代金券 特指：由蜜麻花发放的可抵扣一定的商品价格的消费券，其功能定义及使用规则和条款可以在帮助中心的代金券里查看。<br/>
</p>
          </div>
        </div>
      </div>
    )
  },
});



module.exports = RegistrationAgreement;