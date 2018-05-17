var count = 0;
var oPicUL = document.getElementsByClassName('queue')[0],
    moveWidth = oPicUL.children[0].offsetWidth;
var oSpan = document.getElementsByTagName('span'),
    oSpanLen = oSpan.length;
var oBtnleft = document.getElementsByClassName('leftbtn')[0],
    oBtnright = document.getElementsByClassName('rightbtn')[0],
    oBox = document.getElementsByClassName('wrapper')[0];
var boolen = true;
var realPicNum = oPicUL.children.length - 1;
//全局定时器设定（进入轮播默认移动定时器设定）
var timer = window.setInterval(autoMove, 3000);
//左按钮点击事件绑定
oBtnleft.onclick = function () {
    autoMove(-1);
}
//右按钮点击事件绑定
oBtnright.onclick = function () {
    autoMove(1);
}
//鼠标进入移动框移动事件停止（清除全局定时器）
oBox.onmouseover = function () {
    clearInterval(timer);
}
//鼠标离开移动框移动事件启动（即重新定义全局定时器）
oBox.onmouseout = function () {
    timer = window.setInterval(autoMove, 3000);
}
//遍历图片页码并绑定点击事件
for (var i = 0; i < oSpanLen; i ++) {
	oSpan[i].onclick = (function (i) {
		return function () {
			count = i;
			changeCir(count);
			move(oPicUL,{left: -moveWidth * i},function () {
				boolen = true;
			});
		}
	})(i)
}


//移动事件设定
function autoMove(demo) {
    if (boolen) {
        //设定key
        boolen = false;
        //判断点击按钮左||右
        if (demo == 1 || !demo) {
            count ++;
            if (count == 6) {
                count = 0;
            }
            //调用changeCir函数对页码颜色进行动态改变
            changeCir(count);
            move(oPicUL, { left: oPicUL.offsetLeft - moveWidth }, function () {
                if (count == 0) {
                    oPicUL.style.left = '0px';
                }
                boolen = true;
            });
        }
        //判断点击按钮左||右
        else if (demo == -1) {
            //判断向左移动前是否为首页图片，如果是就默认移动如果不是就对当前Left+moveWidth
            if (oPicUL.offsetLeft == 0) {
                oPicUL.style.left =  -moveWidth * realPicNum + 'px';
                // console.log(oPicUL.offsetLeft);
                count = realPicNum;
            }
            count --;
            changeCir(count);
            move(oPicUL, { left: oPicUL.offsetLeft + moveWidth }, function () {
                boolen = true;
            });
        }
    }

}
//改变页码样式
function changeCir(demo) {
    for (var i = 0; i < oSpanLen;i ++) {
       oSpan[i].className = '';
    }
    oSpan[demo].className = 'active';
}





























//封装的函数
function move(obj, data, func) {
    clearInterval(obj.timer);
    var iSpeed,
        iCur,
        name;
    startTimer = obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in data) {
            if (attr === 'opacity') {
                name = attr;
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            iSpeed = (data[attr] - iCur) / 8;
            if (iSpeed > 0) {
                iSpeed = Math.ceil(iSpeed);
            } else {
                iSpeed = Math.floor(iSpeed);
            }
            if (attr === 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (Math.floor(Math.abs(data[attr] - iCur)) != 0) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (name === 'opacity') {
                obj.style.opacity = data[name] / 100;
            }
            func();
        }
    }, 30);
}


function getStyle(elem, style) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[style];
    } else {
        return elem.currentStyle[style];
    }
}