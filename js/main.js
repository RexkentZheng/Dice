//小球加速运动
$.extend(jQuery.easing, {
	easeIn: function(x, t, b, c, d) { 
		return c * (t /= d) * t + b;
	},
});

var x = '',
	choose = [],
	verticalLength = 100,
	rotateX = 180,
	time = 1000,
	ball = $('.ball');

//产生随机数，改善算法，是几率更加均衡
function getOnePart() {
	if(Math.floor(Math.random()*10) > 4) {
		x += 'R';
	} else {
		x += 'L';  	  
	}
}
//获取最终的人物标识
function getCharacter() {
	x = '';
	getOnePart();
	getOnePart();
}
//判断人物标识是否正确，不正确重新获取
function getRightCharacter() {
	getCharacter();
	if(choosen.indexOf(x) !== -1) {
		getRightCharacter();
	} else {
		return
	}
}
//小球向下运动
function goDown() {
	accelerate();
	$(".ball").animate({
		top: '+=' + verticalLength + 'px',
	}, time, 'easeIn');
	bounce();
}
//小球倾斜运动
function goLean() {
	decelerate();
	$(".ball").animate({
		top: '+=90px',
		left: '+=' + rotateX + 'px'
	}, time, 'easeIn');
}
//判断小球运动方向
function judegDri(dri) {
	if(dri === 'L') {
		rotateX = -rotateX;
		goLean();
		rotateX = -rotateX;
	} else {
		goLean();
	}
}
//减少加速运动时间
function accelerate() {
	time += -200;
}
//增加减速运动时间
function decelerate() {
	time += 100;
}
//弹跳时间
function bounce() {
	ball.addClass('animated bounce');
}
//清楚弹跳结果
function removeBounce() {
	ball.removeClass('animated bounce');
}
//重置变量与小球位置
function reset() {
	ball.css({
		'top': '20px',
		'left': '425px'
	});
	verticalLength = 100;
	rotateX = 180;
	time = 1000;
	removeBounce();
}
//小球滚动过程
function runBall() {
	var lastPosition = x.split('');
	reset();
	//第一次向下
	goDown();
	//第一次倾斜
	judegDri(lastPosition[0]);
	//第二次向下
	goDown();
	//第二次倾斜，若两次倾斜距离相同则部分点会相交，于是减短倾斜横向距离，
	rotateX += -70;
	judegDri(lastPosition[1]);
	//增加长度，第三次向下运动
	verticalLength += 45;
	goDown();
}
//获取选中的被选中的人
function getChoosen() {
	choosen = [];
	$.each($('input:checkbox:checked'), function() {
		choosen.push($(this).val())
	});
}
//执行小球运动全过程
function runProcess() {
	getChoosen();
	getRightCharacter();
	runBall();
}
//判断小球是否处于初始位置，不是就清除运动过程并且重置到初始位置
function startRun() {
	if(ball.offset().left !== 724 && ball.offset().top !== 42) {
		ball.stop(true);
		reset();
		runProcess();
	} else {
		runProcess();
	}
}
//绑定按钮事件
$('button').click(function() {
	startRun();
})
//绑定回车开始事件
$(document).keydown(function(event) {
	if(event.keyCode === 13) {
		startRun(); 
	}
})
