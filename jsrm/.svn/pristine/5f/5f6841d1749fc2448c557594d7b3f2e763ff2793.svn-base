/**
 * 创建人汪鹏
 * 相关权限Js
 * 
 * 
 * 
 * 
 * */

(function ($)
{
	/**
	 * 根据操作类型与itemId获得操作对象
	 * operate 对象类型记录操作列表
	 * itemId 菜单id
	 * type为返回类型 list:列表类型,button:按钮类型
	 * */
	$.getOperateByType = function(o){
		
		if(!o.type||o.type.length==0) return;
		var results = {};
		for(var t=0;t<o.type.length;t++){
			if(o.type[t]=='list'){
				$.ajax({
					type: "post",
					url:o.path+"roleManagerRest/queryOperationList",
					async:false,
					data:{"itemid":o.itemId,"type":o.type[t]},
					dataType:"json",
					success:function(data,status) {	
						if(status=="success") {
							results.list = data;
						}	
					}
				});
			}
			if(o.type[t]=='bar'){
				$.ajax({
					type: "post",
					url:o.path+"roleManagerRest/queryOperationList",
					async:false,
					data:{"itemid":o.itemId,"type":o.type[t]},
					dataType:"json",
					success:function(data,status) {	
						if(status=="success") {
							results.bar= data;
						}	
					}
				});
			}
		}
		return results;
	};
	$.getItemByRoleFirst = function(o){
		var list=[];
		$.ajax({
			type: "post",
			url:o.path+"roleManagerRest/queryItemList",
			async:false,
			data:{},
			dataType:"json",
			success:function(data,status) {	
				if(status=="success") {
					list = data;
				}	
			}
		});
		return list;
	};
	$.getItemByRoleSec = function(o){
		var list=[];
		$.ajax({
			type: "post",
			url:o.path+"roleManagerRest/queryItem2List",
			async:false,
			data:{"itemId":o.itemId},
			dataType:"json",
			success:function(data,status) {	
				if(status=="success") {
					list = data;
				}	
			}
		});
		return list;
	};
})(jQuery);



