var cityJson = [{
  "citys": ["昌平区", "朝阳区", "崇文区", "大兴区", "东城区", "房山区", "丰台区", "海淀区", "怀柔区", "门头沟区", "密云区", "平谷区", "石景山区", "顺义区", "通州区", "西城区", "宣武区", "延庆区"],
  "province": "北京直辖市"
}, {
  "citys": ["宝山区", "长宁区", "崇明县", "奉贤区", "虹口区", "黄浦区", "嘉定区", "金山区", "静安区", "卢湾区", "闵行区", "南汇区", "浦东新区", "普陀区", "青浦区", "松江区", "徐汇区", "杨浦区", "闸北区"],
  "province": "上海直辖市"
}, {
  "citys": ["宝坻区", "北辰区", "滨海新区", "大港区", "东丽区", "汉沽区", "和平区", "河北区", "河东区", "河西区", "红桥区", "蓟县", "津南区", "静海县", "南开区", "宁河县", "塘沽区", "武清区", "西青区"],
  "province": "天津直辖市"
}, {
  "citys": ["巴南区", "北碚区", "璧山县", "长寿区", "城口县", "大渡口区", "大足县", "垫江县", "丰都县", "奉节县", "涪陵区", "合川区", "江北区", "江津区", "九龙坡区", "开县", "梁平县", "南岸区", "南川市", "彭水苗族土家族自治县", "綦江县", "黔江区", "荣昌县", "沙坪坝区", "石柱土家族自治县", "双桥区", "铜梁县", "潼南县", "万盛区", "万州区", "巫山县", "巫溪县", "武隆县", "秀山土家族苗族自治县", "永川区", "酉阳土家族苗族自治县", "渝北区", "渝南区", "渝中区", "云阳县", "忠县"],
  "province": "重庆直辖市"
}, {
  "citys": ["潮州", "澄海", "东莞", "佛山", "广州", "河源", "惠州", "江门", "揭西县", "揭阳", "茂名", "梅州", "普宁", "清远", "汕头", "汕尾", "韶关", "深圳", "顺德", "阳江", "阳江市", "云浮", "湛江", "肇庆", "中山", "珠海"],
  "province": "广东省"
}, {
  "citys": ["白城市", "白山市", "长春市", "吉林市", "辽源市", "四平市", "松原市", "通化市", "延边朝鲜族自治州"],
  "province": "吉林省"
}, {
  "citys": ["大庆市", "大兴安岭地区", "哈尔滨市", "鹤岗市", "黑河市", "鸡西市", "佳木斯市", "牡丹江市", "七台河市", "齐齐哈尔市", "双鸭山市", "绥化市", "伊春市"],
  "province": "黑龙江省"
}, {
  "citys": ["保定市", "沧州市", "承德市", "邯郸市", "衡水市", "廊坊市", "秦皇岛市", "石家庄市", "唐山市", "邢台市", "张家口市"],
  "province": "河北省"
}, {
  "citys": ["安阳市", "鹤壁市", "济源市", "焦作市", "开封市", "洛阳市", "漯河市", "南阳市", "平顶山市", "濮阳市", "三门峡市", "商丘市", "新乡市", "信阳市", "许昌市", "郑州市", "周口市", "驻马店市"],
  "province": "河南省"
}, {
  "citys": ["鞍山市", "本溪市", "朝阳市", "大连市", "丹东市", "抚顺市", "阜新市", "葫芦岛市", "锦州市", "辽阳市", "盘锦市", "沈阳市", "铁岭市", "营口市"],
  "province": "辽宁省"
}, {
  "citys": ["安顺市", "毕节地区", "毕节市", "贵阳市", "六盘水市", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "铜仁地区", "遵义市"],
  "province": "贵州省"
}, {
  "citys": ["果洛藏族自治州", "海北藏族自治州", "海东地区", "海南藏族自治州", "海西蒙古族藏族自治州", "黄南藏族自治州", "西宁市", "玉树藏族自治州"],
  "province": "青海省"
}, {
  "citys": ["阿坝藏族羌族自治州", "巴中市", "成都市", "达州市", "德阳市", "甘孜藏族自治州", "广安市", "广元市", "乐山市", "凉山彝族自治州", "泸州市", "眉山市", "绵阳市", "内江市", "南充市", "攀枝花市", "遂宁市", "雅安市", "宜宾市", "资阳市", "自贡市"],
  "province": "四川省"
}, {
  "citys": ["常州市", "丹阳市", "淮安市", "金坛市", "连云港市", "南京市", "南通市", "启东市", "如皋市", "苏州市", "宿迁市", "泰州市", "无锡市", "徐州市", "盐城市", "扬州市", "镇江市"],
  "province": "江苏省"
}, {
  "citys": ["滨州市", "德州市", "东营市", "菏泽市", "济南市", "济宁市", "莱芜市", "聊城市", "临沂市", "青岛市", "日照市", "泰安市", "威海市", "潍坊市", "烟台市", "枣庄市", "淄博市"],
  "province": "山东省"
}, {
  "citys": ["保山市", "楚雄彝族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "迪庆藏族自治州", "红河哈尼族彝族自治州", "昆明市", "丽江市", "临沧市", "怒江傈僳族自治州", "普洱市", "曲靖市", "文山壮族苗族自治州", "西双版纳傣族自治州", "玉溪市", "昭通市"],
  "province": "云南省"
}, {
  "citys": ["长治", "大同", "晋城", "晋中", "临汾", "吕梁", "朔州", "太原", "忻州", "阳泉", "运城"],
  "province": "山西省"
}, {
  "citys": ["安庆市", "蚌埠市", "亳州市", "巢湖市", "池州市", "滁州市", "阜阳市", "合肥市", "淮北市", "淮南市", "黄山市", "六安市", "马鞍山市", "宿州市", "铜陵市", "芜湖市", "宣城市"],
  "province": "安徽省"
}, {
  "citys": ["杭州市", "湖州市", "嘉兴市", "金华市", "丽水市", "宁波市", "衢州市", "绍兴市", "台州市", "温州市", "舟山市"],
  "province": "浙江省"
}, {
  "citys": ["福州市", "龙岩市", "南平市", "宁德市", "莆田市", "泉州市", "三明市", "厦门市", "漳州市"],
  "province": "福建省"
}, {
  "citys": ["鄂州市", "恩施土家族苗族自治州", "黄冈市", "黄石市", "荆门市", "荆州市", "潜江市", "神农架林区", "十堰市", "随州市", "天门市", "武汉市", "仙桃市", "咸宁市", "襄樊市", "襄阳市", "孝感市", "宜昌市"],
  "province": "湖北省"
}, {
  "citys": ["长沙市", "常德市", "郴州市", "衡阳市", "怀化市", "娄底市", "邵阳市", "湘潭市", "湘西土家族苗族自治州", "益阳市", "永州市", "岳阳市", "张家界市", "株洲市"],
  "province": "湖南省"
}, {
  "citys": ["抚州市", "赣州市", "吉安市", "景德镇市", "九江市", "南昌市", "萍乡市", "上饶市", "新余市", "宜春市", "鹰潭市"],
  "province": "江西省"
}, {
  "citys": ["白沙黎族自治县", "保亭黎族苗族自治县", "昌江黎族自治县", "澄迈县", "儋州市", "定安县", "东方市", "海口市", "乐东黎族自治县", "临高县", "陵水黎族自治县", "琼海市", "琼中黎族苗族自治县", "三亚市", "屯昌县", "万宁市", "文昌市", "五指山市"],
  "province": "海南省"
}, {
  "citys": ["安康市", "宝鸡市", "汉中市", "商洛市", "铜川市", "渭南市", "西安市", "咸阳市", "延安市", "榆林市"],
  "province": "陕西省"
}, {
  "citys": ["白银市", "定西市", "甘南藏族自治州", "嘉峪关市", "金昌市", "酒泉市", "兰州市", "临夏回族自治州", "陇南市", "平凉市", "庆阳市", "天水市", "武威市", "张掖市"],
  "province": "甘肃省"
}, {
  "citys": ["百色市", "北海市", "崇左市", "防城港市", "贵港市", "桂林市", "河池市", "贺州市", "来宾市", "柳州市", "南宁市", "钦州市", "梧州市", "玉林市"],
  "province": "广西壮族自治区"
}, {
  "citys": ["阿拉善盟", "巴彦淖尔市", "包头市", "赤峰市", "鄂尔多斯市", "呼和浩特市", "呼伦贝尔市", "通辽市", "乌海市", "乌兰察布市", "锡林郭勒盟", "兴安盟"],
  "province": "内蒙古自治区"
}, {
  "citys": ["固原市", "石嘴山市", "吴忠市", "银川市", "中卫市"],
  "province": "宁夏回族自治区"
}, {
  "citys": ["阿克苏地区", "阿拉尔市", "阿勒泰地区", "阿图什市", "巴音郭楞蒙古自治州", "博尔塔拉蒙古自治州", "昌吉回族自治州", "哈密地区", "和田地区", "喀什地区", "克拉玛依市", "克孜勒苏柯尔克孜自治州", "石河子市", "塔城地区", "图木舒克市", "吐鲁番地区", "乌鲁木齐市", "五家渠市", "伊犁哈萨克自治州"],
  "province": "新疆维吾尔自治区"
}, {
  "citys": ["阿里地区", "昌都地区", "拉萨市", "林芝地区", "那曲地区", "日喀则地区", "山南地区"],
  "province": "西藏自治区"
}, {
  "citys": ["北区", "大埔区", "东区", "观塘区", "黄大仙区", "九龙城区", "葵青区", "离岛区", "南区", "荃湾区", "沙田区", "深水?区", "屯门区", "湾仔区", "西贡区", "油尖旺区", "元朗区", "中西区"],
  "province": "香港特区"
}, {
  "citys": ["澳门"],
  "province": "澳门特区"
}];
exports.cityJson = cityJson;