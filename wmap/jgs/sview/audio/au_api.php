<?php
header("Content-Type: text/html;charset=utf-8"); 
// $dir="../sview/audio/";
// $a = scandir($dir);
// print_r($a);
/**
 * [getFile 获取文件夹列表或文件列表]
 * @param  string  $path   [需要获取的列表地址]
 * @param  boolean $is_dir [获取文件夹列表还是文件列表，TRUE为文件夹，FALSE为文件，默认为TRUE]
 * @return [array] $result [以数组方式返回列表数据]
 */
function getFile($path = '.', $is_dir = TRUE) {
	$current_dir = opendir($path);    //opendir()返回一个目录句柄,失败返回false
	while(($file = readdir($current_dir)) !== false) {    //readdir()返回打开目录句柄中的一个条目
	    $sub_dir = $path . DIRECTORY_SEPARATOR . $file;    //构建子目录路径
	    if($file == '.' || $file == '..') {
	        continue;
	    }
	    if($is_dir){
	        if(is_dir($sub_dir)) {    //如果是目录，进行赋值
	            $result[] = $file;
	        }	
	    }else{
	        if(is_file($sub_dir)) {    //如果是文件，进行赋值
	            $result[] = $file;
	        }	
	    }
	}
	return $result;
}
$re = getFile('.');/*获取文件夹列表*/
print_r($re[0]);
echo '<br/>';
$re = getFile('.',FALSE);/*获取文件列表*/
print_r($re);
?>