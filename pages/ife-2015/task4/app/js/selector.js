// 选择器模块

define(function(selector){
	
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
					
				// 自己添加的，获取有某个类的所有元素 
				case "*":
					var eles = [];
					for(var j = 0; j < eleLen; j++) {
						var classes = ele[j].className.split(" ");
						if (classes.indexOf(sele[i].substring(1)) !== -1) {
							eles.push(ele[j]);
							isGet = true;
						}
					}
					return eles;
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
	
	return $;
});