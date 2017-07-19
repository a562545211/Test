/**
 * Created by Administrator on 2016/11/14 0014.
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

    /** 第一个目录树 适配数据 */
    firstTreeAjax();
    function firstTreeAjax() {
        $.ajax({
            type:"post",
            url:getBasePath()+"statisticalAnalysis/getCategory",
            dataType:"json",
            async:false,
            success:function (data) {
                if(data.status == 0 ){
                    firstTreeAdapter(data.data);
                }else{
                    alert("获取目录树错误");
                }
            },
            error:function () {
                alert("获取目录树错误！！！");
            }
        })
    }
    function firstTreeAdapter(data) {
        $(".allParent").html("");
        var result = "";
        $(data).each(function (index,element) {
            if(data[index].deep==1){
                result += "<div class='tree first_ceng' data-deep='"+data[index].deep+"' id='"+data[index].id+"' onclick='clickShow(this)'>"+data[index].name+"</div>"+
                    "<ul class='node first_ceng_node '>" +
                    "<li></li>" +
                    "</ul>";
            }
            else if(data[index].deep==2) {
                var timer = setInterval(function () {
                    var upParent = $("#" + data[index].parentId + "");
                    if (upParent.length != 0) {
                        upParent.next(".node").children().append("<div class='tree ce_ceng_close' data-deep='" + data[index].deep + "' id='" + data[index].id + "' onclick='clickShow(this)'>" + data[index].name + "</div>" +
                            "<ul class='node second_ceng_node '>" +
                            "<li></li>" +
                            "</ul>");
                        clearInterval(timer);
                    }
                }, 30);
            } else if(data[index].deep==3) {
                var timer = setInterval(function () {
                    var upParent = $("#" + data[index].parentId + "");
                    if (upParent.length != 0) {
                        upParent.next(".node").children().append("<div class='tree ce_ceng_close' data-deep='" + data[index].deep + "' id='" + data[index].id + "' onclick='clickShow(this)'>" + data[index].name + "</div>" +
                            "<ul class='node third_ceng_node '>" +
                            "<li></li>" +
                            "</ul>");
                        clearInterval(timer);
                    }
                }, 30);
            }else if(data[index].deep==4){
                var timer=setInterval(function () {
                    var upParent=$("#"+data[index].parentId+"");
                    if(upParent.length != 0){
                        upParent.next(".node").children().append("<div class='tree' data-deep='"+data[index].deep+"' id='"+data[index].id+"' onclick='clickShow(this)'>"+data[index].name+"</div>");
                        clearInterval(timer);
                    }
                },30);
            }
        });
        $(".allParent").append(result);
    }
    
    /** 第二个目录树 适配数据 */
    secondTreeAjax();
    function secondTreeAjax() {
        $.ajax({
            type:"post",
            url:getBasePath()+"statisticalAnalysis/getCategory",
            dataType:"json",
            async:false,
            success:function (data) {
                if(data.status == 0 ){
                    secondTreeAdapter(data.data);
                }else{
                    alert("获取目录树错误");
                }
            },
            error:function () {
                alert("获取目录树错误！！！");
            }
        })
    }
    function secondTreeAdapter(data) {
        $(".allParents").html("");
        var resultAll = "";
        $(data).each(function (index,element) {
            if(data[index].deep==1){
                resultAll += "<div class='tree first_ceng' data-deep='"+data[index].deep+"' data-id='"+data[index].id+"' onclick='clickShowAll(this)'>"+data[index].name+"</div>"+
                    "<ul class='node first_ceng_node '>" +
                    "<li></li>" +
                    "</ul>";
            }
            // else if(data[index].deep==2){
            //     var allParent=$("#"+data[index].parentId+"");
            //     function digui(allParent) {
            //         var resultAll='';
            //         if(allParent != 0){
            //             resultAll="<div class='tree' data-deep='"+data[index].deep+"' id='"+data[index].id+"' data-parentId='"+data[index].parentId+"'>"+data[index].name+"</div>"+
            //                 "<ul class='node second_ceng_node '>" +
            //                 "<li></li>" +
            //                 "</ul>";
            //             return resultAll;
            //         }else{
            //             digui(allParent);
            //         }
            //     }
            //     allParent.next(".node").children().append(digui(allParent));
            // }
            else if(data[index].deep==2) {
                var timerFour = setInterval(function () {
                    var upParent = $("div[data-id='"+ data[index].parentId +"']");
                    if (upParent.length != 0) {
                        upParent.next(".node").children().append("<div class='tree ce_ceng_close' data-deep='" + data[index].deep + "' data-id='" + data[index].id + "' onclick='clickShowAll(this)'>" + data[index].name + "</div>" +
                            "<ul class='node second_ceng_node '>" +
                            "<li></li>" +
                            "</ul>");
                        clearInterval(timerFour);
                    }
                }, 30);
            } else if(data[index].deep==3) {
                var timerFive = setInterval(function () {
                    var upParent = $("div[data-id='"+ data[index].parentId +"']");
                    if (upParent.length != 0) {
                        upParent.next(".node").children().append("<div class='tree ce_ceng_close' data-deep='" + data[index].deep + "' data-id='" + data[index].id + "' onclick='clickShowAll(this)'>" + data[index].name + "</div>" +
                            "<ul class='node third_ceng_node '>" +
                            "<li></li>" +
                            "</ul>");
                        clearInterval(timerFive);
                    }
                }, 30);
            }else if(data[index].deep==4){
                var timerSix=setInterval(function () {
                    var upParent = $("div[data-id='"+ data[index].parentId +"']");
                    if(upParent.length != 0){
                        upParent.next(".node").children().append("<div class='tree' data-deep='"+data[index].deep+"' data-id='"+data[index].id+"' onclick='clickShowAll(this)'>"+data[index].name+"</div>");
                        clearInterval(timerSix);
                    }
                },30);
            }
        });
        $(".allParents").append(resultAll);
    }

    /** 菜单树 */
    $(".tree").each(function(index, element) {
        if($(this).next(".node").length>0){
            if($(this).hasClass("first_ceng")){
                $(this).addClass("big_ceng_close");
            }else{
                $(this).addClass("ce_ceng_close");
            }
        }
    });

    // $(".tree").click(function(){
    //     // $(this).addClass("bg_grey").siblings().removeClass("bg_grey").next(".node").slideUp().removeClass("bg_grey");
    //     // $(this).addClass("bg_grey").siblings().removeClass("bg_grey").next(".node").find("div").removeClass("bg_grey");
    //     // $(this).next(".node").find("div").removeClass("bg_grey");
    //     // $(this).parents().siblings().removeClass("bg_grey");
    //
    //     var allDiv=$(".allParent").find("div");
    //     for(var i=0;i<allDiv.length;i++){
    //         allDiv.removeClass("bg_grey")
    //     }
    //     $(this).addClass("bg_grey");
    //
    //     var ul = $(this).next(".node");
    //     if(ul.css("display")=="none"){
    //         ul.slideDown();
    //         $(this).addClass("ce_ceng_open");
    //         ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    //     }else{
    //         ul.slideUp();
    //         $(this).removeClass("ce_ceng_open");
    //         ul.find(".node").slideUp();
    //         ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    //     }
    // });

    /** 宽度 */
    initpage();
    window.onresize = function(){
        initpage();
    };
    function initpage() {
        var ww = $(".main_con").width()-263;
        $(".wrap_table").width(ww);
        $(".list_nav").height($(".wrap_table_01").height())
    }

    /** 隔行变色 */
    $("tbody tr").hover(function () {
        $()
    });

    /** 资源分类统计 */
    resourceStatistics(null);

    /** 资源格式统计 */
    resourceType(null);

    /** 点击统计按钮 */
    $("#btn_statistics").click(function () {
        /** 得到搜索条件的json对象 */
        var params = {
            startTime : $("#dates_start1").val().trim(),    //开始时间
            endTime : $("#dates_end1").val().trim(),        //结束时间
            json :addStringOne(),                           //第一个目录树
            jsonOne :addStringTwo()                         //第二个目录树
        };
        resourceStatistics(params);
        resourceType(params);
    });
});

/** 得到第一个目录树的字符串 */
function addStringOne() {
    var result = '';
    var allDiv = $(".allParent").find(".bg_grey");
    // console.log(allDiv);
    if ( allDiv.length == 1) {
        result = allDiv.eq(0).attr("id");
    }else if( allDiv.length == 2){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id");
    }else if( allDiv.length == 3){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id")+","+allDiv.eq(2).attr("id")
    }else if( allDiv.length == 4){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id")+","+allDiv.eq(2).attr("id")+","+allDiv.eq(3).attr("id")
    }
    // console.log(result);
    return result;
}

/** 得到第二个目录树的字符串 */
function addStringTwo() {
    var result = '';
    var allDiv = $(".allParents").find(".bg_grey");
    // console.log(allDiv);
    if ( allDiv.length == 1) {
        result = allDiv.eq(0).data("id");
    }else if( allDiv.length == 2){
        result = allDiv.eq(0).data("id")+","+allDiv.eq(1).data("id");
    }else if( allDiv.length == 3){
        result = allDiv.eq(0).data("id")+","+allDiv.eq(1).data("id")+","+allDiv.eq(2).data("id")
    }else if( allDiv.length == 4){
        result = allDiv.eq(0).data("id")+","+allDiv.eq(1).data("id")+","+allDiv.eq(2).data("id")+","+allDiv.eq(3).data("id")
    }
    // console.log(result);
    return result;
}

/** 第一个目录树的点击事件 */
function clickShow(obj) {

    var $this = $(obj);   //获取当前的dom对象
    var allDiv=$(".allParent").find("div");
    for(var i=0;i<allDiv.length;i++){
        allDiv.removeClass("bg_grey")
    }
    $this.addClass("bg_grey");
    $this.parents().prev().addClass("bg_grey").siblings().removeClass("bg_grey");

    var ul = $this.next(".node");
    if(ul.css("display")=="none"){
        ul.slideDown();
        $this.addClass("ce_ceng_open");
        ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    }else{
        ul.slideUp();
        $this.removeClass("ce_ceng_open");
        ul.find(".node").slideUp();
        ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    }
    var param = {
        startTime : $("#dates_start1").val().trim(),    //开始时间
        endTime : $("#dates_end1").val().trim(),        //结束时间
        json :addStringOne(),                           //第一个目录树
        // jsonOne :addStringTwo()                         //第二个目录树
    };
    resourceStatistics(param);
}

/** 第二个目录树的点击事件 */
function clickShowAll(obj) {

    var $this = $(obj);   //获取当前的dom对象
    var allDiv=$(".allParents").find("div");
    for(var i=0;i<allDiv.length;i++){
        allDiv.removeClass("bg_grey")
    }
    $this.addClass("bg_grey");
    $this.parents().prev().addClass("bg_grey").siblings().removeClass("bg_grey");

    var ul = $this.next(".node");
    if(ul.css("display")=="none"){
        ul.slideDown();
        $this.addClass("ce_ceng_open");
        ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    }else{
        ul.slideUp();
        $this.removeClass("ce_ceng_open");
        ul.find(".node").slideUp();
        ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    }
    var param = {
        startTime : $("#dates_start1").val().trim(),    //开始时间
        endTime : $("#dates_end1").val().trim(),        //结束时间
        // json :addStringOne(),                           //第一个目录树
        jsonOne :addStringTwo()                         //第二个目录树
    };
    resourceType(param);

}

/** 资源分类统计 */
function resourceStatistics(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getResourceClassificationStatic",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                resourceStatisticsAdapter(data.data)
            }else{
                alert("资源分类统计失败");
            }
        },
        error:function () {
            alert("资源分类统计失败！！！");
        }
    })
}
function resourceStatisticsAdapter(data) {
    $("#resourceStatisticsTable tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var subject = getValue(data[i].subject);                //学科
        var phase  = getValue(data[i].phase);                   //学段
        var design = getValue(data[i].design);                  //教学设计
        var courseware  = getValue(data[i].courseware);         //课件                                            //课件
        var learinng = getValue(data[i].learinng);              //学案
        var practice = getValue(data[i].practice);              //同步练习
        var material = getValue(data[i].material);              //素材
        var memoir = getValue(data[i].memoir);                  //教学实录
        var expand = getValue(data[i].expand);                  //拓展资源
        var research = getValue(data[i].research);              //教学研究
        var smallclass = getValue(data[i].smallclass);          //微课
        var test = getValue(data[i].test);                      //试题
        var subtotal = getValue(data[i].subtotal);              //小计
        result += "<tr>"
                        + "<td>" + subject + "</td>"
                        + "<td>" + phase + "</td>"
                        + "<td>" + design + "</td>"
                        + "<td>" + courseware + "</td>"
                        + "<td>" + learinng + "</td>"
                        + "<td>" + practice + "</td>"
                        + "<td>" + material + "</td>"
                        + "<td>" + memoir + "</td>"
                        + "<td>" + expand + "</td>"
                        + "<td>" + research + "</td>"
                        + "<td>" + smallclass + "</td>"
                        + "<td>" + test + "</td>"
                        + "<td>" + subtotal + "</td>" +
                    "</tr>";
    }
    $("#resourceStatisticsTable").append(result);
}

/** 资源格式统计 */
function resourceType(params) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/getResourceFormStatic",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                resourceTypeAdapter(data.data)
            }else{
                alert("资源格式统计失败");
            }
        },
        error:function () {
            alert("资源格式统计失败！！！");
        }
    })
}
function resourceTypeAdapter(data) {
    $("#resourceTypeTable tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        // var subject = getValue(data[i].subject);                //学科
        // var phase = getValue(data[i].phase);                    //学段
        var document = getValue(data[i].document);              //文档
        var video = getValue(data[i].video);                    //视频
        var audio = getValue(data[i].audio);                    //音频
        var flash = getValue(data[i].flash);                    //动画
        var image = getValue(data[i].image);                    //图片
        var subtotal = getValue(data[i].subtotal);              //小计
        result += "<tr>"
                        // + "<td>" + subject + "</td>"
                        // + "<td>" + phase + "</td>"
                        + "<td>" + document + "</td>"
                        + "<td>" + video + "</td>"
                        + "<td>" + audio + "</td>"
                        + "<td>" + flash + "</td>"
                        + "<td>" + image + "</td>"
                        + "<td>" + subtotal + "</td>" +
                    "</tr>";
    }
    $("#resourceTypeTable").append(result);
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}

/** （之前的）目录树 适配数据 */

// function treeAjax() {
//     $.ajax({
//         // type:"post",
//         type:"get",
//         // url:getBasePath()+"statisticalAnalysis/getCategory",
//         url:"http://localhost:5678/static/js/myApp/statistics_classification/exercise.json",
//         dataType:"json",
//         // data:{
//         //     startTime : $("#dates_start1").val().trim(),              //开始时间
//         //     endTime : $("#dates_end1").val().trim()                  //结束时间
//         // },
//         async:false,
//         success:function (data) {
//             if(data.status == 0 ){
//                 // alert("成功！！！");
//                 treeAdapter(data.data.data);
//             }else{
//                 alert("获取目录树错误")
//             }
//         },
//         error:function () {
//             alert("获取目录树错误！！！")
//         }
//     })
// }
// function treeAdapter(data) {
//     $(".allParent").html("");
//     $(data).each(function (index,element) {
//         $(".allParent").append(
//            "<div class='tree first_ceng' data-deep='"+data[index].deep+"'>"+data[index].collage+"</div>" +
//             "<ul class='node first_ceng_node '>" +
//                  // "<li>"+data[index].data+"</li>" +
//                  "<li>"+treeAdapterTwo(data[index].data)+"</li>" +
//             "</ul>"
//         )
//     });
// }
// function treeAdapterTwo(data) {
//     var text="";
//     $(data).each(function (index,element) {
//         text+=  "<div class='tree'data-deep='"+data[index].deep+"'>"+data[index].collage+"</div>" +
//                 "<ul class='node second_ceng_node'>" +
//                     // "<li>"+data[index].data+"</li>" +
//                     "<li>"+treeAdapterThree(data[index].data)+"</li>" +
//                 "</ul>"
//     });
//     return text;
// }
// function treeAdapterThree(data) {
//     var text="";
//     $(data).each(function (index,element) {
//         text+=  "<div class='tree' data-deep='"+data[index].deep+"'>"+data[index].collage+"</div>" +
//                 "<ul class='node third_ceng_node'>" +
//                     "<li>"+treeAdapterFour(data[index].data)+"</li>" +
//                 "</ul>"
//     });
//     return text;
// }
// function treeAdapterFour(data) {
//     var text="";
//     $(data).each(function (index,element) {
//         text+="<div class='tree' data-deep='"+data[index].deep+"'>"+data[index].collage+"</div>"
//     });
//     return text;
// }