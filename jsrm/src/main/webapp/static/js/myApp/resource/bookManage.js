/**
 * Created by Administrator on 2016/11/2 0002.
 */

$(function () {
    /**初始化查询*/
    searchPage();

    /**点击查询按钮*/
    $(".btn-check").click(function () {
        /**点击全部等按钮数据适配*/
        searchPage();
    });
});
/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath()+"bookManage/queryAllResourceList", "page", function (data) {
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
    var params = {
        startTime : $("#dates_start1").val(),
        endTime : $("#dates_end1").val(),
        resourceName : $("#resourceName").val(),
        phaseId:$("#selectboxKnowledge1 .selectbox_selected").attr("data-id"),
        subjectId:$("#selectboxKnowledge2 .selectbox_selected").attr("data-id"),
        banben:$("#selectboxKnowledge3 .selectbox_selected").attr("data-id"),
        ceci:$("#selectboxKnowledge4 .selectbox_selected").attr("data-id")

    };
    return params;
}

/** table数据 */
function fillTableData(data){
    $("#table_data tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var id = data[i].id;
        result += "<tr>"
            + "<td><input id='"+id+"' type=\"checkbox\" class=\"item-check\"></td>"
            + "<td>" + data[i].resourceFileCode + "</td>"
            + "<td>" + data[i].resourceName + "</td>"
            + "<td>" + data[i].resourceTypeOneLevelValue + "</td>"
            + "<td>" + data[i].resourceFormatValue + "</td>";
        if(data[i].copyright == 'forever') {
            result += "<td>永久</td>";
        }
        if(data[i].copyright == 'deadline') {
            result += "<td>限期</td>";
        }
        if(data[i].copyright == 'none') {
            result += "<td>无</td>";
        }
        result += "<td>" + getValue(data[i].banname) + "</td>"
            + "<td>" + getValue(data[i].cename) + "</td>"
            + "<td>" + getValue(data[i].resourceMaker) + "</td>"
            + "<td>" + data[i].createUserName + "</td>";
        if(data[i].isOutput == 1){
            result += "<td>可以输出</td>";
        }else{
            result += "<td>取消输出</td>";
        }
        result += "<td class=\"operate\">";
        result += getOp(data[i].isOutput,id);
        result += "</td>";
        result += "</tr>";
    }
    $("#table_data").append(result);
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}

function getOp(data,id){
    var backHtml="";
            if(data == 1){
                backHtml += '<a href="#" onclick="updateOutput(\''+id+'\',0)">取消输出</a>&nbsp;';
            }else{
                backHtml += '<a href="#" onclick="updateOutput(\''+id+'\',1)">输出</a>&nbsp;';
            }
            backHtml += '<a href="yulan_once.html?id='+id+'&isdian=dian">查看</a>&nbsp;';
    return backHtml;
}
function updateOutput(id,state){
    $.ajax({
        type:"post",
        url:getBasePath()+"/bookManage/updateOutput",
        dataType:"json",
        data:{
            "id":id,
            "state":state
        },
        success:function (data) {
            if(data.result=="0"){
                if(state == 0){
                    alert("取消输出成功！");
                }else{
                    alert("输出成功！");
                }
                searchPage(1);
            }
        },
        error:function () {
            alert("更新失败！！！")
        }
    });
}

function outputAll(){
    if(confirm('是否取消？')) {
        var ids = getCBIds(".item-check");
        $.ajax({
            type: "post",
            url: getBasePath() + "/bookManage/updateOutputAll",
            dataType: "json",
            data: {
                "ids": ids
            },
            success: function (data) {
                if (data.result == "0") {
                    alert("取消输出成功！");
                    searchPage(1);
                }
            },
            error: function () {
                alert("更新失败！！！")
            }
        });
    }
}