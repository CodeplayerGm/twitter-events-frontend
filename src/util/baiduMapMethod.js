/* eslint-disable */
// 设置事件热点地图控件
export function initMapHot (myChart) {
    let map = myChart.getModel().getComponent('bmap').getBMap()
    let centerLng = 0
    let centerLat = 39
    map.setMinZoom(0) // 设置地图最小缩放比例
    map.setMaxZoom(9) // 设置地图最大缩放比例
    map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })) // 在左下角显示比例尺控件
    var opts = {offset: new BMap.Size(5, 5), anchor: BMAP_ANCHOR_BOTTOM_RIGHT}
    // 为地图添加一个平移缩放控件
    map.addControl(new BMap.NavigationControl(opts))
    // alert('before')
    let point = new BMap.Point(centerLng, centerLat);  // 创建点坐标 
    map.centerAndZoom(point, 2);
    // alert('after')
    // 监听地图比例缩放， 可以根据缩放等级控制某些图标的显示
    map.addEventListener('zoomend', function () {
    //   alert(map.getZoom())
        let curCenter = new BMap.Point(map.getCenter().lng, map.getCenter().lat);
        map.centerAndZoom(curCenter, map.getZoom());
    })
}