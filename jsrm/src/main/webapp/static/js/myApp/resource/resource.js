/**
 * Created by Administrator on 2016/11/2 0002.
 */

var state = $.getUrlParam("state");
var itemid = $.getUrlParam("itemId");

$(function () {

    if(state != null && state != "null"){
        $(".resource-All a").removeClass("selected");
        $(".resource-All a[data-value=" + state + "]").addClass("selected");
    }

    /** 清空搜索条件 */
    $(".btn-grey").on("click", function(){
        clearData();
        /**资源管理*/
        $(".resource-All a:first").addClass("selected").siblings().removeClass("selected");
    });

    /**初始化查询*/
    searchPage();

    /**资源管理上面按钮（切换）*/
    $(".resource-All").on("click","a",function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        /**清空搜索条件*/
        clearData();
        /**点击全部、待提交、待审核、已通过、已退回按钮切换数据*/
        searchPage();
    });

    /**点击查询按钮*/
    $(".btn-check").click(function () {
        /**点击全部等按钮数据适配*/
        searchPage();
    });


    /** 清空查询条件function*/
    function clearData() {
        /*资源编号*/
        $("#selectbox0").selectBox("selectForIndex",0);
        $("#search").val("");
        /*分类*/
        $(".edit-All a:first").addClass("selected").siblings().removeClass("selected");
        /*资源属性*/
        $("#selectbox1").selectBox("setCaption","学段","-1");
        $("#selectbox2").selectBox("setCaption","学科","-1");
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

    
    /**点击删按钮*/
    $("#btn_remove").click(function () {
        var allId='';
        for(var i=1;i<11;i++){
            // console.log($("#table_data input").eq(i).prop("checked"));
            if($("#table_data input").eq(i).prop("checked")){
                //console.log($("#table_data input").eq(i).val());
                //alert($("#table_data input").eq(i).val() + "------------" + pagination.getsessionUserId());
                if($("#table_data input").eq(i).val() != pagination.getsessionUserId()){
                    alert("不能删除其他人的资源");
                    return;
                }
                var everyId=$("#table_data input").eq(i).parent().parent().data("id");
                allId+=everyId+","
            }
        }
        console.log(allId.slice(0,-1));
        if(allId.slice(0,-1)==""){
            alert("没有要删除的数据！！")
        }else{
            if(confirm("你确定要删除？？")){
                $.ajax({
                    type:"post",
                    url:getBasePath()+"resourceInfoRest/deleteResources",
                    dataType:"json",
                    data:{
                        deleteIds:allId.slice(0,-1)
                    },
                    success:function (data) {
                        if(data.status =="0"){
                            alert("删除成功");
                            searchPage();
                            //window.location.href="resource.html";
                            // window.location.reload();//刷新当前页面
                        }else{
                            alert("删除数据失败了！！！！！");
                        }
                    },
                    error:function () {
                        alert("删除数据失败！！");
                    }
                });
            }
        }
    });
});
/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath()+"resourceInfoRest/queryAllResourceList", "page", function (data) {
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
    /** 获得关联目录 */
    var categoresCode = "";
    var attribute_id = "data-value";
    attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
    for(var i = 1; i < 9; i++){
        var select_value = $("#selectbox" + i + " .selectbox_selected").attr(attribute_id);
        if(select_value == undefined){
            break;
        }else{
            if(i == 1){
                categoresCode = select_value;
            }else{
                categoresCode += "," + select_value;
            }
        }
    }
    /** 资源编号、资源名称、上传者 */
// var number=$("#selectbox0 .selectbox_selected").data("value");
    var number=$("#selectbox0 .selectbox_selected").attr("data-value");
    var resourceFileCode = "";
    var resourceName  = "";
    var createUserName = "";
    if(number==0){
        resourceFileCode = $("#search").val().trim();
        resourceName  = "";
        createUserName = "";
    }else if(number==1){
        resourceFileCode = "";
        resourceName  = $("#search").val().trim();
        createUserName = "";
    }else if (number==2){
        resourceFileCode = "";
        resourceName  = "";
        createUserName = $("#search").val().trim();
    }
    /** 知识点 */
    var knowledgeCode = "";
    for(var j = 1; j < 5; j++){
        var select_valueID = $("#selectboxKnowledge" + j + " .selectbox_selected").attr("data-id");
        if(select_valueID == undefined){
            break;
        }else{
            if(j == 1){
                knowledgeCode = select_valueID;
            }else{
                knowledgeCode += "," + select_valueID;
            }
        }
    }
    // alert("发稿状态:"+$(".resource-All a.selected").data("value"));
    // alert("上传开始时间:"+$("#dates_start1").val());
    // alert("上传结束时间:"+$("#dates_end1").val());
    // alert("资源编号:"+resourceFileCode);
    // alert("资源名称:"+resourceName);
    // alert("上传者:"+createUserName);
    // // alert(classify);
    // console.log("资源类型:"+$(".edit-All a.selected").data("value"));
    // alert(number);
    // alert("资源属性:"+categoresCode);
    // alert("知识点:"+knowledgeCode);
    var params = {state:$(".resource-All a.selected").data("value"),     //发稿状态
        startTime : $("#dates_start1").val(),                            //上传开始时间
        endTime : $("#dates_end1").val(),                                //上传结束时间
        // tResourceCode  : tResourceCode ,                             //资源编号
        resourceFileCode : resourceFileCode,                             //资源编号
        resourceName : resourceName,                                     //资源名称
        createUserName : createUserName,                                 //上传者
        resourceType : $(".edit-All a.selected").data("value"),          //资源类型
        categoresCode:categoresCode,                                     //资源属性
        knowledgeCode:knowledgeCode                                      //知识点
    //资源属性
    };
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
        //$("#resource").empty().append("<div style=\"margin-top: 10px; text-align: center; width: 100%; height: 100%;\"><img src=\"../../images/resource_default.png\"></div>");
    }else{
        $("#table_data").show();
        $(".delBrdr").show();
        $(".default-prompt").hide();
        var result = "";
        for(var i = 0; i < data.length; i++){
            var resourceFileCode = getValue(data[i].resourceFileCode);      //资源编号
            var resourceName  = getValue(data[i].resourceName);             //资源名称
            var fileSize  = getValue(data[i].fileSize);                     //大小
            //var resourceType = getResourceType(data[i].resourceType);       //分类
            var phase  = getValue(data[i].phase);                           //学段
            var subject  = getValue(data[i].subject);                       //学科
            var resourceFormatValue  = getValue(data[i].resourceTypeOneLevelValue);//资源格式
            var resourceSource  = getValue(data[i].resourceSource);          //资源来源
            var createUserName  = getValue(data[i].createUserName);          //创建用户姓名
            var createDateTime = "";
            if(data[i].createDateTime != null){
                createDateTime = data[i].createDateTime.split(" ")[0];       //创建时间
            }
            
            var state=Number(data[i].state);
            // console.log(typeof state);
            var stateValue = getStateValue(state);                           //状态
            // console.log(stateValue);
            var approver=getValue(data[i].approver);                         //当前审批人
            // var checkState = getCheckState(state);
            var id = data[i].id;
            var createUserId = data[i].createUserId;//创建人id
            var filePath = (data[i].filePath == null ? "" : data[i].filePath).replace(/\\/g, "/");//文件路径

            //定义类型
            var resourceType = data[i].resourceType;
            var preview_url;//预览的url
            var edit_url;//编辑的url
            switch (resourceType){
                case "ORI":
                    preview_url = "yulan_orig";
                    edit_url = "edit_orig";
                    break;
                case "PRO":
                    preview_url = "yulan_proj";
                    edit_url = "edit_proj";
                    break;
                case "END":
                    preview_url = "yulan_once";
                    edit_url = "edit_once";
                    break;
            }

            var showResourceType = getResourceType(resourceType);       //分类

            result += "<tr data-id='"+id+"'>"
                + "<td><input type=\"checkbox\" class=\"item-check\" value=\"" + createUserId + "\"";
            if(state != 1 && state != 4){
                result += " disabled";
            }
            result += "></td>"
                + "<td>" + resourceFileCode + "</td>"
                + "<td>" + resourceName + "</td>"
                + "<td>" +bytesToSize( fileSize )+ "</td>"
                + "<td>" + showResourceType + "</td>"
                + "<td>" + phase + "</td>"
                + "<td>" + subject + "</td>"
                + "<td>" + resourceFormatValue + "</td>"
                + "<td>" + resourceSource + "</td>"
                + "<td>" + createUserName + "</td>"
                + "<td>" + createDateTime + "</td>"
                + "<td>"+stateValue+"</td>"
                +"<td>" + approver + "</td>"
                + "<td class='operate'><a href='" + preview_url + ".html?id=" + id + "&itemId=" + itemid + "'>查看</a> "
            ;
            if((state == 1 || state == 4) && createUserId == pagination.getsessionUserId()){//编辑可选
                result += "<a href='" + edit_url + ".html?id="+id+"&itemId="+itemid+"'>编辑</a> ";
            }else{
                result += "<span>编辑</span> ";
            }
            if(state != 1){//下载可选
                result += "<a href=\"javascript:void(0);\" onclick=\"download1('" + id + "');\">下载</a>";
            }else{
                result += "<span>下载</span>";
            }
            result +="</td></tr>";
        }
        $("#table_data").append(result);
    }
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}

/** 获取状态值 */
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
            stateValue = "<span class='passed'>通过</span></td>";
            break;
        case 4:
            stateValue = "<span class='nopassed'>不通过</span></td>";
            break;
    }
    return stateValue;
}

/** 文件判断 */
function getResourceType(state){
    var resourceType = "";
    switch (state) {
        case "ORI":
            resourceType ="原始文件";
            break;
        case "PRO":
            resourceType = "工程文件";
            break;
        case "END":
            resourceType ="成品文件";
            break;
    }
    return resourceType;
}


