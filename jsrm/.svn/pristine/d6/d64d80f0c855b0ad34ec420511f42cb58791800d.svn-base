/**
 * Created by Administrator on 2016/10/26 0026.
 */


var state = $.getUrlParam("state");      //判断进入时的状态：待提交、已退回、提交等

var itemid = $.getUrlParam("itemId");

var return_url;

$(function () {
    
    return_url=getBasePath()+ "static/html/topic/topic.html?itemId="+itemid;
    
    if(state != null && state != "null"){      //
        $(".edit-All a").removeClass("selected");
        $(".edit-All a[data-value=" + state + "]").addClass("selected");
    }


    /** 清空搜索条件 */
    $(".btn-grey").on("click", function(){
        clearData(1);
    });

    /**初始化查询*/
    searchPage();

    /**选题发稿标题（切换）*/
    $(".edit-All").on("click","a",function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        /**清空搜索条件*/
        clearData(0);
        /**点击全部、待提交、待审核、已通过、已退回按钮切换数据*/
        searchPage();
    });

    /**点击查询按钮*/
    $(".btn-check").click(function () {
        /**点击全部等按钮数据适配*/
        searchPage();
    });

    /**清空查询条件*/
    function clearData(state) {
        //alert("wocao");
        if(state == 1){
            $(".edit-All a").removeClass("selected");
            $(".edit-All a[data-value='']").addClass("selected");
        }
        $("#dates_start1").val("");
        $("#dates_end1").val("");
        $(".ipt").eq(0).val("");
        $(".ipt").eq(1).val("");
        $(".ipt").eq(2).val("");
    }

    /** 导出 */
    $("#btn_remove").on("click", function(){
       downloadExcel();
    });

    /**点击删除（或者是导出按钮）按钮*/
    // $("#btn_remove").click(function () {
    //     var allId='';
    //     for(var i=1;i<11;i++){
    //         // console.log($("#table_data input").eq(i).prop("checked"));
    //         if($("#table_data input").eq(i).prop("checked")){
    //             var everyId=$("#table_data input").eq(i).parent().parent().data("id");
    //             allId+=everyId+","
    //         }
    //     }
    //     // alert(allId.slice(0,-1));
    //     if(allId.slice(0,-1)==""){
    //         alert("没有要删除的数据！！")
    //     }else {
    //         if (confirm("你确定要删除？？")) {
    //             $.ajax({
    //                 type: "post",
    //                 url: getBasePath() + "resourceInfoRest/deleteResources",
    //                 dataType: "json",
    //                 data: {
    //                     deleteIds: allId.slice(0, -1)
    //                 },
    //                 success: function (data) {
    //                     if (data.status == "0") {
    //                         alert("删除成功");
    //                         // window.location.href = "topic.html";
    //                         window.location.reload();//刷新当前页面
    //                     } else {
    //                         alert("删除数据失败了！！！！！");
    //                     }
    //                 },
    //                 error: function () {
    //                     alert("删除数据失败！！");
    //                 }
    //             });
    //         }
    //     }
    //
    // });

});

/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath()+"/selectTopic/querySelectTopicListForPage", "page", function (data) {
    fillTableData(data)
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
    var params = {state:$(".edit-All a.selected").data("value"),  //选题发稿
        startTime : $("#dates_start1").val().trim(),              //开始时间
        endTime : $("#dates_end1").val().trim(),                  //结束时间
        resourceFileCode : $(".ipt").eq(0).val().trim(),          //资源编号       ？？？？？？
        resourceName : $(".ipt").eq(1).val().trim(),              //资源名称
        createUserName : $(".ipt").eq(2).val().trim()
    };
    // console.log(params);
    return params;
}


/** table数据 */
function fillTableData(data){
    //清空table
    $("#table_data tr:not(:first)").remove();
    if(data.length < 1){
        $("#table_data").hide();
        $(".delBrdr").hide();
        $(".default-prompt").show();
        //$("#resource").append("<div style=\"margin-top: 10px; text-align: center; width: 100%; height: 100%;\"><img src=\"../../images/resource_default.png\"></div>");
    }else{
        $("#table_data").show();
        $(".delBrdr").show();
        $(".default-prompt").hide();
        var result = "";
        // result += "<table cellpadding=\"0\" cellspacing=\"0\" class=\"table_01\" id=\"table_data\">" +
        // "<thead>" +
        // "<tr>" +
        // "<th><input type=\"checkbox\" class=\"all-check\"></th>" +
        // "<th>资源编号</th>" +
        // "<th>资源名称</th>" +
        // "<th>发稿时间</th>" +
        // "<th>发稿人</th>" +
        // "<th>状态</th>" +
        // "<th>当前审核人</th>" +
        // "<th>操作</th>" +
        // "</tr>" +
        // "</thead>";
        for(var i = 0; i < data.length; i++){
            var resourceFileCode = getValue(data[i].resourceFileCode);
            var resourceName  = getValue(data[i].resourceName);
            var createDateTime = getValue(data[i].createDateTime);
            var state = Number(data[i].state);
            var stateValue = getStateValue(state);
            var approver=getValue(data[i].approver);
            var id = data[i].id;
            var createUserId = data[i].createUserId;
            var createUserName = data[i].createUserName;
            result += "<tr data-id='" + id + "' data-state='" + state + "'>"
                + "<td><input type=\"checkbox\" class=\"item-check\"";
            if(state != 3){
                result += " disabled";
            }
            result += "></td>"
                + "<td>" + resourceFileCode + "</td>"
                + "<td>" + resourceName + "</td>"
                + "<td>" + createDateTime + "</td>"
                + "<td>" + createUserName + "</td>"
                + "<td>"+stateValue+"</td>"
                +"<td>" + approver + "</td>"
                + "<td class='operate'><a href='checkTopic.html?id=" + id + "&itemId="+itemid+"'>查看</a>";
            if(state == 0){
                result += ""
            }else if((state == 1 || state == 4) && createUserId == pagination.getsessionUserId()){
                result += "<a href='editTopic.html?id=" + id + "&state="+state+"&itemId="+itemid+"'> | 编辑</a>";
            }else if(state == 2){
                result += "";
            }else if(state ==3){
                result += "<a href=\"" + getBasePath() + "/selectTopic/downloadExcel?id=" + id + "\"> | 导出</a>"
            }
            // else if(state ==4){
            //     result += "<a href='editTopic.html?id=" + id + "&state="+state+"&itemId="+itemid+"'> | 编辑</a>";
            // }
            result += "</td></tr>";
        }
        //result += "</table>";
        $("#table_data").append(result);
    }
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val == undefined) ? '-' : val;
}

/**获取状态值*/
function getStateValue(state) {
    var stateValue = "";
    switch (state) {
        case 0:
            stateValue = "<span>-</span></td>";
            break;
        case 1:
            stateValue = "<span class='smt'>待提交</span></td>";
            break;
        case 2:
            stateValue = "<span class='chck'>待审核</span></td>";
            break;
        case 3:
            stateValue = "<span class='passed'>已通过</span></td>";
            break;
        case 4:
            stateValue = "<span class='nopassed'>已退回</span></td>";
            break;
    }
    return stateValue;
}

/** 下载 */
function downloadExcel(){
    $("#download_frame").empty();
    var ids = new Array();
    var download = true;
    $(".item-check:checked").each(function(i, e){
        if($(this).parent().parent().attr("data-state") == 2){
            download = false;
            return false;
        }
        ids.push($(this).parent().parent().attr("data-id"));
    });
    if(!download){
        alert("待审核的记录不能导出，请去掉后重新尝试");
        return;
    }
    //console.log(ids);
    if(ids.length < 1){
        alert("请选择导出的记录");
        return;
    }
    for(var i = 0; i < ids.length; i++){
        $("#download_frame").append("<iframe src=\"" + getBasePath() + "/selectTopic/downloadExcel?id=" + ids[i] + "\"></iframe>");
    }
}

