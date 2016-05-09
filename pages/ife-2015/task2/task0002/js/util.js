// 写于1/29，初学js

//2.1
//2.1 总结 肯定有比typeof更高级的方法...
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
	return Array.isArray(arr);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
	if(typeof(fn)=="function") {
		return true;
	} else {
		return false;
	}
}

//测试isArray()和isFunction().
/*var arr=["a","b","c"];
if (isArray(arr)==true) {
	alert("right");
} else {
	alert("wrong");
}

function hello() {
	var i=1;
}
if (isFunction(hello)==true) {
	alert("function!");
}*/

/*************************************************************************************************/
//2.2
//2.2 总结 
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
	var clone = src;
	
	//对于Date
	if (src instanceof Date) {
		clone = new Date(src.getDate());
		return clone;
	}
	//对于Array
	if (src instanceof Array) {
		clone = new Array();
		for(var i=0;i<src.length;i++) {
			clone[i] = cloneObject(src[i]);
		}
		return clone;
	}
	//对于Object
	
	if (src instanceof Object) {
		clone = new Object();
		for (var key in src){
			clone[key] = cloneObject(src[key]);
		}
		return clone;
	}
	//对于数字，字符串，布尔型直接返回。
	return clone;
}

// 测试Object
/*var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"*/

//测试Array
/*var a=[1,2,3,[1,2,3]];
b = cloneObject(a);
alert(b[3][0]);*/

/*************************************************************************************************/
//2.3
//熟悉循环的操作，for和for-in
//
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
	for (var i=0;i<arr.length-1;i++) {
		for (var j=i+1;j<arr.length;j++) {
			if (arr[i]==arr[j]) {
				arr.splice(j,1);
			}
		}
	}
	return arr;
}

// 使用示例
/*var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]*/

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
	function isEmpty(c) {
		return /\s/.test(c);
	}
	var strlen = str.length;
	for(var i=0;i<strlen && isEmpty(str.charAt(i));i++);
	if(i==strlen) {
		return "";
	}
	for(var j=strlen;j>0 && isEmpty(str.charAt(j-1));j--);
	return str.substring(i,j);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
	//return /\S.*\S/.exec(str);
	return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
/*
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
*/

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
	for(var i=0;i<arr.length;i++) {
		fn(arr[i],i);
	}
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html
*/

// 使用示例
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html
*/

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var i = 0;
	for(key in obj){
		if(key) {
			i++;
		}
	}
	return i;
}

// 使用示例
/*
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3 
*/
/*************************************************************************************************/

//2.4
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/[0-9a-zA-Z\_]+\@[0-9a-zA-Z]+\.['com']/) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
	return /[0-9]{3}\-[0-9]{4}-[0-9]{4}/.test(phone);
}
/*
var email="wu@163.com";
console.log(isEmail(email));
var phone="136-3239-3346";
console.log(isMobilePhone(phone));
*/

/*************************************************************************************************/
//3
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
	element.className = trim(element.className+" "+newClassName);
}
//var heading = document.getElementById("con");
//addClass(heading,"new-con");

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
	element.className = element.className.replace(oldClassName,"");
}
//var heading = document.getElementById("con");
//removeClass(heading,"cont");

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
	if (element.parentNode == siblingNode.parentNode) {
		return true;
	}
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
	var xPos = 0;
	var yPos = 0;
	var current = element;
	while (current != null) {
		xPos = xPos + current.offsetLeft;
		yPos = yPos + current.offsetTop;
		current = current.offsetParent;
	}
	return {
		x:xPos,
		y:yPos
	}
}
//var con = document.getElementById("con");
//console.log((getPosition(con)));

// your implement
//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
	var selectors = selector.replace(/\s+/," ").split(" ");
	var ele = document;//实现递归
	for (var i=0, len=selectors.length;i<len;i++) {
		switch (selectors[i][0]) {
			case "#" :
				ele = ele.getElementById(selectors[i].substring(1));
				break;
			case "." :
				ele = ele.getElementsByClassName(selectors[i].substring(1))[0];
				break;
			case "[" :
				var equal = selectors[i].indexOf("=");
				var temp = ele.getElementsByTagName("*");
				var tLen = temp.length;
				if(equal != -1) {
					var key = selectors[i].substring(1,equal);
					var value = selectors[i].substring(equal+1,selectors[i].length-1);
					for (var j  =0; j < tLen; j++) {
						if (temp[j][key] == value) {
							ele = temp[j];
							break;
						}
					}
				} else {
					var key = selectors[i].substring(1,selectors[i].length-1);
					for (var j = 0; j < tLen; j++) {
						if (temp[j][key]) {
							ele = temp[j];
							break;
						}
					}
				}
				break;
			default :
				ele = ele.getElementsByTagName(selectors[i])[0];
				break;
		}
	}
	if (!ele) {
		ele = null;
	}
	return ele;
}

// 可以通过id获取DOM对象，通过#标示，例如
 // 返回id为adom的DOM对象
/*
// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象*/

/*************************************************************************************************/
//4.1

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
	if (element != null) {
		element.addEventListener(event,listener);	
	}
}
/*function clicklistener(event) {
    console.log("click");
}
addEvent($("#doma"), "click", clicklistener);*/

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
	element.removeEventListener(event,listener);
}
//removeEvent($("#doma"), "click", clicklistener);

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
	addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
	addEvent(element,"keydown",function(event){
		var code = event.charCode || event.keyCode;
		if (code == 13) {
			listener.call(element, event);
		}
	})
}
/*addEnterEvent($("#doma"),function(event){
	console.log("Enter");
})*/

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

function clickListener(event) {
    console.log(event);
}


function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

function init() {
    /*
	each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });
	*/
    $.click($("#btn"), renderList);
}
init();


// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement
	addEvent(element,eventName,function(event){
		var target = event.target;
		if (target && target.tagName == tag.toUpperCase()){
			listener.call(element,listener);
		}
	})
	
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
//$.delegate($("#list"), "li", "click", clickListener);

/*************************************************************************************************/
//5
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
	var ua = navigator.userAgent;
	if (/rv:([^;\)]+)/.test(ua)) {
		return RegExp["$1"];
	} else {
		return -1;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + 
		((expiredays == null) ? "" : ";expires="+exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
	if(document.cookie.length > 0) {
		var start = document.cookie.indexOf(cookieName+"=");
		if (start != -1) {
			start = start + cookieName.length +1;
			var end = document.cookie.indexOf(";",start);
			if (end == -1) {
				end = document.cookie.length;
			}
		}
		return decodeURIComponent(document.cookie.substring(start, end));
	}
	return "";
}

/*
//检测cookie
function checkCookie() {
	var username = getCookie('username');
	if (username != null && username != "") {
		alert("welcome back! "+username);
	} else {
		username = prompt("Please enter your name.","");
		if (username != null && username != "") {
			setCookie("username",username,365);
		}
	}
}

checkCookie();
*/

/*************************************************************************************************/
//6

function ajax(url, options) {
    // your implement
	// 定义对象
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//处理数据
	var myData = "";
	for (var item in options.data) {
		myData = myData + item + "=" + encodeURIComponent(options.data[item]) + "&";
	}
	if (myData) {
		myData = myData.substring(0,myData.length-1);	
	}
	//默认类型
	if (!options.type) {
		options.type = "GET";
	}
	options.type = options.type.toUpperCase();
	//GET请求
	if (options.type == "GET") {
		if (myData) {
			myData = url + "?" + myData;
		} else {
			myData = url;
		}
		xmlhttp.open("GET", myData, true);
		xmlhttp.send();
	} else {
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(myData);
	}
	//onreadystatechange
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){
			if (xmlhttp.status == 200) {
				if (options.onsuccess) {
					options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
				} else {
					if (options.onfail) {
						options.onfail();
					}	
				}
			}
		}
	};
}

// 使用示例：
/*
ajax(
    'prompt.php', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
		onfail: function() {
			console.log("Fail");
		}
    }
);
*/
