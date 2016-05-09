// 主要函数
/*
	要完成的几项任务
	1，完成$和eventutil的封装
	2，注意一点性能方面的优化
	3，注释漂亮点...
	4，改完之后开始适配手机端
*/

define(['selector', 'EventUtil'], function($, EventUtil){
	// 定义几个数组变量，用于存放数据以及初始化的字符串
	var cata,
	    docu,
	    task,
		cataExample,
		docuExample,
		taskExample;
	
	var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i);
	
	// 定义分类(cata),文件(docu),和任务(task)的模型。
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
	
	// 初始化
	function init() {
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
			+	'"content":"完成这个小任务0",'
			+	'"father":0,'
			+	'"finished":"false"'
			+'},'
			+'{'
			+	'"id":1,'
			+	'"name":"小任务1",'
			+	'"date":"2016-02-17",'
			+	'"content":"完成这个小任务1",'
			+	'"father":1,'
			+	'"finished":"false"'
			+'},'
			+'{'
			+	'"id":2,'
			+	'"name":"小任务2",'
			+	'"date":"2016-02-16",'
			+	'"content":"完成这个小任务2",'
			+	'"father":1,'
			+	'"finished":"false"'
			+'}'
		+']';
		
		location.href = '#cata';
		var oldHash = '#cata';
		
		// 给localStorage赋初值，初始化
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
		
		window.onhashchange = function() {
			var newHash = location.hash;
			var oldEle = $("." + oldHash.substr(1)),
				newEle = $("." + newHash.substr(1));
			console.log(oldEle);
			console.log(newEle);
			if (oldEle && newEle) {
				if ((oldEle.className == "cata" && newEle.className == "docu") || (oldEle.className == "docu" && newEle.className == "task")) {
					oldEle.style.display = "none";
					newEle.style.display = "block";
				} 
				else if ((oldEle.className == "docu" && newEle.className == "cata") || (oldEle.className == "task" && newEle.className == "docu")){
					oldEle.style.display = "none";
					newEle.style.display = "block";
				}
				oldHash = newHash;
			}
			
		}
	}
	
	function show() {
		var catasParent = $(".cata ul");
		var docContent = "",
			cataContent = "";
		
		// 显示第一栏
		cataContent = '<li class="c1">默认分类</li>';
		for (var i = 0, len = cata.length; i < len; i++) {
			for (var j = 0, len2 = docu.length; j < len2; j++) {
				if (docu[j].father == cata[i].id) {
					docContent = docContent + '<li class="c2" ' + 'id=' + '"b' + docu[j].id + '"' + '>' + docu[j].name + '（' + docu[j].child.length + '）' + '<a class="delete-c2">删</a>';
				}
			}
			docContent = '<ul>' + docContent + '</ul>';
			cataContent = cataContent + '<li class="c1" ' + 'id=' + '"a' + cata[i].id + '"' + '>' + cata[i].name + '<a class="delete-c1">删</a>' + docContent + '</li>';
			docContent = "";
		}
		catasParent.innerHTML = cataContent;
		
		// 点亮第一栏的docu
		light();
		
		// 新建文件
		newBuildDoc();
		
		// 新建任务
		newBuildTask();
		
		// 删除
		del();
		
		// 返回上一页
		if (isMobile) {
			returnLast();
		}
		
		//localStorage.clear();
	}
	
	// 新建文件
	function newBuildDoc() {
		var btnNewBuildDoc = $(".new-build-docu"),
		    btnNewBuildDocEnter = $(".new-build").getElementsByTagName("button")[0],
		    btnNewBuildDocQuit = $(".new-build").getElementsByTagName("button")[1],
		    inputDocName = $(".new-build").getElementsByTagName("input")[0],
		    inputCataName = $(".new-build").getElementsByTagName("input")[1],
		    anotherLayerCon = $(".new-build"),
		    anotherLayer = $(".new-build-background");
	
		EventUtil.addHandler(btnNewBuildDoc, "click", function() {
			anotherLayer.style.display = "block";
			anotherLayerCon.style.display = "block";
		});
	
		EventUtil.addHandler(btnNewBuildDocQuit, "click", function() {
			anotherLayer.style.display = "none";
			anotherLayerCon.style.display = "none";
		});
	
		EventUtil.addHandler(btnNewBuildDocEnter, "click", function() {
			var inputDocNameValue = inputDocName.value;
			var inputCataNameValue = inputCataName.value;
			var alreadyHaveCata = 0;
		
			if (inputCataNameValue == "" || inputDocNameValue == "") {
				alert("请填写名字或内容。");
			} else {
				
				// 检查大分类是否已经存在
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
		
				// 新建大分类
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
				inputDocName.value = "";
				inputCataName.value = "";
				anotherLayer.style.display = "none";
				anotherLayerCon.style.display = "none";
				show();	
			}
		});
	}
	
	// 新建任务
	function newBuildTask() {
		var dateEdit = $(".task-header-date input"),
			dateDisplay = $(".task-header-date").getElementsByTagName("p")[0],
			titleName = $(".task-header-name").getElementsByTagName("p")[0],
			titleEditLabel = $(".task-header-name").getElementsByTagName("label")[0],
			titleEdit = $(".task-header-name").getElementsByTagName("input")[0],
			contentDisplay = $(".task-content").getElementsByTagName("p")[0],
			contentEdit = $(".task-content").getElementsByTagName("textarea")[0],
			btnFinished = $("#finished"),
			btnEdit = $("#edit"),
			btnEditFinished = $("#edit-finished"),
			btnNewBuild = $("#edit-new-build"),
			btnNewBuildCancel = $("#edit-cancel"),
			btn = $(".new-build-task");
			
		// 点击了新建任务的按钮
		EventUtil.addHandler(btn, "click", function() {
			if ($(".c2-active")) {
				dateEdit.style.display = "inline-block";
				titleEditLabel.style.display = "inline-block";
				titleEdit.style.display = "inline-block";
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
			} else {
				alert("请选择一个文件。");
			}
			if (isMobile) {
				location.href = "#task";
			}
		});
			
		// 点击了日期框，里面出现今天的日期
		EventUtil.addHandler(dateEdit, "focus", function() {
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
		});
			
		// 点击了取消
		EventUtil.addHandler(btnNewBuildCancel, "click", function() {
			if ($(".d2-active")) {
				showTaskContent($(".d2-active").id);
			} else {
				// 显示的部件
				defaultSituation();
			}
			if (isMobile) {
				location.href = "#docu";
			}
		});
		
		// 点击了新建
		EventUtil.addHandler(btnNewBuild, "click", function() {
			//获取框中文字
			var inputDate = dateEdit.value,
				inputName = titleEdit.value,
				inputContent = contentEdit.value;
			//检查输入是否符合格式
			if(checkNewTask(inputDate ,inputName) && $(".c2-active")) {
				var taskDate = inputDate,
					taskName = inputName,
					taskContent = inputContent,
					taskId = task[task.length - 1].id + 1,
					taskFinished = "false",
					taskFather = $(".c2-active").id[1];
		
				var newTask = new taskModel(taskId, taskName, taskFather, taskDate, taskContent, taskFinished);
				task.push(newTask);
				console.log(newTask);
				docu[taskFather].child.push(taskId);
				dateEdit.value = "";
				titleEdit.value = "";
				contentEdit.value = "";
				save();
				showTasks();
				showTaskContent(taskId);
			}
		});
	}
	
	// 点亮第一栏的目录，其中会调用showTask()
	function light() {
		var docuNodes = $("*c2");
		
		//采用闭包来处理列表事件
		if (docuNodes) {
			for (var i = 0, len = docuNodes.length; i < len; i++) {
				docuNodes[i].onclick = (function(i){
					return function(){
						for (var j = 0, len2 = docuNodes.length; j < len2; j++) {
							docuNodes[j].className = "c2";
						}
						docuNodes[i].className = docuNodes[i].className + " c2-active";
						// 显示第二栏
						showTasks();
						// 防止出现异常情况
						if (!$(".d2-active")) {
							defaultSituation();
						}
						if (isMobile) {
							location.href = "#docu";
						}
					}
				})(i);
			}
		}	
	}
	
	// 显示第二栏
	function showTasks() {
		var docuNodes = $("c2"),
			taskDisplayArea = $(".docu").getElementsByTagName("ul")[1],
			taskContent = "", // 用于存放task的html代码字符串
			allTaskContent = "",
			isFinished = "",
			taskContainer = [],
			dateContainer = [];
		
		// 获取小任务列表
		if ($(".c2-active")) {
			for (var l = 0, len = task.length; l < len; l++) {
				if ($(".c2-active").id[1] == task[l].father) {
					taskContainer.push(task[l]);
				}
			}
		}
		console.log(taskContainer);

		// 获取时间列表
		if (taskContainer) {
			for (var i= 0, len = taskContainer.length; i < len; i++) {
				dateContainer.push(taskContainer[i].date);
			}
		}
		dateContainer = uniqArray(dateContainer);
		dateContainer.sort();
		
		// 显示第二栏
		allTaskContent = "";
		
		for (var j = 0, len4 = dateContainer.length; j < len4; j++) {
			taskContent = "";
			for (var m = 0, len5 = taskContainer.length; m < len5; m++) {
				isFinished = "（未完成）";
				if (taskContainer[m].date == dateContainer[j]) {
					if (taskContainer[m].finished === "true") {
						isFinished = "（完成）";
					}
					taskContent = taskContent + '<li class="d2" '+ 'id=' + '"' + taskContainer[m].id + '"' + '>' + taskContainer[m].name + isFinished + '<a class="delete-d2">删</a></li>';
				}
			}
			taskContent = '<ul>' + taskContent + '</ul>';
			allTaskContent = allTaskContent + '<li class="d1">'  + '<span>' + dateContainer[j] + '</span>' + taskContent + '</li>';
		}
		taskDisplayArea.innerHTML = allTaskContent;
		
		// 选择所有-完成-未完成
		chooseType();
		
		// 点亮task列表的task
		lightTasks();		
	}
	
	// 选择所有-完成-未完成
	function chooseType() {
		if ($(".d2")) {
			var tasks = $("*d2");
		}
		var ThreeBtns = $(".docu-header").getElementsByTagName("li");
		
		// 三个按钮功能的绑定
		if (tasks) {
			ThreeBtns[0].onclick = function() {
				for (var i = 0, len = tasks.length; i < len; i++) {
					tasks[i].style.display = "block";
				}
			}
		
			ThreeBtns[1].onclick = function() {
				for (var j = 0, len = tasks.length; j < len; j++) {
					for (var n = 0; n < task.length; n++) {
						if (tasks[j].id == task[n].id) {
							if (task[n].finished == "true") {
								tasks[j].style.display = "none";
							} else {
								tasks[j].style.display = "block";
							}
						}
					}
				}
			}
		
			ThreeBtns[2].onclick = function() {
				for (var k = 0, len = tasks.length; k < len; k++) {
					for (var m = 0; m < task.length; m++) {
						if (tasks[k].id == task[m].id) {
							if (task[m].finished == "true") {
								tasks[k].style.display = "block";
							} else {
								tasks[k].style.display = "none";
							}
						}
					}
				}
			}
		}
	}
	
	// 点亮第二栏
	function lightTasks() {
		var tasks = $("*d2");
		//闭包事件代理
		if (tasks) {
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
						if (isMobile) {
							location.href = "#task";
						}
					}
				})(i);
			}
		}
	}
	
	// 显示第三栏
	function showTaskContent(id) {
		var dateEdit = $(".task-header-date input"),
			dateDisplay = $(".task-header-date").getElementsByTagName("p")[0],
			titleName = $(".task-header-name").getElementsByTagName("p")[0],
			titleEditLabel = $(".task-header-name").getElementsByTagName("label")[0],
			titleEdit = $(".task-header-name").getElementsByTagName("input")[0],
			contentDisplay = $(".task-content").getElementsByTagName("p")[0],
			contentEdit = $(".task-content").getElementsByTagName("textarea")[0],
			btnFinished = $("#finished"),
			btnEdit = $("#edit"),
			btnEditFinished = $("#edit-finished"),
			btnNewBuild = $("#edit-new-build"),
			btnNewBuildCancel = $("#edit-cancel");
	
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
	
		var index;
		for (var i = 0; i < task.length; i++) {
			if (task[i].id == id) {
				index = i;
			}
		}
		id = index;
		
		dateDisplay.innerHTML = task[id].date;
		titleName.innerHTML = task[id].name;
		contentDisplay.innerHTML = task[id].content;	

		// 点击完成
		EventUtil.addHandler(btnFinished, "click", function() {
			if (task[id].finished != "true") {
				task[id].finished = "true";
				save();
				show();
				//showTasks();
				(document.getElementById(id).innerHTML).replace(/未/, "");
				//showTaskContent(id);
			}
		});
	
		// 点击编辑
		EventUtil.addHandler(btnEdit, "click", function() {	
			// 点击编辑时要显示内容
			if ($(".d2-active")) {
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
				
				contentEdit.value = task[$(".d2-active").id].content;
			}
		});
	
		// 点击编辑好了
		EventUtil.addHandler(btnEditFinished, "click", function() {
			if ($(".d2-active")) {
				task[$(".d2-active").id].content = contentEdit.value;
			}
			save();
			showTaskContent($(".d2-active").id);
		})
		
	}
	
	// 删除
	function del() {
		// 事件绑定
		var btnDeleteCate = document.getElementsByClassName("delete-c1");
		var btnDeleteDocu = document.getElementsByClassName("delete-c2");
		var btnDeleteTask = document.getElementsByClassName("delete-d2");
	
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
						defaultSituation();
						show();
					}
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
						defaultSituation();
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
		for (var j = docu.length - 1; j >= 0; j--) {
			if (task[j]) {
				if (docu[j].father == id) {
					docu.splice(j, 1);
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
		// 删除父表的child数组中的id
		if (docu[index]){
			cata[docu[index].father].child.splice(cata[docu[index].father].child.indexOf(id), 1);	
		}
		// 删除自身
		docu.splice(index, 1);
		// 删除所有的子表，注意删除的时候长度也在变化。
		for (var j = task.length - 1; j >= 0; j--) {
			if (task[j]) {
				if (task[j].father == id) {
					task.splice(j, 1);
				}	
			}
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
		// 把父表的child数组里出去id
		docu[task[index].father].child.splice(docu[task[index].father].child.indexOf(id), 1);
		// 删除task本身
		task.splice(index, 1);
		save();
	}
	
	function returnLast() {
		var btnTaskReturn = $(".task-btn-group button");
		var btnDocuReturn = $(".return-docu button");
		
		EventUtil.addHandler(btnDocuReturn, "click", function() {
			location.href = "#cata";
		});
		EventUtil.addHandler(btnTaskReturn, "click", function() {
			location.href = "#docu";
		});
	}
	//判断输入的时候日期和名称是否符合格式，要求日期按照yyyy-mm-dd，名字不为空。
	function checkNewTask(inputDate ,inputName) {
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
	
	// 去重操作			 
	function uniqArray(arr) {
		var new_array = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {
				new_array.push(arr[i]);
			}
		}
		return new_array;
	}
	
	// 默认情况
	function defaultSituation() {
		$(".task-header-date input").style.display = "none";
		$(".task-header-name").getElementsByTagName("label")[0].style.display = "none";
		$(".task-header-name").getElementsByTagName("input")[0].style.display = "none";
		$(".task-content").getElementsByTagName("textarea")[0].style.display = "none";
		$("#finished").style.display = "none";
		$("#edit").style.display = "none";
		$("#edit-finished").style.display = "none";
		$("#edit-new-build").style.display = "none";
		$("#edit-cancel").style.display = "none";
		
		$(".task-header-name").getElementsByTagName("p")[0].style.display = "block";
		$(".task-header-date").getElementsByTagName("p")[0].style.display = "inline-block";
		$(".task-content").getElementsByTagName("p")[0].style.display = "block";
		
		$(".task-header-name").getElementsByTagName("p")[0].innerHTML = "GTDTools";
		$(".task-header-date").getElementsByTagName("p")[0].innerHTML = "2016-02-27";
		$(".task-content").getElementsByTagName("p")[0].innerHTML = "欢饮使用GTDTool 2.0";
	}
	
	// 保存
	function save() {
		localStorage.cata = JSON.stringify(cata);
		localStorage.docu = JSON.stringify(docu);
		localStorage.task = JSON.stringify(task);
	}
	
	// 返回两个函数
	return {
		show: show,
		init: init
	};
});