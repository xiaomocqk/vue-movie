//动画执行顺序
window.fadeInUpOrder = function (arr) {
	arr[0].addClass('fadeInUp').on('animationend', function() {
		// console.log(1)
		arr.splice(0, 1);
		if (arr.length === 0) return;
		fadeInUpOrder(arr);
	});
}