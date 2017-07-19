/**
 * Created by liguoxiang on 2016/10/31.
 */

function getTwoItem(){
    var id = $.getUrlParam("itemId");
    var html = "";
    var item2List = $.getItemByRoleSec({
        "path":'/',
        "itemId":id
    });
    for(var i = 0; i< item2List.length;i++){
        if(i == 0 ){
            html+="<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' class=\"selected\">"+item2List[i].itemName+"</a>";
        }else {
            html += "<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' >" + item2List[i].itemName + "</a>";
        }
    }
    $(".switch").append(html);
}
/**
 * 重置密码
 * data：用户ID
 */
function resetPassword(id){
    var data = {id: id};
    if(confirm('是否重置密码？')) {
        $.ajax({
            type: "post",
            url: getBasePath() + "/userManager/resetPassword",
            dataType: "json",
            data: data,
            success: function (data) {
                window.location.reload();
                alert("修改成功！");

            },
            error: function () {
                alert("出错了");
            }
        });
    }
}

/**
 * 批量重置密码
 */
function pldelresetPassword(){
    var ids = getCBIds(".item-check");
    if(ids=='[]'){
        alert("至少选择一个！");
        return;
    }
    if(confirm('是否重置？')){
        $.ajax({
            type:"post",
            url:"/userManager/resetPasswordByids",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    searchPage(1);
                }else{
                    alert("第一个按钮获取信息失败！！");
                }
            },
            error:function () {
                alert("第一个按钮获取信息失败！！！")
            }
        });
    }
}

/**
 * 删除用户
 * @param id
 */
function deleteUser(id){
    var data = {id: id};
    if(confirm('是否删除？')) {
        $.ajax({
            type: "post",
            url: getBasePath() + "/userManager/deleteUser",
            dataType: "json",
            data: data,
            success: function (data) {
                window.location.reload();
                alert("删除成功！");

            },
            error: function () {
                alert("出错了");
            }
        });
    }
}
/**
 * 批量删除
 */
function pldel(){
    var ids = getCBIds(".item-check");
    if(ids=='[]'){
        alert("至少选择一个！");
        return;
    }
    if(confirm('是否删除？')){
        $.ajax({
            type:"post",
            url:"/userManager/delUserByIds",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    searchPage(1);
                }else{
                    alert("第一个按钮获取信息失败！！");
                }
            },
            error:function () {
                alert("第一个按钮获取信息失败！！！")
            }
        });
    }
}

/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */

var pagination = new Pagination(getBasePath()+"/userManager/selectUserListForPage", "page", function (data) {
    fillTableData(data)
});

$(function(){
    getTwoItem();
    var id2 = $.getUrlParam("item2Id");
    console.log(id2);

    checkAll("resource");

    searchPage();
    getOpBar();
    
    /** 重置 */
    $(".btn-grey").click(function () {
        $("#roleName").val("");    //角色
        $("#loginNameAndusername").selectBox("setCaption","用户名","-1");    //用户名和姓名
        $("#userName").val("");    //用户名
    });
});

/**
 * 定义的查询方法
 * @params page 可选参数，页面上“查询”按钮初始值 = 1, 页面上“确定”按钮、初始化加载不需要赋值
 */
function searchPage(page){
    pagination.search(getParams(), page);
}

/** 得到搜索条件的json对象 */
function getParams(){
    var term = $(".selectbox_selected").attr("data-value");
    var term_value = $("#userName").val();
    var params = {
        roleName : $("#roleName").val()
    };
    params[term] = term_value;
    return params;
}

/** table数据 */
function fillTableData(data){
    var pageMan = pagination.returnParams;
    //清空table
    $("#table_data tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var id = data[i].id;
        var loginName = data[i].loginName;
        var userName = data[i].username;
        var roleName = data[i].roleName == undefined ? "-" : data[i].roleName;
        //var state = data[i].state;
        //if(state != 0){
            result += "<tr>"
                + "<td><input id='"+id+"' type=\"checkbox\" class=\"item-check\"></td>"
                //+ "<td>" + ((pageMan.currentPageNo-1) * pageMan.pageSize + i+1) + "</td>"
                + "<td>" + loginName + "</td>"
                + "<td>" + userName + "</td>"
                + "<td>" + roleName + "</td>"
                + "<td class=\"operate\">";
                //"<a href=\"systemView.html?addOrUpdate=detail&id=" + id + "\">查看</a>";
                //result += " <a href=\"systemView.html?addOrUpdate=update&id=" + id + "\">编辑</a>";
                //result += " <a href='#' onclick= \"resetPassword('" + id + "')\">重置密码</a>";
                //result += " <a href='#' onclick= \"deleteUser('" + id + "')\">删除</a>" +
            result += getOp(id);
            result += "</td>";
            result += "</tr>";
        //}

    }
    $("#table_data").append(result);
}
/**
 *拼接按钮
 * @param userId
 * @returns {string}
 */
function getOp(userId){
    var backHtml="";
    if(result.list.length>0) {
        for (var c = 0; c < result.list.length; c++) {
            backHtml += '<a href="javascript:'+result.list[c].operatemethod+'(\''+userId+'\');" >'+result.list[c].operatetitle+'</a>&nbsp;';
        }
    }
    return backHtml;
}

function getOpBar(){
    var backHtml="";
    var html = "";
    if(result.bar.length>0) {
        for (var c = 0; c < result.bar.length; c++) {
            if(result.bar[c].operatetitle == "新增用户"){
                html = '<a href="#" onclick="' + result.bar[c].operatemethod + '()" class="btn">' + result.bar[c].operatetitle + '</a>';
            }else {
                backHtml += '<button class="btn" type="button" onclick="' + result.bar[c].operatemethod + '()">' + result.bar[c].operatetitle + '</button>&nbsp;';
            }
        }
    }
    $("#toolbar").html(backHtml);
    $("#toolbar1").html(html);
}

function modify(userId){
    window.location.href = "modifyPassword.html?id="+userId;
}

function query(userId){
   window.location.href = "systemView.html?addOrUpdate=detail&id="+userId;
}

function edit(userId){
    window.location.href = "systemView.html?addOrUpdate=update&id="+userId;
}

function reset(userId){
    resetPassword(userId);
}

function del(userId){
    deleteUser(userId);
}

function add(){
    window.location.href = "systemView.html";
}
function batchReset(){
    var ids = getCBIds(".item-check");
    if(ids=='[]'){
        alert("至少选择一个！");
        return;
    }
    if(confirm('是否重置？')){
        $.ajax({
            type:"post",
            url:"/userManager/resetPasswordByids",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    alert("重置成功！");
                    searchPage(1);
                }else{
                    alert("第一个按钮获取信息失败！！");
                }
            },
            error:function () {
                alert("第一个按钮获取信息失败！！！")
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
            url:"/userManager/delUserByIds",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    alert("删除成功！");
                    searchPage(1);
                }else{
                    alert("第一个按钮获取信息失败！！");
                }
            },
            error:function () {
                alert("第一个按钮获取信息失败！！！")
            }
        });
    }
}




