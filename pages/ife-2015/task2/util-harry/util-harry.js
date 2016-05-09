/*工具*/

/*跨浏览器事件*/
var EventUtil = {
	
	//事件处理程序
	addHandler: function(element, type, handler) {
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element.["on" + type] = handler;
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

/*深度克隆*/
function cloneObject(src) {
	// 数字，字符串，布尔，null，undefined
	if (src == null || typeof src != "object") {
		return src；
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