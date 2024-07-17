<script setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '../../store/userStore'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue';
  import axios from 'axios';
  // import {
  //   LoadingOutlined,
  //   plusOutlined
  // } from '@ant-design/icons-vue';
  const userStore =  useUserStore();
  //true--表示不能修改   false--表示可以修改
  const componentDisabled = ref(true);
  //用户个人信息
  const userInfo = ref({
    userId : userStore.userInfo.userId,
    username : userStore.userInfo.username,
    password : userStore.userInfo.password,
    email : userStore.userInfo.email,
    phone : userStore.userInfo.phone,
    nickname : userStore.userInfo.nickname,
    avatar : userStore.userInfo.avatar,
    gender : userStore.userInfo.gender,
    address : userStore.userInfo.address,
    age : userStore.userInfo.age,
    bio : userStore.userInfo.bio,
    token : userStore.userInfo.token,
    role : userStore.userInfo.role
  })
  //地区信息
  const regionList = [
  {
    value: '北京',
    label: '北京',
  },
  {
    value: '天津',
    label: '天津',
  },
  {
    value: '上海',
    label: '上海',
  },
  {
    value: '重庆',
    label: '重庆',
  },
  {
    value: '河北',
    label: '河北',
    children: [
      {
        value: '石家庄',
        label: '石家庄',
      },
      {
        value: '唐山',
        label: '唐山',
      },
      {
        value: '秦皇岛',
        label: '秦皇岛',
      },
      {
        value: '邯郸',
        label: '邯郸',
      },
      {
        value: '邢台',
        label: '邢台',
      },
      {
        value: '保定',
        label: '保定',
      },
      {
        value: '张家口',
        label: '张家口',
      },
      {
        value: '承德',
        label: '承德',
      },
      {
        value: '沧州',
        label: '沧州',
      },
      {
        value: '廊坊',
        label: '廊坊',
      },
      {
        value: '衡水',
        label: '衡水',
      },
    ],
  },
  {
    value: '山西',
    label: '山西',
    children: [
      {
        value: '太原',
        label: '太原',
      },
      {
        value: '大同',
        label: '大同',
      },
      {
        value: '阳泉',
        label: '阳泉',
      },
      {
        value: '长治',
        label: '长治',
      },
      {
        value: '晋城',
        label: '晋城',
      },
      {
        value: '朔州',
        label: '朔州',
      },
      {
        value: '晋中',
        label: '晋中',
      },
      {
        value: '运城',
        label: '运城',
      },
      {
        value: '忻州',
        label: '忻州',
      },
      {
        value: '临汾',
        label: '临汾',
      },
      {
        value: '吕梁',
        label: '吕梁',
      },
    ],
  },
  {
    value: '辽宁',
    label: '辽宁',
    children: [
      {
        value: '沈阳',
        label: '沈阳',
      },
      {
        value: '大连',
        label: '大连',
      },
      {
        value: '鞍山',
        label: '鞍山',
      },
      {
        value: '抚顺',
        label: '抚顺',
      },
      {
        value: '本溪',
        label: '本溪',
      },
      {
        value: '丹东',
        label: '丹东',
      },
      {
        value: '锦州',
        label: '锦州',
      },
      {
        value: '营口',
        label: '营口',
      },
      {
        value: '阜新',
        label: '阜新',
      },
      {
        value: '辽阳',
        label: '辽阳',
      },
      {
        value: '盘锦',
        label: '盘锦',
      },
      {
        value: '铁岭',
        label: '铁岭',
      },
      {
        value: '朝阳',
        label: '朝阳',
      },
      {
        value: '葫芦岛',
        label: '葫芦岛',
      },
    ],
  },
  {
    value: '吉林',
    label: '吉林',
    children: [
      {
        value: '长春',
        label: '长春',
      },
      {
        value: '吉林市',
        label: '吉林市',
      },
      {
        value: '四平',
        label: '四平',
      },
      {
        value: '辽源',
        label: '辽源',
      },
      {
        value: '通化',
        label: '通化',
      },
      {
        value: '白山',
        label: '白山',
      },
      {
        value: '松原',
        label: '松原',
      },
      {
        value: '白城',
        label: '白城',
      },
      {
        value: '延边朝鲜族自治州',
        label: '延边朝鲜族自治州',
      },
    ],
  },
  {
    value: '黑龙江',
    label: '黑龙江',
    children: [
      {
        value: '哈尔滨',
        label: '哈尔滨',
      },
      {
        value: '齐齐哈尔',
        label: '齐齐哈尔',
      },
      {
        value: '鸡西',
        label: '鸡西',
      },
      {
        value: '鹤岗',
        label: '鹤岗',
      },
      {
        value: '双鸭山',
        label: '双鸭山',
      },
      {
        value: '大庆',
        label: '大庆',
      },
      {
        value: '伊春',
        label: '伊春',
      },
      {
        value: '佳木斯',
        label: '佳木斯',
      },
      {
        value: '七台河',
        label: '七台河',
      },
      {
        value: '牡丹江',
        label: '牡丹江',
      },
      {
        value: '黑河',
        label: '黑河',
      },
      {
        value: '绥化',
        label: '绥化',
      },
      {
        value: '大兴安岭地区',
        label: '大兴安岭地区',
      },
    ],
  },
  {
    value: '江苏',
    label: '江苏',
    children: [
      {
        value: '南京',
        label: '南京',
      },
      {
        value: '苏州',
        label: '苏州',
      },
      {
        value: '无锡',
        label: '无锡',
      },
      {
        value: '常州',
        label: '常州',
      },
      {
        value: '镇江',
        label: '镇江',
      },
      {
        value: '南通',
        label: '南通',
      },
      {
        value: '泰州',
        label: '泰州',
      },
      {
        value: '扬州',
        label: '扬州',
      },
      {
        value: '盐城',
        label: '盐城',
      },
      {
        value: '连云港',
        label: '连云港',
      },
      {
        value: '徐州',
        label: '徐州',
      },
      {
        value: '淮安',
        label: '淮安',
      },
      {
        value: '宿迁',
        label: '宿迁',
      },
    ],
  },
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
      },
      {
        value: '宁波',
        label: '宁波',
      },
      {
        value: '温州',
        label: '温州',
      },
      {
        value: '嘉兴',
        label: '嘉兴',
      },
      {
        value: '湖州',
        label: '湖州',
      },
      {
        value: '绍兴',
        label: '绍兴',
      },
      {
        value: '金华',
        label: '金华',
      },
      {
        value: '衢州',
        label: '衢州',
      },
      {
        value: '舟山',
        label: '舟山',
      },
      {
        value: '台州',
        label: '台州',
      },
      {
        value: '丽水',
        label: '丽水',
      },
    ],
  },
  {
    value: '安徽',
    label: '安徽',
    children: [
      {
        value: '合肥',
        label: '合肥',
      },
      {
        value: '芜湖',
        label: '芜湖',
      },
      {
        value: '蚌埠',
        label: '蚌埠',
      },
      {
        value: '淮南',
        label: '淮南',
      },
      {
        value: '马鞍山',
        label: '马鞍山',
      },
      {
        value: '淮北',
        label: '淮北',
      },
      {
        value: '铜陵',
        label: '铜陵',
      },
      {
        value: '安庆',
        label: '安庆',
      },
      {
        value: '黄山',
        label: '黄山',
      },
      {
        value: '滁州',
        label: '滁州',
      },
      {
        value: '阜阳',
        label: '阜阳',
      },
      {
        value: '宿州',
        label: '宿州',
      },
      {
        value: '六安',
        label: '六安',
      },
      {
        value: '亳州',
        label: '亳州',
      },
      {
        value: '池州',
        label: '池州',
      },
      {
        value: '宣城',
        label: '宣城',
      },
    ],
  },
  {
    value: '福建',
    label: '福建',
    children: [
      {
        value: '福州',
        label: '福州',
      },
      {
        value: '厦门',
        label: '厦门',
      },
      {
        value: '漳州',
        label: '漳州',
      },
      {
        value: '泉州',
        label: '泉州',
      },
      {
        value: '三明',
        label: '三明',
      },
      {
        value: '莆田',
        label: '莆田',
      },
      {
        value: '南平',
        label: '南平',
      },
      {
        value: '龙岩',
        label: '龙岩',
      },
      {
        value: '宁德',
        label: '宁德',
      },
    ],
  },
  {
    value: '江西',
    label: '江西',
    children: [
      {
        value: '南昌',
        label: '南昌',
      },
      {
        value: '景德镇',
        label: '景德镇',
      },
      {
        value: '萍乡',
        label: '萍乡',
      },
      {
        value: '九江',
        label: '九江',
      },
      {
        value: '新余',
        label: '新余',
      },
      {
        value: '鹰潭',
        label: '鹰潭',
      },
      {
        value: '赣州',
        label: '赣州',
      },
      {
        value: '吉安',
        label: '吉安',
      },
      {
        value: '宜春',
        label: '宜春',
      },
      {
        value: '抚州',
        label: '抚州',
      },
      {
        value: '上饶',
        label: '上饶',
      },
    ],
  },
  {
    value: '山东',
    label: '山东',
    children: [
      {
        value: '济南',
        label: '济南',
      },
      {
        value: '青岛',
        label: '青岛',
      },
      {
        value: '淄博',
        label: '淄博',
      },
      {
        value: '枣庄',
        label: '枣庄',
      },
      {
        value: '东营',
        label: '东营',
      },
      {
        value: '烟台',
        label: '烟台',
      },
      {
        value: '潍坊',
        label: '潍坊',
      },
      {
        value: '济宁',
        label: '济宁',
      },
      {
        value: '泰安',
        label: '泰安',
      },
      {
        value: '威海',
        label: '威海',
      },
      {
        value: '日照',
        label: '日照',
      },
      {
        value: '莱芜',
        label: '莱芜',
      },
      {
        value: '临沂',
        label: '临沂',
      },
      {
        value: '德州',
        label: '德州',
      },
      {
        value: '聊城',
        label: '聊城',
      },
      {
        value: '滨州',
        label: '滨州',
      },
      {
        value: '菏泽',
        label: '菏泽',
      },
    ],
  },
  {
    value: '河南',
    label: '河南',
    children: [
      {
        value: '郑州',
        label: '郑州',
      },
      {
        value: '开封',
        label: '开封',
      },
      {
        value: '洛阳',
        label: '洛阳',
      },
      {
        value: '平顶山',
        label: '平顶山',
      },
      {
        value: '安阳',
        label: '安阳',
      },
      {
        value: '鹤壁',
        label: '鹤壁',
      },
      {
        value: '新乡',
        label: '新乡',
      },
      {
        value: '焦作',
        label: '焦作',
      },
      {
        value: '濮阳',
        label: '濮阳',
      },
      {
        value: '许昌',
        label: '许昌',
      },
      {
        value: '漯河',
        label: '漯河',
      },
      {
        value: '三门峡',
        label: '三门峡',
      },
      {
        value: '南阳',
        label: '南阳',
      },
      {
        value: '商丘',
        label: '商丘',
      },
      {
        value: '信阳',
        label: '信阳',
      },
      {
        value: '周口',
        label: '周口',
      },
      {
        value: '驻马店',
        label: '驻马店',
      },
    ],
  },
  {
    value: "湖北",
    label: "湖北",
    children: [
      {
        value: "武汉",
        label: "武汉"
      },
      {
        value: "宜昌",
        label: "宜昌"
      },
      {
        value: "荆州",
        label: "荆州"
      },
      {
        value: "襄阳",
        label: "襄阳"
      },
      {
        value: "黄石",
        label: "黄石"
      },
      {
        value: "十堰",
        label: "十堰"
      },
      {
        value: "孝感",
        label: "孝感"
      },
      {
        value: "黄冈",
        label: "黄冈"
      },
      {
        value: "荆门",
        label: "荆门"
      },
      {
        value: "鄂州",
        label: "鄂州"
      },
      {
        value: "咸宁",
        label: "咸宁"
      },
      {
        value: "随州",
        label: "随州"
      },
      {
        value: "恩施土家族苗族自治州",
        label: "恩施土家族苗族自治州"
      },
      {
        value: "仙桃",
        label: "仙桃"
      },
      {
        value: "潜江",
        label: "潜江"
      },
      {
        value: "天门",
        label: "天门"
      },
      {
        value: "神农架林区",
        label: "神农架林区"
      }
    ]
  },
  {
    value: "湖南",
    label: "湖南",
    children: [
      {
        value: "长沙",
        label: "长沙"
      },
      {
        value: "株洲",
        label: "株洲"
      },
      {
        value: "湘潭",
        label: "湘潭"
      },
      {
        value: "衡阳",
        label: "衡阳"
      },
      {
        value: "邵阳",
        label: "邵阳"
      },
      {
        value: "岳阳",
        label: "岳阳"
      },
      {
        value: "常德",
        label: "常德"
      },
      {
        value: "张家界",
        label: "张家界"
      },
      {
        value: "益阳",
        label: "益阳"
      },
      {
        value: "郴州",
        label: "郴州"
      },
      {
        value: "永州",
        label: "永州"
      },
      {
        value: "怀化",
        label: "怀化"
      },
      {
        value: "娄底",
        label: "娄底"
      },
      {
        value: "湘西土家族苗族自治州",
        label: "湘西土家族苗族自治州"
      }
    ]
  },
  {
    value: "广东",
    label: "广东",
    children: [
      {
        value: "广州",
        label: "广州"
      },
      {
        value: "深圳",
        label: "深圳"
      },
      {
        value: "珠海",
        label: "珠海"
      },
      {
        value: "汕头",
        label: "汕头"
      },
      {
        value: "韶关",
        label: "韶关"
      },
      {
        value: "佛山",
        label: "佛山"
      },
      {
        value: "江门",
        label: "江门"
      },
      {
        value: "湛江",
        label: "湛江"
      },
      {
        value: "茂名",
        label: "茂名"
      },
      {
        value: "肇庆",
        label: "肇庆"
      },
      {
        value: "惠州",
        label: "惠州"
      },
      {
        value: "梅州",
        label: "梅州"
      },
      {
        value: "汕尾",
        label: "汕尾"
      },
      {
        value: "河源",
        label: "河源"
      },
      {
        value: "阳江",
        label: "阳江"
      },
      {
        value: "清远",
        label: "清远"
      },
      {
        value: "东莞",
        label: "东莞"
      },
      {
        value: "中山",
        label: "中山"
      },
      {
        value: "潮州",
        label: "潮州"
      },
      {
        value: "揭阳",
        label: "揭阳"
      },
      {
        value: "云浮",
        label: "云浮"
      }
    ]
  },
  {
    value: "海南",
    label: "海南",
    children: [
      {
        value: "海口",
        label: "海口"
      },
      {
        value: "三亚",
        label: "三亚"
      },
      {
        value: "三沙",
        label: "三沙"
      },
      {
        value: "琼海",
        label: "琼海"
      },
      {
        value: "文昌",
        label: "文昌"
      },
      {
        value: "万宁",
        label: "万宁"
      },
      {
        value: "五指山",
        label: "五指山"
      },
      {
        value: "东方",
        label: "东方"
      },
      {
        value: "定安",
        label: "定安"
      },
      {
        value: "屯昌",
        label: "屯昌"
      },
      {
        value: "澄迈",
        label: "澄迈"
      },
      {
        value: "临高",
        label: "临高"
      },
      {
        value: "白沙黎族自治县",
        label: "白沙黎族自治县"
      },
      {
        value: "昌江黎族自治县",
        label: "昌江黎族自治县"
      },
      {
        value: "乐东黎族自治县",
        label: "乐东黎族自治县"
      },
      {
        value: "陵水黎族自治县",
        label: "陵水黎族自治县"
      },
      {
        value: "保亭黎族苗族自治县",
        label: "保亭黎族苗族自治县"
      },
      {
        value: "琼中黎族苗族自治县",
        label: "琼中黎族苗族自治县"
      }
    ]
  },
  {
    value: "四川",
    label: "四川",
    children: [
      {
        value: "成都",
        label: "成都"
      },
      {
        value: "绵阳",
        label: "绵阳"
      },
      {
        value: "自贡",
        label: "自贡"
      },
      {
        value: "攀枝花",
        label: "攀枝花"
      },
      {
        value: "泸州",
        label: "泸州"
      },
      {
        value: "德阳",
        label: "德阳"
      },
      {
        value: "广元",
        label: "广元"
      },
      {
        value: "遂宁",
        label: "遂宁"
      },
      {
        value: "内江",
        label: "内江"
      },
      {
        value: "乐山",
        label: "乐山"
      },
      {
        value: "资阳",
        label: "资阳"
      },
      {
        value: "宜宾",
        label: "宜宾"
      },
      {
        value: "南充",
        label: "南充"
      },
      {
        value: "达州",
        label: "达州"
      },
      {
        value: "雅安",
        label: "雅安"
      },
      {
        value: "阿坝藏族羌族自治州",
        label: "阿坝藏族羌族自治州"
      },
      {
        value: "甘孜藏族自治州",
        label: "甘孜藏族自治州"
      },
      {
        value: "凉山彝族自治州",
        label: "凉山彝族自治州"
      },
      {
        value: "广安",
        label: "广安"
      },
      {
        value: "巴中",
        label: "巴中"
      },
      {
        value: "眉山",
        label: "眉山"
      },
      {
        value: "资阳",
        label: "资阳"
      }
    ]
  },
  {  
    value: "贵州",  
    label: "贵州",  
    children: [  
        {  
            value: "贵阳",  
            label: "贵阳"  
        },  
        {  
            value: "遵义",  
            label: "遵义"  
        },  
        {  
            value: "六盘水",  
            label: "六盘水"  
        },  
        {  
            value: "安顺",  
            label: "安顺"  
        },  
        {  
            value: "毕节",  
            label: "毕节"  
        },  
        {  
            value: "铜仁",  
            label: "铜仁"  
        },  
        {  
            value: "黔西南布依族苗族自治州",  
            label: "黔西南布依族苗族自治州"  
        },  
        {  
            value: "黔东南苗族侗族自治州",  
            label: "黔东南苗族侗族自治州"  
        },  
        {  
            value: "黔南布依族苗族自治州",  
            label: "黔南布依族苗族自治州"  
        }  
    ]  
},
{
    value: '云南',
    label: '云南',
    children: [
      {
        value: '昆明',
        label: '昆明'
      },
      {
        value: '曲靖',
        label: '曲靖'
      },
      {
        value: '玉溪',
        label: '玉溪'
      },
      {
        value: '保山',
        label: '保山'
      },
      {
        value: '昭通',
        label: '昭通'
      },
      {
        value: '丽江',
        label: '丽江'
      },
      {
        value: '普洱',
        label: '普洱'
      },
      {
        value: '临沧',
        label: '临沧'
      },
      {
        value: '德宏傣族景颇族自治州',
        label: '德宏傣族景颇族自治州'
      },
      {
        value: '怒江傈僳族自治州',
        label: '怒江傈僳族自治州'
      },
      {
        value: '迪庆藏族自治州',
        label: '迪庆藏族自治州'
      },
      {
        value: '大理白族自治州',
        label: '大理白族自治州'
      },
      {
        value: '楚雄彝族自治州',
        label: '楚雄彝族自治州'
      },
      {
        value: '红河哈尼族彝族自治州',
        label: '红河哈尼族彝族自治州'
      },
      {
        value: '文山壮族苗族自治州',
        label: '文山壮族苗族自治州'
      },
      {
        value: '西双版纳傣族自治州',
        label: '西双版纳傣族自治州'
      }
    ]
  },
  {
    value: '陕西',
    label: '陕西',
    children: [
      {
        value: '西安',
        label: '西安'
      },
      {
        value: '宝鸡',
        label: '宝鸡'
      },
      {
        value: '咸阳',
        label: '咸阳'
      },
      {
        value: '铜川',
        label: '铜川'
      },
      {
        value: '渭南',
        label: '渭南'
      },
      {
        value: '延安',
        label: '延安'
      },
      {
        value: '榆林',
        label: '榆林'
      },
      {
        value: '汉中',
        label: '汉中'
      },
      {
        value: '安康',
        label: '安康'
      },
      {
        value: '商洛',
        label: '商洛'
      }
    ]
  },
  {
    value: '甘肃',
    label: '甘肃',
    children: [
      {
        value: '兰州',
        label: '兰州'
      },
      {
        value: '嘉峪关',
        label: '嘉峪关'
      },
      {
        value: '金昌',
        label: '金昌'
      },
      {
        value: '白银',
        label: '白银'
      },
      {
        value: '天水',
        label: '天水'
      },
      {
        value: '武威',
        label: '武威'
      },
      {
        value: '张掖',
        label: '张掖'
      },
      {
        value: '平凉',
        label: '平凉'
      },
      {
        value: '酒泉',
        label: '酒泉'
      },
      {
        value: '庆阳',
        label: '庆阳'
      },
      {
        value: '定西',
        label: '定西'
      },
      {
        value: '陇南',
        label: '陇南'
      },
      {
        value: '临夏回族自治州',
        label: '临夏回族自治州'
      },
      {
        value: '甘南藏族自治州',
        label: '甘南藏族自治州'
      }
    ]
  },
  {
    value: '青海',
    label: '青海',
    children: [
      {
        value: '西宁',
        label: '西宁'
      },
      {
        value: '海东',
        label: '海东'
      },
      {
        value: '海北藏族自治州',
        label: '海北藏族自治州'
      },
      {
        value: '黄南藏族自治州',
        label: '黄南藏族自治州'
      },
      {
        value: '海南藏族自治州',
        label: '海南藏族自治州'
      },
      {
        value: '果洛藏族自治州',
        label: '果洛藏族自治州'
      },
      {
        value: '玉树藏族自治州',
        label: '玉树藏族自治州'
      },
      {
        value: '海西蒙古族藏族自治州',
        label: '海西蒙古族藏族自治州'
      }
    ]
  },
  {
    value: '中国台湾',
    label: '中国台湾',
  },
  {
    value: '内蒙古',
    label: '内蒙古',
    children: [
      {
        value: '呼和浩特',
        label: '呼和浩特'
      },
      {
        value: '包头',
        label: '包头'
      },
      {
        value: '乌海',
        label: '乌海'
      },
      {
        value: '赤峰',
        label: '赤峰'
      },
      {
        value: '通辽',
        label: '通辽'
      },
      {
        value: '鄂尔多斯',
        label: '鄂尔多斯'
      },
      {
        value: '呼伦贝尔',
        label: '呼伦贝尔'
      },
      {
        value: '巴彦淖尔',
        label: '巴彦淖尔'
      },
      {
        value: '乌兰察布',
        label: '乌兰察布'
      },
      {
        value: '兴安盟',
        label: '兴安盟'
      },
      {
        value: '锡林郭勒盟',
        label: '锡林郭勒盟'
      },
      {
        value: '阿拉善盟',
        label: '阿拉善盟'
      }
    ]
  },
  {
    value: '广西',
    label: '广西',
    children: [
      {
        value: '南宁',
        label: '南宁'
      },
      {
        value: '柳州',
        label: '柳州'
      },
      {
        value: '桂林',
        label: '桂林'
      },
      {
        value: '梧州',
        label: '梧州'
      },
      {
        value: '北海',
        label: '北海'
      },
      {
        value: '防城港',
        label: '防城港'
      },
      {
        value: '钦州',
        label: '钦州'
      },
      {
        value: '贵港',
        label: '贵港'
      },
      {
        value: '玉林',
        label: '玉林'
      },
      {
        value: '百色',
        label: '百色'
      },
      {
        value: '贺州',
        label: '贺州'
      },
      {
        value: '河池',
        label: '河池'
      },
      {
        value: '来宾',
        label: '来宾'
      },
      {
        value: '崇左',
        label: '崇左'
      }
    ]
  },
  {
    value: '西藏',
    label: '西藏',
    children: [
      {
        value: '拉萨',
        label: '拉萨'
      },
      {
        value: '日喀则',
        label: '日喀则'
      },
      {
        value: '昌都',
        label: '昌都'
      },
      {
        value: '林芝',
        label: '林芝'
      },
      {
        value: '山南',
        label: '山南'
      },
      {
        value: '那曲',
        label: '那曲'
      },
      {
        value: '阿里',
        label: '阿里'
      }
    ]
  },
  {
    value: '宁夏',
    label: '宁夏',
    children: [
      {
        value: '银川',
        label: '银川'
      },
      {
        value: '石嘴山',
        label: '石嘴山'
      },
      {
        value: '吴忠',
        label: '吴忠'
      },
      {
        value: '固原',
        label: '固原'
      },
      {
        value: '中卫',
        label: '中卫'
      }
    ]
  },
  {
    value: '新疆',
    label: '新疆',
    children: [
      {
        value: '乌鲁木齐',
        label: '乌鲁木齐'
      },
      {
        value: '克拉玛依',
        label: '克拉玛依'
      },
      {
        value: '吐鲁番',
        label: '吐鲁番'
      },
      {
        value: '哈密',
        label: '哈密'
      },
      {
        value: '昌吉',
        label: '昌吉'
      },
      {
        value: '博尔塔拉蒙古自治州',
        label: '博尔塔拉蒙古自治州'
      },
      {
        value: '巴音郭楞蒙古自治州',
        label: '巴音郭楞蒙古自治州'
      },
      {
        value: '阿克苏',
        label: '阿克苏'
      },
      {
        value: '克孜勒苏柯尔克孜自治州',
        label: '克孜勒苏柯尔克孜自治州'
      },
      {
        value: '喀什',
        label: '喀什'
      },
      {
        value: '和田',
        label: '和田'
      },
      {
        value: '伊犁哈萨克自治州',
        label: '伊犁哈萨克自治州'
      },
      {
        value: '塔城',
        label: '塔城'
      },
      {
        value: '阿勒泰',
        label: '阿勒泰'
      },
      {
        value: '石河子',
        label: '石河子'
      },
      {
        value: '阿拉尔',
        label: '阿拉尔'
      },
      {
        value: '图木舒克',
        label: '图木舒克'
      },
      {
        value: '五家渠',
        label: '五家渠'
      }
    ]
  },
  {
    value: '中国香港',
    label: '中国香港',
  },
  {
    value: '中国澳门',
    label: '中国澳门',
  },
]
  //取消修改时还原原信息
  function restoreUserInfo() {
    userInfo.value.userId = userStore.userInfo.userId,
    userInfo.value.username = userStore.userInfo.username,
    userInfo.value.password = userStore.userInfo.password,
    userInfo.value.email = userStore.userInfo.email,
    userInfo.value.phone = userStore.userInfo.phone,
    userInfo.value.nickname = userStore.userInfo.nickname,
    userInfo.value.avatar = userStore.userInfo.avatar,
    userInfo.value.gender = userStore.userInfo.gender,
    userInfo.value.address = userStore.userInfo.address,
    userInfo.value.age = userStore.userInfo.age,
    userInfo.value.bio = userStore.userInfo.bio,
    userInfo.value.token = userStore.userInfo.token,
    userInfo.value.role = userStore.userInfo.role
  }
  const labelCol = {
    style: {
      width: '150px',
    },
  };
  const wrapperCol = {
    span: 14,
  };
  //请求服务器地址
  const serverURL = 'http://localhost:8080'
  // 提交修改个人信息
function submitModifyInfo() {
  const params = {
    username: userInfo.username,
    nickname: userInfo.nickname,
    password: userInfo.password,
    gender: userInfo.gender,
    age: userInfo.age,
    email: userInfo.email,
    bio: userInfo.bio,
    address: userInfo.address,
    phone: userInfo.phone, 
    avatar: userInfo.avatar
  }
  axios({
    method: 'post',
    url: serverURL + '/user/modifyUserInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams(params).toString(),
  }).then((result) => {
    //修改成功
    if(result.data.status === '0'){
      //修改成功后还需要修改store中的个人信息
      userStore.setUserInfo(params)
      console.log("修改后用户信息");
      console.log(userStore.userInfo);
      message.success({
      content: ()=> `${result.data.msg}`,
      style: {
        marginTop: '10vh'
      }
      })
    }else{
      message.error({
        content: ()=> `${result.data.msg}`,
        style: {
          marginTop: '10vh'
        }
      })
    }

    console.log(result);
  }).catch(function(error){
    console.log(error);
  })
}
//表格是否可以修改
function changeDisabled() {
  //true--表示不能修改   false--表示可以修改
  componentDisabled.value = componentDisabled.value ? false : true;
  if(componentDisabled.value === true){
    //取消修改后还原数据
    restoreUserInfo()
  }
}

const loading = ref(false)
//将图片转成base64编码
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
//上传图片前的处理
function beforeUpload(file){
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      return this.$message.error('请上传正确的图片格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return this.$message.error('图片大小必须小于2MB!');
    }
}
//上传图片
function avatarUpload(info) {
  if(info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if(info.file.status === 'done') {
    getBase64(info.file.originFileObj, base64Url => {
      userInfo.value.avatar = base64Url;
      loading.value = false;
    })
  }
  if(info.file.status === 'error') {
    loading.value = false;
    message.error('上传失败,请稍后再试')
  }
}
</script>

<template>
  <div class="formContainer">
    <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    :disabled="componentDisabled"
    style="max-width: 700px;"
    >
      <a-form-item label="用户名">
        <a-input v-model:value="userInfo.username" />
      </a-form-item>
      <a-form-item label="昵称">
        <a-input v-model:value="userInfo.nickname" />
      </a-form-item>
      <a-form-item label="性别">
        <a-radio-group v-model:value="userInfo.gender">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="年龄">
        <a-input v-model:value="userInfo.age" />
      </a-form-item>
      <a-form-item label="电话号码">
        <a-input v-model:value="userInfo.phone" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="userInfo.bio" />
      </a-form-item>
      <a-form-item label="地区">
        <a-cascader
          v-model:value="userInfo.address"
          style="width: 100%;"
          size="large"
          :options="regionList"
          placeholder="请选择地区"
        />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea :rows="4" v-model:value="userInfo.bio"/>
      </a-form-item>
      
      <a-form-item label="上传头像">
        <!-- user/avatar -->
        <a-upload list-type="picture-card" :show-upload-list="false" :before-upload="beforeUpload" @change="avatarUpload">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </div>
  <div style="margin-bottom: 5px;">
    <a-button @click="changeDisabled" >{{ componentDisabled ? '修改信息' : '取消修改' }}</a-button>
    <a-button @click="submitModifyInfo" >提交修改</a-button>
  </div>
</template>

<style scoped>
.formContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* 使用视口高度 */
}
</style>