/**
 * Created by liguoxiang on 2016/10/30.
 */
var id = $.getUrlParam("id");
var addOrUpdate = $.getUrlParam("addOrUpdate");

var settingCatalog = {

    check:{
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
function filter(node) {
    return node;
}

$(function(){
    initTree("categoryTree","/knowledge/list",settingCatalog);
    if(addOrUpdate == "update"){
        queryRole();
        queryDict();
        queryUser();
    }else if(addOrUpdate == "detail"){
        queryDict();
        queryUser();
    }else {
        queryRole();
        queryDict();
    }

});

/**
 * 显示角色信息
 */
function queryRole(){
    $.ajax({
        type: "post",
        url: getBasePath()+"/userManager/queryRole",
        async:false,
        dataType: "json",
        success: function (data) {
            var html = "";
            var role = data.data.data;
            for(var i = 0;i < role.length;i++){
                html+='<li id="role'+role[i].id+'" data-value="'+role[i].id+'">'+role[i].roleName+'</li>';
            }
            $("#roleOption").append(html);
        },
        error: function () {
            alert("出错了");
        }
    });
}

/**
 * 显示审核角色信息
 */
function queryDict(){
    $.ajax({
        type: "post",
        url: getBasePath()+"/userManager/queryDict",
        async:false,
        dataType: "json",
        success: function (data) {
            var html = "";
            var dict = data.data.data;
            for(var i = 0;i < dict.length;i++){
                if(addOrUpdate == "detail"){
                    html += '<input type="checkbox" class=\"ifc\" name="'+dict[i].id+'" id="'+dict[i].code+'" value="'+dict[i].code+'" onclick="return false;"><span style=\"font-size: 14px; color: #000;\">'+dict[i].value+'</span></input>';
                }else {
                    html += '<input type="checkbox" class=\"ifc\" name="' + dict[i].id + '" id="' + dict[i].code + '" value="' + dict[i].code + '"><span style=\"font-size: 14px; color: #000;\">' + dict[i].value + '</span></input>';
                }
            }
            $("#tree_show").append(html);
        },
        error: function () {
            alert("出错了");
        }
    });
}

/**
 * 显示单个用户信息
 * data：用户ID
 */
function queryUser(){
    $.ajax({
        type: "post",
        url: getBasePath()+"/userManager/selectUserOne",
        async:false,
        dataType: "json",
        data: {id:id},
        success: function (data) {
            var user = data.data.user;
            var userDataAut = data.data.userDataAut;
            var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
            var nodes = treeObj.getNodesByFilter(filter);

            if(addOrUpdate == "detail"){

                $(".selecBox").empty();
                $(".selecBox").append("<dd><input  value='"+user.roleName+"' type='text' disabled = 'disabled'></dd>");
                $("#loginName").val(user.loginName);
                $("#username").val(user.username);
                $("#userDes").val(user.userDes);
                $("#loginName").attr("disabled",true);
                $("#username").attr("disabled",true);
                $("#userDes").attr("disabled",true);
                $("#OK").hide();

                if(user.dictCode !=null){
                    var dict = user.dictCode.split(",");
                    for(var j = 0;j<dict.length;j++){
                        $("#"+dict[j]).attr("checked",true);
                        $("#"+dict[j]).attr('disabled',true);
                    }
                }

                for(var i = 0;i<userDataAut.length;i++){
                    treeObj.checkNode(treeObj.getNodeByParam("id", userDataAut[i].dataAuthorityId, null), true);
                }
                for (var k = 0; k < nodes.length; k++) {
                    var node = nodes[k];
                    node.chkDisabled = true; //表示显示checkbox
                    treeObj.updateNode(node);

                }

            }else {
                $("#loginName").val(user.loginName);
                $("#username").val(user.username);
                $("#userDes").val(user.userDes);
                $("#role" + user.roleId).addClass("selectbox_selected");
                $("#roleN").html($("#role" + user.roleId).html());

                if(user.dictCode !=null){
                    var dict = user.dictCode.split(",");
                    for(var j = 0;j<dict.length;j++){
                        $("#"+dict[j]).attr("checked",true);
                    }
                }

                for(var i = 0;i<userDataAut.length;i++){
                    var node = treeObj.getNodeByParam("id", userDataAut[i].dataAuthorityId, null);
                    if(node!=null){
                        treeObj.checkNode(node, true);
                    }
                    //treeObj.checkNode(treeObj.getNodeByParam("id", userDataAut[i].dataAuthorityId, null), true, true);
                }

            }
        },
        error: function () {
            alert("出错了");
        }
    });
}

function saveOrUpdate(){
    if(addOrUpdate == "update"){
        updateUser();
    }else{
        saveUser();
    }
}

/**
 * 保存用户
 */

function saveUser(){
    var alist = [];
    var ilist = [];
    var roleId = $(".selectbox_selected").attr("data-value");
    var dictCode = $(".selectbox_selected").attr("dict-value");
    var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
    var nodes = treeObj.getChangeCheckedNodes(true);
    for (var i = 0; i < nodes.length; i++) {
        //var halfCheck = nodes[i].getCheckStatus();
        //if (!halfCheck.half){
            var obj={};
            obj.dataAuthorityId = nodes[i].id;
            obj.parentId = nodes[i].pId;
            obj.name = nodes[i].name;
            obj.deep = nodes[i].deep;
            ilist.push(obj);
        //}

    }
    $('#tree_show').find(':checkbox').each(function(){
        if ($(this).is(":checked")) {
            alist.push($(this).attr("id"));
        }
    });
    var parm =JSON.stringify(ilist);
    var dictCode = JSON.stringify(alist);
    var data = {dictCode:dictCode,json:parm,roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val(), dictCode:dictCode};
    if(check(roleId)) {
        $.ajax({
            type: "post",
            url: getBasePath() + "/userManager/saveUserManager",
            dataType: "json",
            data: data,
            success: function (data) {
                if(data.result == 2){
                    alert("用户名重复，请重新填写！");
                }else {
                    window.history.back(-1);
                    alert("保存成功！");
                }
            },
            error: function () {
                alert("出错了");
            }
        });
    }
}

/**
 * 修改用户
 */
function updateUser(){
    var alist = [];
    var ilist = [];
    var roleId = $(".selectbox_selected").attr("data-value");
    var dictCode = $(".selectbox_selected").attr("dict-value");

    var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
    var nodes = treeObj.getChangeCheckedNodes(true);
    for (var i = 0; i < nodes.length; i++) {
        //var halfCheck = nodes[i].getCheckStatus();
        //if (!halfCheck.half){
            var obj={};
            obj.dataAuthorityId = nodes[i].id;
            obj.parentId = nodes[i].pId;
            obj.name = nodes[i].name;
            obj.deep = nodes[i].deep;
            ilist.push(obj);
        //}

    }

    $('#tree_show').find(':checkbox').each(function(){
        if ($(this).is(":checked")) {
            alist.push($(this).attr("id"));
        }
    });

    var parm =JSON.stringify(ilist);
    var dictCode = JSON.stringify(alist);
    var data = {dictCode:dictCode,json:parm,id: id,roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val(), dictCode:dictCode};
    if(check(roleId)) {
        $.ajax({
            type: "post",
            url: getBasePath() + "/userManager/updateUserManager",
            dataType: "json",
            data: data,
            success: function (data) {
                if (data.result == 2) {
                    alert("用户名重复，请重新填写！");
                } else {
                    window.history.back(-1);
                    alert("修改成功！");
                }

            },
            error: function () {
                alert("出错了");
            }
        });
    }
}

function check(roleId){
    if($("#loginName").val() == "" || $("#loginName").val() == null){
        alert("用户名不能为空！");
        return false;
    }
    if($("#username").val() == "" || $("#username").val() == null){
        alert("姓名不能为空！");
        return false;

    }
    if($("#userDes").val() == "" || $("#userDes").val() == null){
        alert("角色描述不能为空！");
        return false;
    }
    if(roleId == undefined){
        alert("请选择角色！");
        return false;
    }
    return true;
}
/**
 * 取消
 */
function back(){
    window.history.back(-1);
}

