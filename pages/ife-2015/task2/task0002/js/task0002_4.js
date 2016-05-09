// 写于2/5
//定义好的数据，可以往里面添加
var searchData = ['harry', 'fyodor', 'coding', 'JS'];

//定义鼠标的行为，用事件代理绑定了每一个选项的内容，通过点击可以使得选项的内容显示到框中。
function enterClick() {
	var choices = document.getElementsByClassName("task2-4-choice")[0];
	var output = document.getElementsByClassName("task2-4-input")[0];
	//鼠标的返回值
	choices.onmousedown = function() {
		var e = arguments[0] || window.event,
			target = e.target;
		output.value = target.innerHTML;
		console.log(target.innerHTML);
	}	
}

//显示选择项，当点击输入框的时候生成节点，添加进去。
function showChoices(data) {
	var inputArea = document.getElementsByClassName("task2-4-input")[0];
	var choices = document.getElementsByClassName("task2-4-choice")[0];
	inputArea.onfocus = function() {
		if (choices.childNodes.length == 0) {
			for(var i=0, len=data.length; i < len; i++) {
				var spanNode = document.createElement("span");
				spanNode.innerHTML = data[i];
				choices.appendChild(spanNode);
			}
		}	
	}
}

//element值用于键盘点击的作用，当点击到其他地方的时候，element这个选择变量就会回到最初的choices，即提示标签的父元素。
var element;
//当点击其他地方的时候，显示的提示框会消失。
function hideChoices() {
	var choices = document.getElementsByClassName("task2-4-choice")[0];
	var inputArea = document.getElementsByClassName("task2-4-input")[0];
	inputArea.onblur = function() {
		if (choices.childNodes.length != 0) {
			choices.innerHTML = "";
			element = choices;
		}
	}
}

//键盘功能，点击上40，下38，回车13的不同变化，通过element的变化来调整显示位置。
function enterKey() {
	var choices = document.getElementsByClassName("task2-4-choice")[0];
	var inputArea = document.getElementsByClassName("task2-4-input")[0];
	inputArea.onkeydown = function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 40) {
			if (!element) {
				element = choices;
				console.log("a");
			}
			if (element == choices && element.hasChildNodes()) {
				element = element.firstChild;
				element.className = "task2-4-hover";
				console.log("b");
			} else if (element != choices && element.nextSibling) {
				element.className = "";
				element = element.nextSibling;
				element.className = "task2-4-hover";
				console.log("c");
			}
		}
		if (event.keyCode == 38) {
			if (!element) {
				element = choices;
				console.log("a");
			}
			if (element != choices && element.previousSibling) {
				element.className = "";
				element = element.previousSibling;
				element.className = "task2-4-hover";
				console.log("c");
			}
		}
		if (event.keyCode == 13) {
			if (!element) {
				element = choices;
				console.log("a");
			} else {
				inputArea.value = element.innerHTML;
			}
		}
	}
}

enterClick();
showChoices(searchData);
hideChoices();
enterKey();


/*
1，写完函之后一定要调用啊！
2，事件覆盖，后者覆盖前者。
3，blur，mouseover，keydown等等常见事件要熟记。
4，事件代理不能返回值或者从里面获取值，因此尽量直接在事件里面搞定需要做的事情。
5，清除class直接把类名变成""，清除所有子元素直接子元素"",方便多了。
6，更改的话貌似用innerHTML和value有些许差异。
表单内控件的属性用value取输入值
对于DOM的元素，用innerHTML取其内部元素代码，也包括标签">(here)<"中间的文字。
*/