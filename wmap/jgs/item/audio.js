var p=gEid("player"),b=gEid("ap-ctr_b");
var finalX,oLeft,v,Qo;	
p_play();
player_ini();
/*ajax获取信息*/
parent.$.ajax({
	url: "./sview/audio/audio.json",
	dataType:"json",
	success: function(m){
		Qo=m;//储存json对象
		var Qs=GetQueryString("t");//t参数
		for(var n in m){
			crt_dir(m,n);
			if(Qs==m[n].dir){
				dl_clk(n,0,1);
				//模拟点击
			};
		}

	},
	error: function(m){
		alert("网络异常，获取失败！");
		console.log(m);
	}
});

function player_ini(){
	gEid("ap-play").onclick=function(){
		S_play(p.paused);
	};
	gEid("ap-mode").onclick=function(){
		if(this.className=="mode-o"){
			sA(p,"data-m",0);
			this.className="mode-c";//目录内循环
		}else {
			sA(p,"data-m",1);
			this.className="mode-o";//列表内循环
		};
	};
	p.onloadedmetadata=function(){
		gEid("ap-dur_t").innerHTML=secondToMin(p.duration);
		S_play(1);
	};
	p.onprogress=function(){
		S_tbar("load",p.buffered.end(0));
	};
	p.onended=function(){
			var dl=dir_list(gEcls('onlst')[0]),d=dl[0],l=dl[1];
			l=l*1+1;//l*1+1 避免错认为字符串
			console.log("d:"+d+"l:"+l);
			if(Qo[d].list[l]){dl_clk(d,l,0);}
			else if(gA(p,"data-m")==1){
				d=d*1+1;
				d=Qo[d]?d:0;
				dl_clk(d,0,1);
			}else dl_clk(d,0,0);
	};
	b.addEventListener('touchstart',b_start,false);
	b.addEventListener('mousedown',b_start,false);
}
function b_start(){
	//e.type: touchstart / mousedown
	var e= event || window.event;
	addClass(gEcls("ap-thumb")[0],"tub_show");
	oLeft=gEcls("ap-tbar")[0].offsetLeft;
	finalX=((e.type=="touchstart"?e.touches[0].clientX:e.clientX)-oLeft)/ b.clientWidth;
	S_Ival(0);
	S_cur(finalX * p.duration);
	var s=(e.type=='touchstart'?['touchmove','touchend']:['mousemove','mouseup']);
	document.addEventListener(s[0],b_move,false);
	document.addEventListener(s[1],b_end,false);
}
function b_move(){
	var e= event || window.event,
	X=((e.type=="touchmove"?e.touches[0].clientX:e.clientX)-oLeft)/ b.clientWidth;
	finalX=X>=0?(X<=1?X:1):0;
	S_cur(finalX * p.duration);
}
function b_end(){
	//e.type: touchend / mouseup
	var e= event || window.event,
	pd=p.duration,
	is_t=(e.type=="touchend"),
	s=is_t?'touchmove':'mousemove';
	document.removeEventListener(s,b_move,false);
	document.removeEventListener(e.type,b_end,false);
	var X=((is_t?e.changedTouches[0].clientX:e.clientX)-oLeft)/ b.clientWidth;
	finalX=X>=0?(X<=1?X:1):0;
	S_cur(finalX * pd);
	p.currentTime=finalX * (pd || 0);//non-finite error
	S_Ival(250);
	removeClass(gEcls("ap-thumb")[0],"tub_show");
}
function S_play(i){
	var o=gEid("ap-pic"),e=gEid("ap-play");
	if(i==1){
		S_Ival(250);
		p.play();
		addClass(o,"rot");
		e.className="onplay";
	}else {
		p.pause();
		removeClass(o,"rot");
		e.className="pause";
		S_Ival(0);
	};
}
function S_Ival(s){
	//当前播放时间和进度条 s 更新速度 
	if(v)clearInterval(v);
	if(s>0){
		v=setInterval(function (){
			S_cur(p.currentTime);
		}, s);
	}
}
function S_cur(t){
	S_tbar("cur",t);
	gEid("ap-cur_t").innerHTML=secondToMin(t);	
}
function S_tbar(s,t){
	var pd=p.duration;
	gEid("ap-"+s+"_b").style.width = pd>0?t/pd*100+"%":"0%";
}
function secondToMin(s) {
 var MM = Math.floor(s / 60);
 var SS = s % 60;
 if (MM < 10)
   MM = "0" + MM;
 if (SS < 10)
   SS = "0" + SS;
 var min = MM + ":" + SS;
 return min.split('.')[0];
}

function crt_dir(Qo,n){
	var o=Qo[n];
	var li = cE("li"),dir=cE("ul"),file=cE("ul");
	dir.className="a_dir";
	dir.innerHTML=o.name;
	dir.onclick=dir_clk;
	li.appendChild(dir);
	file.style.display="none";
	sA(file,"data-d", n);
	// file.setAttribute("data-i", o.img);
	var m = o.list;
	for(var n in m){
		var e = cE("li");
		sA(e,"data-l", n);
		// e.setAttribute("data-a", o.dir+"/"+m[n].file);
		e.innerHTML=m[n].name;
		e.onclick=e_clk;
		file.appendChild(e);
	};
	li.appendChild(file);
	gEid("a-list-ul").appendChild(li);
}
var dir_clk = function(){
	var cs=this.parentNode.childNodes[1].style;
	cs.display=(cs.display=="block")?"none":"block";
}
var e_clk = function(){
	var dl=dir_list(this),
	o=Qo[dl[0]], l=o.list[dl[1]];
	S_title(l.name+" - "+o.name);
	p.src="./sview/audio/"+o.dir+"/"+l.file+".mp3";
	gEid("ap-title").innerHTML=l.name;
	gEid("ap-pic").style.backgroundImage="url(./sview/"+o.img+".jpg)";
	var m=gEcls("onlst");
	if(m){
		for(var n in m){removeClass(m[n],"onlst")}
	}
	addClass(this,"onlst");//list状态更新
	S_play(0);
	S_cur(0);
}
function dir_list(o){
	return [gA(o.parentNode,"data-d"),gA(o,"data-l")];
}
function dl_clk(d,l,f){//d:dir l:list f:fold dir?
	var q = gEq("[data-d='"+d+"']");
	if(f)q.parentNode.childNodes[0].click();
	q.childNodes[l].click();
}