/********************主框架***********************/
$(window).resize(function(){
	// wh=$(window).height();
	// $(".reslip,.pgiframe,#world-map").height(wh);
	ph=$(".total").height();
	$(".icon .iconfont").css("font-size",ph*0.2);
	$(".icon").css({"width":ph*0.5,"height":ph*0.5});
});
$(window).trigger("resize");
// $(".icon").addClass("ishow");
$(".reslip").click(function(){
	$(".tooltop").removeClass("show");
	$(".icon").removeClass("ishow");
	setTimeout('$(".total").removeAttr("style");$(".lvimg").remove();',400);
});
p=$(".pgiframe,.re_pg"),pl=$("#player")[0];
$(".icon").click(function(){
	// console.log(this.id);
	if(!$(this).hasClass('none')){
		// p.show();
		lvid=$(".lvimg")[0].id;
		pgto("./"+this.id+".html?t="+lvid);
	}
});
$(".re_pg").click(function repg(){//关闭页面
	// p.hide();
	if(hst==history.length){hst-=1};
	back=hst-history.length;
	history.go(hst-history.length);
});
pg.window.location.href='welcome.html';
hst=history.length;
function pgto(a){ //在子窗口调用时 parent.pgto(url);
	pg.window.location.href=a;
};
function pgwel(a)//返回控制
{
	if(a==-1){p.show();}
	else p.hide();
};
/********************高德地图***********************/
$(function() {
	map = new AMap.Map('container', {
		//mapStyle: 'amap://styles/whitesmoke',//样式URL
		resizeEnable: true,
		zoom:12,
		center: [114.11048,26.613565],
	}),
	toolBar = new AMap.ToolBar({
		liteStyle:true
	});
	map.addControl(toolBar);
		//lock js版本 首次开启appendChild有一定几率报错(已解决)
	var tool,ini=Array(4);
	for(i=0;i<ini.length;i++){
		ini[i]=document.createElement("div");
		ini[i].value="1";
	}
	// ini.forEach(function(e,n,o){
		// o[n]=document.createElement("div");
		// o[n].value="1";
		// });
	my_interval = setInterval(function () {//解决方法 定时器循环检测
		if (!tool) {
			tool=document.getElementsByClassName("amap-toolbar")[0];//控件未加载完毕时tool为undefined
		} else {
			clearInterval(my_interval);
			ini[3].className="amap-set";
			ini[3].innerHTML+='<div class="set_i"><i class="iconfont" onclick="S_set()"></i></div><div class="set_b"></div>';
			set=tool.appendChild(ini[3]);
			set.appendChild(sloc);
			$("#panel").click(function(){
				$(".amap-set").addClass("hov");
				$("#panel").fadeOut(1000);
				$(".tooltop").removeClass("show");
			});
			ini[0].className="amap-lock";
			ini[0].innerHTML='<i class="iconfont"></i>';
			var setb=set.childNodes[1];
			lock=setb.appendChild(ini[0]);
			lock.onclick = function(){
				if(lock.value == "0"){
					lock.value = "1";//locked
					lock.innerHTML='<i class="iconfont"></i>';
					setLimitBounds();
				}
				else{
					lock.value = "0";//unlock
					lock.innerHTML='<i class="iconfont"></i>';
					clearLimitBounds();
				}
			}
			ini[1].className="amap-eye";
			ini[1].innerHTML='<i class="iconfont"></i>';
			eye=setb.appendChild(ini[1]);
			eye.onclick = function(){
				if(eye.value == "0"){
					eye.value = "1";//eyeed
					eye.innerHTML='<i class="iconfont"></i>';
					$(".amap-labels").removeClass("show");
				}
				else{
					eye.value = "0";//uneye
					eye.innerHTML='<i class="iconfont"></i>';
					$(".amap-labels").addClass("show");
				}
			}
			ini[2].className="amap-play";
			ini[2].innerHTML='<i class="iconfont"></i>';
			play=setb.appendChild(ini[2]);
			play.onclick = function(){
				if(play.value == "0"){
					play.value = "1";
					play.innerHTML='<i class="iconfont"></i>';
					pl.muted=false;
				}
				else{
					play.value = "0";
					play.innerHTML='<i class="iconfont"></i>';
					pl.muted=true;
				}
			}
		}
	}, 500);
	//点设置
	setting={
		lvloc:{
		"cpmzdgj":0x1E,
		"bjl":0x1F,
		"dycdbdh":0x1E,
		"djmzgj":0x1E,
		"zbc":0x1F,
		"xjhjyy":0x1F,
		"hyjsk":0x1F,
		"lsly":0x1E},
		item:{
		0:"video",
		1:"photo",//1:"story",
		2:"handbk",
		3:"mascot",
		4:"audio"}
	}
	//点标记
	var markers = [{
		name:"茨坪毛泽东故居",
        id:"cpmzdgj",
		position: [114.168958,26.568962],
    }, {
		name:"八角楼",
        id:"bjl",
        position: [114.052003,26.662434]
    }, {
		name:"中共湘赣边界一大遗址",
        id:"dycdbdh",
        position: [114.052727,26.663]
    }, {
		name:"大井毛泽东朱德旧居",
        id:"djmzgj",
        position: [114.124229,26.56413]
    }, {
		name:"造币厂",
        id:"zbc",
        position: [114.130598,26.581585]
    }, {
		name:"小井红军医院",
        id:"xjhjyy",
        position: [114.141622,26.584558]
    }, {
		name:"黄洋界哨口",
        id:"hyjsk",
        position: [114.117064,26.622524]
    }, {
		name:"烈士陵园",
        id:"lsly",
        position: [114.165406,26.577117]
    }];
	var amakerhov=function (){
		$(".visited").removeClass("visited");//hover时移除其它visited类
	};
		
	var amakerclk=function (e){
		var id=e.target.F.id,name=e.target.F.name;
		amakerclks(id,name);
	}	
	var amakerclks=function (id,name){
			amakerhov();
			$("."+id).addClass("visited");
			$(".total").attr("style","z-index:151");
			$(".total").append("<div class='lvimg' id="+id+" style='background-image:url(./sview/"+id+".jpg)'><img class='opac' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='></div>");
			$(".icon").addClass("ishow");
			$(".tooltop").addClass("show");
			$(".intro").text(name);
			$(window).trigger("resize");
			//点设置apply
			for(var i=0,j=0x01;i<5;i++,j<<=1){
				if(j&setting.lvloc[id]){
					$("#"+setting.item[i]).removeClass("none");
				}else{
					$("#"+setting.item[i]).addClass("none");
				}
			};
	};	
	sloc=document.createElement("div");
	sloc.className="set_l";
	markers.forEach(function(marker){
		var mpos=[marker.position[0], marker.position[1]],mid=marker.id,mname=marker.name;
        var amaker=new AMap.Marker({
            map: map,
            position: mpos,
			id:mid,
			name:mname,
			content: '<div class="lvloc '+mid+'" data-attr="'+mname+'"><i class="iconfont" ></i></div>',   //自定义点标记覆盖物内容
			offset:new AMap.Pixel(-8, -16)
        });
		amaker.on('click',amakerclk);
		amaker.on('mouseover',amakerhov);
		var p=document.createElement("p");
		p.innerHTML=mname;
		p.onclick=function(){
			amakerclks(mid,mname);
			map.panTo(mpos);
			S_set();
		}
		sloc.appendChild(p);
    });
	map.setFitView();
	mapBound=map.getBounds();
	map.setLimitBounds(mapBound);
});
function setLimitBounds() {
	map.setLimitBounds(mapBound);
}
function clearLimitBounds() {
	map.clearLimitBounds();
}
function S_set(){
	if(set.value == "0"){
		set.value = "1";
		$(".amap-set").addClass("hov");
	}
	else{
		set.value = "0";
		$(".amap-set").removeClass("hov");
	}
}
function S_play(e){
	if(e){pl.play();}
	else pl.pause();
}