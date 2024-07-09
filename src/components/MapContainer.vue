<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import AMap from "@amap/amap-jsapi-loader";

//获取位置信息
let map = null;
const latitude = ref(0)
const longitude = ref(0)

onMounted(() => {
  //只能在Egde浏览器中获取，Chrome浏览器中不能获取
  if ('geolocation' in navigator) {
    // 使用getCurrentPosition方法获取当前位置
    navigator.geolocation.getCurrentPosition(function(position) {
    // position 对象包含了位置信息
    console.log(typeof position.coords.latitude );
    console.log(typeof latitude.value);
    latitude.value = position.coords.latitude;  // 纬度
    longitude.value = position.coords.longitude; // 经度
    var accuracy = position.coords.accuracy;   // 精确度
    // 在控制台中打印位置信息
    console.log('Latitude:', latitude.value);
    console.log('Longitude:', longitude.value);
    console.log('Accuracy:', accuracy);
    // 执行其他操作，例如将位置信息显示在页面上或发送到服务器
    }, function(error) {
      // 处理错误情况
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("用户拒绝授权地理位置信息");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("位置信息不可用");
          break;
        case error.TIMEOUT:
          console.log("获取位置超时");
          break;
        default:
          console.log("发生未知错误");
          break;
      }
    }, {
      enableHighAccuracy: true, // 是否需要高精度结果
      timeout: 10000,          // 超时时间，单位毫秒
      maximumAge: 0           // 可接受的最大年龄，单位毫秒
    });
  } else {
    // 浏览器不支持地理位置 API
    console.log("抱歉，你的浏览器不支持地理位置功能");
  }

  //设置安全密钥
  window._AMapSecurityConfig = {
    securityJsCode: "feb8d8ec1052de2c67a281c5583e3297",
  };
  //设置用户应用密钥
  AMapLoader.load({
    key: "2e3cad43613af82760425c0305040c2b", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    resizeEnable: true
  })
    .then((AMap) => {
      map = new AMap.Map("GaoDeMapContainer", {
        viewMode: "3D", // 是否为3D地图模式
        zoom: 14, // 初始化地图级别
        center: [longitude.value, latitude.value] // 初始化地图中心点位置
      });
      //在地图上显示标点
      // const marker = new AMap.Marker({
      //   //icon: "//a.amap.com/jsapi_demos/static/demo-center/marker/marker-bottom-left.png", //自定义点标记
      //   position: [longitude.value, latitude.value], //基点位置
      //   offset: new AMap.Pixel(0, 0), //设置点标记偏移量
      //   anchor: "bottom-left", //设置锚点方位
      // });
      // map.add(marker);
      //根据经纬度解析地址信息

      //在标点上方显示天气
      AMap.plugin('AMap.Weather',function(){
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive('郫都区', function(err, data) {
            if (!err) {
                var str = [];
                str.push('<h4 >实时天气' + '</h4><hr>');
                str.push('<p>城市/区：' + data.city + '</p>');
                str.push('<p>天气：' + data.weather + '</p>');
                str.push('<p>温度：' + data.temperature + '℃</p>');
                str.push('<p>风向：' + data.windDirection + '</p>');
                str.push('<p>风力：' + data.windPower + ' 级</p>');
                str.push('<p>空气湿度：' + data.humidity + '</p>');
                str.push('<p>发布时间：' + data.reportTime + '</p>');
                var marker = new AMap.Marker({map: map, position: map.getCenter()});
                var infoWin = new AMap.InfoWindow({
                    content: '<div class="info" style="position:inherit;margin-bottom:0;background:#fff">'+str.join('')+'</div><div class="sharp"></div>',
                    isCustom:true,
                    offset: new AMap.Pixel(0, 0)
                });
                infoWin.open(map, marker.getPosition());
                marker.on('mouseover', function() {
                    infoWin.open(map, marker.getPosition());
                });
            }
        });
      })
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="GaoDeMapContainer"></div>
</template>

<style scoped>
#GaoDeMapContainer {
  width: 80%;
  height: 500px;
}
</style>