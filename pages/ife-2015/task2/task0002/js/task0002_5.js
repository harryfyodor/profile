// 写于2/6~2/7
// 用于获取一个元素element的对浏览器窗口坐标。
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
// 主要函数，给每一个小方块添加事件onmousedown。循环遍历一个一个添加。
function drag() {
	var leftBoxes = document.getElementsByClassName("task2-5-left")[0].getElementsByTagName("div");
	var rightBoxes = document.getElementsByClassName("task2-5-right")[0].getElementsByTagName("div");
	for (var i=0, lenL=leftBoxes.length; i<lenL; i++) {
		leftBoxes[i].onmousedown = moveFun;
	}
	for (var j=0, lenR=rightBoxes.length; j<lenR; j++) {
		rightBoxes[j].onmousedown = moveFun;
	}
}
// onmousedown的触发函数。
function moveFun(e) {
	// 获取点击下去的那个方块的事件对象。
	e = event || window.event;
	var index = e.target.innerHTML;
	console.log(index);
	var leftBoxContainer = document.getElementsByClassName("task2-5-left")[0],
		rightBoxContainer = document.getElementsByClassName("task2-5-right")[0],
		targetParent = e.target.parentNode,
		indexOfTarget, // 获取点击下去的那个方块的数组编号。
		len=targetParent.childNodes.length, // 获取点击下去的那个方块的父元素（左盒子或者又盒子）。
	    leftX = getPosition(leftBoxContainer).x,  // 两个盒子相对窗口的位置。
	    leftY = getPosition(leftBoxContainer).y,
		rightX = getPosition(rightBoxContainer).x,
		rightY = getPosition(rightBoxContainer).y;
		e.target.style.zIndex = "9999"; //点击下去的时候显示在最外。
	
	// 每当拉走一个的时候，下面的就都往上跑。
	// 找到点击的元素的数组位置。
	for (var i=0; i<len; i++) {
		if (targetParent.childNodes[i] == e.target) {
			indexOfTarget = i;
		}
	}
    // 把点击的元素下面的所有元素向上移动。
	if (indexOfTarget != len-1) {
		for(var j=indexOfTarget+1; j<len; j++) {
			targetParent.childNodes[j].style.top = parseInt(targetParent.childNodes[j].style.top) - 40 + "px";
		}
	}
	
	// extra是点击点相对于该元素的位置坐标。previous是元素的原本的地方，如果不去其他地方的话，元素就会回到原位。
	var extraX = e.clientX - e.target.offsetLeft,
	    extraY = e.clientY - e.target.offsetTop,
		previousX = e.target.style.left,
		previousY = e.target.style.top;
	
	// 移动的事件
	document.onmousemove = function(event) {
		movingFun(event, extraX, extraY, index);
	}
	
	// 松手的事件
	document.onmouseup = function(event) {
		// 一松手，元素默认回到原位。
		var target = document.getElementById("task2-5-"+index);
		target.style.left = previousX;
		target.style.top = previousY;
		target.style.zIndex = "";
		document.onmousemove = null;
		document.onmouseup = null;
		
		// 一松手，元素发生的函数。
		operation(event,targetParent,target,index);
	}
}

// 移动时候的跟随效果实现。
function movingFun(event, extraX, extraY, index) {
	var target = document.getElementById("task2-5-"+index);
		l = event.clientX - extraX,
		t = event.clientY - extraY;
	target.style.left = l + "px";
	target.style.top = t + "px";
	target.style.zIndex = "9999";
}

// 松手时候触发的函数。
function operation(endEvent,beginTargetParent,beginTarget,beginIndex) {
	
	var leftBoxContainer = document.getElementsByClassName("task2-5-left")[0],
		rightBoxContainer = document.getElementsByClassName("task2-5-right")[0],
		indexOfTarget,//点击元素的数组位置。
		len=endEvent.target.parentNode.childNodes.length,
	    leftX = getPosition(leftBoxContainer).x, // 两个大盒子的位置。
	    leftY = getPosition(leftBoxContainer).y,
		rightX = getPosition(rightBoxContainer).x,
		rightY = getPosition(rightBoxContainer).y,
		//插入时左边的那些方块的总宽度。
		leftHeight = (beginTargetParent == leftBoxContainer) ? (leftBoxContainer.childNodes.length-1)*40 : leftBoxContainer.childNodes.length*40,
		rightHeight = (beginTargetParent == rightBoxContainer) ? (rightBoxContainer.childNodes.length-1)*40 : rightBoxContainer.childNodes.length*40;
	// 左边的box。
	if (parseInt(endEvent.clientX)>leftX 
		&& parseInt(endEvent.clientX)<leftX+150
		&& (parseInt(endEvent.clientY)-50)<(leftHeight)) {
		console.log(leftHeight);
		// 移除点击的那个元素。
		beginTargetParent.removeChild(beginTarget);
		// 要插入的节点的位置，值是显示它的数组index值。
		var insertIndex = Math.floor((parseInt(endEvent.clientY)-50)/40);
		console.log(insertIndex);
		// 新建一个节点，和之前的节点格式一致。
		var newNode = document.createElement("div");
		newNode.id = "task2-5-" + beginIndex;
		newNode.innerHTML = beginIndex;
		newNode.style.top = insertIndex*40 + "px";
		newNode.onmousedown = moveFun;
		// 从插入节点位置（insertIndex）开始，其他元素开始向下移动。
		len=leftBoxContainer.childNodes.length;
		for (var k=insertIndex; k<len; k++) {
			leftBoxContainer.childNodes[k].style.top = parseInt(leftBoxContainer.childNodes[k].style.top) + 40 + "px";
		}
		// 把新元素插入在insertIndex的元素之前，insertIndex以及其下面的元素向下移动。
		leftBoxContainer.insertBefore(newNode, leftBoxContainer.childNodes[insertIndex]);

	} else if (parseInt(endEvent.clientX)>leftX 
				&& parseInt(endEvent.clientX)<leftX+150
				&& parseInt(endEvent.clientY)<leftY+400
				&& parseInt(endEvent.clientY)>leftY) {
			// 这里的情况是在框中，但是不插入的情况。直接添加在末尾。
			beginTargetParent.removeChild(beginTarget);
			var newNode = document.createElement("div");
			newNode.id = "task2-5-" + beginIndex;
			newNode.innerHTML = beginIndex;
			newNode.style.top = (leftBoxContainer.childNodes.length)*40 + "px"; // 新建的节点top直接就写最后一个。
			newNode.onmousedown = moveFun;
			leftBoxContainer.appendChild(newNode);
		} 
		//右边的box。情况和左边是一样的，仅仅只是一些值的变换名称而已。
		else if (parseInt(endEvent.clientX)>rightX 
				&& parseInt(endEvent.clientX)<rightX+150
				&& (parseInt(endEvent.clientY)-50)<(rightHeight)) {
				beginTargetParent.removeChild(beginTarget);
				var insertIndex = Math.floor((parseInt(endEvent.clientY)-50)/40);
				//新建一个节点，和之前的节点格式一致。
				var newNode = document.createElement("div");
				newNode.id = "task2-5-" + beginIndex;
				newNode.innerHTML = beginIndex;
				newNode.style.top = insertIndex*40 + "px";
				newNode.onmousedown = moveFun;
				console.log(rightBoxContainer.innerHTML);
				len = rightBoxContainer.childNodes.length;
				for (var k=insertIndex; k<len; k++) {
					rightBoxContainer.childNodes[k].style.top = parseInt(rightBoxContainer.childNodes[k].style.top) + 40 + "px";
				}
				rightBoxContainer.insertBefore(newNode, rightBoxContainer.childNodes[insertIndex]);
			} else if (parseInt(endEvent.clientX)>rightX 
						&& parseInt(endEvent.clientX)<rightX+150
						&& parseInt(endEvent.clientY)<rightY+400
						&& parseInt(endEvent.clientY)>rightY) {
						beginTargetParent.removeChild(beginTarget);
						var newNode = document.createElement("div");
						newNode.id = "task2-5-" + beginIndex;
						newNode.innerHTML = beginIndex;
						newNode.style.top = (rightBoxContainer.childNodes.length)*40 + "px";
						newNode.onmousedown = moveFun;
						rightBoxContainer.appendChild(newNode);
			} else {
				// 如果不是上面的任何一种情况的话，就把最原本点击的那个元素下面的元素下移，让开位置，让它回家。
				for(var j=indexOfTarget+1; j<len; j++) {
				beginTargetParent.childNodes[j].style.top = parseInt(beginTargetParent.childNodes[j].style.top) + 40 + "px";
			}
		}
}

drag();

/*
1,格外注意event事件对象的嵌套，event永远是指给区域的那个事件对象。因此如果是事件的函数里面的事件，要用到上一个事件函数里的事件对象，就一定要用其他的方法，而不能直接用target。因为此时显示的target是当前事件函数的触发对象。为了区分清楚是开始的还是最后的event，在起名的时候一定要格外注意表明清楚，加上begin啊，或者加上什么end啊。
2，这里的移动参考了慕课网的教程，用mousedown获取到点击点相对于元素的位置，在用mousemove强制移动其位置，使得它位置正常。然后用style的top和left移动，使得元素产生拖动的效果。
3，这里用了一个递归获取匀速相对浏览器窗口的函数，可以看看。
4，要注意数值的传递，一个函数数值的用到另一个函数。
5，思路：
1）当点击了元素的时候，该元素以下的元素全部向上移动。此时也要获取该元素的一些信息。
2）当移动该元素的时候，该元素产生拖动的效果，参考慕课网的拖动方法。注意mousemove和mouseup产生对象是document，注意1的内容，就是event，事件对象的使用区域。
3）当松手了元素的时候，该元素会默认回到它原本的位置上。但是此时还要加一个operation的函数。
4）operation函数的作用就是判断鼠标此时的位置在哪里。当鼠标位置位于盒子的有方块的区域时，计算出插入的位置，然后先删除掉点击的那个元素，然后再新建一个和这个元素一模一样的元素，把插入的位置下面的方块全部下移，然后再将新建的方块插入进去。当鼠标位置位于盒子无方块区域的时候，就直接移除旧元素，新建新元素，添加到最后。当不是以上两种情况时，就把点击位置下面的元素全部向下移动，迎接回来的方块。
*/