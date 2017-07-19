/**
 * Created by jichao on 2016/10/26.
 */

var id = $.getUrlParam("id");

$(function(){
    selectResourceCodeById();
});

/** 根据id查询内容 */
function selectResourceCodeById(){
    $.ajax({
        type : "post",
        url : getBasePath() + "/resourceCode/selectResourceCodeById",
        dataType : "json",
        data : {id : id},
        success:function(data) {
            // alert(data.message);
            if(data.status == 0){
                fillData(data.data.data);
            }else{
                alert(data.message);
                window.history.back(-1);
            }
        },
        error:function(){
            alert("出错了");
        }
    });
}

/** 赋值 */
function fillData(data){
    $("#code").val(data.code);
    $("#name").val(data.name);
    $("#createUserName").html(data.createUserName);
    $("#createTime").html(data.createTime);
    $("#resoureDes").val(data.resoureDes);
    //还有一些没赋值
    showAll(data.categoresCode);
}

function showAll(data){
    $.ajax({
        url: getBasePath() + "/category/getCategoriesByIds",
        type: "post",
        traditional: true,
        data: {"ids": data},
        async: "false",
        dataType: "json",
        success: function (rtnData) {
            if (rtnData.status == "0") {
                $.each(rtnData.data, function (i, v) {
                    $("#show" + (i + 1)).val(v.name).parent().attr("title",v.name);
                });
                for(var i=rtnData.data.length ;i<8;i++){
                    $("#show" + (i + 1)).css("backgroundColor","#eaecf2")
                }
            }
        }
    });
}