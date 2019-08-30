var v=gEcls("v-vect"),a=gEid("v-item-ul"),
uln=0;
p_play();
/*左右移动*/
for(var i in v){
	v[i].onclick= function(){
		if(this.id=="left"){
			if(uln>0)uln--;
		}else if(this.id=="right"){
			if(uln<3)uln++;
		}
		a.style.transform="translateX(-"+a.clientWidth/6*uln+"px)";
	};
};
/*ajax获取信息*/
parent.$.ajax({
	url: "./sview/video/video.json",
	dataType:"json",
	success: function(m){
		var Qs=GetQueryString("t");//t参数
		for(var n in m){
			var p=m[n];
			a.innerHTML+="<li id="+p.vid+" onclick='li_clk(this);'><img src='./sview/video/"+p.name+".jpg' /><div>微课"+n+"《"+p.itr+"》</div></li>";//显示v-list
			if(Qs==p.name){
				gEid(p.vid).click();//模拟点击
				if(n>3){uln=3;v[1].click();}//切换页面
			};
		};
	},
	error: function(m){
		alert("网络异常，获取失败！");
		console.log(m);
	}
});
/*滑动效果*/
var touchStartX,touchEndX;
a.addEventListener('touchstart',function(){
  touchStartX = event.touches[0].clientX;
},false);
a.addEventListener('touchend',function(){
  touchEndX = event.changedTouches[0].clientX;
  var c=touchStartX-touchEndX;
  if(Math.abs(c)>10){
	  s=c>0?"right":"left";
	  gEid(s).click();
  }
},false);
function li_clk(m){
	videoSetbyId(m.id);//视频
	var c=m.parentNode.childNodes;
	for(var n in c){
		removeClass(c[n], "onlive");
	};
	addClass(m,"onlive");//list状态更新
	S_title(m.childNodes[1].innerHTML);
}
/*视频插入*/
function videoSetbyId(id){
	//https://www.npmjs.com/package/youkuplayer;
	gEid('youkuplayer').innerHTML="";
	player = new YKU.Player('youkuplayer',{
		styleid: '0',
		client_id: 'e7e4d0ee1591b0bf',
		vid: id,
		autoplay: true
	});
}
