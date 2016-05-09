/*
*	返回兴趣列表 2/2
*/
var btn = document.getElementsByClassName("task2-1-btn")[0];
btn.addEventListener("click", interest)

function interest() {
	//把得到的字符串处理好，切割好放到数组里面
	var input = document.getElementsByTagName("textarea")[0];
	var inputCon = input.value;
	console.log(inputCon);
	if (inputCon) {
		inputCon = trim(inputCon);
		var inputInterests = new Array();
		inputInterests = inputCon.replace(/,+|;+|\s+|\uff0c+|\u0020+|\u3001+|\uff1b+|\r+/g,".").split(".");
	} else {
		inputCon="";
	}
	//判断是否可以生成李彪，并作出相应的操作
	var txt="", 
		output = document.getElementsByClassName("task2-1-output")[0], 
		outputCheckbox = document.getElementsByClassName("task2-1-output-container")[0];
	if (!inputInterests || inputInterests == "undefined") {
		txt = "<span style='color:red'>请正确输入</span>";
		output.innerHTML = txt;
	} else if (inputInterests.length >= 10){
		txt = "请正确输入";
		output.innerHTML = txt;
	} else {
		output.innerHTML = "";
		//循环里面生成相应兴趣的checkbox和label
		for (var i=0, len=inputInterests.length; i<len; i++) {
			var element = document.createElement("input");
			element.type = "checkbox";
			var elementText = document.createElement("label");
			elementText.style.display = "inline-block";
			var elementTextCon = document.createTextNode(inputInterests[i]);
			elementText.appendChild(elementTextCon);
			outputCheckbox.appendChild(element);
			outputCheckbox.appendChild(elementText);
		}
	}
}
/*
学习笔记
1，addEventListener后面的函数不用加空格
2，获取textarea的内容可以直接用value
3，return正则表达式和return数组是不一样的！就是说exec和replacereturn的是不一样的
4，Unicode字符，中文的字符，全角和半角的差别
5，修改innerHTML的时候，若要加颜色则"<span style='color:red'>请正确输入</span>";
6，注意一个元素的存在与否，要经过检验
7，checkbox和label搭配呀
*/