/**
 * Created by Administrator on 2016/11/1 0001.
 */

$(function () {

    findSysDict("selectboxBox9", "resourceType", "selectbox10");
    findSysDict("selectbox0", "openType");
    findSysDict("selectbox11", "resourceFormat");
    findSysDict("copyright", "copyright");

 


    /**重置*/
    $(".btn_cz").click(function () {
        /*选题编号*/
        $(".check_show").html("");
        /*资源名称*/
        $(".iptFl").val("");
        /*发版类型*/
        $("#selectbox0").selectBox("setCaption","未选择","-1");
        /*版次*/
        $(".ipt").val("");
        /*ISBN号*/
        $(".ISBN").val("");
        /*责任编辑*/
        $(".chargeEditor").html("");
        /*资源属性*/
        $("#selectbox1").selectBox("setCaption","学科","-1");
        $("#selectbox2").selectBox("setCaption","学段","-1");
        $("#selectbox3").selectBox("setCaption","版本","-1");
        $("#selectbox4").selectBox("setCaption","册次","-1");
        $("#selectbox5").selectBox("setCaption","章","-1");
        $("#selectbox6").selectBox("setCaption","节","-1");
        $("#selectbox7").selectBox("setCaption","目","-1");
        $("#selectbox8").selectBox("setCaption","课时","-1");
        /*资源一级类别*/
        $("#selectbox9").selectBox("setCaption","未选择","-1");
        /*资源二级类别*/
        $("#selectbox10").selectBox("setCaption","未选择","-1");
        /*资源格式*/
        $("#selectbox11").selectBox("setCaption","未选择","-1");
        /*资源描述*/
        $(".btm10 dd textarea").val("");
        /*资源制作者*/
        $(".resourceMaker").val("");
        /*作者简介*/
        $(".aboutAuthor").val("");
        /*使用对象*/
        if($("#teacher").prop("checked")){
            $("#teacher").removeProp("checked");
        }
        if($("#student").prop("checked")){
            $("#student").removeProp("checked");
        }
        /*资源来源*/
        $(".resourceSources").val("");
        /*版权*/
        $(".copyright").val("");
        /*年份*/
        $(".yearMonth").val("");
        /*是否是独家资源*/
        if($("#yes").prop("checked")){
            $("#yes").removeProp("checked");
        }
        if($("#no").prop("checked")){
            $("#no").removeProp("checked");
        }
        /*是否原创*/
        if($("#yes01").prop("checked")){
            $("#yes01").removeProp("checked");
        }
        if($("#no01").prop("checked")){
            $("#no01").removeProp("checked");
        }
        /*是否中文*/
        if($("#china").prop("checked")){
            $("#china").removeProp("checked");
        }
        if($("#enish").prop("checked")){
            $("#enish").removeProp("checked");
        }
        /*资源等级*/
        if($("#nice").prop("checked")){
            $("#nice").removeProp("checked");
        }
        if($("#common").prop("checked")){
            $("#common").removeProp("checked");
        }
        /*是否免费*/
        if($("#free").prop("checked")){
            $("#free").removeProp("checked");
            $(".dot").val("");
        }
        if($("#charge").prop("checked")){
            $("#charge").removeProp("checked");
            $(".dot").val("");
        }
    });
});