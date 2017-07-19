/**
 * Created by Administrator on 2016/11/3 0003.
 */


/**根据id查询资源内容*/
function getResource(id){
    $.ajax({
        type : "post",
        url : getBasePath() + "resourceInfoRest/getResourceInfo",
        dataType : "json",
        data : {id : id},
        success:function(data) {
            if(data.status == 0) {
                fillData(data.data.data);
            }else{
                alert("获取数据失败！！");
                window.location.href = return_url ;
            }
        },
        error:function(){
            alert("出错了");
            window.location.href = return_url ;
        }
    });
}

/**页面赋值*/
function fillData(data){
    //审核引入的页面
    includeExamine(data.id, data.resourceType);
    return_state = data.state;
    $("#r_tResourceCodeId").val(data.tResourceCodeId);
    $(".check_show").html(data.tResourceCode);
    $(".iptFl").val(data.resourceName);
    /*选择上传文件*/
    $("#createUserName").html(data.createUserName);
    $("#createTime").html(data.createDateTime.split(" ")[0]);
    $("#aim").html(data.fileName);
    $("#fileSize").html(bytesToSize(data.fileSize));
    $("#resourceFormat .selectbox_value").html(data.resourceFormatValue);
    $("#resourceFormat .selectbox_body li[data-value=" +data.resourceFormatId + "]").addClass("selectbox_selected");
    $("#resourceDes").val(data.resourceDes);
    showAllCategories(data.categoresCode, 111);
    //拿到审核人
    if(return_state == 4){
        audit_id = data.approverId;
        audit_name = data.approver;
    }
}

/**保存*/
function saveResource(type){

    var resourceType = "ORI";
    resource_type = resourceType;
    var fileVal = $("#file").val();

    var tResourceCodeId = $(".checked").parent().parent().attr("data-value");
    tResourceCodeId = tResourceCodeId == undefined ? $("#r_tResourceCodeId").val() : tResourceCodeId;
    var tResourceCode = $(".check_show").html();
    var resourceName = $(".zy_name").val();
    var fileName = ui.getFileName();
    var resourceFormatId = $("#resourceFormat .selectbox_selected").attr("data-value");
    var resourceFormatValue = $("#resourceFormat .selectbox_selected").html();
    var resourceDes = $("#resourceDes").val();
    //学科学段
    var phaseId = "";
    var phase = "";
    var subjectId = "";
    var subject = "";
    //获得关联目录
    var categoresCode = "";
    var attribute_id = "data-value";
    attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
    for(var i = 1; i < 9; i++){
        if(i == 1){
            phaseId = $("#selectbox" + i + " li.selectbox_selected").data("id");
            phase = $("#selectbox" + i + " .selectbox_selected").html();
        }else if(i == 2){
            subjectId = $("#selectbox" + i + " li.selectbox_selected").data("id");
            subject = $("#selectbox" + i + " .selectbox_selected").html();
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
        id : id,
        tResourceCodeId : tResourceCodeId,
        tResourceCode : tResourceCode,
        resourceName : resourceName,
        fileName : fileName,
        resourceFormatId : resourceFormatId,
        resourceFormatValue : resourceFormatValue,
        resourceDes : resourceDes,
        categoresCode : categoresCode,
        phaseId:phaseId,
        phase:phase,
        subjectId:subjectId,
        subject:subject
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
        url : getBasePath() + "resourceInfoRest/updateResourceInfo",
        dataType : "json",
        data : data,
        success:function(data) {
            if(type == 1){//只保存
                if(data.status == 0){
                    alert("保存数据成功！！");
                }else{
                    alert("保存数据失败！！");
                }
                window.location.href = return_url ;
            }else {//提交之后上传文件
                if (data.status == 0) {
                    if(fileName != null && fileName != ""){//如果需要上传文件
                        showUpload();
                        file_id = data.data.data.id;
                        ui.setBusiId(data.data.data.id);
                        ui.setBusiType(data.data.data.resourceType);
                        ui.checkFile();
                    }else{//不需要上传文件，直接提交流程
                        reStartProcess();
                    }
                }else{//如果后台报错，打印错误信息，返回列表页
                    alert(data.message);
                    window.location.href = return_url;
                }
            }
        },
        error:function(){
            // alert("出错了");
        }
    });

}

$(function () {



    /**获取资源格式*/
    findSysDict("resourceFormat", "resourceFormat");
    //resourceFormat();
    
    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
    // getSysdict();
    getResource(id);

    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });
    
    /**点击重置*/
    $(".btn_cz").click(function () {
        /*选题编号*/
        $(".check_show").html("");
        /*资源名称*/
        $(".iptFl").val("");
        /*选择上传文件*/
        $("#aim").html("");
        /*资源格式*/
        $("#resourceFormat").selectBox("setCaption","未选择","-1");
        /*资源属性*/
        $("#selectbox1").selectBox("setCaption","学科","-1");
        $("#selectbox2").selectBox("setCaption","学段","-1");
        $("#selectbox3").selectBox("setCaption","版本","-1");
        $("#selectbox4").selectBox("setCaption","册次","-1");
        $("#selectbox5").selectBox("setCaption","章","-1");
        $("#selectbox6").selectBox("setCaption","节","-1");
        $("#selectbox7").selectBox("setCaption","目","-1");
        $("#selectbox8").selectBox("setCaption","课时","-1");
        /*资源描述*/
        $("#resourceDes").val("");
        /*选择上传文件*/
        $("#createUserName").html("");
        $("#createTime").html("");
        $(".edit-file").html("");
        // $("#fileSize").html("");
    });
    
    /**点击返回*/
    $(".btn_fh").click(function () {
        window.location.href=return_url;
    });

});

/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){

}

/** 保存和提交时，判断全选和反选是不是选中 */
function saveJudge(){
   
}