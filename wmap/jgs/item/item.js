function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function hasClass(obj, cls) {
	return (obj.className+"").match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, '');
	}
}
function cE(tag){
	return document.createElement(tag);
}
function gEid(id){
	return document.getElementById(id);
}
function gEcls(cls){
	return document.getElementsByClassName(cls);
}
function gEq(qs){
	return document.querySelector(qs);
}
function gA(e,a){
	return e.getAttribute(a);
}
function sA(e,a,c){
	return e.setAttribute(a,c);
}
function S_title(s){
	document.title = s;
	parent.document.title = s;
}
function clog(m){
	gEid("console").innerHTML=m;
}
function p_play(){
	var pw=parent.window;
	pw.S_play(0);
	window.onunload=function(){pw.S_play(1)};	
}
