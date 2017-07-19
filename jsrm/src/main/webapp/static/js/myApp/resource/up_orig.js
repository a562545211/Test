/**
 * Created by Administrator on 2016/11/2 0002.
 */

/** 保存 */
function saveResource(type){
    var resourceType = "ORI";
    /** 保存和提交时，判断全选和反选是不是选中 */
    saveJudge();
    var fileVal = $("#file").val();
    var tResourceCodeId = $(".checked").parent().parent().attr("data-value");
    var tResourceCode = $(".check_show").html();
    var resourceName = $(".zy_name").val();
    var fileName = ui.getFileName();            //文件名
    var resourceFormatId =$("#resourceFormat li.selectbox_selected").data("value");
    var resourceFormatValue=$("#resourceFormat li.selectbox_selected").html();
    var resourceDes = $("#resourceDes").val();
    var phaseId=$("#selectbox1 li.selectbox_selected").data("id"); //学段ID
    var phase = $("#selectbox1 li.selectbox_selected").html();    //学段
    var subjectId=$("#selectbox2 li.selectbox_selected").data("id"); //学科ID
    var subject = $("#selectbox2 li.selectbox_selected").html();  //学科

    if(tResourceCodeId == "" || tResourceCode == "" || resourceName == "" || resourceFormatValue == undefined){
        alert("带*为必填项");
        return;
    }
    /**获得关联目录*/
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

    if(subjectId == null && subjectId == ""){
        alert("请选择学科");
        return;
    }

    var data = {
        resourceType : 'ORI',
        tResourceCodeId : tResourceCodeId,
        tResourceCode : tResourceCode,
        resourceName : resourceName,
        resourceFormatId : resourceFormatId,
        resourceFormatValue : resourceFormatValue,
        resourceDes : resourceDes,
        categoresCode : categoresCode,
        phaseId:phaseId,
        phase:phase,
        subjectId:subjectId,
        subject:subject
    };

    if(type == 2){
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
        url : getBasePath() + "resourceInfoRest/saveResourceInfo",
        dataType : "json",
        async : false,
        data : data,
        success:function(data) {
            //alert(data.message);
            if(type == 1){//只保存
                alert("保存数据成功！");
                if(data.status == 0){
                    window.location.href = return_url;
                    // window.history.go(-1);
                }
            }else {//提交之后上传文件
                if (data.status == 0) {
                    if($("#file").val() != "") {
                        showUpload();
                        file_id = data.data.data.id;
                        ui.setBusiId(data.data.data.id);
                        ui.setBusiType(data.data.data.resourceType);
                        ui.checkFile();
                    }
                }
            }
        },
        error:function(){
            alert("保存数据或者提交数据没有成功！");
        }
    });
}


/** 保存和提交时，判断全选和反选是不是选中 */
function saveJudge(){
    /*资源名称*/
    if($(".item-check").eq(0).prop("checked")){
        localStorage.setItem("ys-resourceName",$(".iptFl").val());
        // localStorage.setItem("ys-tResourceCode",$(".check_show").html());   //选题编号
        // localStorage.setItem("ys-tResourceCodeId",$(".check_show").attr("id")); //选题编号Id
    }else{
        localStorage.removeItem("ys-resourceName");
        // localStorage.removeItem("ys-tResourceCode");
        // localStorage.removeItem("ys-tResourceCodeId");
    }
    /*资源格式*/
    if($(".item-check").eq(1).prop("checked")){
        localStorage.setItem("ys-resourceFormat",$("#resourceFormat li.selectbox_selected").data("value")); //资源格式
    }else{
        localStorage.removeItem("ys-resourceFormat");
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
        localStorage.setItem("ys-categoresCode",categoresCode);
    }else{
        localStorage.removeItem("ys-categoresCode");
    }
    /*资源描述*/
    if($(".item-check").eq(3).prop("checked")){
        localStorage.setItem("ys-resourceDes",$("#resourceDes").val()); //资源描述
    }else{
        localStorage.removeItem ("ys-resourceDes");
    }
}

/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){
    // var ys_tResourceCode = localStorage.getItem("ys-tResourceCode");   //选题编号
    // var ys_resourceFormat = localStorage.getItem("ys-resourceFormat");//资源格式
   var ys_resourceName = localStorage.getItem("ys-resourceName");   //资源名称
   var ys_resourceFormat = localStorage.getItem("ys-resourceFormat");   //资源格式
   var ys_categoresCode = localStorage.getItem("ys-categoresCode");   //资源属性
   var ys_resourceDes = localStorage.getItem("ys-resourceDes");   //资源描述
    
    /*资源名称*/
    if(ys_resourceName !== null || ys_resourceName !== undefined || ys_resourceName !== ''){
        $(".iptFl").val(ys_resourceName);
       
    }
    /*资源格式*/
    if(ys_resourceFormat !== null || ys_resourceFormat !== undefined || ys_resourceFormat !== ''){
        $("#resourceFormat").selectBox("selectForData", ys_resourceFormat,true);
    }
    /*资源属性*/
    if(ys_categoresCode !== null || ys_categoresCode !== undefined || ys_categoresCode !== ''){
        showAllCategories(ys_categoresCode,"async");
    }
    /*资源描述*/
    if(ys_resourceDes !== null || ys_resourceDes !== undefined || ys_resourceDes !== ''){
        $("#resourceDes").val(ys_resourceDes);
    }
}

$(function () {

    /**获取资源格式*/
    findSysDict("resourceFormat", "resourceFormat");

    /** 进入页面时，判断全选和反选是不是选中 */
    loginJudge();
    
    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
    getSession();
    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });

    /** 点击重置 */
    $(".btn_cz").click(function () {
        /*选题编号*/$.getUrlParam
        $(".check_show").html("");
        /*资源名称*/
        $(".iptFl").val("");
        /*选择上传文件*/
        $("#aim").html("");
        $("#fileSize").html("");
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
        for(var i = 2; i <= 8; i++){
            $("#selectbox" + i + " .selectbox_body").empty();
            $("#selectbox"+i).css("background-color","#eaecf2");
        }
        /*资源描述*/
        $("#resourceDes").val("");
        /*上传文件*/
        // $("#file").on('change', function( e ){
        //     var name = $(this).val();
        //     $("#aim").text(name);
        // });
    });

    /** 点击返回 */
    $(".btn_fh").click(function () {
    	var url= return_url.substring(0, return_url.indexOf("?"));
    	url+="?itemId=1";
        window.location.href = url;
    });
    
});