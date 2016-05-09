// EventUtil模块

define(function(){
	
	//事件处理程序
	var addHandler = function(element, type, handler) {
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	};
	
	var removeHandler = function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent(type, handler, false);
		} else {
			element["on" + type] = null;
		}
	};
	
	//事件对象
	var getEvent = function(event) {
		return event ? event : window.event;
	};
	
	var getTarget = function(event) {
		return event.target || event.srcElement;
	};
	
	var preventDefault = function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	};
	
	var stopPropagation = function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	};
	
	return {
		addHandler: addHandler,
		removeHandler: removeHandler,
		getEvent: getEvent,
		getTarget: getTarget,
		preventDefault: preventDefault,
		stopPropagation: stopPropagation
	}
});
