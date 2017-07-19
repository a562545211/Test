/**
 * Created by jichao on 2016/10/28.
 */

var pagination = new Pagination("/resourceManage/selectResourceManageListForPageAsRecycle", "page", function (data) {
    fillTableData(data)
});

$(function(){
//日历组件初始化代码
    $("#dates_start1").datetimepicker({
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
    knowledgesAttribute(4, getBasePath()+"knowledge/getKnowledgesByCascade", {});
    $("#onShelves").on("click", function(){
        onShelvesByIds();
    });
    searchPage();


    /** 清空搜索条件 */
    $(".btn-grey").on("click", function(){
        clearData();
    });

});

/** 清空查询条件function*/
function clearData() {
    /*资源编号*/
    $("#selectbox0").selectBox("selectForIndex",0);
    $("#search").val("");
    /*分类*/
    $(".edit-All a:first").addClass("selected").siblings().removeClass("selected");
    /*资源属性*/
    $("#selectbox1").selectBox("setCaption","学科","-1");
    $("#selectbox2").selectBox("setCaption","学段","-1");
    $("#selectbox3").selectBox("setCaption","版本","-1");
    $("#selectbox4").selectBox("setCaption","册次","-1");
    $("#selectbox5").selectBox("setCaption","章","-1");
    $("#selectbox6").selectBox("setCaption","节","-1");
    $("#selectbox7").selectBox("setCaption","目","-1");
    $("#selectbox8").selectBox("setCaption","课时","-1");
    /*知识点*/
    $("#selectboxKnowledge1").selectBox("setCaption","一级知识点","-1");
    $("#selectboxKnowledge2").selectBox("setCaption","二级知识点","-1");
    $("#selectboxKnowledge3").selectBox("setCaption","三级知识点","-1");
    $("#selectboxKnowledge4").selectBox("setCaption","四级知识点","-1");
    /*上传时间*/
    $("#dates_start1").val("");
    $("#dates_end1").val("");
}


function searchPage(page){
    pagination.search(getParams(), page);
}

function getParams(){
    //资源属性
    var categoresCode = "";
    for(var i = 1; i < 9; i++){
        var select_value = $("#selectbox" + i + " .selectbox_selected").attr("data-id");
        if(select_value == null){
            break;
        }else{
            if(i == 1){
                categoresCode = select_value;
            }else{
                categoresCode += "," + select_value;
            }
        }
    }
    //知识点
    var knowledgeCode = "";
    for(var i = 1; i < 5; i++){
        var select_value = $("#selectboxKnowledge" + i + " .selectbox_selected").attr("data-id");
        if(select_value == null){
            break;
        }else{
            if(i == 1){
                knowledgeCode = select_value;
            }else{
                knowledgeCode += "," + select_value;
            }
        }
    }
    //得到搜索条件
    var term = $(".selectbox_selected").attr("data-value");
    var term_value = $(".search").val();
    //得到类型
    var resourceType = $(".content-subnav").find(".selected").attr("data-value");
    resourceType = resourceType == undefined ? "" : resourceType;
    //时间
    var startTime = $("#dates_start1").val();
    var endTime = $("#dates_end1").val();
    var params = {
        categoresCode : categoresCode,
        knowledgeCode : knowledgeCode,
        resourceType : resourceType,
        startTime : startTime,
        endTime : endTime
    };
    params[term] = term_value;
    // alert(categoresCode);
    // alert(knowledgeCode);
    //console.log(params);
    return params;
}

function fillTableData(data){
    //console.log(data);
    //清空table
    $(".table_01 tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var id = data[i].id;

        var resourceFileCode =getValue(data[i].resourceFileCode);    //资源编号
        var resourceName = getValue(data[i].resourceName);           //资源名称
        var daxiao = bytesToSize(data[i].fileSize);                     //大小
        var resourceType = data[i].resourceType;                     //分类
        var showResourceType = checkResourceType(resourceType);  //分类显示
        var phase = getValue(data[i].phase);                         //学段
        var subject = getValue(data[i].subject);                     //学科
        var resourceFormatValue = getValue(data[i].resourceTypeOneLevelValue);//资源格式
        var resourceSource = getValue(data[i].resourceSource);         //资源来源
        var createUserName = getValue(data[i].createUserName);         //创建用户姓名
        var createDateTime = getValue(data[i].createDateTime.split(" ")[0]);//创建时间
        var approver = getValue(data[i].approver);                        //当前审批人

        var jumpUrl = "";
        if(resourceType == "ORI"){
            jumpUrl = "yulan_orig";
        }else if(resourceType == "PRO"){
            jumpUrl = "yulan_proj";
        }else if(resourceType == "END"){
            jumpUrl = "yulan_once";
        }

        result += "<tr>"
            + "<td><input type=\"checkbox\" class=\"item-check\" value=\"" + id + "\"></td>"
            + "<td>" + resourceFileCode + "</td>"
            + "<td>" + resourceName + "</td>"
            + "<td>" + daxiao + "</td>"
            + "<td>" + showResourceType + "</td>"
            + "<td>" + phase + "</td>"
            + "<td>" + subject + "</td>"
            + "<td>" + resourceFormatValue + "</td>"
            + "<td>" + resourceSource + "</td>"
            + "<td>" + createUserName + "</td>"
            + "<td>" + createDateTime + "</td>"
            // + "<td>" + state_show + "</td>"
            + "<td>" + approver + "</td>"
            + "<td class=\"operate\"><a href=\"" + jumpUrl + ".html?id=" + id + "&state=0\">查看</a> <a href=\"javascript:void(0);\" onClick=\"onShelvesById('" + id + "');\">上架</a></td>";
            + "</tr>";
    }
    $(".table_01").append(result);
}

//判断资源类型
function checkResourceType(type){
    var result = "文件";
    switch(type){
        case "ORI":
            result = "原始" + result;
            break;
        case "PRO":
            result =  "工程" + result;
            break;
        case "END":
            result =  "成品" + result;
            break;
        case "DRA":
            result =  "发稿" + result;
            break;
        default:
            result = "";
            break;
    }
    return result;
}

/**
 * 单个文件上架
 */
function onShelvesById(id){
    $.ajax({
        type : "post",
        url : getBasePath() + "/resourceManage/onShelvesById",
        dataType : "json",
        data : {id : "'" + id + "'"},
        success:function(data) {
            // if(data.status == 0){
                alert(data.message);
                if(data.data.data > 0){
                    searchPage(1);//填充数据
                }
            // }else if(data.status == 3){
            //     alert("没选择需要上架的资源");
            // }else{
            //     alert("出错了");
            // }
        },
        error:function(){
            alert("出错了");
        }
    });
}

/**
 * 多文件上架
 */
function onShelvesByIds(){
    var ids = "";
    $(".item-check:checked").each(function(i, e){
        if(i == 0){
            ids = "'" + $(this).val() + "'";
        }else{
            ids += ",'" + $(this).val() + "'";
        }
    });
    if(ids == ""){
        alert("请选择需要上架的资源");
    }else{
        $.ajax({
            type : "post",
            url : getBasePath() + "/resourceManage/onShelvesById",
            dataType : "json",
            data : {id : ids},
            success:function(data) {
                alert(data.message);
                if(data.data.data > 0){
                    searchPage(1);//填充数据
                }
            },
            error:function(){
                alert("出错了");
            }
        });
    }
}
//判断显示的状态
// function checkState(state){
//     switch(state){
//         case "3":
//             return "<span class=\"passed\">通过</span>";
//         case "4":
//             return "<span class=\"nopassed\">不通过</span>";
//         case "1":
//             return "<span class=\"smt\">待提交</span>";
//         case "2":
//             return "<span class=\"chck\">待审核</span>";
//     }
// }


/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val == undefined) ? '-' : val;
}