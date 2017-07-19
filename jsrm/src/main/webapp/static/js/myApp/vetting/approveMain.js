$(function () {
    initPage();     //初始化页面

    window.setInterval(function () {
        iFrameHeight("resourceInfo");        //设置ifream高度
        iFrameHeight("approveInfo");        //设置ifream高度
        //iFrameHeight("approveHistory");        //设置ifream高度
    },500);
})

/**
 * 初始化页面
 */
function initPage() {
    var resourceId = $.getUrlParam("resourceId");       //资源id
    var appId = $.getUrlParam("appId");                 //流程实例id
    var type = $.getUrlParam("type");                   //审批类型

    var resourceInfoUrl = "";           //资源信息url
    var approveUrl = "approveOpinion.html?appId="+appId+"&resourceId="+resourceId+"&type="+type;
    //var approveHistoryUrl = "approveHistory.html?appId="+appId+"&resourceId="+resourceId+"&type="+type;

    if(type == 'DRA') {                 //发稿审批
        resourceInfoUrl = "../topic/checkTopic.html?formpage=app&id="+resourceId;
    } else if(type == 'ORI'){           //原始文件
        resourceInfoUrl = "../resource/yulan_orig.html?formpage=app&id="+resourceId;
    } else if(type == 'PRO') {          //工程文件
        resourceInfoUrl = "../resource/yulan_proj.html?formpage=app&id="+resourceId;
    } else if(type == 'END') {          //成品文件
        resourceInfoUrl = "../resource/yulan_once.html?formpage=app&id="+resourceId;
    }

    window.frames["resourceInfo"].location = resourceInfoUrl;              //资源详细页面
    window.frames["approveInfo"].location = approveUrl;                    //资源审批页面
    //window.frames["approveHistory"].location = approveHistoryUrl;                    //历史审批记录页面
}

/**
 * ifream自适应高度
 * @param obj
 * @constructor
 */
function iFrameHeight(ifreamId) {
    var ifm= document.getElementById(ifreamId);
    var subWeb = document.frames ? document.frames[ifreamId].document : ifm.contentDocument;
    if(ifm != null && subWeb != null) {
        ifm.height = subWeb.body.scrollHeight;
    }
}
