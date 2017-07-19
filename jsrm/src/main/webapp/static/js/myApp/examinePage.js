/**
 * Created by jichao on 2016/11/15.
 * 引入审核页面
 */

function includeExamine(id, type){
    //审核引入的页面
    var approveHistoryUrl = "../vetting/approveHistory.html?resourceId=" + id + "&type=" + type;
    $("#approveHistory").attr("src", approveHistoryUrl);

    var first = window.frames["approveHistory"].document.body.offsetHeight;
    var last;
    var intv = setInterval(function(){
        last = window.frames["approveHistory"].document.body.offsetHeight;
        if(first != last){
            window.clearInterval(intv);
        }
        $("#approveHistory").height(last);
        //console.log("wocao");
    }, 1000);
}
