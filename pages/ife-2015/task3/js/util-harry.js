/*工具*/

/*深度克隆*/
function cloneObject(src) {
	// 数字，字符串，布尔，null，undefined
	if (src == null || typeof src != "object") {
		return src;
	}
	
	// Date
	if (src instanceof Date) {
		var clone = new Date(src.getData());
		return clone;
	}
	
	// 数组
	if (src instanceof Array) {
		var clone = new Array();
		for (var i = 0, len = src.length; i < len; i++) {
			clone[i] = src[i];
		}
		return clone;
	}
	
	// 对于Object
	if (src instanceof Object) {
		var clone = new Object();
		for (var key in src) {
			// 忽略继承来的属性
			if (src.hasOwnProperty(key)) {
				clone[key] = cloneObject(src[key]);
			}
		}
		return clone;
	}
}

/*
var srcObj = {
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

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/


/*Query简单方法*/
function $(selector) {
	var childs = function(element) {
		return element.getElementsByTagName("*");
	}
	// 获取html
	var ele = document.getElementsByTagName("html")[0];
	// 把多余的空格变成一个，然后分割
	var sele = selector.replace(/\s+/, " ").split(" ");
	
	for (var i = 0, len = sele.length; i < len; i++) {
		ele = childs(ele);
		var eleLen = ele.length;
		var isGet = false;
		switch(sele[i][0]) {
			case "#":
				for(var j = 0; j < eleLen; j++) {
					if(ele[j].id === sele[i].substring(1)) {
						ele = ele[j];
						isGet = true;
						break;
					}
				}
				break;
				
			case ".":
				for(var j = 0; j < eleLen; j++) {
					var classes = ele[j].className.split(" ");
					if (classes.indexOf(sele[i].substring(1)) !== -1) {
						ele = ele[j];
						isGet = true;
						break;
					}
				}
				break;
				
			case "[":
				var valueLoc = sele[i].indexOf("=");
				if (valueLoc !== -1) {
					var key = sele[i].substring(1, valueLoc);
					var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
					for (var j = 0; j < eleLen; j++) {
						if(ele[j][key] === value){
							ele = ele[j];
							isGet = true;
							break;
						}
					}
				}
				else {
					var key = sele[i].substring(1, sele[i].length - 1);
					for (var j = 0; j < eleLen; j++) {
						if (ele[j][key]) {
							ele = ele[j];
							isGet = true;
							break;
						}
					}
				}
				break;
				
			default:
				for(var j = 0; j < eleLen; j++) {
					if (ele[j].tagName === sele[i].toUpperCase()) {
						ele = ele[j];
						isGet = true;
						break;
					}
				}
				break;
		}
	}
	
	if(!isGet) {
		ele = null;
	}
	
	return ele;
}

/* */

/*跨浏览器事件*/
var EventUtil = {
	
	//事件处理程序
	addHandler: function(element, type, handler) {
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent(type, handler, false);
		} else {
			element["on" + type] = null;
		}
	},
	
	//事件对象
	getEvent: function(event) {
		return event ? event : window.event;
	},
	
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
	
};

/*
EventUtil.addHandler(document, "click", function(event){
	console.log("click");
	console.log(EventUtil.getTarget(event).nodeName);
})
*/

// 常用
// 添加一个事件
function addEvent(element, event, listener) {
	EventUtil.addHandler(element, event, listener);
}
// 移除一个事件
function removeEvent(element, event, listener) {
	EventUtil.removeHandler(element, event, listener);
}
// 添加一个click事件
function addClickEvent(element, listener) {
	EventUtil.addHandler(element, "click", listener);
}
// 添加一个Enter事件
function addEnterEvent(element, listener) {
	element.onkeydown = function(event) {
		event = EventUtil.getEvent(event);
		if (event.keyCode === 13) {
			listener();
		}
	}
}
// 添加一个事件代理
function delegateEvent(element, tag, eventName, listener) {
	EventUtil.addHandler(element, eventName, function(event) {
		var e = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var name = target.nodeName.toLowerCase();
		// 以防其他类型节点添加了事件。
		if (name === tag) {
			EventUtil.addHandler(target, eventName, listener);
		}
	})
}

// 简化的常用方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
$.delegate = delegateEvent;

/*
var ul = document.getElementsByTagName("ul")[0];
$.delegate(ul, "li", "click", function(event){
	console.log(EventUtil.getTarget(event).innerHTML);
})
*/
/*
$.delegate($("[data-log]"), "li", "click", function(event){
	console.log(EventUtil.getTarget(event).innerHTML)
})
data-(自定义属性)
*/
