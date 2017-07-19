/**
 * Created by Administrator on 2016/11/2 0002.
 */

var ui;

$(function () {
    /*三个参数*/
    var fileId=$("#file").attr("id");  //input type="file" id
    var busiId="";                     //文件ID
    var busiType="ORI";                //文件类型：ORI 原始  PRO 工程 END 成品  DRA 发稿
    /**
    * 获取id
    * */
    $.ajax({
        type:"post",
        url:getBasePath()+'resourceInfoRest/getResourceUUID',
        dataType:"json",
        success:function (data) {
            if(data.status==0){
                IDAdapter(data.data);
            }else{
                console.log("获取ID失败！！");
            }
        },
        error:function () {
            console.log("获取ID失败！！");
        }
    });
    function IDAdapter(data) {
        busiId=data.id;
        ui = new html5MultUpload("file", busiId, busiType, function (e) {
            
            console.log("uploadState=" + e.uploadState);
            console.log("percentComplete=" + e.percentComplete);
            console.log("checkComplete=" + e.checkComplete);
            if(e.uploadState == 3){     //检测中
                /*上传进度条*/
                $(".up_jindu").html("上传检测");
                $(".jindu").css("width",e.checkComplete+"%");
                $(".alertboxB span").html(e.checkComplete+"%");
            }else if(e.uploadState == 1){   //上传
                /*上传*/
                ui.upload();   //上传文件
                $(".jindu").css("width",e.percentComplete+"%");
                $(".up_jindu").html("上传");
                if(e.percentComplete==100){
                    $(".alertboxB span").html("100%");
                }else if(e.percentComplete==undefined){
                    $(".alertboxB span").html("0%");
                }else{
                    $(".alertboxB span").html(e.percentComplete+"%");
                }
            } else if(e.uploadState == 5) {    //上传完成
                // alert("上传完成！！");
                $(".alertboxB.commitB").hide();
            }
        });
    }
    /**
     * 点击提交按钮
     * */
    $('.btn_tj_alert').click(function(){
        ui.checkFile();
    })
});