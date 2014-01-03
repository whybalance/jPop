jPop
====

这是一个基于jquery的窗口弹出扩展
此版本完全兼容IE6
该插件的效果是将已经定义好的窗体内容弹出，并支持多窗体弹出；


最简单的使用方法
$.jPop.create({oDom: $('#domA')	});

建议使用方法
$('.open').click(function(){
	var om;
	if($.jPop.get('sa') === undefined){
		om = $.jPop.create({
			oDom: $('#domA'),
			hideBtn: $('.jAlertClear1'),
			showBtn: $('.open'),
			zIndexs: 6 
		},'sa');
	}else{
		om = $.jPop.get('sa')
	}
	om.show();
});