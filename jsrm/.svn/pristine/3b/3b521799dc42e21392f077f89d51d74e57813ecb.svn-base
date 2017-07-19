/**
 * Created by xzb on 2016/12/1.
 */
function loadKnowledge(type){
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/queryUserDataAuthority",
        dataType:"json",
        success: function (data) {
            if(data.status=="0"){
                loadKnowledgeAdapter(data.data,type);
            }else{
                alert("获取学段和学科信息失败");
            }
        }
    });
}
function loadKnowledgeAdapter(data,type){
    $("#phasesubject1").find(".selectbox_body").empty();
    $("#phasesubject2").find(".selectbox_body").empty();
    if(type==1){
        $(data).each(function (i,e) {
            if(data[i].deep==1){
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }else{
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }
        })
    }else{
        var numberOne=1;
        var numberTwo=1;
        $(data).each(function (i,e) {
            if(data[i].deep==1&&numberOne==1){
                numberOne++;
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" class='selectbox_selected' title='"+data[i].name+"'>" + data[i].name + "</li>");
                $("#phasesubject1").selectBox("selectForData", data[i].dataAuthorityId,true);
            }else if(data[i].deep==1&&numberOne!=1){
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }else if(data[i].deep==2&&numberTwo==1){
                numberTwo++;
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" class='selectbox_selected' title='"+data[i].name+"'>" + data[i].name + "</li>");
                $("#phasesubject2").selectBox("selectForData", data[i].dataAuthorityId,true);
            }else if(data[i].deep==2&&numberTwo!=1){
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\">" + data[i].name + "</li>");
            }
        })
    }

}