/**
 * Created by Administrator on 2016/11/3 0003.
 */
/**
 * Created by Administrator on 2016/11/3 0003.
 */

var id = $.getUrlParam("id");

var itemid = $.getUrlParam("itemId");

$(function () {
    /** 查看详情 */
    searchProj(id);
    function searchProj(id){
        $.ajax({
            type:"post",
            url:getBasePath()+"resourceInfoRest/getResourceInfo2",
            dataType:"json",
            data:{
                "id":id
            },
            success:function (data) {
                if(data.status==0){
                    fillData(data.data.data);
                }else{
                    alert("获取信息失败！！");
                }
            },
            error:function () {
                alert("获取信息失败！！");
            }
        })
    }
    function fillData(data){
        /*ID号*/
        $(".infoList.pd10 li").eq(2).children().last().html(id);
        /*上传者*/
        $(".infoList.pd10 li").eq(0).children().last().html(data.createUserName);
        /*上传时间*/
        $(".infoList.pd10 li").eq(1).children().last().html(data.createDateTime);

        $(".title_resourceName").val(data.resourceName);
        $("#tResourceCode").val(data.tResourceCode);
        $("#resourceName").val(data.resourceName);
        $("#resourceFormatValue").val(data.resourceFormatValue);
        $("#resourceDes").val(data.resourceDes);
        $("#original").val(data.original);
        showAll(data.categoresCode);
    }

    /** 资源属性 */
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
                        $("#show" + (i + 1)).val(v.name);
                    });
                }
            }
        });
    }
    /** 返回 */
    $(".bg_green").click(function () {
        window.location.href="resource.html?itemId="+itemid;
    });
});



