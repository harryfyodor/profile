// 写于2/12

//animate函数接收两个参数，distance表示移动的距离，time表示移动的时间。把距离和时间分别都切成小块，然后通过定时器慢慢添加，达到平滑过渡的目的。
function animate(distance, time) {
	var longPic = document.getElementsByClassName("task2-3-longpic")[0],
		smallDistance = distance/40,
		smallTime = time/40,
		funcOfSetInterval = null,
		count = 0;
	
	funcOfSetInterval = setInterval(function(){
		longPic.style.right = parseInt(longPic.style.right) + smallDistance + "px";
		count++;
		if (count == 40) {
			clearInterval(funcOfSetInterval);
		}
	},smallTime);
}

//让小圆圈变暗。首先先把所有小圆圈的相关的class除掉，然后再给相应index的小圆圈添加目标类。
function darken(index) {
	var os = document.getElementsByClassName("task2-3-os")[0].getElementsByTagName("li");
	for (var i=0, len=os.length; i<len; i++) {
		if(/task2-3-darken/.test(os[i].className) && i!=index-1) {
			os[i].className = os[i].className.replace("task2-3-darken","");
		}
	}
	if (index == 6)  {
		os[0].className = os[0].className + " task2-3-darken";
	} else {
		if (index == 0) {
			os[4].className = os[4].className + " task2-3-darken";
		} else {
			os[index-1].className = os[index-1].className + " task2-3-darken";
		}
	}
}

//向右移动，当像素值达到2400的时候瞬间回到400，以便达到循环。小圆圈按照相应而定的像素位置调整。
function turnRight() {
	animate(400,800);
	if (parseInt(document.getElementsByClassName("task2-3-longpic")[0].style.right) >= 2400) {
		document.getElementsByClassName("task2-3-longpic")[0].style.right = "400px";
	}
	var num = parseInt(document.getElementsByClassName("task2-3-longpic")[0].style.right)/400;
	darken(num+1);
}

//与向右移动类似。
function turnLeft() {
	animate(-400,800);
	if (parseInt(document.getElementsByClassName("task2-3-longpic")[0].style.right) <= 0) {
		document.getElementsByClassName("task2-3-longpic")[0].style.right = "2000px";
	}
	var num = parseInt(document.getElementsByClassName("task2-3-longpic")[0].style.right)/400;
	darken(num-1);
}


var btn1 = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];
var btn3 = document.getElementsByTagName("button")[2];
var timer;//设一个timer在这里很难想到啊...

btn1.addEventListener("click", function(){
	if(timer) {
		stop();
	}
	timer = setInterval(turnRight,1500);
});

btn2.addEventListener("click", function(){
	if(timer) {
		stop();
	}
	timer = setInterval(turnLeft,1500);
})

btn3.addEventListener("click", stop);

function stop() {
	clearInterval(timer);
}

var btnRight = document.getElementsByClassName("task2-3-right")[0];
btnRight.addEventListener("click", turnRight);
var btnLeft = document.getElementsByClassName("task2-3-left")[0];
btnLeft.addEventListener("click", turnLeft);

//用了事件代理，用e获取事件对象，确定是哪一个被点击了。用diff确定是需要移动的距离，然后移动过去。其中利用到类名的规律。
function circle() {
	var oGroup = document.getElementsByClassName("task2-3-os")[0];
	oGroup.onclick = function() {
		var e = arguments[0] || window.event;
		var location = document.getElementsByClassName("task2-3-longpic")[0].style.right;
		//利用类名的规律确定是第几个圈圈被按下。
		var aim = 400*(e.target.className[9]);
		var diff = aim - parseInt(location);
		animate(diff,100);
		darken((e.target.className)[9]);
		return false;
	}
}
circle();