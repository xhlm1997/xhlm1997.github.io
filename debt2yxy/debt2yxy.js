start_t = (new Date("2019-12-15 17:00:00")).getTime();
var ms_1day = 24*60*60*1000;
var Times=[];
Data={
	"year":2019,
	"month":12,
	"day":15,
	"hour":16,
	"minute":54,
	"debt_s":0.375,
	"rate_day":0.15
};
(function(){
	//editable属性赋予
	let cs = gEcls("child_editable")[0].children;
	for(let i=0; i<cs.length; i++){
		cs[i].contentEditable="true";
	};
	//添加监听事件
	for(let i in Data){
		let t = gEid(i);
		Times[i]=t;
		t.addEventListener("keypress", function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				this.blur();
				// cfm_Data();
			}
		});
		t.addEventListener("blur", function(event) {
			cfm_Data();
		});
	}
	setTD(0);
})();

function cfm_Data(){
	let flag, T_s = get_T_s();
	if(verify_T(T_s)){
		T_s =(new Date(T_s)).getTime();
		if(T_s){start_t = T_s;flag = 1;}
		else flag = 0;
	}else flag=0;
	setTD(flag);
}

function setTD(f){ //0:setTimes 1:setData
	for(let i in Data){
		if(f==0){Times[i].innerHTML = Data[i];}
		else if(f==1){Data[i] = Times[i].innerHTML-0;}// -0是为了转换为数值
	}
}

function verify_T(T){
	if(T.match(/^((((1[8-9]\d{2})|([2-9]\d{3}))-(10|12|0?[13578])-(3[01]|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))-(11|0?[469])-(30|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))-(0?2)-(2[0-8]|1[0-9]|0?[1-9]))|(([2468][048]00)-(0?2)-(29))|(([3579][26]00)-(0?2)-(29)$)|(([1][89][0][48])-(0?2)-(29))|(([2-9][0-9][0][48])-(0?2)-(29))|(([1][89][2468][048])-(0?2)-(29))|(([2-9][0-9][2468][048])-(0?2)-(29))|(([1][89][13579][26])-(0?2)-(29))|(([2-9][0-9][13579][26])-(0?2)-(29))) ((2[0-3])|([0-1]\d)|(\d)):((0?)|([1-5]))\d:((0?)|([1-5]))\d$/)){
		return true;
	}else {return false;}
}

setInterval(function(){
	debt_n = calc(Data.debt_s,start_t,Data.rate_day);
	gEid("debt").innerHTML = debt_n;	
	if(debt_n>100000)gEid("tip").innerHTML = "不用看了，他把自己卖了都还不上了！"
}, 1000);

function get_T_s(){
	//"2019-12-15 17:00:00"
	return T("year")+"-"+T("month")+"-"+T("day")+" "+T("hour")+":"+T("minute")+":00"
}
function T(o){
	return Times[o].textContent;
}

function gap(s_t,n_t){ //输出：[day, ms_rm]
	var ms = n_t-s_t;
	var day = parseInt(ms/ms_1day);
	var ms_rm = ms%ms_1day;
	return [day, ms_rm];
}
function calc(d_s,s_t,r_d){ //debt_s, start_t, rate_day 
	// cl(d_s+" "+s_t+" "+r_d)
	var n_t = new Date().getTime(); //now_t
	var t_gap = gap(s_t,n_t);
	// console.log(t_gap);
	//计算天数所得
	var inte_d = 0;
	for(let i=0;i<t_gap[0];i++){
		inte_d += (d_s + inte_d)* r_d;
	}
	//计算剩余时间所得
	var inte_r = t_gap[1]*(d_s + inte_d)*(r_d/ms_1day);	
	// console.log("inte_d:"+inte_d+"  debt:"+(d_s + inte_d)+"  inte_r:"+inte_r);
	return d_s + inte_d + inte_r;
}
function gEid(id){
	return document.getElementById(id);
}
function gEcls(cls){
	return document.getElementsByClassName(cls);
}
function cl(s){
	console.log(s)
}
