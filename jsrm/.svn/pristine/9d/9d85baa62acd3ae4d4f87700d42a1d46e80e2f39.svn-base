/**
 * Created by jichao on 2016/11/3.
 */

var isProj = true;

/** 根据id查询资源内容 */
function getResource(id){
    $.ajax({
        type : "post",
        url : getBasePath() + "resourceManage/selectResourceManageById",
        dataType : "json",
        async : "false",
        data : {id : id},
        success:function(data) {
            if(data.status == 0){
                fillData(data.data);
            }else{
                alert(data.message);
                window.location.href = return_url;
            }
        },
        error:function(){
            alert("出错了");
            window.location.href = return_url;
        }
    });
}

/** 页面赋值 */
function fillData(data){
    //审核引入的页面
    includeExamine(data.id, data.resourceType);
    return_state = data.state;
    $("#createUserName").html(data.createUserName);
    $("#createTime").html(data.createDateTime);
    $("#r_tResourceCodeId").val(data.tResourceCodeId);
    $(".check_show").html(data.tResourceCode);
    $(".iptFl").val(data.resourceName);
    $("#aim").html(data.fileName);
    $("#fileSize").html(bytesToSize(data.fileSize));
    $("#resourceFormat .selectbox_value").html(data.resourceFormatValue);
    $("#resourceFormat .selectbox_body li[data-value=" +data.resourceFormatId + "]").addClass("selectbox_selected");
    $("#resourceDes").val(data.resourceDes);
    $("#original").val(data.original);
    showAllCategories(data.categoresCode, 111);

    if(return_state == 4){
        audit_id = data.approverId;
        audit_name = data.approver;
    }

}

/** 保存 */
function saveResource(type){

    var resourceType = "PRO";
    resource_type = resourceType;
    var fileVal = $("#file").val();
    var fileName = ui.getFileName();
    var tResourceCodeId = $(".checked").parent().parent().attr("data-value");
    tResourceCodeId = tResourceCodeId == undefined ? $("#r_tResourceCodeId").val() : tResourceCodeId;
    var tResourceCode = $(".check_show").html();
    var resourceName = $(".zy_name").val();
    var resourceFormatId = $("#resourceFormat .selectbox_selected").attr("data-value");
    var resourceFormatValue = $("#resourceFormat .selectbox_selected").html();
    var resourceDes = $("#resourceDes").val();
    var original = $("#original").val();
    /*学段*/
    var phaseId = "";
    var phase = "";
    /*学科*/
    var subjectId= "";
    var subject = "";
    //获得关联目录
    var categoresCode = "";
    var attribute_id = "data-value";
    attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
    for(var i = 1; i < 9; i++){
        if(i == 1){
            phaseId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
            phase = $("#selectbox" + i + " li.selectbox_selected").html();
        }else if(i == 2){
            subjectId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
            subject = $("#selectbox" + i + " li.selectbox_selected").html();
        }
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

    if(tResourceCodeId == "" || tResourceCode == "" || resourceName == "" || resourceFormatValue == undefined){
        alert("带*为必填项");
        return;
    }

    if(subjectId == null && subjectId == ""){
        alert("请选择学科");
        return;
    }

    var data = {
        resourceType : resourceType,
        fileName : fileName,
        id : id,
        tResourceCodeId : tResourceCodeId,
        tResourceCode : tResourceCode,
        resourceName : resourceName,
        resourceFormatId : resourceFormatId,
        resourceFormatValue : resourceFormatValue,
        resourceDes : resourceDes,
        original : original,
        categoresCode : categoresCode,
        phaseId : phaseId,
        phase : phase,
        subjectId : subjectId,
        subject : subject
    };

    if(type == 2 && return_state == 1){//如果是保存状态提交
        if(fileVal == ""){//没有选择文件
            alert("请选择文件");
            return;
        }
        getAudit(resourceType, subjectId);
        if(audit_id == null && audit_name == null){
            //alert("没有审批人，不能提交");
            return;
        }
    }

    $.ajax({
        type : "post",
        url : getBasePath() + "resourceManage/updateProFileMessage",
        dataType : "json",
        data : data,
        success:function(data) {
            if(data.status == 0){
                if(type == 1){//只保存
                    alert(data.message);
                    window.location.href = return_url;
                }else {//提交之后上传文件
                    if(fileName != null && fileName != ""){//如果需要上传文件
                        showUpload();
                        file_id = data.data.id;
                        ui.setBusiId(data.data.id);
                        ui.setBusiType(data.data.resourceType);
                        ui.checkFile();
                    }else{//不需要上传文件，直接提交流程
                        reStartProcess();
                    }
                }
            }else{
                if(data.message == "1"){
                    alert("该选题编号已经使用过！");
                }else{
                    alert(data.message);
                    window.location.href = return_url;
                }
            }
        }
    });
}

/** 重置 */
function reset(){
    /**点击重置*/
    /*选题编号*/
    $(".check_show").html("");
    /*资源名称*/
    $(".iptFl").val("");
    /*选择上传文件*/
    $("#aim").html("");
    // $("#fileSize").html("");
    $("#resourceFormat").selectBox("setCaption","请选择","-1");
    $("#selectbox1").selectBox("setCaption","学科","-1");
    $("#selectbox2").selectBox("setCaption","学段","-1");
    $("#selectbox3").selectBox("setCaption","版本","-1");
    $("#selectbox4").selectBox("setCaption","册次","-1");
    $("#selectbox5").selectBox("setCaption","章","-1");
    $("#selectbox6").selectBox("setCaption","节","-1");
    $("#selectbox7").selectBox("setCaption","目","-1");
    $("#selectbox8").selectBox("setCaption","课时","-1");
    for(var i = 2; i <= 8; i++){
        $("#selectbox" + i + " .selectbox_body").empty();
        $("#selectbox"+i).css("background-color","#eaecf2");
    }
    $("#resourceDes").val("");
    $("#original").val("");

}

$(function(){
    
    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
  
    findSysDict("resourceFormat", "resourceFormat");

    getResource(id);
    
    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });

    /** 重置 */
    $(".btn_cz").click(function () {
        reset();
    });

    /** 点击返回 */
    $(".btn_fh").click(function () {
        window.history.go(-1);
    });
});


/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){

}

/** 保存和提交时，判断全选和反选是不是选中 */
function saveJudge(){

}