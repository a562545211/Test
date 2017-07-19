$(function () {
    showApproveHistory();
})

/**
 * 显示审批历史记录
 */
function showApproveHistory() {

    var busiId = $.getUrlParam("resourceId");
    var busiType = $.getUrlParam("type");

    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/getVettingHistory",
        dataType:"json",
        async:false,
        data:{
            "id":busiId,
            "resouceType":busiType
        },
        success:function (data) {
            if(data.status==0){
                approveHistory(data.data.data);
            }else{
                alert("获取信息失败！！");
            }
        },
        error:function () {
            alert("获取信息失败！！");
        }
    })
}

/**
 * 显示历史记录
 * @param data
 */
function approveHistory(data) {
    if(data!=null && data!=undefined && data.length>0) {
        var showHtml = "";

        for (var i=0; i<data.length; i++) {

            if( data[i].busiType!='DRA' && data[i].createUserId == data[i].approveUserId) {         //上传审核不显示初审人审批记录
                continue;
            }
            showHtml += "<div class=\"shenhe\">";
            showHtml += "<div class=\"clear\"><span class=\"edit-word-long no_check\">"+data[i].nodeName+"</span>"+getValue(data[i].approveUserName)+"</div>";
            showHtml += "<div class=\"clear\"><span class=\"edit-word-long no_check\">审核结果</span>"+getReslutVal(data[i].isPass,data[i].operateType)+"</div>";
            showHtml +="<div class=\"clear\"><span class=\"edit-word-long no_check\">审核日期</span>"+getValue(data[i].taskEndTime)+"</div>";
            showHtml +="<dl>";
            showHtml +="<dt class='no_check'>审批意见</dt>";
            showHtml +="<dd class=\"textarea\"><textarea readonly=\"readonly\">"+getValue(data[i].opinion)+"</textarea></dd>";
            showHtml +="</dl> </div>";
        }

        $("#show").append(showHtml);
    }
}

function getValue(val) {
    return val!=undefined?val:"";
}

function getReslutVal(val,trans) {
    if(trans == 'trans'){
        return "转发";
    }else{
        return val=="pass"?"通过":"不通过";
    }
}