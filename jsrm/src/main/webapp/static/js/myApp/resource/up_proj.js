/**
 * Created by jichao on 2016/11/2.
 */

var isProj = true;

/** 保存 */
function saveResource(type){

    var resourceType = "PRO";

    /** 保存和提交时，判断全选和反选是不是选中 */
    saveJudge();
    var fileVal = $("#file").val();
    var tResourceCodeId = $(".checked").parent().parent().attr("data-value");
    var tResourceCode = $(".check_show").html();
    var resourceName = $(".zy_name").val();
    var fileName = ui.getFileName();            //文件名
    var resourceFormatId = $("#resourceFormat .selectbox_selected").attr("data-value");
    var resourceFormatValue = $("#resourceFormat .selectbox_selected").html();
    var resourceDes = $("#resourceDes").val();
    var original = $("#original").val();

    if(tResourceCodeId == "" || tResourceCode == "" || resourceName == "" || resourceFormatValue == undefined){
        alert("带*为必填项");
        return;
    }
    
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

    if(subjectId == null && subjectId == ""){
        alert("请选择学科");
        return;
    }

    var data = {
        resourceType : resourceType,
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
    
    if(type == 2){
        //data["fileSize"] = fileSize;
        data["fileName"] = fileName;
        if(fileVal == ""){//如果是保存状态提交，且没有选择文件
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
        url : getBasePath() + "resourceManage/saveProFileMessage",
        dataType : "json",
        async : false,
        data : data,
        success:function(data) {
            console.log(data);
            if(data.status == 0){
                if(type == 1){//只保存
                    alert(data.message);
                    window.location.href = return_url;
                }else {//提交之后上传文件
                    if(fileName != null && fileName != "") {
                        showUpload();
                        file_id = data.data.id;
                        ui.setBusiId(data.data.id);
                        ui.setBusiType(data.data.type);
                        ui.checkFile();
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

        },
        error:function(){
            // alert("出错了");
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

/** 保存和提交时，判断全选和反选是不是选中 */
function saveJudge(){
    /*资源名称*/
    if($(".item-check").eq(0).prop("checked")){
        localStorage.setItem("gc-resourceName",$(".iptFl").val());
        // localStorage.setItem("gc-tResourceCode",$(".check_show").html());   //选题编号
        // localStorage.setItem("gc-tResourceCodeId",$(".check_show").attr("id")); //选题编号Id
    }else{
        localStorage.removeItem("gc-resourceName");
        // localStorage.removeItem("gc-tResourceCode");
        // localStorage.removeItem("gc-tResourceCodeId");
    }
    /*资源格式*/
    if($(".item-check").eq(1).prop("checked")){
        localStorage.setItem("gc-resourceFormat",$("#resourceFormat li.selectbox_selected").data("value")); //资源格式
    }else{
        localStorage.removeItem("gc-resourceFormat");
    }
    /*资源属性*/
    if($(".item-check").eq(2).prop("checked")){
        /* 获得关联目录 */
        var categoresCode = "";
        var attribute_id = "data-value";
        attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
        for(var i = 1; i < 9; i++){
            if(i == 1){
                phaseId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
            }else if(i == 2){
                subjectId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
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
        /** 保存categoresCode到localStorage*/
        localStorage.setItem("gc-categoresCode",categoresCode);
    }else{
        localStorage.removeItem("gc-categoresCode");
    }
    /*资源描述*/
    if($(".item-check").eq(3).prop("checked")){
        localStorage.setItem("gc-resourceDes",$("#resourceDes").val()); //资源描述
    }else{
        localStorage.removeItem ("gc-resourceDes");
    }
    /*关联原始文件*/
    if($(".item-check").eq(4).prop("checked")){
        localStorage.setItem("gc-original",$("#original").val()); //关联原始文件
    }else{
        localStorage.removeItem ("gc-original");
    }
}

/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){
    // var gc_tResourceCode = localStorage.getItem("gc-tResourceCode");   //选题编号
    // var gc_resourceFormat = localStorage.getItem("gc-resourceFormat");//资源格式
    var gc_resourceName = localStorage.getItem("gc-resourceName");   //资源名称
    var gc_resourceFormat = localStorage.getItem("gc-resourceFormat");   //资源格式
    var gc_categoresCode = localStorage.getItem("gc-categoresCode");   //资源属性
    var gc_resourceDes = localStorage.getItem("gc-resourceDes");   //资源描述
    var gc_original = localStorage.getItem("gc-original");   //关联原始文件

    /*资源名称*/
    if(gc_resourceName !== null || gc_resourceName !== undefined || gc_resourceName !== ''){
        $(".iptFl").val(gc_resourceName);
    }
    /*资源格式*/
    if(gc_resourceFormat !== null || gc_resourceFormat !== undefined || gc_resourceFormat !== ''){
        $("#resourceFormat").selectBox("selectForData", gc_resourceFormat,true);
    }
    /*资源属性*/
    if(gc_categoresCode !== null || gc_categoresCode !== undefined || gc_categoresCode !== ''){
        showAllCategories(gc_categoresCode,"async");
    }
    /*资源描述*/
    if(gc_resourceDes !== null || gc_resourceDes !== undefined || gc_resourceDes !== ''){
        $("#resourceDes").val(gc_resourceDes);
    }
    /*关联原始文件*/
    if(gc_original !== null || gc_original !== undefined || gc_original !== ''){
        $("#original").val(gc_original);
    }
}


$(function(){
    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
    getSession();

    findSysDict("resourceFormat", "resourceFormat");
    

    /** 进入页面时，判断全选和反选是不是选中 */
    loginJudge();

    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });

    /** 重置 */
    $(".btn_cz").click(function () {
        reset();
    });


    /** 点击返回 */
    $(".btn_fh").click(function () {
    	var url= return_url.substring(0, return_url.indexOf("?"));
    	url+="?itemId=1";
        window.location.href = url;
    });

});