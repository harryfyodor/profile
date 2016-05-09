var timeBtn = document.getElementsByTagName("button")[0];
timeBtn.addEventListener("click",countTime);

function countTime() {
	var timeNow = Date.now();
	//获取用户定义的时间
	var timeYouSet = document.getElementsByTagName("textarea")[0];
	var timeYouDivide = new Array();
	timeYouDivide = timeYouSet.value.split("-");
	//把用户时间点转换成Date格式
	var timeSet = new Date();
	timeSet.setFullYear(timeYouDivide[0]);
	timeSet.setMonth(timeYouDivide[1]-1);
	timeSet.setDate(timeYouDivide[2]);
	timeSet.setHours(0);
	timeSet.setMinutes(0);
	timeSet.setSeconds(0);
	
	//要显示数字的位置
	var timeOutput = document.getElementsByClassName("task2-2-output-con")[0];
	var txt = "";
	
	//console.log(timeSet);

	//当用户设置时间大于此刻时间的时候开始计时，相减的diff是毫秒，转换成日时分秒
	if (timeNow < timeSet) {
		diff = timeSet - timeNow;
		var days = Math.floor(diff/(1000*60*60*24)),
			hours = Math.floor((diff - days*24*60*60*1000)/(1000*60*60)),
			minutes = Math.floor((diff - days*24*60*60*1000 - hours*60*60*1000)/(1000*60)),
			seconds = Math.floor((diff - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000)/1000);
		//此处用递归，每过一秒钟调用本身函数一次，跟新innerHTML
		setTimeout(countTime, 1000);
		//console.log(minutes);
		txt = "距离" + timeSet.getFullYear() + "年" + timeSet.getMonth() + "月" + timeSet.getDate() + "日还有" + days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
		timeOutput.innerHTML = txt;
	} else {
		txt = "请输入一个比此刻要晚的时间，按照YYYY-MM-DD的格式";
		timeOutput.innerHTML = txt;
	}
}
	
/*
学习总结
1，setTimeout有两种用法，超时和间歇，其中间歇使用递归函数，不断调用，可以用作计时
2，Date的方法，set，get时间的year，month等方法
3，时间点可以相减，减之后返回一个毫秒数，处理之后可以返回一个常用类型
*/