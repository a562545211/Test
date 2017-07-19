/**
 * Created by jhzhang on 2016/11/25.
 */

var phaseId;      //学段ID
var subjectId;    //学科ID
var jsonId;       //知识点ID

$(function(){

    /** 目录树 */
    $(".tree").click(function(e){
        var ul = $(this).next(".node");
        if(ul.css("display")=="none"){
            ul.slideDown();
            $(this).addClass("ce_ceng_open");
            ul.find(".ce_ceng_open").removeClass("ce_ceng_open");
        }else{
            ul.slideUp();
            $(this).removeClass("ce_ceng_open");
            ul.find(".node").slideUp();
            ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
        }
    });

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

    /** 进入页面适配学段和学科 */
    var phasesubjectData='';     //暂时保存学科和学段数据
    loadKnowledge();
    function loadKnowledge(){
        $.ajax({
            type:"post",
            url:getBasePath()+"statisticalAnalysis/queryUserDataAuthority",
            dataType:"json",
            success: function (data) {
                if(data.status=="0"){
                    loadKnowledgeAdapter(data.data);
                }else{
                    alert("请求成功，但是获取学段和学科信息失败");
                }
            }
        });
    }
    function loadKnowledgeAdapter(data){
        phasesubjectData=data;
        $("#phasesubject1").find(".selectbox_body").empty();
        // $("#phasesubject1").find(".selectbox_body").append("<li data-value=''>全部</li>");
        $(data).each(function (i) {
            if(data[i].deep==1){
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }
        })
    }
    /** 点击学段适配学科 */
    $("#phasesubject1").selectBox("callback",function(_data){
        // $("#phasesubject2 ").selectBox("removeAll");
        $("#phasesubject2").find(".selectbox_body").empty();
        // $("#phasesubject2").find(".selectbox_body").append("<li data-value=''>全部</li>");
        var parentId = _data;
        for(var i=0;i<phasesubjectData.length;i++){
            if(phasesubjectData[i].parentId===parentId){
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[i].dataAuthorityId + "\" title='"+phasesubjectData[i].name+"'>" + phasesubjectData[i].name + "</li>");
            }
        }
    });

    /** 点击统计按钮显示左边的知识点 */
    $(".btn-statistics").click(function () {
        var firstphase=$("#phasesubject1 .selectbox_selected").html();
        phaseId = $("#phasesubject1 .selectbox_selected").data("value");
        var secondsubject=$("#phasesubject2 .selectbox_selected").html();
        subjectId = $("#phasesubject2 .selectbox_selected").data("value");
        if((firstphase==''||firstphase==undefined)&&(secondsubject==''||secondsubject==undefined)){
            alert("请您选择学科或者学段！！！");
        }else{
            if(firstphase==''||firstphase==undefined){
                $(".phaseSubjectKnowledge").html(secondsubject+"知识点");
            }else if(secondsubject==''||secondsubject==undefined){
                $(".phaseSubjectKnowledge").html(firstphase+"知识点");
            }else{
                $(".phaseSubjectKnowledge").html(firstphase+secondsubject+"知识点");
            }
            /** 左侧知识点目录 */
            firstTreeAjax();
        }
    });
    /** 第一个目录树 适配数据 */
    function firstTreeAjax() {
        $.ajax({
            type:"post",
            url:getBasePath()+"statisticalAnalysis/getKnowledge",
            dataType:"json",
            async:false,
            data:{
                phaseId:phaseId,
                subjectId:subjectId
            },
            success:function (data) {
                if(data.status == 0 ){
                    $(".mo_show").css("display","none");               //默认显示隐藏
                    $(".main_con").css("visibility","visible");        //知识点显示
                    $(".main_con_left").css("visibility","visible");   //左边知识点目录显示
                    $(".wrap_table").css("display","none");            //右边知识点数据隐藏
                    firstTreeAdapter(data.data);
                }else{
                    alert("没有知识点相关信息！！！");
                    window.history.go(0);
                }
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
                        upParent.next(".node").children().append("<div class='tree second_ceng' data-deep='" + data[index].deep + "' id='" + data[index].id + "' onclick='clickShow(this)'>" + data[index].name + "</div>" +
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
                        upParent.next(".node").children().append("<div class='tree third_ceng' data-deep='" + data[index].deep + "' id='" + data[index].id + "' onclick='clickShow(this)'>" + data[index].name + "</div>" +
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
});

/** 得到第一个目录树的字符串 */
function addStringOne(type) {
    var result = '';
    var allDiv = $(".allParent").find(".bg_grey");
    if ( allDiv.length == 1 ||type===1) {
        result = allDiv.eq(0).attr("id");
    }else if( allDiv.length == 2 ||type===2){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id");
    }else if( allDiv.length == 3 ||type===3){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id")+","+allDiv.eq(2).attr("id")
    }else if( allDiv.length == 4 ||type===4){
        result = allDiv.eq(0).attr("id")+","+allDiv.eq(1).attr("id")+","+allDiv.eq(2).attr("id")+","+allDiv.eq(3).attr("id")
    }else{
        return;
    }
    return result;
}

/** 得到目录树的知识点信息 */
function getSpan(parent,type) {
    parent.html("");
    $("#table_data tr:not(:first)").remove();
    var result = '';
    var allDiv = $(".allParent").find(".bg_grey");
    if ( allDiv.length == 1 || type===1) {
        result = "<span>"+$(".phaseSubjectKnowledge").html()+"</span><span> > </span><span>"+allDiv.eq(0).html()+"</span>"
    }else if( allDiv.length == 2 || type===2){
        result = "<span>"+$(".phaseSubjectKnowledge").html()+"</span><span> > </span><span>"+allDiv.eq(0).html()+"</span><span> > </span><span>"+allDiv.eq(1).html()+"</span>"
    }else if( allDiv.length == 3 || type===3){
        result = "<span>"+$(".phaseSubjectKnowledge").html()+"</span><span> > </span><span>"+allDiv.eq(0).html()+"</span><span> > </span><span>"+allDiv.eq(1).html()+"</span><span> > </span><span>"+allDiv.eq(2).html()+"</span>"
    }else if( allDiv.length == 4 || type===4){
        result = "<span>"+$(".phaseSubjectKnowledge").html()+"</span><span> > </span><span>"+allDiv.eq(0).html()+"</span><span> > </span><span>"+allDiv.eq(1).html()+"</span><span> > </span><span>"+allDiv.eq(2).html()+"</span><span> > </span><span>"+allDiv.eq(3).html()+"</span>"
    }else{
        return;
    }
    // return result;
    parent.append(result);
}

/** 第一个目录树的点击事件 */
function clickShow(obj) {

    $(".wrap_table").css("display","block");      //右边知识点数据显示
    /*获取当前的dom对象*/
    var $this = $(obj);
    /*通过颜色判断选中与否*/
    var allDiv=$(".allParent").find("div");
    for(var i=0;i<allDiv.length;i++){
        allDiv.removeClass("bg_grey")
    }
    $this.addClass("bg_grey");
    $this.parents().prev().addClass("bg_grey").siblings().removeClass("bg_grey");
    /*是否显示下一级目录*/
    var ul = $this.next(".node");
    if(ul.css("display")=="none"){
        ul.slideDown();
        $this.addClass("ce_ceng_open");
        ul.find(".ce_ceng_open").removeClass("ce_ceng_open");
    }else{
        ul.slideUp();
        $this.removeClass("ce_ceng_open");
        ul.find(".node").slideUp();
        ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
    }
    /*判断是deep几被点击*/
    var deep =$this.data("deep");
    showAllDiv(deep);

}
function showAllDiv(deep) {
    var One=Number("1");
    var Two=Number("2");
    var Three=Number("3");
    $(".wrap_table").css("visibility","visible");            //右边知识点数据显示
    $(".wrap_table_right").css("visibility","visible");      //右边知识点数据显示
    if(deep===One){
        getSpan($(".table_head_01"),1);
        /*显示第一层的span结构*/
        $(".table_head_01").css("visibility","visible");
        $(".table_head_02").css("visibility","hidden");
        $(".table_head_03").css("visibility","hidden");
        $(".table_head_04").css("visibility","hidden");
        /*第一层的结构的最后一个span*/
        $(".table_head_01 span:last").addClass("table_on");
        $(".table_head_02 span:last").removeClass("table_on");
        $(".table_head_03 span:last").removeClass("table_on");
        $(".table_head_04 span:last").removeClass("table_on");
        /*显示第一层的知识点数据结构*/
        $(".table_right_01").css("visibility","visible").siblings().css("visibility","hidden");
        /*显示第一个P标签*/
        $(".wrap_table_left p").eq(0).css("visibility","visible").siblings().css("visibility","hidden");
        /*适配知识点*/
        knowledgeAJAX(addStringOne(1),$(".table_01"));
    }else if(deep===Two){
        getSpan($(".table_head_01"),1);
        getSpan($(".table_head_02"),2);
        /*显示第一个和第二个P标签*/
        $(".wrap_table_left p").eq(0).css("visibility","visible");
        $(".wrap_table_left p").eq(1).css("visibility","visible");
        $(".wrap_table_left p").eq(2).css("visibility","hidden");
        $(".wrap_table_left p").eq(3).css("visibility","hidden");
        /*显示第一层和第二层的结构*/
        $(".table_head_01").css("visibility","visible");
        $(".table_head_02").css("visibility","visible");
        $(".table_head_03").css("visibility","hidden");
        $(".table_head_04").css("visibility","hidden");
        /*第二层的结构的最后一个span*/
        $(".table_head_01 span:last").removeClass("table_on");
        $(".table_head_02 span:last").addClass("table_on");
        $(".table_head_03 span:last").removeClass("table_on");
        $(".table_head_04 span:last").removeClass("table_on");
        /*显示第一层和第二层的知识点数据结构*/
        $(".table_right_01").css("visibility","visible");
        $(".table_right_02").css("visibility","visible");
        $(".table_right_03").css("visibility","hidden");
        $(".table_right_04").css("visibility","hidden");
        /*适配知识点*/
        knowledgeAJAX(addStringOne(1),$(".table_01"));
        knowledgeAJAX(addStringOne(2),$(".table_02"));
    }else if(deep===Three){
        getSpan($(".table_head_01"),1);
        getSpan($(".table_head_02"),2);
        getSpan($(".table_head_03"),3);
        /*显示第一个、第二个和第三个P标签*/
        $(".wrap_table_left p").eq(0).css("visibility","visible");
        $(".wrap_table_left p").eq(1).css("visibility","visible");
        $(".wrap_table_left p").eq(2).css("visibility","visible");
        $(".wrap_table_left p").eq(3).css("visibility","hidden");
        /*显示第一层、第二层和第三层的结构*/
        $(".table_head_01").css("visibility","visible");
        $(".table_head_02").css("visibility","visible");
        $(".table_head_03").css("visibility","visible");
        $(".table_head_04").css("visibility","hidden");
        /*第三层的结构的最后一个span*/
        $(".table_head_01 span:last").removeClass("table_on");
        $(".table_head_02 span:last").removeClass("table_on");
        $(".table_head_03 span:last").addClass("table_on");
        $(".table_head_04 span:last").removeClass("table_on");
        /*显示第一层、第二层和第三层的知识点数据结构*/
        $(".table_right_01").css("visibility","visible");
        $(".table_right_02").css("visibility","visible");
        $(".table_right_03").css("visibility","visible");
        $(".table_right_04").css("visibility","hidden");
        /*适配知识点*/
        knowledgeAJAX(addStringOne(1),$(".table_01"));
        knowledgeAJAX(addStringOne(2),$(".table_02"));
        knowledgeAJAX(addStringOne(3),$(".table_03"));
    }else{
        getSpan($(".table_head_01"),1);
        getSpan($(".table_head_02"),2);
        getSpan($(".table_head_03"),3);
        getSpan($(".table_head_04"),4);
        /*显示第一个、第二个、第三个和第四个P标签*/
        $(".wrap_table_left p").eq(0).css("visibility","visible");
        $(".wrap_table_left p").eq(1).css("visibility","visible");
        $(".wrap_table_left p").eq(2).css("visibility","visible");
        $(".wrap_table_left p").eq(3).css("visibility","visible");
        /*显示第一层、第二层、第三层和第四层的结构*/
        $(".table_head_01").css("visibility","visible");
        $(".table_head_02").css("visibility","visible");
        $(".table_head_03").css("visibility","visible");
        $(".table_head_04").css("visibility","visible");
        /*第四层的结构的最后一个span*/
        $(".table_head_01 span:last").removeClass("table_on");
        $(".table_head_02 span:last").removeClass("table_on");
        $(".table_head_03 span:last").removeClass("table_on");
        $(".table_head_04 span:last").addClass("table_on");
        /*显示第一层、第二层、第三层和第四层的知识点数据结构*/
        $(".table_right_01").css("visibility","visible");
        $(".table_right_02").css("visibility","visible");
        $(".table_right_03").css("visibility","visible");
        $(".table_right_04").css("visibility","visible");
        /*适配知识点*/
        knowledgeAJAX(addStringOne(1),$(".table_01"));
        knowledgeAJAX(addStringOne(2),$(".table_02"));
        knowledgeAJAX(addStringOne(3),$(".table_03"));
        knowledgeAJAX(addStringOne(4),$(".table_04"));
    }
}

function knowledgeAJAX(type,parent) {
    $.ajax({
        type:"post",
        url:getBasePath()+"statisticalAnalysis/queryKnowledgeNum",
        dataType:"json",
        data:{
            json :type
        },
        success:function (data) {
            if(data.status==0){
                knowledgeAdapter(data.data,parent);
            }else{
                alert("知识点数据,请求错误。");
            }
        }
    })
}
function knowledgeAdapter(data,parent) {
    var data=data[0];
    parent.find("tr.secondTr").html("");
    var result="";
    var total;
    var courseware;
    var smallclass;
    var design;
    var practice;
    var material;
    var learinng;
    var research;
    var expand;
    var Etextbook;
    var teacherbook;
    var CurriculumAndInterpretation;
    var teachingvideo;
    var experiment;
    var mediumtest;
    var nationaltest;
    var primarytest;
    var middletest;
    var hightest;
    var knowledgedetail;
    var studyvideo;
    var textexplain;
    var currentpoint;
    var practicaleducationAll;
    var nounsexplanation;
    if(data===null){
        total=0;
        courseware=0;
        smallclass=0;
        design=0;
        practice=0;
        material=0;
        learinng=0;
        research=0;
        expand=0;
        Etextbook=0;
        teacherbook=0;
        CurriculumAndInterpretation=0;
        teachingvideo=0;
        experiment=0;
        mediumtest=0;
        nationaltest=0;
        primarytest=0;
        middletest=0;
        hightest=0;
        knowledgedetail=0;
        studyvideo=0;
        textexplain=0;
        currentpoint=0;
        practicaleducationAll=0;
        nounsexplanation=0;
    }else{
        total=getValue(data.total);
        courseware=getValue(data.courseware);
        smallclass=getValue(data.smallclass);
        design=getValue(data.design);
        practice=getValue(data.practice);
        material=getValue(data.material);
        learinng=getValue(data.learinng);
        research=getValue(data.research);
        expand=getValue(data.expand);
        Etextbook=getValue(data.Etextbook);
        teacherbook=getValue(data.teacherbook);
        CurriculumAndInterpretation=getValue(data.CurriculumAndInterpretation);
        teachingvideo=getValue(data.teachingvideo);
        experiment=getValue(data.experiment);
        mediumtest=getValue(data.mediumtest);
        nationaltest=getValue(data.nationaltest);
        primarytest=getValue(data.primarytest);
        middletest=getValue(data.middletest);
        hightest=getValue(data.hightest);
        knowledgedetail=getValue(data.knowledgedetail);
        studyvideo=getValue(data.studyvideo);
        textexplain=getValue(data.textexplain);
        currentpoint=getValue(data.currentpoint);
        practicaleducationAll=getValue(data.practicaleducationAll);
        nounsexplanation=getValue(data.nounsexplanation);
    }

    result = "<tr class='secondTr'>" +
        "<td><span>"+total+"</span></td>" +
        "<td><span>"+courseware+"</span></td>" +
        "<td><span>"+smallclass+"</span></td>" +
        "<td><span>"+design+"</span></td>" +
        "<td><span>"+practice+"</span></td>" +
        "<td><span>"+material+"</span></td>" +
        "<td><span>"+learinng+"</span></td>" +
        "<td><span>"+research+"</span></td>" +
        "<td><span>"+expand+"</span></td>" +
        "<td><span>"+Etextbook+"</span></td>" +
        "<td><span>"+teacherbook+"</span></td>" +
        "<td><span>"+CurriculumAndInterpretation+"</span></td>" +
        "<td><span>"+teachingvideo+"</span></td>" +
        "<td><span>"+experiment+"</span></td>" +
        "<td><span>"+mediumtest+"</span></td>" +
        "<td><span>"+nationaltest+"</span></td>" +
        "<td><span>"+primarytest+"</span></td>" +
        "<td><span>"+middletest+"</span></td>" +
        "<td><span>"+hightest+"</span></td>" +
        "<td><span>"+knowledgedetail+"</span></td>" +
        "<td><span>"+studyvideo+"</span></td>" +
        "<td><span>"+textexplain+"</span></td>" +
        "<td><span>"+currentpoint+"</span></td>" +
        "<td><span>"+practicaleducationAll+"</span></td>" +
        "<td><span>"+nounsexplanation+"</span></td>" +
        "</tr>";
    parent.append(result)
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}
