$(function(){
	// queryRole();
	searchPage();
	getOpBar();
	/*条件查询*/
	$("#queryRoleButton").click(function() {
		searchPage(1);
	});
	$("#roleForm").keypress(function(e){
		if(event.keyCode == 13){
			e.preventDefault();
		}
	});
	//清空
	$("#clear").on("click", function(){
		$("#roleName").val("");
	});

});


var pagination = new Pagination(getBasePath()+"/roleManagerRest/queryRole", "page", function (data) {
	fillTableData(data);
});


function searchPage(page){
    pagination.search(getParams(), page);
}

/** 得到搜索条件的json对象 */
function getParams(){
	//var parm = $('#roleForm').serialize();
    var params = {
    		roleName : $('#roleName').val()
    };
    //params[term] = term_value;
    return params;
}
function fillTableData(data){
	var pageMan = pagination.returnParams;
	var content = $("#roleTable tbody");
	content.html("");
	for(var i=0;i<data.length;i++){
		content.append(" <tr>");
		content.append(" <td><input type=\"checkbox\" id=\""+data[i].id+"\" class=\"item-check\"></td>");
		//content.append(" <td>"+((pageMan.currentPageNo-1) * pageMan.pageSize + i+1)+"</td>");
		content.append(" <td>"+data[i].roleName+"</td>");
		content.append(" <td>"+data[i].des+"</td>");
		content.append(" <td>"+getOp(data[i].id)+"</td>");
		content.append("</tr>");
	}
}
function getOp(logicId){
    var backHtml="";
    if(result.list.length>0) {
        for (var c = 0; c < result.list.length; c++) {
            backHtml += '<a href="javascript:'+result.list[c].operatemethod+'(\''+logicId+'\');" >'+result.list[c].operatetitle+'</a>&nbsp;';
        }
    }
    return backHtml;
}
function getOpBar(){
    var backHtml="";
	var html="";
    if(result.bar.length>0) {
        for (var c = 0; c < result.bar.length; c++) {
			if(result.bar[c].operatetitle == "新增角色"){
				html = '<button class="btn" type="button" onclick="'+result.bar[c].operatemethod+'()">'+result.bar[c].operatetitle+'</button>&nbsp;';
			}else {
				backHtml += '<button class="btn" type="button" onclick="' + result.bar[c].operatemethod + '()">' + result.bar[c].operatetitle + '</button>&nbsp;';
			}
		}
    }
    $("#toolbar").html(backHtml);
    $("#toolbar1").append(html);
//    console.log(backHtml);
//    return backHtml;
}

/*新增*/
function add(){
	location.href ="perm_add_edit.html?flag=add&item2Id="+$.getUrlParam("item2Id")+"";
}
/*修改*/
function edit(id){
	location.href ="perm_add_edit.html?id="+id+"&flag=update&item2Id="+$.getUrlParam("item2Id")+"";
}
function query(id){
	location.href ="perm_add_edit.html?id="+id+"&flag=query";
}
function del(id){
	var ids = JSON.stringify([{"id":id}]);
	if(confirm('是否删除？')){
	 $.ajax({
		   type:"post",
		   url:"/roleManagerRest/deleteRole",
		   dataType:"json",
		   data:{
			   "json":ids
		   },
		   success:function (data) {
			   if(data.result=="0"){
				   searchPage(1);
			   }else{
				   console.log("第一个按钮获取信息失败！！");
			   }
		   },
		   error:function () {
			   console.log("第一个按钮获取信息失败！！！")
		   }
	   });
	}
}
function pldel(){
	var ids = getCBIds(".item-check");
	if(ids=='[]'){
		alert("至少选择一个！");
		return;
	} 
	if(confirm('是否删除？')){
		$.ajax({
			   type:"post",
			   url:"/roleManagerRest/deleteRole",
			   dataType:"json",
			   data:{
				   "json":ids
			   },
			   success:function (data) {
				   if(data.result=="0"){
					   searchPage(1);
				   }else{
					   console.log("第一个按钮获取信息失败！！");
				   }
			   },
			   error:function () {
				   console.log("第一个按钮获取信息失败！！！")
			   }
		   });
	}
}