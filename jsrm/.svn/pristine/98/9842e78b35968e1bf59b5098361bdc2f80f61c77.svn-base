
/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath() + "/vettingRest/queryTopicVetting", "page", function (data) {
    fillTableData(data)
});

var state = "2";

$(function(){

    $("#btn_bc").bind("click", function() {      //查询按钮绑定事件
        searchPage(1);
    });

    $("#btnBatch").bind("click", function () {           //批量退回绑定事件
        batchGoBack();
    });

    $("#btn_cz").bind("click", function() {      //重置按钮
        $("#resourceTopicCode").val('');
        $("#resourceName").val('');
        $("#taskStartTime").val('');
        $("#taskEndTime").val('');
        $("#createUserName").val('');
    });

    $("#data_all").click(function() {        //全部
        seacheStateData('');
    })
    $("#data_app").click(function() {        //待审批
        seacheStateData(2);
    })
    $("#data_pass").bind("click", function() {       //审批通过
        seacheStateData(3);
    })
    $("#data_noPass").bind("click", function() {     //审批未通过
        seacheStateData(4);
    })

    /**
     * 根据状态查询
     * @param state
     */
    function seacheStateData(_state) {
        state = _state;

        searchPage(1);      //刷新页面
    }

    //日历组件初始化代码
    $("#taskStartTime").datetimepicker({
        value:$("#taskStartTime").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });
    $("#taskEndTime").datetimepicker({
        value:$("#taskEndTime").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });
    checkAll("resource");
    layer('.btn_zf_alert','btn_zf_alertb');


    //初始化查询
    searchPage();
})

/**
 * 列表填充数据
 * @param data
 */
function fillTableData(data) {
    //清空table
    $("#table_data tr:not(:first)").remove();
    if(data.length < 1){
        $("#table_data").hide();
        $(".delBrdr").hide();
        $(".default-prompt").show();
    }else {
        $("#table_data").show();
        $(".delBrdr").show();
        $(".default-prompt").hide();
        var result = "";
        if (data != undefined) {
            for (var i = 0; i < data.length; i++) {
                var appId = data[i].appId;
                var id = data[i].id;
                var resourceTopicCode = getVlaue(data[i].resourceTopicCode);
                var resourceName = getVlaue(data[i].resourceName);
                var resourceFormatValue = getVlaue(data[i].resourceTypeOneLevelValue);
                var createDateTime = "-";
                if (data[i].createDateTime != null && data[i].createDateTime != undefined) {
                    createDateTime = data[i].createDateTime.split(" ")[0];
                }
                var createUserName = getVlaue(data[i].createUserName);
                var state = data[i].state;
                var stateValue = getState(state);
                if (state != 0) {
                    result += "<tr data-id='" + appId + "'>"
                        + "<td><input type=\"checkbox\" class=\"item-check\"></td>"
                        + "<td>" + resourceTopicCode + "</td>"
                        + "<td>" + resourceName + "</td>"
                        + "<td>" + resourceFormatValue + "</td>"
                        + "<td>" + createUserName + "</td>"
                        + "<td>" + createDateTime + "</td>"
                        + "<td>" + stateValue + "</td>"
                        + "<td class=\"operate\">"
                    if (state == '2') {
                        result += "<a href=\"approveMain.html?resourceId=" + id + "&appId=" + appId + "&type=DRA\">审核</a>"
                        result += "&nbsp &nbsp<a href=\"#\" class=\"btn_zf_alert\" onclick=\"showAppUser('" + appId + "')\">转发</a>"
                    }
                    result += "</td>"
                    result += "</tr>";
                }

            }
            $("#table_data").append(result);
        }
    }
}

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
        state : state,
        resourceTopicCode : $("#resourceTopicCode").val(),
        resourceName : $("#resourceName").val(),
        taskStartTime : $("#taskStartTime").val(),
        taskEndTime : $("#taskEndTime").val(),
        createUserName: $("#createUserName").val()
    };

    return params;
}

/**
 * 空值判断
 * @param val
 * @returns {string}
 */
function getVlaue(val) {
    return val == undefined ? "-" : val;
}


/**
 * 获取状态
 * @param state
 * @returns {string}
 */
function getState(_state) {
    var state = '';
    switch (_state) {
        case "1":
            state = "待提交";
            break;
        case "2":
            state = "待审核";
            break;
        case "3":
            state = "已通过";
            break;
        case "4":
            state = "已退回";
            break;
    }

    return state;
}

/**
 * 批量退回
 */
function batchGoBack() {
    var allId='';
    for(var i=1; i<11; i++){
        // console.log($("#table_data input").eq(i).prop("checked"));
        if($("#table_data input").eq(i).prop("checked")){
            var everyId=$("#table_data input").eq(i).parent().parent().data("id");
            allId+=everyId+","
        }
    }
    if(allId == '') {
        return;
    }

    if(confirm("确定批量退回？")) {

        allId = allId.substr(0, allId.length-1);

        $.ajax({
            type:"post",
            url:getBasePath()+"vettingRest/batchGoBack",
            dataType:"json",
            data:{"goBackIds":allId},
            success:function (data) {
                if(data.status==0){
                    var flag = ""+data.data;
                    if(flag == '"2"'){
                        alert("批量退回失败：获取下一环节审批人失败！");
                        return;
                    }

                    alert("批量退回成功！");
                    window.location.reload();
                }else{
                    console.log("批量退回流程失败！");
                }
            },
            error:function () {
                console.log("批量退回流程失败！");
            }
        })
    }
}