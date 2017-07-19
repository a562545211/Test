/**
 * Created by jichao on 2016/10/26.
 */

/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath() + "/resourceCode/selectResourceCodeListForPage", "page", function (data) {
    fillTableData(data)
});

$(function(){
    //日历组件初始化代码
    $("#dates_start1").datetimepicker({
        value:$("#dates_start1").val(),
        value:$("#dates_start1").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });
    $("#dates_end1").datetimepicker({
        value:$("#dates_end1").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });
    checkAll("resource");

    /** 清空搜索条件 */
    $("#clear").on("click", function(){
        $("#code").val("");
        $("#name").val("");
        $("#dates_start1").val("");
        $("#dates_end1").val("");
    });

    //初始化查询
    searchPage();
    getOpBar();
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
    var params = {code : $("#code").val(),
        name : $("#name").val(),
        startTime : $("#dates_start1").val(),
        endTime : $("#dates_end1").val()};
    return params;
}

/** table数据 */
function fillTableData(data){
    //console.log(pagination.returnParams);
    //清空table
    $("#table_data tr:not(:first)").remove();
    if(data.length < 1){
        //$(".delBrdr2").hide();
        $("#table_data").hide();
        $(".delBrdr").hide();
        $(".default-prompt").show();
    }else{
        //$(".delBrdr2").show();
        $("#table_data").show();
        $(".delBrdr").show();
        $(".default-prompt").hide();

        var result = "";
        for(var i = 0; i < data.length; i++){
            var id = data[i].id;
            var code = data[i].code;
            var name = data[i].name == undefined ? "-" : data[i].name;
            var time = data[i].createTime.split(" ")[0];
            var createUserId = data[i].createUserId;
            var createUserName = data[i].createUserName;
            var state = data[i].state;
            if(state != 0){
                result += "<tr>"
                    + "<td><input type=\"checkbox\" class=\"item-check\"></td>"
                    + "<td>" + code + "</td>"
                    + "<td>" + name + "</td>"
                    + "<td>" + createUserName + "</td>"
                    + "<td>" + time + "</td>"
                    + "<td class=\"operate\">";
                result += getOp(id, state, createUserId);
                //if(state == 1){
                //    result += " <a href=\"resourceCodeEdit.html?type=2&addOrUpdate=update&id=" + id + "\">编辑</a>";
                //}
                result += "</td></tr>";
            }

        }
        $("#table_data").append(result);
    }

}

/**
 *拼接按钮
 * @param userId
 * @returns {string}
 */
function getOp(userId, state, createUserId){
    var backHtml="";
    if(result.list.length>0) {
        for (var c = 0; c < result.list.length; c++) {
            if(pagination.getsessionUserId() == createUserId){
                if(state == 2 && result.list[c].operatetitle == "编辑" ){
                    backHtml += '';
                }else {
                    backHtml += '<a href="javascript:' + result.list[c].operatemethod + '(\'' + userId + '\');" >' + result.list[c].operatetitle + '</a>&nbsp;';
                }
            }else{
                if(result.list[c].operatetitle == "编辑" ){
                    backHtml += '';
                }else {
                    backHtml += '<a href="javascript:' + result.list[c].operatemethod + '(\'' + userId + '\');" >' + result.list[c].operatetitle + '</a>&nbsp;';
                }
            }
        }
    }
    // console.log(backHtml);
    return backHtml;
}

function getOpBar(){
    var backHtml="";
    if(result.bar.length>0) {
        for (var c = 0; c < result.bar.length; c++) {

                backHtml += '<button class="btn" type="button" onclick="' + result.bar[c].operatemethod + '()">' + result.bar[c].operatetitle + '</button>&nbsp;';
        }
    }
    // console.log(backHtml+"--------------");
    $(".delBrdr2").html(backHtml);
}

function query(userId){
    window.location.href = "resourceCodeView.html?id="+userId;
}

function edit(userId){
    window.location.href = "resourceCodeEdit.html?type=2&addOrUpdate=update&id="+userId;
}

function add(){
    window.location.href = "resourceCodeEdit.html?type=1&addOrUpdate=add";
}