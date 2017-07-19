
/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath() + "/vettingRest/queryTopicVetted", "page", function (data) {
    fillTableData(data)
});


$(function(){
    $("#btn_bc").bind("click", function() {      //查询按钮绑定事件
        searchPage(1);
    });

    $("#btn_cz").bind("click", function() {      //重置按钮
        $("#resourceTopicCode").val('');
        $("#resourceName").val('');
        $("#taskStartTime").val('');
        $("#taskEndTime").val('');
        $("#createUserName").val('');
    });

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
                var resourceFileCode = getVlaue(data[i].resourceFileCode);
                var resourceName = getVlaue(data[i].resourceName);
                var resourceFormatValue = getVlaue(data[i].resourceTypeOneLevelValue);
                var createDateTime = "-";
                if (data[i].createDateTime != null && data[i].createDateTime != undefined) {
                    createDateTime = data[i].createDateTime.split(" ")[0];
                }
                var taskEndTime = "-";
                if (data[i].taskEndTime != null && data[i].taskEndTime != undefined) {
                    taskEndTime = data[i].taskEndTime;

                    taskEndTime = taskEndTime.substr(0, taskEndTime.lastIndexOf("."));
                }

                var resourceType = getResouceType(data[i].resourceType);
                var createUserName = getVlaue(data[i].createUserName);
                var state = data[i].state;
                var stateValue = getState(state);
                var opinion = getVlaue(data[i].opinion);
                var isPass;
                if(data[i].operateType == 'trans'){
                    isPass="转发";
                }else {
                    isPass = data[i].isPass == "pass" ? "通过" : "未通过";
                }
                if (state != '0') {
                    result += "<tr>"
                        + "<td><input type=\"checkbox\" class=\"item-check\"></td>"
                        + "<td>" + resourceFileCode + "</td>"
                        + "<td>" + resourceName + "</td>"
                        + "<td>" + resourceFormatValue + "</td>"
                        + "<td>" + createUserName + "</td>"
                        + "<td>" + createDateTime + "</td>"
                        + "<td>" + isPass + "</td>"
                        + "<td>" + taskEndTime + "</td>"
                        + "<td>" + opinion + "</td>"
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
        resourceFileCode : $("#resourceTopicCode").val(),
        resourceName : $("#resourceName").val(),
        taskStartTime : $("#taskStartTime").val(),
        taskEndTime : $("#taskEndTime").val(),
        createUserName : $("#createUserName").val()
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
 * 获取资源类型
 * @param type
 * @returns {string}
 */
function getResouceType(_type) {
    var type = '';
    switch (_type) {
        case "ORI":
            type = "原始文件";
            break;
        case "PRO":
            type = "工程文件";
            break;
        case "END":
            type = "成品文件";
            break;
    }

    return type;
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