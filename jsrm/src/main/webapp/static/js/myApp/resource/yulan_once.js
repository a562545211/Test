/**
 * Created by Administrator on 2016/11/3 0003.
 */

var id = $.getUrlParam("id");
var isdian = $.getUrlParam("isdian");

var itemid = $.getUrlParam("itemId");

$(function () {
    initDownloadBtn(id);
    /** 查看详情 */
    yulanAjax(id);
    function yulanAjax(id) {
        $.ajax({
            type: "post",
            url: getBasePath() + "resourceInfoRest/getResourceInfo2",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (data) {
                if (data.status == 0) {
                    yulanAjaxAdapter(data.data.data);
                } else {
                    alert("获取信息失败！！");
                }
            },
            error: function () {
                alert("获取信息失败！！");
            }
        })
    }
    function yulanAjaxAdapter(data) {

        var changeState = data.changeState;

        var filePath = data.filePath;
        var suffix = data.suffix;

        if(filePath == null) filePath = suffix;

        if(suffix != null) suffix = suffix.substring(suffix.lastIndexOf(".") + 1);

        checkState(changeState, filePath, suffix);

        //审核引入的页面
        includeExamine(data.id, data.resourceType);

        // showPreview(filePath);

        /*标题上的资源名称*/
        $("#resource_name").val(data.resourceName);
        
        /*ID号*/
        $(".infoList.pd10 li").eq(2).children().last().html(id);
        /*上传者*/
        $(".infoList.pd10 li").eq(0).children().last().html(data.createUserName);
        /*上传时间*/
        $(".infoList.pd10 li").eq(1).children().last().html(data.createDateTime);
        /*所属学科*/
        $(".subject").val(data.subject);
        /*资源类型*/
        $('.resourceType').val(getResourceType(data.resourceType));
        /*资源属性*/
        showAll(data.categoresCode);
        /*知识点*/
        if(data.knowledgeCode != null && data.knowledgeCode != "")
            showAllKnowledges(data.knowledgeCode);
        /*资源类别*/
        if(data.resourceTypeTwoLevelValue==="" || data.resourceTypeTwoLevelValue===undefined){
            $('.resourceTypeOneLevelValue').html(data.resourceTypeOneLevelValue);
        }else{
            $('.resourceTypeOneLevelValue').html(data.resourceTypeOneLevelValue+">"+data.resourceTypeTwoLevelValue);
        }
        /*资源格式*/
        $('.resourceFormatValue').html(data.resourceFormatValue);
        /*字数*/
        $('.wordCount').html(data.wordCount);
        /*时长*/
        var time;
        if(data.timeCount==undefined ||data.timeCount ==""){
            time= 0;
            $("#hover").val("0");
            $("#minutes").val("0");
            $("#seconds").val("0");
        }else{
            time = formatSeconds(data.timeCount);
            var hover = time.split("-")[0];
            var minutes = time.split("-")[1];
            var seconds = time.split("-")[2];
            if(hover=="0"){
                $("#hover").val("0");
            }else{
                $("#hover").val(hover);
            }
            if(minutes == "0"){
                $("#minutes").val("0");
            }else{
                $("#minutes").val(minutes);
            }
            if(seconds == "0"){
                $("#seconds").val("0");
            }else{
                $("#seconds").val(seconds);
            }
        }
        /*图幅数*/
        $('.mapCount').html(data.mapCount);
        /*资源来源*/
        $('.resourceSource').val(data.resourceSource);
        /*资源描述*/
        $('.resourceDes').val(data.resourceDes);
        /*资源制作者*/
        $('.resourceMaker').val(data.resourceMaker);
        /*作者简介*/
        $('.makerIntro').val(data.makerIntro);
        /*使用对象*/
        if (data.useTarget == "teacher") {
            $("#teacher").prop("checked", "checked");
        } else if (data.useTarget == "student") {
            $("#student").prop("checked", "checked");
        } else if (data.useTarget == "teacher and student") {
            $("#teacher").prop("checked", "checked");
            $("#student").prop("checked", "checked");
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

    /** 资源属性 */
    function showAll(data) {
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
                        $("#show" + (i + 1)).val(v.name).attr("title",v.name);
                    });
                }
            }
        });
    }

    /** 知识点 */
    var showAllKnowledges = function (ids) {
        $.ajax({
            url: getBasePath() + "/knowledge/getdgeKnowlesByIds",
            type: "post",
            traditional: true,
            data: {"ids": ids},
            async: "false",
            dataType: "json",
            success: function (rtnData) {
                if (rtnData.status == "0") {
                    var _length = rtnData.data.length;
                    var _str = "";
                    var _strC = "";
                    $.each(rtnData.data, function (i, v) {
                        $.each(v, function (index, item) {
                            var _name = item.name;
                            _str += _name;
                            _strC += _name;
                            if(index != v.length - 1) {
                                _str += "->";
                                _strC += "->";
                            }
                        });
                        _str += "<br />";
                        _strC += "<br/><br/>"
                    });
                    $("#knowledgeSpan").html(_str);
                    $(".alertKnowledge").html(_strC);
                }
            }
        });
    };

    /** 返回 */
    $(".bg_green").click(function () {
        if(isdian == 'dian'){
            window.location.href="bookManage.html";
        }else {
            window.location.href = "resource.html?itemId=" + itemid;
        }
    });

    btnFhUrl();     //如果是审批查看，则修改返回按钮页面地址
    
    /** 点击展开全部 */
    $(".showAll").click(function () {
        $(".alertDiv").show();
    });
    /** 点击展开全部 */
    $(".guanbi").click(function () {
        $(".alertDiv").hide();
    })
});



/**
 * 设置返回按钮地址
 */
function btnFhUrl() {
    var fromPage=$.getUrlParam("formpage");
    if(fromPage == 'app') {     //如果是审批页面
        /**返回*/
        //$(".bg_green").click(function () {
        //    window.parent.location.href="../vetting/resourceVetting.html";
        //});
        $(".bg_green").hide();
    }
}

/** 文件判断 */
function getResourceType(state){
    var resourceType = "";
    switch (state) {
        case "ORI":
            resourceType ="原始文件";
            break;
        case "PRO":
            resourceType = "工程文件";
            break;
        case "END":
            resourceType ="成品文件";
            break;
    }
    return resourceType;
}


/**时间换算单位函数*/
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
// alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
// alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime)+"-";
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"-"+result;
    }else if(theTime1 == 0){
        result = "0-"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"-"+result;
    }else if(theTime2 == 0){
        result = "0-"+result;
    }
    return result;
}