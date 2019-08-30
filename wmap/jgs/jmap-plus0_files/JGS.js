$(window).resize(function(){
	wh=$(window).height();
	$(".reslip,.pgiframe,#world-map").height(wh);
	if($(".lvimg")[0]){
		ph=$(".lvimg").height();
		$(".icon .iconfont").css("font-size",ph*0.2);
		$(".icon").css({"width":ph*0.5,"height":ph*0.5});
	}
});
$(window).trigger("resize");
// $(".icon").addClass("show");
$(".reslip").click(function(){
	$(".icon").removeClass("show");
	setTimeout('$(".total").removeAttr("style");$(".lvimg").remove();',400);
	
});
$(".icon").click(function(){
	// console.log(this.id);
	lvid=$(".lvimg")[0].id;
	pgto("./"+this.id+".php?t="+lvid);
});

ac=0;//welcome.html打开次数记录
pg.window.location.href='welcome.html';
function pgto(a){ //在子窗口调用时 parent.pgto(url);
	pg.window.location.href=a;
};
function pgwel(a)//初始化动画及返回控制
{
	switch(a)
	{
		case 0:  $(".pgiframe").hide(1500,"swing");break;
		case -1: $(".pgiframe").show();break;
		default: $(".pgiframe").hide();
	}
};