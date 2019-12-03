/* eslint-disable */
export var drawImg = {
    canvasDom: null ,
    width: 0,
    height: 0,
    data:[], //数据
    ctx: null, //花边
    finImgData : null , //最终图片
    finImgMsg: null, //存放是否已写信息
    colorArr : [ //颜色选择
        '#3C6B15',
        '#6b4b38',
        '#eb9a2f',
        '#12acab',
        '#eb9a2f',
    ],
    
    ready: function(data, containerId) {
        this.data = data;
        this.canvasDom = document.createElement("canvas");
        var containerDom = document.getElementById(containerId);
        this.width = parseInt(containerDom.style.width.slice(0, -2))
        this.height = parseInt(containerDom.style.height.slice(0, -2))
        this.canvasDom.setAttribute("width", this.width);
        this.canvasDom.setAttribute("height", this.height);
        this.canvasDom.style.backgroundColor  = 'white';
        
        containerDom.appendChild(this.canvasDom);
        
        this.ctx = this.canvasDom.getContext('2d');
        this.finImgData = this.ctx.createImageData(this.width , this.height);
        this.finImgMsg = [];
        
        for(var i=0; i<this.width; i++) {
            this.finImgMsg[i] = [];
            for(var j=0; j<this.height; j++) {
                this.finImgMsg[i][j] = 0;
            }
        }
        
        this.cavulateData();
        //log(this.data)
        this.draw();
    },
    /*** 计算标签大小*/
    cavulateData : function() {
        var dataArr = [];
        var obj;
        for(var name in this.data){
            dataArr.push({name: name , count: this.data[name]}) 
        }
        dataArr.sort(function(x, y) {
            if(Math.floor(x.count) == Math.floor(y.count)) {
                return 0;
            }
            if(Math.floor(x.count) > Math.floor(y.count)) {
                return -1;
            } else {
                return 1;
            }
        })
        var shift = -6;
        for(var i =0; i< dataArr.length; i++){
            if(i==0) {
                dataArr[0].count = 68;
                continue;
            }
            if(shift < 0) {
                shift ++
            }
            dataArr[i].count = Math.floor(dataArr[i-1].count * 99/ 100) + shift;
            if(dataArr[i].count < 13) {
                dataArr[i].count = 17;
            }
        }
        this.data = dataArr;
    },
    /*** 开始画*/
    draw: function() {
        for(var i = 0; i< this.data.length; i++){
            this.drawWord(this.data[i].name, this.data[i].count);
        }
        this.ctx.putImageData(this.finImgData, 0, 0);
    },
    /*** 单一一个标签画*/
    drawWord: function(word, size) {
        var fillStyle = this.colorArr[ random(this.colorArr.length-1)];
        this.ctx.fillStyle = fillStyle;
        this.ctx.font = "700 " + size + "px   微软雅黑";
        var w =this.ctx.measureText(word).width;
        this.ctx.textBaseline = "top";
        this.ctx.fillText(word, 0, 0);
        var wordImgData = this.ctx.getImageData(0, 0, w, size + 10);
        wordImgData = this.randomRotateImgeData(wordImgData)
        this.ctx.clearRect(0, 0, this.width, this.height);
        //初始化查找点
        var centerPoint = this.getCenterPoint();
        var i = 0;
        while (i < 1000) {
            if(centerPoint.isFullRound()) {
                centerPoint.clearRound();
            }
            var pos = centerPoint.getCenterPos(wordImgData.width, wordImgData.height);
            pos.x = this.width / 2 + pos.x;
            pos.y = this.height / 2 + pos.y;
            if(this.isAbleDraw(wordImgData, pos.x, pos.y)) {
                for(var i = 0 ; i < wordImgData.width  ; i++) {
                    for(var j=0 ; j < wordImgData.height ; j++) {
                        var point= getXY(wordImgData , i  ,j );
                        if( point[3]!=0 ){
                            setXY(this.finImgData ,pos.x+i,pos.y+j,point);
                            this.finImgMsg[pos.x+i-1][pos.y+j-1] = 1
                        }
                    }
                }
                break;
            }
            i++;
            centerPoint = this.getCenterPoint( centerPoint);
        }
    },
    
    /*** 是否可以画*/
    isAbleDraw: function (wordImg, x , y){
        var w = wordImg.width;
        var h = wordImg.height;
        for(var i = 0 ; i <  w ; i++){
            for(var j = 0 ; j < h ; j++){
                var wordPoint = getXY(wordImg , i ,j);
                //检测文字图片上该点是否有痕迹，不全为白为有痕迹
                if(wordPoint[3]!=0 ){
                    var finx = x+ i -1;
                    var finy = y + j - 1;
                    if(finx <0 || finx >= this.width ||finy <0 || finy >=this.height){
                        return false;
                    }
                    if(this.finImgMsg[finx][finy] == 1){
                        return false;
                    }
                }
            }
        }
        return true;
    },
    /*** 随机旋转*/
    randomRotateImgeData: function(imgData){
        var newImageData = this.ctx.createImageData(imgData.height , imgData.width);
        if(random(9)>6){
            for(var i = 0 ; i < imgData.height ; i++){
                for(var j = 0 ; j < imgData.width ; j++){
                    var point = getXY(imgData , j , i);
                    setXY(newImageData , imgData.height - i -1 ,j ,point );
                } 
            }
            imgData = newImageData;
        }
        return imgData;
    },
    
    /*** 用于标签的位置选择*/
    getCenterPoint : function(centerPoint){
        //没有传入centerPoint,默认初始化
        if( typeof centerPoint != 'object'){
            //centerPoint对象，用于存储以往已经选择的点的信息
            var centerPoint = {
                round : 1, //第几圈
                choose : [], //已选择的点
                nowChoose : null,
                revert : 0,
                /*** 随机选择点*/
                randPoint: function (){
                    var chooseCount  = this.round == 1 ?  1 : this.round * 2 + (this.round - 2) * 2; //总共可以选择的点
                    //所有情况已经遍历了，增加一环 ,重置
                    if(this.choose.length == chooseCount ){
                        this.round++;
                        this.choose = [];
                        this.revert = 0;
                        return this.randPoint(); 
                    }
                    while(true){
                        this.nowChoose = random(chooseCount-1);
                        if(!inArray(this.nowChoose , this.choose)){
                            this.choose.push(this.nowChoose);
                            break;
                        }
                    } 
                    return this.nowChoose;
                },
                getCenterPos:function(w , h){
                    var shift = 0.5; //偏移率
                    var shiftw = random(1) ? random( w*shift) : -random( w*shift); 
                    var shifth = random(1) ? random( h*shift) : -random( h*shift); 
                    var pos = {
                        x : 0,
                        y : 0
                    }
                    if(this.nowChoose === null){
                        return false;
                    }
                    if(this.round != 1){
                        var quadrant = Math.floor((this.nowChoose) / (this.round-1)); //第几象限
                        var distance =  (this.nowChoose+1) % this.round;//象限的偏移
                        //log(quadrant)
                        switch(quadrant){
                            case 0 :
                                pos.x = w / 2  *  distance  ;
                                pos.y = h / 2 *  (this.round -distance) ;
                                break;
                            case 1 :
                                pos.x = w / 2  *  (this.round -distance);
                                pos.y = h / 2 *  (-distance) ;
                                break;
                            case 2 :
                                pos.x = w / 2  *  (-distance);
                                pos.y = h / 2 *  -(this.round - distance) ;
                                break;
                            case 3 :
                                pos.x = w / 2  * -(this.round - distance) ;
                                pos.y = h / 2 * distance;;
                                break;
                        }
                    }
                
                    pos.x +=  shiftw;
                    pos.y +=  shifth;
                    
                    pos.x = Math.floor(pos.x - w/2)
                    pos.y = Math.floor(pos.y - h/2)
                    return pos;
                },
                isFullRound: function(){
                    if(this.revert) return false;
                    var chooseCount  = this.round == 1 ?  1 : this.round * 2 + (this.round - 2) * 2; //总共可以选择的点
                    return this.choose.length == chooseCount;
                },
                clearRound:function(){
                    this.choose = [];
                    this.revert = 1;
                }
            };
        
        }
        centerPoint.randPoint();
        return  centerPoint;
    }
    
}

function random(num){
    return Math.floor(Math.random() *( num+1));
}

function log(str){
    console.log(str);
}

/*** imgData根据坐标获取*/
function getXY(imgData ,x, y){
    var res = []; 
    var w = imgData.width;
    var h = imgData.height;
    var pos = ( y * w + x) * 4;
    res[0] =  imgData.data[pos];
    res[1] =  imgData.data[pos+1];
    res[2] =  imgData.data[pos+2];
    res[3] =  imgData.data[pos+3];
    return res;
}
/*** imgData根据坐标修改*/
function setXY(imgData ,x, y,res){
    var w = imgData.width;
    var h = imgData.height;
    var pos = ( y * w + x) * 4;
    imgData.data[pos] = res[0] ;
    imgData.data[pos+1] = res[1] ;
    imgData.data[pos+2] = res[2] ;
    imgData.data[pos+3] = res[3] ;
}

/**
 *将重心坐标改成边缘坐标
 * 适用于x和y轴
 */
function center2abs(center , w , pos ){
    return center - Math.floor(w/2)+pos;
}

function inArray(son , arr){
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i] == son){
            return true;
        }
    }
    return false;
}

function changeImg(){
    var containerDom = document.getElementById("img");
    containerDom.innerHTML = '';
    drawImg.ready(data2 , "img");
}