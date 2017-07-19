/**
 * 文件大小转换
 * @param bytes
 * @returns {*}
 */
function bytesToSize(bytes) {
    if(!isNaN(bytes)) {
        if (bytes === 0) return '0 B';
        var k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }else{
        return "-";
    }
}

/**
 * 从字典表里查询下拉菜单，包括 发版类型、资源格式；资源类别 & 类别二级是联动
 *
 */
function findSysDict(divId, type, divIdSecond){
    $.ajax({
        type : "post",
        url : getBasePath() + "sysdict/querySysdict",
        dataType : "json",
        async : false,
        data : {
            type : type
        },
        success:function (data) {
            if(data.status == 0){
                fillSysDict(data.data.data, divId);
                if(type == "resourceType"){
                    // $("#" + divIdSecond).selectBox("setCaption", "请选择", "-1");
                    // $("#" + divIdSecond + " .selectbox_body").empty();
                    $("#" + divId + " ul li").click(function(){
                        findSysDictTwo(divIdSecond, "classTwo", $(this).attr("data-id"));
                    });
                }else if(type == "openType"){
                    //发稿类型改变
                    $("#" + divId + " ul li").on("click", function(){
                        if($(this).attr("data-value") == "add")
                            $(".ipt").val(1);
                        else
                            $(".ipt").val("");
                    });
                }else if(type == "copyright"){
                    //版权的，需要根据选择去指定年份是否必选
                    $("#" + divId + " ul li").on("click", function(){
                        if($(this).attr("data-value") == "deadline"){
                            $(".yearMonth").parent().siblings("dt").children().html("*");
                            $(".yearMonth").removeAttr("disabled");
                            $(".yearMonth").addClass("");
                        }else{
                            $(".yearMonth").parent().siblings("dt").children().html("");
                            $(".yearMonth").attr("disabled", "disabled");
                            $(".yearMonth").val("");
                        }
                    });
                }
            }else{
                alert("获取数据失败！！");
            }
        },
        error:function () {
            alert("获取数据失败！！");
        }
    })
}

function findSysDictTwo(divId, type, parentId){
    //alert(divId);alert(type);alert(parentId);
    $.ajax({
        type : "post",
        url : getBasePath() + "sysdict/querySysdict",
        dataType : "json",
        async : false,
        data : {
            type : type,
            parentId : parentId
        },
        success:function (data) {
            if(data.status == 0){
                fillSysDict(data.data.data, divId);
            }else{
                alert("获取数据失败！！");
            }
        },
        error:function () {
            alert("获取数据失败！！");
        }
    })
}

function fillSysDict(data, divId){
    $("#" + divId).selectBox("setCaption", "请选择", "-1");
    $("#" + divId).find(".selectbox_body").empty();
    $.each(data, function(index, element) {
        //$("#" + divId).selectBox("add", data[index].value, data[index].code, false, true);
        $("#" + divId).find(".selectbox_body").append("<li data-id=\"" + data[index].id + "\" data-value=\"" + data[index].code + "\" title='"+data[index].value+"'>" + data[index].value + "</li>");
    })
}

var ui;
/** 审批人id，name */
var audit_id,audit_name;
/** 保存內容生成的id */
var file_id;
var return_url;
var count_1=1;
var percent;
var return_state;      //状态，是保存还是打回
var id = $.getUrlParam("id"); //得到id
var itemid = $.getUrlParam("itemId");
var resource_type;

function showUpload() {
    var html = '<div class="alertboxB commitB">' +
        "<div class='alertbox commitbox'>" +
        "<h1 class='up_jindu'></h1>" +
        "<div class='bar'><div class='jindu'></div></div>" +
        "<span></span></h3></div>";
    $("body").append(html);
    $('#mask', parent.document).show();
    percent = setInterval("getPercent()", 2000);
}

function inUpload(e) {
    if(e.uploadState==3){          //检测中
        /**上传进度条*/
        $(".up_jindu").html("上传检测");
        $(".jindu").css("width",e.checkComplete+"%");
        $(".alertboxB span").html(e.checkComplete+"%");
    }else if(e.uploadState == 0){   //上传
        $("#fileSize").html(e.fileSize);
    }else if(e.uploadState ==1 ){   //上传
        /**上传*/
        ui.upload();                //上传文件
    }else if(e.uploadState == 6){
        $(".jindu").css("width",e.percentComplete+"%");
        $(".up_jindu").html("上传");
        if(e.percentComplete==undefined){
            $(".alertboxB span").html("0%");
        }else{
            $(".alertboxB span").html(e.percentComplete+"%");
        }
    }else if(e.uploadState == 5) {    //上传完成

    } else if(e.uploadState == 4){
        alert("文件上传失败，请重新上传！！");
        window.location.href = return_url;
    }
}

function getPercent(){
    $.ajax({
        type : "post",
        url : getBasePath() + "percent/calculatePercent",
        dataType : "json",
        data : {resourceId : file_id},
        beforeSend: function(){
// Handle the beforeSend event
        },
        complete: function(){
// Handle the complete event
        },
        success:function (data) {
            console.log("now:" + data);
            if(data > 50){
                $(".jindu").css("width", data + "%");
                $(".alertboxB span").html(data + "%");
            }
            if(data == 100){
                $(".jindu").css("width", "100%");
                $(".alertboxB span").html("100%");
                $(".alertboxB.commitB").hide();
                if(count_1 == 1){
                    count_1++;
                    if(return_state == 4){
                        reStartProcess();
                    }else{
                        startProcess(file_id);
                    }
                }
                window.clearInterval(percent);
            }

        },
        error:function () {

        }
    });
}

/** 获取资源信息审核人 */
function getAudit(resourceType, subjectId) {
    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/getIdleResourceApp",
        dataType:"json",
        async : false,
        data:{
            resourceType:resourceType,
            subjectId : subjectId
        },
        success:function (data) {
            if(data.status==0){
                //alert("id：" + data.data.data.id + "-----name:" + data.data.data.username);
                if(data.data.data != null){
                    audit_id = data.data.data.id;
                    audit_name = data.data.data.username;
                    $("#audit_name").html(audit_name);
                }else{
                    alert("没有审核人");
                    window.location.href = return_url;
                }
            }else{
                alert("获取资源信息审核人失败!");
                window.location.href = return_url;
                // window.history.go(-1);
            }
        },
        error:function () {
            alert("获取资源信息审核人失败!!");
            window.location.href = return_url;
            // window.history.go(-1);
        }
    });
}

/** 资源发起流程 */
function startProcess(id){
    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/startWorkFlow",
        dataTpe:"json",
        data:{
            id:id,
            approveUserId:audit_id,
            approveUserName:audit_name
        },
        success:function (data) {
            var data=JSON.parse(data);
            if(data.status=="0"){
                alert("提交成功")
            }else{
                alert("提交失败，请在编辑页重新提交！！");
            }
            window.location.href = return_url;
            // window.history.go(-1);
        },
        error:function () {
            alert("提交失败，请在编辑页重新提交！！");
            window.location.href = return_url;
            // window.history.go(-1);
        }
    })
}

/** 被打回提交流程 */
function reStartProcess(){
    $.ajax({
        type : "post",
        url : getBasePath() + "vettingRest/submitTask",
        dataType : "json",
        data : {
            busiId : id,
            busiType : resource_type,
            isPass : "pass"
        },
        success:function(data) {
            if(data.message == "success"){
                alert("提交成功");
            }else{
                alert("提交失败，请在编辑页中重新提交");
            }
            window.location.href = return_url;
        },
        error:function(){
            alert("出错了");
            window.location.href = return_url;
        }
    });
}

/** 新增获取session中的user */
function getSession(){
    $.ajax({
        type : "post",
        url : getBasePath() + "userRest/getSession",
        dataType : "json",
        data : {},
        success:function(data) {
            if(data.status == 0){
                $("#createUserName").html(data.data.createUserName);
                $("#createTime").html(data.data.createTime);
            }else{
                alert("获取用户失败！");
                window.location.href = return_url;
            }
        },
        error:function(){
            alert("获取用户失败！");
            window.location.href = return_url;
        }
    });
}

function download1(id){
    //console.log(id);
    //window.location.href = getBasePath() + "resourceInfoRest/download?id=" + id;
    $("#download").attr("src", getBasePath() + "resourceInfoRest/download?id=" + id);
}

function initDownloadBtn(id){
    $("#download_btn").on("click", function(){
        download1(id);
    });
}

function checkState(state, filePath, suffix){
    var message = "";
    if(state == "2"){
        message = "正在转换中，请稍后...&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='javascript:location.reload();'>刷新</a>";
    }else if(state == "4"){
        message = "转换失败，请联系管理员&nbsp;&nbsp;&nbsp;&nbsp;";
    }else if(state == "3"){
        preview.init(suffix, getServerPath() + filePath, "preview");
    }else{
        if(suffix == "jpg" || suffix == "png" || suffix == "gif" || suffix == "jpeg" || suffix == "bmp" || suffix == "swf"){
            preview.init(suffix, getServerPath() + filePath, "preview");
        }else if(suffix == "mp3" || suffix == "wav" || suffix == "ogg"){
            message = "<div style='width:100%;height:100%;'><audio src=\"" + getServerPath() + filePath + "\" width=\"100%\" controls>您的浏览器不支持 audio 标签</audio></div>";
        }else{
            message = "<div style='width:100%;height:100%;'>" + "此文件暂不支持预览" + "</div>";
        }
        //message = "<div style='width:100%;height:100%;'>" + message + "</div>";
    }
    $("#preview").before(message);
}