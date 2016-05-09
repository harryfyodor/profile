// 写于2016-2-23
/*
大目录id名 a+数字
中目录id名 b+数字
小目录id名 数字
*/
var cata;
var docu;
var task;

var cataExample = '['
	+'{'
	+	'"id":0,'
	+	'"name":"大任务",'
	+	'"child":[0,1]'	
	+'}'
+']';

var docuExample = '['
	+'{'
	+	'"id":0,'
	+	'"name":"中任务0",'
	+	'"child":[0],'
	+	'"father":0'
	+'},'
	+'{'
	+	'"id":1,'
	+	'"name":"中任务1",'
	+	'"child":[1,2],'
	+	'"father":0'
	+'}'
+']';

var taskExample = '['
	+'{'
	+	'"id":0,'
	+	'"name":"小任务0",'
	+	'"date":"2016-02-17",'
	+	'"content":"完成这个小任务",'
	+	'"father":0,'
	+	'"finished":"false"'
	+'},'
	+'{'
	+	'"id":1,'
	+	'"name":"小任务1",'
	+	'"date":"2016-02-17",'
	+	'"content":"完成这个小任务",'
	+	'"father":1,'
	+	'"finished":"false"'
	+'},'
	+'{'
	+	'"id":2,'
	+	'"name":"小任务2",'
	+	'"date":"2016-02-16",'
	+	'"content":"完成这个小任务",'
	+	'"father":1,'
	+	'"finished":"false"'
	+'}'
+']';

function cataModel(id, name, child) {
	this.id = id;
	this.name = name;
	this.child = child;
}

function docuModel(id, name, child, father) {
	this.id = id;
	this.name = name;
	this.child = child;
	this.father = father;
}

function taskModel(id, name, father, date, content, finished) {
	this.id = id;
	this.name = name;
	this.father = father;
	this.date = date;
	this.content = content;
	this.finished = finished;
}

function show() {
	var catasParent = document.getElementsByClassName("c3")[0].parentNode;
	var tasksParent = document.getElementById("docu").getElementsByTagName("ul")[1];
	var catas = document.getElementsByClassName("c3");
	var docuNodes = document.getElementsByClassName("c2");
	var docContent = "";
	//var taskContainer = [];
	
	//显示第一栏
	catasParent.innerHTML = '<li class="c3">默认分类</li>'; 
	for (var i = 0, len = cata.length; i < len; i++) {
		for (var j = 0, len2 = docu.length; j < len2; j++) {
			if (docu[j].father == cata[i].id) {
				docContent = docContent + '<li class="c2" ' + 'id=' + '"b' + docu[j].id + '"' + '>' + docu[j].name + '（' + docu[j].child.length + '）' + '<a class="delete-c2">删</a>';
			}
		}
		docContent = '<ul>' + docContent + '</ul>';
		catasParent.innerHTML = catasParent.innerHTML + '<li class="c3" ' + 'id=' + '"a' + cata[i].id + '"' + '>' + cata[i].name + '<a class="delete-c3">删</a>' + docContent + '</li>';
		docContent = "";
	}
	
	//点亮doc——doc里面点亮task——内容框显示task
	light();
	
	//新建文件
	newBuildDoc();
	
	//新建任务
	newBuildTask();
	
	//删除
	del();
	
	console.log(tasksParent.innerHTML);
	
	console.log(catasParent.innerHTML);
}

//新建cata
function newBuildDoc() {
	var btnNewBuildDoc = document.getElementById("docu-new");
	var btnNewBuildDocQuit = document.getElementById("input-cata").getElementsByTagName("button")[1];
	var btnNewBuildDocEnter = document.getElementById("input-cata").getElementsByTagName("button")[0];
	var inputDocName = document.getElementById("input-cata").getElementsByTagName("input")[0];
	var inputCataName = document.getElementById("input-cata").getElementsByTagName("input")[1];
	var anotherLayer = document.getElementById("all-container-2");
	
	btnNewBuildDoc.onclick = function() {
		anotherLayer.style.display = "block";
	}
	
	btnNewBuildDocQuit.onclick = function() {
		anotherLayer.style.display = "none";
	}
	
	btnNewBuildDocEnter.onclick = function() {
		var inputDocNameValue = inputDocName.value;
		var inputCataNameValue = inputCataName.value;
		var alreadyHaveCata = 0;
		
		for (var i = 0, len = cata.length; i < len; i++) {
			if (cata[i].name == inputCataNameValue) {
				var docId = docu[docu.length - 1].id + 1,
					docName = inputDocNameValue,
					docFather = cata[i].id,
					docChild = [];
				var newDoc = new docuModel(docId, docName, docChild, docFather);
				docu.push(newDoc);
				alreadyHaveCata = 1;
			}
		}
		
		if (alreadyHaveCata == 0) {
			var cataId = cata[cata.length - 1].id + 1,
				cataName = inputCataNameValue,
				cataChild = [];
			var docId = docu[docu.length - 1].id + 1,
				docName = inputDocNameValue,
				docFather = cataId,
				docChild = [];
			cataChild.push(docId);
			var newCata = new cataModel(cataId, cataName, cataChild),
				newDoc = new docuModel(docId, docName, docChild, docFather);
			cata.push(newCata);
			docu.push(newDoc);
		}
		
		save();
		anotherLayer.style.display = "none";
		show();
	}
	
}

//新建任务
function newBuildTask() {
	var tasks = document.getElementsByClassName("d2"),
		btn = document.getElementById("task-new"),
		dateEdit = document.getElementById("main-date-edit"),
		dateDisplay = document.getElementById("main-date").getElementsByTagName("p")[0],
		titleName = document.getElementById("main-task-name"),
		titleEditLabel = document.getElementById("main-heading-title-label"),
		titleEdit = document.getElementById("main-heading-edit"),
		contentDisplay = document.getElementById("main-task-content").getElementsByTagName("p")[0],
		contentEdit = document.getElementById("main-task-content").getElementsByTagName("textarea")[0],
		btnFinished = document.getElementById("main-finished"),
		btnEdit = document.getElementById("main-edit"),
		btnEditFinished = document.getElementById("main-edit-finished"),
		btnNewBuild = document.getElementById("main-edit-new-build"),
		btnNewBuildCancel = document.getElementById("main-edit-new-build-cancel"),
		docuNodes = document.getElementsByClassName("c2"); 
	
	btn.onclick = function() {
		//点击新建文件的大按钮后
		//有选中才允许新建
		var hasDocActive = 0;
		for (var i = 0, len = docuNodes.length; i < len; i++) {
			if (/c2-active/.test(docuNodes[i].className)) {
				hasDocActive = 1;
			}
		}
		if (hasDocActive == 1) {
			dateEdit.style.display = "block";
			titleEditLabel.style.display = "block";
			titleEdit.style.display = "block";
			contentEdit.style.display = "block";
			btnNewBuild.style.display = "block";
			btnNewBuildCancel.style.display = "block";
			//隐藏的部件
			dateDisplay.style.display = "none";
			titleName.style.display = "none";
			contentDisplay.style.display = "none";
			btnFinished.style.display = "none";
			btnEdit.style.display = "none";
			btnEditFinished.style.display = "none";
			
			dateEdit.value = "按照yyyy-mm-dd输入日期";
			titleEdit.value = "";
			contentEdit.value = "";	
			hasDocActive = 0;
		}
	}
	
	dateEdit.onfocus = function() {
		var nowTime = new Date(),
			monString,
			dateString;
		if ((parseInt(nowTime.getMonth())+1) < 10) {
			monString = "0" + (parseInt(nowTime.getMonth())+1);
		} else {
			monString = (parseInt(nowTime.getMonth())+1);
		}
		if (parseInt(nowTime.getDate()) < 10) {
			dateString = "0" + parseInt(nowTime.getDate());
		} else {
			dateString = parseInt(nowTime.getDate());
		}
		dateEdit.value = nowTime.getFullYear() + "-" + monString + "-" + dateString;
	}
	//点击“取消”后
	btnNewBuildCancel.onclick = function() {
		var index;
		for (var i = 0, len = tasks.length; i < len; i++) {
			if (/d2-active/.test(tasks[i].className)) {
				index = tasks[i].id;
				break;
			}
		}
		showTaskContent(index);
	}
	
	//点击“确定”后
	btnNewBuild.onclick = function() {
		//获取框中文字
		var inputDate = dateEdit.value,
			inputName = titleEdit.value,
			inputContent = contentEdit.value;
		
		//检查输入是否符合格式
		if(checkNewTask(inputDate ,inputName)) {
			var taskDate = inputDate,
			taskName = inputName,
			taskContent = inputContent,
			taskId = task[task.length - 1].id + 1,
			taskFinished = "false",
			taskFather;
		
			for (var j = 0, len2 = docuNodes.length; j < len2; j++) {
				if (/c2-active/.test(docuNodes[j].className)) {
					taskFather = docuNodes[j].id[1];
					break;
				}
			}
		
			var newTask = new taskModel(taskId, taskName, taskFather, taskDate, taskContent, taskFinished);
			console.log(newTask);
			task.push(newTask);
			docu[taskFather].child.push(taskId);
			save();
			showTasks();
			
			for (var k = 0, len3 = tasks.length; k < len3; k++) {
				tasks[k].className = "d2";
			}
			//把id为taskId的类的className加上一个" d2-active"
			for (var l = 0, len4 = tasks.length; l < len4; l++) {
				if (tasks[l].id == taskId) {
					tasks[l].className = tasks[l].className + " d2-active";
				}
			}
			showTaskContent(taskId);
		}

		
	}
}

//点击时的点亮
function light() {
	var catasParent = document.getElementsByClassName("c3")[0].parentNode;
	var docuNodes = document.getElementsByClassName("c2"); 
	
	/*
	$.delegate(catasParent, "li", "click", function(event){
		
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		
		if (/c2/.test(target.className)) {
			target.className = target.className + " c2-active";
			for (var i = 0, len = docuNodes.length; i < len; i++) {
				docuNodes[i].className = "c2";
			}
			target.className = target.className + " c2-active";
			console.log(target.id);
		}
		console.log("hi");	
	})*/
	
	//采用闭包来处理列表事件
	for (var i = 0, len = docuNodes.length; i < len; i++) {
		console.log(i);
		docuNodes[i].onclick = (function(i){
			return function(){
				for (var j = 0, len2 = docuNodes.length; j < len2; j++) {
					docuNodes[j].className = "c2";
				}
				docuNodes[i].className = docuNodes[i].className + " c2-active";
				//显示第二栏
				showTasks();
			}
		})(i);
	}
}

//显示出第二栏的函数
function showTasks() {
	var docuNodes = document.getElementsByClassName("c2");
	var taskDisplayArea = document.getElementById("docu").getElementsByTagName("ul")[1]; 
	var taskContent = ""; // 用于存放task的html代码字符串
	var taskContainer = [];
	var dateContainer = [];
	var isFinished = "";
	
	//找到father值等于点亮的c2的id的所有小任务
	if (docuNodes) { 
		for (var k = 0, len = docuNodes.length; k < len; k++) {
			//找到active的c2
			if (/c2-active/.test(docuNodes[k].className)) {
				for (var l = 0, len2 = task.length; l < len2; l++) {
					if (docuNodes[k].id[1] == task[l].father) {
						taskContainer.push(task[l]);
					}
				}
			}
		}	
	}
	
	console.log(taskContainer);
	
	//把日期放到一个数组里面
	if (taskContainer) {
		for (var i= 0, len3 = taskContainer.length; i < len3; i++) {
			dateContainer.push(taskContainer[i].date);
		}
	}
	
	//对日期进行去重操作
	dateContainer = uniqArray(dateContainer);
	console.log(dateContainer);
	dateContainer.sort();
	//显示
	taskDisplayArea.innerHTML = "";
	for (var j = 0, len4 = dateContainer.length; j < len4; j++) {
		taskContent = "";
		isFinished = "（未完成）";
		for (var m = 0, len5 = taskContainer.length; m < len5; m++) {
			isFinished = "（未完成）";
			if (taskContainer[m].date == dateContainer[j]) {
				if (taskContainer[m].finished === "true") {
					isFinished = "（完成）";
				}
				taskContent = taskContent + '<li class="d2" '+ 'id=' + '"' + taskContainer[m].id + '"' + '>' + taskContainer[m].name + isFinished + '<a class="delete-d">删</a></li>';
			}
		}
		taskContent = '<ul>' + taskContent + '</ul>';
		taskDisplayArea.innerHTML = taskDisplayArea.innerHTML + '<li class="d1">'  + dateContainer[j] + taskContent + '</li>';
	}
	console.log(taskDisplayArea.innerHTML);
	
	// 选择所有-完成-未完成
	chooseType();
	
	// 点亮task列表的task
	lightTasks();
}

function chooseType() {
	var tasks = document.getElementsByClassName("d2");
	var ThreeBtns = document.getElementById("docu-heading").getElementsByTagName("li");
	if (tasks) {
		ThreeBtns[0].onclick = function() {
			for (var i = 0, len = tasks.length; i < len; i++) {
				tasks[i].style.display = "block";
			}
		}
		
		ThreeBtns[1].onclick = function() {
			for (var j = 0, len = tasks.length; j < len; j++) {
				if (task[tasks[j].id].finished == "true") {
					tasks[j].style.display = "none";
				} else {
					tasks[j].style.display = "block";
				}
			}
		}
		
		ThreeBtns[2].onclick = function() {
			for (var k = 0, len = tasks.length; k < len; k++) {
				if (task[tasks[k].id].finished != "true") {
					tasks[k].style.display = "none";
				} else {
					tasks[k].style.display = "block";
				}
			}
		}
	}
}

//点亮task
function lightTasks() {
	var tasks = document.getElementsByClassName("d2");
	//闭包事件代理
	console.log(tasks);
	for (var i = 0, len = tasks.length; i < len; i++) {
		tasks[i].onclick = (function(i) {
			return function() {
				for (var j = 0, len2 = tasks.length; j < len; j++) {
					tasks[j].className = "d2";
				}
				tasks[i].className = tasks[i].className + " d2-active";
				showTaskContent(tasks[i].id);
				// 重新绑定
				del();
			}
		})(i);
	}
}

//显示第三栏
function showTaskContent(id) {
	var dateEdit = document.getElementById("main-date-edit"),
		dateDisplay = document.getElementById("main-date").getElementsByTagName("p")[0],
		titleName = document.getElementById("main-task-name"),
		titleEditLabel = document.getElementById("main-heading-title-label"),
		titleEdit = document.getElementById("main-heading-edit"),
		contentDisplay = document.getElementById("main-task-content").getElementsByTagName("p")[0],
		contentEdit = document.getElementById("main-task-content").getElementsByTagName("textarea")[0],
		btnFinished = document.getElementById("main-finished"),
		btnEdit = document.getElementById("main-edit"),
		btnEditFinished = document.getElementById("main-edit-finished"),
		btnNewBuild = document.getElementById("main-edit-new-build"),
		btnNewBuildCancel = document.getElementById("main-edit-new-build-cancel");
	var tasks = document.getElementsByClassName("d2");
	
	//不显示出来
	dateEdit.style.display = "none";
	titleEditLabel.style.display = "none";
	titleEdit.style.display = "none";
	contentEdit.style.display = "none";
	btnEditFinished.style.display = "none";
	btnNewBuild.style.display = "none";
	btnNewBuildCancel.style.display = "none";
	
	//显示出来
	dateDisplay.style.display = "inline";
	titleName.style.display = "block";
	contentDisplay.style.display = "block";
	btnFinished.style.display = "block";
	btnEdit.style.display = "block";
	
	//for (var i = 0, len = task.length; i < len; i++){
	//	if (task[i].id == id) {
			dateDisplay.innerHTML = task[id].date;
			titleName.innerHTML = task[id].name;
			contentDisplay.innerHTML = task[id].content;	
	//	}
	//}	
	
	//完成功能
	btnFinished.onclick = function() {
		if (task[id].finished != "true") {
			task[id].finished = "true";
			save();
			show();
			//showTasks();
			(document.getElementById(id).innerHTML).replace(/未/, "");
			console.log(document.getElementById(id).innerHTML);
			showTaskContent(id);
		}
	}
	
	btnEdit.onclick = function() {
		contentEdit.style.display = "block";
		dateDisplay.style.display = "inline";
		titleName.style.display = "block";
		btnEditFinished.style.display = "block";
		
		dateEdit.style.display = "none";
		titleEditLabel.style.display = "none";
		titleEdit.style.display = "none";
		btnNewBuild.style.display = "none";
		btnNewBuildCancel.style.display = "none";
		btnFinished.style.display = "none";
		btnEdit.style.display = "none";
		contentDisplay.style.display = "none";
		
		// 点击编辑时要显示内容
		for (var i = 0, len = tasks.length; i < len; i++) {
			if (/d2-active/.test(tasks[i].className)) {
				index = tasks[i].id;
			}
		}
		contentEdit.value = task[index].content;
	}
	
	btnEditFinished.onclick = function() {
		var index;
		//恢复原样
		for (var i = 0, len = tasks.length; i < len; i++) {
			if (/d2-active/.test(tasks[i].className)) {
				index = tasks[i].id;
			}
		}
		task[index].content = contentEdit.value;
		contentEdit.value = "";
		save();
		showTaskContent(index);
	}
}

function del() {
	// 事件绑定
	var btnDeleteCate = document.getElementsByClassName("delete-c3");
	var btnDeleteDocu = document.getElementsByClassName("delete-c2");
	var btnDeleteTask = document.getElementsByClassName("delete-d");
	
	for (var i = 0, len = btnDeleteCate.length; i < len; i++) {
		btnDeleteCate[i].onclick = (function(i){
			return function(event) {
				EventUtil.stopPropagation(EventUtil.getEvent(event));
				if (confirm("你要删除这个分类吗？")) {
					delCata(btnDeleteCate[i].parentNode.id[1]);
				}
				show();
			}
		})(i);
	}
	
	for (var j = 0, len2 = btnDeleteDocu.length; j < len2; j++) {
		btnDeleteDocu[j].onclick = (function(j){
			return function(event) {
				EventUtil.stopPropagation(EventUtil.getEvent(event));
				if (confirm('你要删除这个文件吗？')) {
					var docusNode = document.getElementsByClassName("c2");
					delDoc(btnDeleteDocu[j].parentNode.id[1]);
					if (docusNode[0]) {
						docusNode[0].className = docusNode[0].className + " c2-active";
					}
					show();
				}
				//console.log(btnDeleteDocu[j].parentNode.id);
			}
		})(j);
	}
	
	for (var k = 0, len3 = btnDeleteTask.length; k < len3; k++) {
		btnDeleteTask[k].onclick = (function(k){
			return function(event) {
				EventUtil.stopPropagation(EventUtil.getEvent(event));
				if (confirm('你要删除这个任务吗？')) {
					var tasksNode = document.getElementsByClassName("d2");
					console.log(btnDeleteTask[k].parentNode.id);
					delTask(btnDeleteTask[k].parentNode.id);
					showTasks();
					if (tasksNode[0]) {
						tasksNode[0].className = tasksNode[0].className + " d2-active";
						showTaskContent(tasksNode[0].id);
					}
				}
			}
		})(k);
	}
}

function delCata(id) {
	var index;
	for (var i = 0, len = cata.length; i < len; i++) {
		if (id == cata[i].id) {
			index = i;
		}
	}
	// 利用delDoc删除对应doc和对应task
	for (var j = 0, len = docu.length; j < len; j++) {
		// len会变化
		if (docu[j]) {
			if (docu[j].father == id) {
			delDoc(docu[j].id);
		}	
		}
	}
	// 删除自身
	cata.splice(index ,1);
	save();
}

function delDoc(id) {
	var index;
	for (var i = 0, len = docu.length; i < len; i++) {
		if (id == docu[i].id) {
			index = i;
		}
	}
	// 删除自身
	docu.splice(index, 1);
	// 删除所有的子表
	for (var j = 0, len2 = task.length; j < len2; j++) {
		if (task[j]) {
			if (task[j].father == id) {
				task.splice(j, 1);
			}	
		}
	}
	// 删除父表的child数组中的id
	if (docu[index]){
		cata[docu[index].father].child.splice(cata[docu[index].father].child.indexOf(id), 1);	
	}
	save();
}

function delTask(id) {
	var index;
	// 循环确定以id为传入值的task的位置
	for (var i = 0, len = task.length; i <len; i++) {
		if (id == task[i].id) {
			index = i;
		}
	}
	// 删除task本身
	task.splice(index, 1);
	// 把父表的child数组里出去id
	docu[task[index].father].child.splice(docu[task[index].father].child.indexOf(id), 1);
	save();
}

//判断输入的时候日期和名称是否符合格式。
function checkNewTask(inputDate ,inputName) { //inputDate ,inputName
	var timeNow = new Date();
	var nowYear = timeNow.getFullYear(),
		nowMon = timeNow.getMonth(),
		nowDay = timeNow.getDate();
	
	if (inputDate && inputName){
		if (/(\d{4})-(\d{2})-(\d{2})/.test(inputDate)) {
			if (RegExp["$2"] > 12 || RegExp["$3"] > 31) {
				alert("请输入一个正确的日期。");
			} else if (RegExp["$1"] < nowYear || (RegExp["$2"] < nowMon && RegExp["$1"] == nowYear) || ((RegExp["$1"] == nowYear) && (RegExp["$2"] == nowMon) && (RegExp["$3"] < nowDay))) {
				alert("请输入一个还没过去的时间。");
			} else if (/\S+/.test(inputName) && inputName != ""){
				return true;
			} else {
				alert("名字不能为空。");
			}
		} else {
			alert("请按照正确格式 “yyyy-mm-dd” 输入 。");
		}
	} else {
		return false;
	}
	
	return false;
}

//去重操作			 
function uniqArray(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        }
    }
    return new_array;
}
		
function save() {
	localStorage.cata = JSON.stringify(cata);
	localStorage.docu = JSON.stringify(docu);
	localStorage.task = JSON.stringify(task);
}

window.onload = function() {
	if (!localStorage.cata) {
		localStorage.cata = cataExample;
		localStorage.docu = docuExample;
		localStorage.task = taskExample;
	}
	cata = JSON.parse(localStorage.cata);
	docu = JSON.parse(localStorage.docu);
	task = JSON.parse(localStorage.task);
	console.log(cata);
	console.log(docu);
	console.log(task);
	show();
	checkNewTask();
}

//localStorage.clear();