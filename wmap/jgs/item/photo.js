var u=gEid("p-item-ul"),v=gEcls("p-vect"),
uln=0;
var Qs=GetQueryString("t");//t参数
var amount={
	"cpmzdgj":9,
	"bjl":8,
	"dycdbdh":6,
	"djmzgj":6,
	"zbc":9,
	"xjhjyy":8,
	"hyjsk":8,
	"lsly":6
},am=amount[Qs];
u.style.width=am*100+"vw";
for(var i=0;i<am;i++){
	u.innerHTML+="<li data-a='"+i+"'><img draggable='false'/></li>";
};
/*左右移动*/
for(var i in v){
	v[i].onclick= function(){
		if(this.id=="left"){
			if(uln>0)uln--;
		}else if(this.id=="right"){
			if(uln<am-1)uln++;
		}
		for(j=uln;j<=uln+1&&j<am;j++){//图片预加载
			var a=gEq("[data-a='"+j+"'] img");
			if(a.src==""){
				a.src="./sview/photo/"+Qs+"_"+(j+1)+".jpg";
			};
		}
		u.style.transform  ="translateX(-"+uln*100+"vw)";	
	};
};
gEid("left").click();//图片初始化加载
var eR=1,eX=eY=0,tM=p_G_mar();//初始化
var X,Y,D,is_t;
gEcls('p-list')[0].addEventListener('touchstart',is_touch,false);
gEcls('p-list')[0].addEventListener('mousedown',is_touch,false);
function is_touch() {
	var e= event || window.event;
	is_t=(e.type=="touchstart");
	if(is_t){
		gEcls("p-item")[0].addEventListener('touchstart',p_start,true);
		// gEq('body').addEventListener('touchmove', function(e) {
			// e.preventDefault();
		// },false);//微信下拉禁止
	}else{
		gEcls("p-item")[0].addEventListener('mousedown',p_start,false);
		gEcls("p-item")[0].addEventListener('mousewheel',p_wheel,false);
	}
	gEcls('p-list')[0].removeEventListener('touchstart',is_touch,false);
	gEcls('p-list')[0].removeEventListener('mousedown',is_touch,false);
}
function p_start(){
//e.type: touchstart / mousedown
	var e= event || window.event,
	//is_t=(e.type=="touchstart");
	t=(is_t?e.touches:e),tl=(is_t?t.length:1),
	xy=XY(t,is_t);
	X=xy[0],Y=xy[1];
	if(tl>1){//多点 缩放
			D=calcD(t);
			xy=p_G_ori();
			X=(X[0]+X[1])/2-xy[0];
			Y=(Y[0]+Y[1])/2-xy[1];
	}
	addClass(gEcls("p-list")[0],"no-vect");
	s=is_t?['touchmove','touchend']:['mousemove','mouseup'];
	document.addEventListener(s[0],p_move,true);
	document.addEventListener(s[1],p_end,true);
	if(is_t)e.preventDefault();
}
function p_move(){
	var e= event || window.event,
	// is_t=(e.type=="touchmove"),
	t=is_t?e.touches:e,tl=is_t?t.length:1;
	var n1,n2=p_G_mar();
	if(tl>1){//多点 缩放
		var tR=calcD(t)/D;
		n1=[tR,0,0,tR,(1-tR)*X,(1-tR)*Y];
	}else{//单点 图片平移
		var xyt=XY(t,is_t),
		dx=xyt[0][0]-X[0],dy=xyt[1][0]-Y[0];			
		if(eR>1){
			n1=[1,0,0,1,dx,dy];
		}else{
			n1=[1,0,0,1,0,0];
			u.style.transform ="translateX("+(-uln*WH()[0]+dx)+"px)";
		}
	}
	tM=martix(n1,n2);
	S_Mar(tM);	
}
function p_end(){
	//e.type: touchend / mouseup
	var e= event || window.event,
	//is_t=(e.type=="touchend"),
	s=is_t?'touchmove':'mousemove';
	eR=tM[0];eX=tM[4];eY=tM[5];	
	if(eR<=1){
		removeClass(gEcls("p-list")[0],"no-vect");
		if(eR==1){
			var c=X-(is_t?e.changedTouches[0].clientX:e.clientX);
			if(Math.abs(c)>WH()[0]*0.4){
				c=c>0?"right":"left";
				gEid(c).click();
			}else u.style.transform="translateX(-"+uln*100+"vw)";
		}else p_S_mar(1,0,0);
	}
	document.removeEventListener(s,p_move,true);
	document.removeEventListener(e.type,p_end,true);
}
function p_wheel(){
	addClass(gEcls("p-list")[0],"no-vect");
	var e= event || window.event,tR=1+(e.wheelDelta>0?0.1:-0.1),
	n2=p_G_mar();
	xy=p_G_ori();
	X=e.clientX-xy[0];
	Y=e.clientY-xy[1]; 
	n1=[tR,0,0,tR,(1-tR)*X,(1-tR)*Y];
	tM=martix(n1,n2);
	p_S_mar(tM[0],tM[4],tM[5]);
	if(eR<1){//缩小恢复效果
		if(D)clearTimeout(D);
		D=setTimeout(function (){
			removeClass(gEcls("p-list")[0],"no-vect");
			p_S_mar(1,0,0);
		}, 500);
	}
}
function XY(t,i){//i=is_t 1:touch 0:mouse
	var rX=[],rY=[];
	if(i){
		for(n=0;n<t.length;n++){
			rX.push(t[n].clientX);
			rY.push(t[n].clientY);
		};	
	}else{
		rX[0]=t.clientX;
		rY[0]=t.clientY;	
	}
	return [rX,rY];
}
function calcD(t){
	var p=Math.pow,s=Math.sqrt;
	return s(p(t[0].clientX-t[1].clientX,2)+p(t[0].clientY-t[1].clientY,2));
}

function p_G_mar(){
	return [eR,0,0,eR,eX,eY];
}
function p_S_mar(r,x,y){
	eX=x,eY=y,eR=r;
	tM=p_G_mar();
	S_Mar(tM);
}
function S_Mar(x){
	var str="";
	for(i=0;i<x.length;i++){
		str+=x[i];
		if(i+1<x.length){str+=","};
	};
	str="matrix("+str+")";
	gEq("[data-a='"+uln+"'] img").style.transform=str;
}
function p_G_ori(){
	var p=gEq("[data-a='"+uln+"']"),wh=WH();
	return [p.offsetLeft-uln*wh[0],p.offsetTop+0.11*wh[1]];
}
function WH(){
	var l=gEid("left"),w=window.innerWidth,h=window.innerHeight;
	return [w,h];
}
function martix(n1,n2){
	// syms a1 c1 e1 b1 d1 f1 a2 c2 e2 b2 d2 f2;
	// m1=[a1,c1,e1;
	// b1,d1,f1;
	// 0,0,1];
	// m2=[a2,c2,e2;
	// b2,d2,f2;
	// 0,0,1];
	// [ a1*a2 + b2*c1, a1*c2 + c1*d2, e1 + a1*e2 + c1*f2]
	// [ a2*b1 + b2*d1, b1*c2 + d1*d2, f1 + b1*e2 + d1*f2]
	// [             0,             0,                  1]
	var a=n1[0]*n2[0] + n2[1]*n1[2], c=n1[0]*n2[2] + n1[2]*n2[3], e=n1[4] + n1[0]*n2[4] + n1[2]*n2[5],
		b=n2[0]*n1[1] + n2[1]*n1[3], d=n1[1]*n2[2] + n1[3]*n2[3], f=n1[5] + n1[1]*n2[4] + n1[3]*n2[5];
	return [a,b,c,d,e,f];
}