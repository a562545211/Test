/**
 * Created by Administrator on 2016/11/17 0017.
 */
$(function(){

    /** 日历组件初始化代码 */
    $("#dates_start1").datetimepicker({
        value:$("#dates_start1").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });
    $("#dates_end1").datetimepicker({
        value:$("#dates_end1").val(),
        lang:'ch',
        showSecond: false,
        timepicker:false,
        showMillisec: false,
        format: 'Y-m-d'
    });

    /** 切换（资源分类和资源形式） */
    $(".content-subnav li").click(function () {
        $(".tab_con").hide().eq($(this).index()).show();
    });


    /** 上传管理（资源分类） */
    resourceType(null);
    /** 上传管理（资源形式） */
    resourceForm(null);
    /** 上传管理（选题发稿） */
    selectTopic(null);
    /** 上传管理（资源审核） */
    resourceJudge(null);
    /** 点击统计按钮 */
    $("#btn_statistics").click(function () {
        /** 得到搜索条件的json对象 */
        var params = {
            startTime : $("#dates_start1").val().trim(),    //开始时间
            endTime : $("#dates_end1").val().trim()        //结束时间
        };
        /** 上传管理（资源分类） */
        resourceType(params);
        /** 上传管理（资源形式） */
        resourceForm(params);
        /** 上传管理（选题发稿） */
        selectTopic(params);
        /** 上传管理（资源审核） */
        resourceJudge(params);
    });
});
/** 上传管理（资源分类） */
function resourceType(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getResourceClassificationLeader",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                resourceTypeAdapter(data.data);
            }else{
                alert("获取上传管理（资源分类）失败");
            }
        },
        error:function () {
            alert("获取上传管理（资源分类）失败！！！");
        }
    })
}
function resourceTypeAdapter(data) {
    $("#resourceTypeTable tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.personalStatic.length; i++){
        var name = getValue(data.personalStatic[i].name);                      //姓名
        var subject = getValue(data.personalStatic[i].subject);                //学科
        var phase = getValue(data.personalStatic[i].phase);                    //学段
        var courseware = getValue(data.personalStatic[i].courseware);          //课件
        var design = getValue(data.personalStatic[i].design);                  //教学设计
        var learinng = getValue(data.personalStatic[i].learinng);              //学案
        var practice = getValue(data.personalStatic[i].practice);              //同步练习
        var material = getValue(data.personalStatic[i].material);              //素材
        var memoir = getValue(data.personalStatic[i].memoir);                  //教学实录
        var expand = getValue(data.personalStatic[i].expand);                  //拓展资源
        var research = getValue(data.personalStatic[i].research);               //教学研究
        var smallclass = getValue(data.personalStatic[i].smallclass);           //微课
        var test = getValue(data.personalStatic[i].test);                       //试题
        var subtotal = getValue(data.personalStatic[i].subtotal);              //小计


        var courseware_t = getValue(data.subjectStatic[i].courseware);          //课件（全）
        var design_t = getValue(data.subjectStatic[i].design);                  //教学设计（全）
        var learinng_t = getValue(data.subjectStatic[i].learinng);              //学案（全）
        var practice_t = getValue(data.subjectStatic[i].practice);              //同步练习（全）
        var material_t = getValue(data.subjectStatic[i].material);              //素材（全）
        var memoir_t = getValue(data.subjectStatic[i].memoir);                  //教学实录（全）
        var expand_t = getValue(data.subjectStatic[i].expand);                  //拓展资源（全）
        var research_t = getValue(data.subjectStatic[i].research);              //教学研究（全）
        var smallclass_t = getValue(data.subjectStatic[i].smallclass);          //微课（全）
        var test_t = getValue(data.subjectStatic[i].test);                      //试题（全）
        var subtotal_t = getValue(data.subjectStatic[i].subtotal);              //小计（全）
        result += "<tr>"
            + "<td>" + name + "</td>"
            + "<td>" + subject + "</td>"
            + "<td>" + phase + "</td>"
            + "<td>" + courseware + "</td>"
            + "<td>" + design + "</td>"
            + "<td>" + learinng + "</td>"
            + "<td>" + practice + "</td>"
            + "<td>" + material + "</td>"
            + "<td>" + memoir + "</td>"
            + "<td>" + expand + "</td>"
            + "<td>" + research + "</td>"
            + "<td>" + smallclass + "</td>"
            + "<td>" + test + "</td>"
            + "<td>" + subtotal + "</td></tr>"
            + "<tr>"
            + "<td>" + "" + "</td>"
            + "<td>" + subject + "（全）" + "</td>"
            + "<td>" + phase + "（全）" + "</td>"
            + "<td>" + courseware_t + "</td>"
            + "<td>" + design_t + "</td>"
            + "<td>" + learinng_t + "</td>"
            + "<td>" + practice_t + "</td>"
            + "<td>" + material_t + "</td>"
            + "<td>" + memoir_t + "</td>"
            + "<td>" + expand_t + "</td>"
            + "<td>" + research_t + "</td>"
            + "<td>" + smallclass_t + "</td>"
            + "<td>" + test_t + "</td>"
            + "<td>" + subtotal_t + "</td></tr>";
    }
    $("#resourceTypeTable").append(result);
}

/** 上传管理（资源形式） */
function resourceForm(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getResourceForm",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                resourceFormAdapter(data.data);
            }else{
                alert("上传管理（资源形式）失败");
            }
        },
        error:function () {
            alert("上传管理（资源形式）失败！！！");
        }
    })
}
function resourceFormAdapter(data) {
    $("#resourceFormTable tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var name = getValue(data[i].name);                //姓名
        var subject = getValue(data[i].subject);          //学科
        var phase = getValue(data[i].phase);              //学段
        var document = getValue(data[i].document);        //文档
        var video = getValue(data[i].video);              //视频
        var audio = getValue(data[i].audio);              //音频
        var flash = getValue(data[i].flash);              //动画
        var image = getValue(data[i].image);              //图片
        var subtotal = getValue(data[i].subtotal);        //小计
        result += "<tr>"
            + "<td>" + name + "</td>"
            + "<td>" + subject + phase + "</td>"
            + "<td>" + document + "</td>"
            + "<td>" + video + "</td>"
            + "<td>" + audio + "</td>"
            + "<td>" + flash + "</td>"
            + "<td>" + image + "</td>"
            + "<td>" + subtotal + "</td>" +
            "</tr>";
    }
    $("#resourceFormTable").append(result);
}

/** 上传管理（选题发稿） */
function selectTopic(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getSelectedTopic",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0) {
                topicSelectionAdapter(data.data);
            }else{
                alert("上传管理（选题发稿）失败！！");
            }
        },
        error:function () {
            alert("上传管理（选题发稿）失败！！！");
        }
    });
}
function topicSelectionAdapter(data) {
    $("#topicSelectionTable tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var name = getValue(data[i].name);                //姓名
        var subject = getValue(data[i].subject);          //学科
        var phase = getValue(data[i].phase);              //学段
        var wordcount = getValue(data[i].wordcount);      //发稿字数
        var duration = getValue(data[i].duration);        //音视频时长
        var size = getValue(data[i].size);                //资源大小
        result += "<tr>"
            + "<td>" + name + "</td>"
            + "<td>" + subject + phase + "</td>"
            + "<td>" + wordcount + "</td>"
            + "<td>" + duration + "</td>"
            + "<td>" + size + "</td>" +
            "</tr>";
    }
    $("#topicSelectionTable").append(result);
}

/** 上传管理（资源审核） */
function resourceJudge(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getResourceAudit",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0) {
                resourceJudgeAdapter(data.data);
            }else{
                alert("上传管理（资源审核）失败！！");
            }
        },
        error:function () {
            alert("上传管理（资源审核）失败！！！");
        }
    });
}
function resourceJudgeAdapter(data) {
    $("#resourceJudgeTable tr").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var name = getValue(data[i].name);                //姓名
        var subject = getValue(data[i].subject);          //学科
        var phase = getValue(data[i].phase);              //学段
        var audit = getValue(data[i].audit);              //上传审核
        var recheck = getValue(data[i].recheck);          //复审
        var finalr = getValue(data[i].finalr);             //终审
        var subtotal = getValue(data[i].subtotal);         //小计
        result += "<tr>"
            + "<td>" + name + "</td>"
            + "<td>" + subject + phase + "</td>"
            + "<td>" + audit + "</td>"
            + "<td>" + recheck + "</td>"
            + "<td>" + finalr + "</td>"
            + "<td>" + subtotal + "</td>" +
            "</tr>";
    }
    $("#resourceJudgeTable").append(result);
}



/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val===undefined)? "-": val;
}
