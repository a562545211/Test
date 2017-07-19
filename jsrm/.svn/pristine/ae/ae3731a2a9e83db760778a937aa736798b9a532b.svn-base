/**
 * Created by Administrator on 2016/10/25 0025.
 */

var  return_url=getBasePath()+"static/html/login/login.html";
    
$(function () {
    /**获取资源信息审核人*/
    // getAudit();
    
    /**上传管理*/
    upload();
    function upload(){
        $.ajax({
            type:"post",
            url:getBasePath()+"statistics/statisticsUpload",
            dataType:"json",
            async:false,
            success: function (data) {
                if(data.stats==0){
                    uploadAdapter(data);
                }else{
                    alert("我要上传，数据获取没有成功！！");
                    window.location.href=return_url;
                }
            },
            error: function () {
                alert("我要上传，数据获取没有成功！！");
                window.location.href=return_url;
            }
        });
    }
    function uploadAdapter(data){
        /**待提交*/
        if(data.data.pendingSubmissionUploadNum){
            $(".person_num_sc").eq(0).text(data.data.pendingSubmissionUploadNum);
        }else{
            $(".person_num_sc").eq(0).text("");
        }
        /**待审核*/
        if(data.data.pendingApprovalUploadNum){
            $(".person_num_sc").eq(1).text(data.data.pendingApprovalUploadNum);
        }else{
            $(".person_num_sc").eq(1).text("");
        }
        /**不通过*/
        if(data.data.auditDoesNotPassUploadNum){
            $(".person_num_sc").eq(2).text(data.data.auditDoesNotPassUploadNum);
        }else{
            $(".person_num_sc").eq(2).text("");
        }
    }

    /**选题发稿*/
    draft();
    function draft(){
        $.ajax({
            type:"post",
            url:getBasePath()+"statistics/statisticsDwraft",
            dataType:"json",
            async:false,
            success: function (data) {
                if(data.stats==0){
                    draftAdapter(data);
                }else{
                    alert("我要发稿，数据获取没有成功！！");
                    window.location.href=return_url;
                }
            },
            error: function () {
                alert("我要发稿，数据获取没有成功！！");
                window.location.href=return_url;
            }
        });
    }
    function draftAdapter(data){
        /**待提交*/
        if(data.data.pendingSubmissionDraftNum){
            $(".person_num_fa").eq(0).text(data.data.pendingSubmissionDraftNum);
        }else{
            $(".person_num_fa").eq(0).text("");
        }
        /**待审核*/
        if(data.data.pendingApprovalDraftNum){
            $(".person_num_fa").eq(1).text(data.data.pendingApprovalDraftNum);
        }else{
            $(".person_num_fa").eq(1).text("");
        }
        /**终审核*/
        if(data.data.finalJudgmentDwraftNum){
            $(".person_num_fa").eq(2).text(data.data.finalJudgmentDwraftNum);
        }else{
            $(".person_num_fa").eq(2).text("");
        }
        /**已退回*/
        if(data.data.pendingBackDraftNum){
            $(".person_num_fa").eq(3).text(data.data.pendingBackDraftNum);
        }else{
            $(".person_num_fa").eq(3).text("");
        }
    }
    
    /**资源审核*/
    check();
    function check(){
        $.ajax({
            type:"post",
            url:getBasePath()+"statistics/statisticsResource",
            dataType:"json",
            async:false,
            success: function (data) {
                if(data.stats==0){
                    checkAdapter(data);
                }else{
                    alert("我要审核，数据获取没有成功！！");
                    window.location.href=return_url;
                }
            },
            error: function () {
                alert("我要审核，数据获取没有成功！！");
                window.location.href=return_url;
            }
        });
    }
    function checkAdapter(data){
        /**上传待审核*/
        if(data.data.uploadpendingApprovalResourceNum){
            $(".person_num_sh").eq(0).text(data.data.uploadpendingApprovalResourceNum);
        }else{
            $(".person_num_sh").eq(0).text("");
        }
        /**发稿待审核*/
        if(data.data.dwraftPendingApprovalResourceNum){
            $(".person_num_sh").eq(1).text(data.data.dwraftPendingApprovalResourceNum);
        }else{
            $(".person_num_sh").eq(1).text("");
        }
        /**发稿待综核*/
        if(data.data.dwraftFinalJudgmentResourceNum){
            $(".person_num_sh").eq(2).text(data.data.dwraftFinalJudgmentResourceNum);
        }else{
            $(".person_num_sh").eq(2).text("");
        }
    }


    /*上传管理点击*/
    $("#sc").click(function () {
        var liList=$(window.parent.document).find("li");
        for(var i=0;i<liList.length;i++){
            if(liList.eq(i).text()=="资源管理"){
                liList.eq(i).addClass("active").siblings().removeClass("active");
            }
        }
    });

    /*选题发稿点击*/
    $("#fg").click(function () {
        var liList=$(window.parent.document).find("li");
        for(var i=0;i<liList.length;i++){
            if(liList.eq(i).text()=="选题发稿"){
                liList.eq(i).addClass("active").siblings().removeClass("active");
            }
        }
    });

    /*资源审核点击*/
    $("#sh").click(function () {
        var liList=$(window.parent.document).find("li");
        for(var i=0;i<liList.length;i++){
            if(liList.eq(i).text()=="资源审核"){
                liList.eq(i).addClass("active").siblings().removeClass("active");
            }
        }
    })



});

/**获取当前登录人信息*/
function getAudit(){
    $.ajax({
        type : "post",
        url : getBasePath() + "vettingRest/getIdleResourceApp",
        dataType : "json",
        data : {resourceType : "ORI"},
        success:function(data) {
            if(data.status == 0){
                //alert("id：" + data.data.data.id + "-----name:" + data.data.data.username);
                audit_id = data.data.data.id;
                audit_name = data.data.data.username;
                $("#audit_name").html(audit_name);
            }else{
                alert("获取资源信息审核人失败！！");
                window.location.href = return_url;
            }
        },
        error:function(){
            alert("出错了");
            window.location.href = return_url;
        }
    });
}