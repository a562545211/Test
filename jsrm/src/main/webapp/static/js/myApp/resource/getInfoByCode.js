/**
 * Created by xzb on 2017/1/17.
 */
/**
 * 资源编号 提取信息
 * */
function getInfoByCode(resourceTopicCode) {
    $.post(getBasePath() + "/selectTopic/getResourceInfoByTopicCode", {"resourceTopicCode": resourceTopicCode}, function (rtnData) {
        if (rtnData.status == "0") {
            var info = rtnData.data;
            if (info == null) {
                alert("该资源编号暂无绑定属性");
            } else {
                checkTopicAjaxAdapter(info);
            }
        }
    }, "json");
}

function checkTopicAjaxAdapter(data) {
    /*资源编号*/
    var resourceTopicCode = $("#resourceTopicCode").val();
    if(resourceTopicCode != null) {
        $(".check_show").html(resourceTopicCode);
    } else {
        $(".check_show").html(data.tResourceCode);
    }
    $(".check_show").parent().parent().attr("data-value",data.tResourceCodeId);
    /*体系级联*/
    showAllCategories(data.categoresCode);
    /*知识点*/
    if(data.knowledgeCode != "") {
        showAllKnowledges(data.knowledgeCode);
    } else {
        initKnowledgesBy2(0);
    }
    /*资源名称*/
    $("#resourceName").val(data.resourceName);
    /*发版类型*/
    $("#selectbox0").selectBox("selectForData", data.draftTypeId, true);

    /*版次*/
    $(".ipt").val(data.edition);
    /*ISBN号*/
    $(".ISBN").val(data.iSBN);
    /*责任编辑*/
    $(".chargeEditor").html(data.createUserName);
    // console.log(data.createUserName);
    /*资源属性*/
    var categoresCode = "";
    var knowledgeCode = "";

    /*资源一级类别*/
    $("#selectboxBox9").selectBox("selectForData", data.resourceTypeOneLevelId, true);
    /*资源二级类别*/
    $("#selectbox10").selectBox("selectForData", data.resourceTypeTwoLevelId, true);
    /*资源格式*/
    $("#selectbox11").selectBox("selectForData", data.resourceFormatId, true);
    /*字数*/
    $(".wordCount").val(data.wordCount);
    /*时长*/
    var time;
    if(data.timeCount==undefined ||data.timeCount ==""){
        time= 0;
        $("#hover").val("");
        $("#minutes").val("");
        $("#seconds").val("");
    }else{
        time = formatSeconds(data.timeCount);
        var hover = time.split("-")[0];
        var minutes = time.split("-")[1];
        var seconds = time.split("-")[2];
        if(hover=="0"){
            $("#hover").val("");
        }else{
            $("#hover").val(hover);
        }
        if(minutes == "0"){
            $("#minutes").val("");
        }else{
            $("#minutes").val(minutes);
        }
        if(seconds == "0"){
            $("#seconds").val("");
        }else{
            $("#seconds").val(seconds);
        }
    }

    /*图幅数*/
    $(".mapCount").val(data.mapCount);
    /*资源描述*/
    $(".btm10 dd textarea").val(data.resourceDes);
    /*资源制作者*/
    $(".resourceMaker").val(data.resourceMaker);
    /*作者简介*/
    $(".aboutAuthor").val(data.makerIntro);
    /*使用对象*/
    if (data.useTarget == "teacher") {
        $("#teacher").prop("checked", "checked");
    } else if (data.useTarget == "student") {
        $("#student").prop("checked", "checked");
    } else if (data.useTarget == "teacher and student") {
        $("#teacher").prop("checked", "checked");
        $("#student").prop("checked", "checked");
    }
    /*资源来源*/
    $(".resourceSources").val(data.resourceSource);
    /*版权*/
    $("#copyright").selectBox("selectForData", data.copyright,false);
    /*年份*/
    if(data.yearMonth != null && data.yearMonth != ""){
        $(".yearMonth").val(data.yearMonth);
    }else{
        $(".yearMonth").attr("disabled", "disabled");
    }
    /*是否是独家资源*/
    if (data.isAloneRes == "0") {
        $("#yes").prop("checked", "checked");
    } else if (data.isAloneRes == "1") {
        $("#no").prop("checked", "checked");
    }
    /*是否原创*/
    if (data.isOriginal == "0") {
        $("#yes01").prop("checked", "checked");
    } else if (data.isOriginal == "1") {
        $("#no01").prop("checked", "checked");
    }
    /*是否中文*/
    if (data.isChinese == "0") {
        $("#china").prop("checked", "checked");
    } else if (data.isChinese == "1") {
        $("#enish").prop("checked", "checked");
    }
    /*资源等级*/
    if (data.resourceLevel == "0") {
        $("#nice").prop("checked", "checked");
    } else if (data.resourceLevel == "1") {
        $("#common").prop("checked", "checked");
    }
    /*是否免费*/
    if (data.isFree == "0") {
        $("#free").prop("checked", "checked");
    } else if (data.isFree == "1") {
        $("#charge").prop("checked", "checked");
        $(".dot").val(data.cost);
    }
    /*电子课件*/
    if (data.isElectron == "0") {
        $("#yes1").prop("checked", "checked");
    } else if (data.isElectron == "1") {
        $("#no1").prop("checked", "checked");
    }
}