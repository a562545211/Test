/**
 * Created by jhzhang on 2016/11/24.
 */

/** 一二级资源分类表格总计 */
var totalNum = 0;
//参数中学科的Id------“createUserId”
var startTime ="";         //开始时间
var endTime ="";           //结束时间
var phasesubject1="";      //获取学段id
var phasesubject2="";      //获取学科id
var userId="";             //用户Id
var phasesubjectDataOne;     //进入页面，暂时保存学科和学段数据

$(function () {


    localStorage.removeItem("initAllData");

    /** 日历组件初始化代码 */
    setDateTime();
    function setDateTime(){
        //日期设置
        // $.datetimepicker.setLocale('ch');
        $('#dates_start1').datetimepicker({
            //yearOffset:222,
            lang:'ch',
            timepicker:true,
            format:'Y-m-d',
            formatDate:'Y-m-d',
            timepickerScrollbar:false,
            forceParse:false,
            onShow:function( ct ) {
                this.setOptions({
                    maxDate: $('#dates_end1').val() ? $('#dates_end1').val() : false
                })
            }
        });
        $('#dates_end1').datetimepicker({
            //yearOffset:222,
            lang:'ch',
            timepicker:true,     
            format:'Y-m-d',
            formatDate:'Y-m-d',
            timepickerScrollbar:false,
            forceParse:false,
            onShow:function( ct ) {
                this.setOptions({
                    minDate: $('#dates_start1').val() ? $('#dates_start1').val() : false
                })
            }
        });

        $("#startDate").change(function () {
            var startDay = $("#startDate").datepicker("getDate");
            vm.startdate = getFormatDate(startDay);
            var endDay = $("#endDate").datepicker("getDate");
            if (vm.startdate && vm.startdate != '') {
                $("#endDate").datepicker("option", "minDate", vm.startdate);
            }
            // console.log("startDate startTime date is =========" + vm.startdate);

        });
        $("#endDate").change(function () {
            var startDay = $("#endDate").datepicker("getDate");
            var endDay = $("#endDate").datepicker("getDate");
            vm.enddate = getFormatDate(endDay);
            if (vm.enddate && vm.enddate != '') {
                $("#endDate").datepicker("option", "maxDate", vm.enddate);
            }
            // console.log("endDate endTime date is =========" + vm.enddate);
        });
        /** 点击最近时间切换 */
        getTime();
    }

    startTime=$("#dates_start1").val();     //开始时间
    endTime=$("#dates_end1").val();         //结束时间

    /** 进入页面适配学段和学科 */
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
                    alert("获取学段和学科信息成功，但是没有相关数据！！");
                }
            }
        });
    }
    function loadKnowledgeAdapter(data){
        phasesubjectDataOne=data;
        $("#phasesubject1 ").selectBox("removeAll");
        /*12月30号，修改，添加全部*/
        $("#phasesubject1").find(".selectbox_body").append("<li data-value=''>全部</li>");
        $(data).each(function (i) {
            if(data[i].deep==1){
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }
        })
    }

    /** 点击学段适配学科 */
    $("#phasesubject1").selectBox("callback",function(_data){
        $("#phasesubject2 ").selectBox("removeAll");
        /*12月30号，修改，添加全部*/
        $("#phasesubject2").find(".selectbox_body").append("<li data-value=''>全部</li>");
        var parentId = _data;
        for(var i=0;i<phasesubjectDataOne.length;i++){
            if(phasesubjectDataOne[i].parentId===parentId){
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + phasesubjectDataOne[i].dataAuthorityId + "\" title='"+phasesubjectDataOne[i].name+"'>" + phasesubjectDataOne[i].name + "</li>");
            }
        }
    });

    phasesubject1 = $("#phasesubject1 input").val();   //获取学段id
    phasesubject2 = $("#phasesubject2 input").val();   //获取学科id

    /** 进入页面初始化查询 */
    searchPage();

    /** 点击统计按钮 */
    $(".btn-statistics").click(function () {
        /**点击全部等按钮数据适配*/
        searchPage();
    });
});

/**
 * 初始化分页对象
 * @params url 访问后台分页地址
 * @params pageId 页面上id="page"的div
 * @params callBack 自己定义的，拼接table数据的方法，data：callBack的参数：json格式的table数据
 */
var pagination = new Pagination(getBasePath()+"statisticalAnalysis/getWorkload", "page", function (data) {
    fillTableData(data)
});

/**
 * 定义的查询方法
 * @params page 可选参数，页面上“查询”按钮初始值 = 1, 页面上“确定”按钮、初始化加载不需要赋值
 */
function searchPage(page){
    pagination.search(getParams(), page);
}

/** 得到搜索条件的json对象 */
function getParams(){
    // console.log($("#phasesubject1 input").val());
    // console.log($("#phasesubject2 input").val());
    // console.log($("#dates_start1").val());
    // console.log($("#dates_end1").val());
    // console.log($("#peopleName").val());
    /** 学科、学段、开始时间、结束时间和姓名 */
    var params = {
        phaseId : $("#phasesubject1 input").val(),       //学段
        subjectId : $("#phasesubject2 input").val(),     //学科
        startTime : $("#dates_start1").val(),  //开始时间
        endTime : $("#dates_end1").val(), //结束时间
        createUserName:$("#peopleName").val()   //姓名
    };
    return params;
}

/** table数据 */
function fillTableData(data){
    $(".wrap_table").css("visibility","visible");
    //清空table
    $("#table_data tr:not(:first)").remove();
    var result = "";
    for(var i = 0; i < data.length; i++){
        var createUserName  = getValue(data[i].createUserName);         //姓名
        var description  = getValue(data[i].description);               //描述
        var uploadNumber  = getValue(data[i].uploadNumber);             //上传数量
        var topicNumber  = getValue(data[i].topicNumber);               //发稿数量
        var vettedNumber  = getValue(data[i].vettedNumber);             //审核数量
        var id  = getValue(data[i].id);                                 //用户id
        result += "<tr>" +
            "<td>" + createUserName + "</td>"
            + "<td>" + description + "</td>"
            + "<td>" + uploadNumber + "</td>"
            + "<td>" + topicNumber + "</td>"
            + "<td>" + vettedNumber + "</td>"
            + "<td><a href='javascript:void(0)' class='showAll btn_xz_alert' data-id='"+id+"' onclick='clickShow(this)'>展开</a></td>" +
            "</tr>" +
            "<tr class='showAllTr'>" +
            "<td colspan='7'>" +
            "<div class='showAllDiv'>" +
            "<div class='primaryChinese clearfix'>" +
            "<p>" +
            "<span class='selected'></span>" +
            "</p>" +
            // "<button class='btn-normal hideAllDiv' onclick='hideAllDiv(this)'>收起</button>" +
            "</div>"+
            "<div class='peopleUploadAll clearfix' id='peopleUploadAll'>" +
            "<div class='fl uploadAll'>" +
            "<span>个人上传总量：</span>" +
            "<span class='uploadNumber'></span>" +
            "</div>" +
            "<div class='fr'>" +
            "<div class='type type_form btn_click' onclick='clickForm(this)'>类型</div>" +
            "<div class='form type_form' onclick='clickType(this)'>格式</div>" +
            "</div>" +
            "</div>"+
            "<div class='barGraph'>" +
            // "<div class='bar barGraphOne'></div>" +
            // "<div class='bar barGraphTwo'></div>" +
            "<div class='bar barGraphOne' style='height:500px;width:auto'></div>" +
            "<div class='bar barGraphTwo' style='height:500px;width:auto'></div>" +
            "</div>" +
            "<div class='barTable'>" +
            "<div class='table_wrap barTableOne clearfix'>" +
            "<table cellpadding='0' cellspacing='0'>" +
            "<tr class='not'>" +
            "<th>编号</th>" +
            "<th>一级资源分类</th>" +
            "<th>二级资源分类</th>" +
            "<th>数量</th>" +
            "<th>小计</th>" +
            "</tr>" +
            "<tr class='tableTr not'>" +
            "<td class='l_td table_td' colspan='5'>展开全部</td>" +
            "</tr>"+
            "</table>" +
            "</div>" +
            "<div class= 'table_wrap barTableTwo clearfix'>" +
            "<table cellpadding=‘0’ cellspacing=‘0’>" +
            "<tr>" +
            "<th>编号</th>" +
            "<th>格式</th>" +
            "<th>数量</th>" +
            "</tr>" +
            "<tr class='tableTr'>" +
            "<td class=''>1</td>" +
            "<td>图片</td>" +
            "<td class='image'></td>" +
            "</tr>"+
            "<tr class='tableTr'>" +
            "<td class=''>4</td>" +
            "<td>文档</td>" +
            "<td class='doc'></td>" +
            "</tr>"+
            "<tr class='tableTr'>" +
            "<td class=''>3</td>" +
            "<td>视频</td>" +
            "<td class='video'></td>" +
            "</tr>"+
            "<tr class='tableTr'>" +
            "<td class=''>2</td>" +
            "<td>音频</td>" +
            "<td class='yinpin'></td>" +
            "</tr>"+
            "<tr class='tableTr'>" +
            "<td class=''>5</td>" +
            "<td>动画</td>" +
            "<td class='flash'></td>" +
            "</tr>" +
            "<tr class='tableTr'>" +
            "<td colspan='2'>总计</td>" +
            "<td class='total'></td>" +
            "</tr>"+
            "</table>" +
            "</div>" +
            "</div>" +
            "<div class='footer foot'>" +
            "<div class='footer_left f_common'>" +
            "<div class='left_bar1'>" +
            "<div class='word'>" +
            "<span>个人发稿总量:</span>" +
            "<div class='word_total topicNum'></div>" +
            "</div>" +
            "<div class='btn1'>导出</div>" +
            "</div>" +
            "<div class='left_bar2'>" +
            "<div class='green'>" +
            "<div class='green_num topicWord'></div>" +
            "<div class='green_word'>发稿字数(千字)</div>" +
            "</div>" +
            "<div class='green green_two'>" +
            "<div class='green_num topicTime'></div>" +
            "<div class='green_word'>音视频时长（分）</div>" +
            "</div>" +
            "<div class='green green_three'>" +
            "<div class='green_num topicSize'></div>" +
            "<div class='green_word'>资源大小(MB)</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='footer_right f_common'>" +
            "<div class='left_bar1'>" +
            "<div class='word'>" +
            "<span>个人审核总量:</span>" +
            "<div class='word_total vettedNumber'></div>" +
            "</div>" +
            "<div class='btn1'>导出</div>" +
            "</div>" +
            "<div class='right_bar2'>" +
            "<div class='right_top clearfix'>" +
            "<div class='word'>" +
            "<span>上传审核:</span>" +
            "<div class='word_total uploadvetted'></div>" +
            "</div>" +
            "<div class='word word_vetted'>" +
            "<span>发稿审核:</span>" +
            "<div class='word_total topicvetted'></div>" +
            "</div>" +
            "</div>" +
            "<div class='right_bottom'>" +
            "<div class='green green_four'>" +
            "<div class='green_num topicrechecked'></div>" +
            "<div class='green_word'>发稿复审</div>" +
            "</div>" +
            "<div class='green green_five'>" +
            "<div class='green_num topicfinal'></div>" +
            "<div class='green_word'>发稿终审</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"+
            "</td>" +
            "</tr>"
    }
    $("#table_data").append(result);
    $(".barTableTwo").css("display","none");    //第二个表格隐藏
}



/** 点击展开 */
function clickShow(obj) {

    startTime=$("#dates_start1").val();     //开始时间
    endTime=$("#dates_end1").val();         //结束时间

    var flag=true;
    /*获取当前的dom对象*/
    var $this = $(obj);
    var parent=$this.parents("tr").next("tr.showAllTr");
    if($this.html()=="收起"){
        $(".barTableOne table").html("");
        $this.parents("tr").next("tr.showAllTr").css("display","none");
        localStorage.removeItem("initAllData");
        $this.html("展开");
        flag = true;
    }else if($this.html()=="展开"){
        $this.html("收起");
        userId  = $this.data("id") ;   //获取当前点击人员的id
        var showAllTr=$this.parents("tr").next("tr.showAllTr");    //获取下一个tr
        var showAllDiv=showAllTr.find(".showAllDiv");              //获取下一个tr的showAllDiv
        var phasesubjectText1 = $("#phasesubject1 li.selectbox_selected").html();   //获取学段内容
        var phasesubjectText2 = $("#phasesubject2 li.selectbox_selected").html();   //获取学科内容
        if(phasesubjectText1 === undefined || phasesubjectText2 === undefined){
            var phasesubjectText3 = "";   //再次获取学段内容
            var phasesubjectText4 = "";   //再次获取学科内容

            $(".alertboxB").css("display","block");

            /** 再次获取学段和学科 */
            var phasesubjectData="";
            loadKnowledgeTwo(userId );
            function loadKnowledgeTwo(userId ){
                $.ajax({
                    type:"post",
                    url:getBasePath()+"statisticalAnalysis/queryUserDataAuthority",
                    dataType:"json",
                    data:{
                        userId :userId
                    },
                    success: function (data) {
                        if(data.status=="0"){
                            loadKnowledgeTwoAdapter(data.data);
                        }else{
                            alert("获取学段和学科信息成功，但是没有相关数据！！");
                        }
                    }
                });
            }
            function loadKnowledgeTwoAdapter(data){
                phasesubjectData=data;
                $("#phasesubject3").selectBox("removeAll");
                var numberOne=1;
                var numberTwo=1;
                for(var i=0;i<data.length;i++){
                    if(data[i].deep==1&&numberOne==1){
                        $("#phasesubject4").selectBox("removeAll");
                        numberOne++;
                        $("#phasesubject3").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" class='selectbox_selected' title='"+data[i].name+"'>" + data[i].name + "</li>");
                        $("#phasesubject3").selectBox("selectForData", data[i].dataAuthorityId,true);
                        phasesubject1=data[i].dataAuthorityId;
                        phasesubjectText3=data[i].name;
                        // for(var j=0;j<phasesubjectData.length;j++){
                        //     if(phasesubjectData[j].parentId===data[i].dataAuthorityId){
                        //         if(numberTwo==1){
                        //             $("#phasesubject4").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[j].dataAuthorityId + "\"  title='"+phasesubjectData[j].name+"'>" + phasesubjectData[j].name + "</li>");
                        //             $("#phasesubject4").selectBox("selectForData", phasesubjectData[j].dataAuthorityId,true);
                        //             phasesubject2=phasesubjectData[j].dataAuthorityId;   //学科ID
                        //             phasesubjectText4=phasesubjectData[j].name;
                        //             numberTwo++;
                        //         }else{
                        //             $("#phasesubject4").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[j].dataAuthorityId + "\" title='"+phasesubjectData[j].name+"'>" + phasesubjectData[j].name + "</li>");
                        //         }
                        //     }
                        // }
                    }else if(data[i].deep==1&&numberOne!=1){
                        $("#phasesubject3").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
                    }
                }
            }
            /** 点击学段适配学科 */
            $("#phasesubject3").selectBox("callback",function(_data,_caption){
                phasesubject1=_data;
                phasesubjectText3 = _caption;
                $("#phasesubject4").selectBox("removeAll");
                var parentId = _data;
                for(var i=0;i<phasesubjectData.length;i++){
                    if(phasesubjectData[i].parentId===parentId){
                        $("#phasesubject4").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[i].dataAuthorityId + "\" class='selectbox_selected' title='"+phasesubjectData[i].name+"'>" + phasesubjectData[i].name + "</li>");
                        $("#phasesubject4").selectBox("selectForData", phasesubjectData[i].dataAuthorityId,true);
                        phasesubject2=phasesubjectData[i].dataAuthorityId;
                        phasesubjectText4=phasesubjectData[i].name;
                    }
                }
                $("#phasesubject4").selectBox("callback",function(_data,_caption){
                    phasesubject2 = _data;
                    phasesubjectText4 = _caption;
                });
            });

            $(".closealertb").click(function () {
                $(".alertboxB").css("display","none");
                $this.parents("tr").next("tr.showAllTr").css("display","none");
                $this.html("展开");
            });
            $(".btn_qx").click(function () {
                $(".alertboxB").css("display","none");
                $this.parents("tr").next("tr.showAllTr").css("display","none");
                $this.html("展开");
            });
            $(".btn_qd").click(function () {

                $(".alertboxB").css("display","none");

                // $this.parents("tr").next("tr.showAllTr").css("display","table-row");

                for(var i=0;i<$("tr.showAllTr").length;i++){    //其他所有的tr.showAllTr都隐藏
                    $("tr.showAllTr").eq(i).css("display","none");
                    $(".btn_xz_alert").html("展开")
                }
                showAllTr.css("display","table-row");
                $this.html("收起");
                showAllDiv.find(".selected").html(phasesubjectText3+phasesubjectText4);

                if(flag==true){
                    /** 柱状图 */
                    barGraphOne(showAllDiv);
                    barGraphTwo(showAllDiv);

                    /** 进入页面适配数据 */
                    paramsAndRequire (phasesubject2,startTime,endTime,userId,phasesubject1,parent);
                    flag=false;
                }
            })

        }else{

            phasesubject1 = $("#phasesubject1 input").val();   //获取学段id
            phasesubject2 = $("#phasesubject2 input").val();   //获取学科id

            for(var i=0;i<$("tr.showAllTr").length;i++){
                $("tr.showAllTr").eq(i).css("display","none");
                $(".btn_xz_alert").html("展开")
            }
            $this.html("收起");
            showAllTr.css("display","table-row");    //显示下一个tr
            showAllDiv.find(".selected").html(phasesubjectText1+phasesubjectText2);
            /** 柱状图 */
            barGraphOne(showAllDiv);
            barGraphTwo(showAllDiv);

            /** 进入页面适配数据 */
            paramsAndRequire (phasesubject2,startTime,endTime,userId,phasesubject1,parent);

        }
    }
}

function barGraphOne(parent) {

    /** 基于准备好的dom，初始化echarts实例 */
    var chartOne=parent.find(".barGraphOne").get(0);
    var myChartOne = echarts.init(chartOne);
    /** 显示标题，图例和空的坐标轴 */
    myChartOne.setOption({
        legend: {
            data:['所有资源上传量','个人资源上传量'],
            orient:"vertical",
            left:"9%",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        tooltip:{
            trigger: 'axis'
        },
        itemStyle:{
            emphasis:{        //鼠标hover样式
                //阴影的大小
                shadowBlur:10,
                //阴影水平方向上的偏移
                shadowOffsetX:0,
                //阴影垂直方向上的偏移
                shadowOffsetY:0,
                //阴影颜色
                shadowColor:"rgba(0,0,0,.8)"
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ["课件","微课","教学设计","同步练习","素材","学案","教学研究","拓展资源","电子课本","教师用书","课表与解读","教学视频","实验","中考","高考","小学竞赛","初中竞赛","高中竞赛","知识详解","学习视频","课文全解","时政要点","实践教育","名词解释"],
                axisLabel:{
                    interval:"0",              //所有的名称都显示
                    //rotate:-20,               //名称倾斜
                    margin:15
                },
                axisTick:{
                    alignWithLabel:true,        //设置向下的箭头在中间
                    lineStyle:{
                        width:"3"
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start:0,      // 左边在 10% 的位置。
                end: 50,         // 右边在 60% 的位置。
                backgroundColor:"#E4E4E4",
                fillerColor:"#B1B1B1",
                top:"97%",
                bottom:"0",
                handleStyle:{
                    color:"#444",
                    fontSize:"14"
                }
            },
            {   // 这个dataZoom组件，也控制x轴。
                type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                xAxisIndex: [0],
                start: 0,      // 左边在 10% 的位置。
                end: 50,         // 右边在 60% 的位置。
                zoomLock:true
            }
        ],
        series : [
            {
                name:'所有资源上传量',
                type:'bar',
                // data:[2,5,7,23,25,76,135,162,32,20,6,3,33,33,4,21,11,34,11,23,44,13,42,111],
                data:[],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barGap: '-40%'
            },
            {
                name:'个人资源上传量',
                type:'bar',
                // data:[1,2,4,14,15,46,85,92,22,13,3,2,13,23,1,11,2,23,2,4,25,7,34,51],
                data:[],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#2196f4"
                    }
                },
                barGap: '-40%'         //两个柱状图之间的距离
            }
        ]
    });
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
    var param = {
        categoriesId : str   //id参数
    };
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:str,      //id参数
        userId :userId    //获取当前点击人员的id
    };
    /** 资源分类统计(资源类型总量)柱状图 */
    resourceTypeTotal(param);
    function resourceTypeTotal(param) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/queryResourceTypeNumTotal",
            dataType:"json",
            data:param,
            success:function (data) {
                if(data.status==0){
                    resourceTypeTotalAdapter(data.data);
                }else{
                    alert("获取资源统计总量（资源分类）成功，但是没有相关数据！！");
                }
            }
        })
    }
    function resourceTypeTotalAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var totalResourceArr = [];

        var coursewareAll;    //总课件
        var smallclassAll ;    //总微课
        var designAll ;			  //总教学设计
        var practiceAll ;    	  //总同步练习
        var materialAll ;        //总素材
        var learinngAll ;        //总学案
        var researchAll ;        //总教学研究
        var expandAll ;            //总拓展资源
        var etextbookAll ;      //总电子课本
        var teacherbookAll ;  //总教师用书
        var curriculumAndInterpretationAll ;    															  //总课表与解读
        var teachingvideoAll ;    //总教学视频
        var experimentAll ;    //总实验
        var mediumtestAll ;     //总中考
        var nationaltestAll ;    //总高考
        var primarytestAll ;    //总小学竞赛
        var middletestAll ;    //总初中竞赛
        var hightestAll ;        //总高中竞赛
        var knowledgedetailAll;    //总知识详解
        var studyvideoAll;    //总学习视频
        var textexplainAll;    //总课文全解
        var currentpointAll;    //总时政要点
        var practicaleducationAll;    //总实践教育
        var nounsexplanationAll;    //总名词解释
        if(data==null){
            coursewareAll = 0;    //总课件
            smallclassAll = 0;    //总微课
            designAll = 0;			  //总教学设计
            practiceAll = 0;    	  //总同步练习
            materialAll = 0;        //总素材
            learinngAll = 0;        //总学案
            researchAll = 0;        //总教学研究
            expandAll = 0;            //总拓展资源
            etextbookAll = 0;      //总电子课本
            teacherbookAll = 0;  //总教师用书
            curriculumAndInterpretationAll = 0;    															  //总课表与解读
            teachingvideoAll = 0;    //总教学视频
            experimentAll = 0;    //总实验
            mediumtestAll = 0;     //总中考
            nationaltestAll = 0;    //总高考
            primarytestAll = 0;    //总小学竞赛
            middletestAll = 0;    //总初中竞赛
            hightestAll = 0;        //总高中竞赛
            knowledgedetailAll = 0;    //总知识详解
            studyvideoAll = 0;    //总学习视频
            textexplainAll = 0;    //总课文全解
            currentpointAll = 0;    //总时政要点
            practicaleducationAll =0;    //总实践教育
            nounsexplanationAll = 0;    //总名词解释
        }else{
            coursewareAll = data.courseware;    //总课件
            smallclassAll = data.smallclass;    //总微课
            designAll = data.design;			  //总教学设计
            practiceAll = data.practice;    	  //总同步练习
            materialAll = data.material;        //总素材
            learinngAll = data.learinng;        //总学案
            researchAll = data.research;        //总教学研究
            expandAll = data.expand;            //总拓展资源
            etextbookAll = data.etextbook;      //总电子课本
            teacherbookAll = data.teacherbook;  //总教师用书
            curriculumAndInterpretationAll = data.curriculumAndInterpretation;    															  //总课表与解读
            teachingvideoAll = data.teachingvideo;    //总教学视频
            experimentAll = data.experiment;    //总实验
            mediumtestAll = data.mediumtest;     //总中考
            nationaltestAll = data.nationaltest;    //总高考
            primarytestAll = data.primarytest;    //总小学竞赛
            middletestAll = data.middletest;    //总初中竞赛
            hightestAll = data.hightest;        //总高中竞赛
            knowledgedetailAll = data.knowledgedetail;    //总知识详解
            studyvideoAll = data.studyvideo;    //总学习视频
            textexplainAll = data.textexplain;    //总课文全解
            currentpointAll = data.currentpoint;    //总时政要点
            practicaleducationAll = data.practicaleducation;    //总实践教育
            nounsexplanationAll = data.nounsexplanation;    //总名词解释
        }
        totalResourceArr = [coursewareAll, smallclassAll, designAll, practiceAll, materialAll, learinngAll, researchAll, expandAll, etextbookAll, teacherbookAll, curriculumAndInterpretationAll, teachingvideoAll, experimentAll, mediumtestAll, nationaltestAll, primarytestAll, middletestAll, hightestAll, knowledgedetailAll, studyvideoAll, textexplainAll, currentpointAll, practicaleducationAll, nounsexplanationAll];

        /** 获得图表的options对象 */
        var option = myChartOne.getOption();
        /** 资源总量配置 */
        option.series[0].data = totalResourceArr;
        myChartOne.setOption(option);
    }
    /** 资源分类统计(资源类型个人)柱图 */
    resourceType(params);
    function resourceType(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceTypeAdapter(data.data);
                }else{
                    alert("获取资源统计个人（资源分类）成功，但是没有相关数据！！！");
                }
            }
        })
    }
    function resourceTypeAdapter(data) {
        var data=data[0];
        // 资源总量空数组
        var totalResourceArr = [];
        var coursewareAll;    //个人课件
        var smallclassAll ;    //个人微课
        var designAll ;			  //个人教学设计
        var practiceAll ;    	  //个人同步练习
        var materialAll ;        //个人素材
        var learinngAll ;        //个人学案
        var researchAll ;        //个人教学研究
        var expandAll ;            //个人拓展资源
        var etextbookAll ;      //个人电子课本
        var teacherbookAll ;  //个人教师用书
        var curriculumAndInterpretationAll ;    															  //总课表与解读
        var teachingvideoAll ;    //个人教学视频
        var experimentAll ;    //个人实验
        var mediumtestAll ;     //个人中考
        var nationaltestAll ;    //个人高考
        var primarytestAll ;    //个人小学竞赛
        var middletestAll ;    //个人初中竞赛
        var hightestAll ;        //个人高中竞赛
        var knowledgedetailAll;    //个人知识详解
        var studyvideoAll;    //个人学习视频
        var textexplainAll;    //个人课文全解
        var currentpointAll;    //个人时政要点
        var practicaleducationAll;    //个人实践教育
        var nounsexplanationAll;    //个人名词解释
        if(data==null){
            coursewareAll = 0;
            smallclassAll = 0;
            designAll = 0;
            practiceAll = 0;
            materialAll = 0;
            learinngAll = 0;
            researchAll = 0;
            expandAll = 0;
            etextbookAll = 0;
            teacherbookAll = 0;
            curriculumAndInterpretationAll = 0;
            teachingvideoAll = 0;
            experimentAll = 0;
            mediumtestAll = 0;
            nationaltestAll = 0;
            primarytestAll = 0;
            middletestAll = 0;
            hightestAll = 0;
            knowledgedetailAll = 0;
            studyvideoAll = 0;
            textexplainAll = 0;
            currentpointAll = 0;
            practicaleducationAll =0;
            nounsexplanationAll = 0;
        }else{
            coursewareAll = data.courseware;
            smallclassAll = data.smallclass;
            designAll = data.design;
            practiceAll = data.practice;
            materialAll = data.material;
            learinngAll = data.learinng;
            researchAll = data.research;
            expandAll = data.expand;
            etextbookAll = data.etextbook;
            teacherbookAll = data.teacherbook;
            curriculumAndInterpretationAll = data.curriculumAndInterpretation;
            experimentAll = data.experiment;
            mediumtestAll = data.mediumtest;
            nationaltestAll = data.nationaltest;
            primarytestAll = data.primarytest;
            middletestAll = data.middletest;
            hightestAll = data.hightest;
            knowledgedetailAll = data.knowledgedetail;
            studyvideoAll = data.studyvideo;
            textexplainAll = data.textexplain;
            currentpointAll = data.currentpoint;
            practicaleducationAll = data.practicaleducation;
            nounsexplanationAll = data.nounsexplanation;
        }
        totalResourceArr = [coursewareAll, smallclassAll, designAll, practiceAll, materialAll, learinngAll, researchAll, expandAll, etextbookAll, teacherbookAll, curriculumAndInterpretationAll, teachingvideoAll, experimentAll, mediumtestAll, nationaltestAll, primarytestAll, middletestAll, hightestAll, knowledgedetailAll, studyvideoAll, textexplainAll, currentpointAll, practicaleducationAll, nounsexplanationAll];

        /** 获得图表的options对象 */
        var option = myChartOne.getOption();
        /** 已筛选资源总量配置 */
        option.series[1].data = totalResourceArr;
        myChartOne.setOption(option);
    }
}

function barGraphTwo(parent) {

    var chartTwo =parent.find(".barGraphTwo").get(0);
    var myChartTwo = echarts.init(chartTwo);
    /** 显示标题，图例和空的坐标轴 */
    myChartTwo.setOption({
        legend: {
            data:['所有资源上传量','个人资源上传量'],
            orient:"vertical",
            left:"9%",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        tooltip:{
            trigger: 'axis'
        },
        itemStyle:{
            emphasis:{        //鼠标hover样式
                //阴影的大小
                shadowBlur:10,
                //阴影水平方向上的偏移
                shadowOffsetX:0,
                //阴影垂直方向上的偏移
                shadowOffsetY:0,
                //阴影颜色
                shadowColor:"rgba(0,0,0,.8)"
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ["图片","文档","视频","音频","动画"],
                axisLabel:{
                    interval:"0",              //所有的名称都显示
                    //rotate:-20,               //名称倾斜
                    margin:15
                },
                axisTick:{
                    alignWithLabel:true,        //设置向下的箭头在中间
                    lineStyle:{
                        width:"3"
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'所有资源上传量',
                type:'bar',
                // data:[2,5,7,23,25],
                data:[],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barCategoryGap: '60%',
                barGap: '-40%'
            },
            {
                name:'个人资源上传量',
                type:'bar',
                // data:[1,2,4,14,15],
                data:[],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#2196f4"
                    }
                },
                barCategoryGap: '60%',
                barGap: '-40%'         //两个柱状图之间的距离
            }
        ]
    });
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
    var param = {
        categoriesId : str  //id参数
    };
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:str,     //id参数
        userId :userId      //获取当前点击人员的id
    };
    /** 资源分类统计(资源格式总量) */
    resourceFormTotal(param);
    function resourceFormTotal(param) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/getResourceFormNumTotal",
            dataType:"json",
            data:param,
            success:function (data) {
                if(data.status==0){
                    resourceFormTotalAdapter(data.data);
                }else{
                    alert("获取资源统计总量（资源格式）成功，但是没有相关数据！！");
                }
            }
        })
    }
    function resourceFormTotalAdapter(data) {
        // 资源总量数组
        var formTotalArr = [];
        var image,doc,video,audio,flash;   		            //动画
        if(data[0]==null){
            image = 0;    		            //图片
            doc = 0;    			            //文档
            video = 0;    		            //视频
            audio = 0;    		            //音频
            flash = 0;    		            //动画
        }else{
            image = data[0].image;    		            //图片
            doc = data[0].doc;    			            //文档
            video = data[0].video;    		            //视频
            audio = data[0].audio;    		            //音频
            flash = data[0].flash;    		            //动画
        }
        formTotalArr = [image, doc, video, audio, flash];
        //获得图表的options对象
        var option2 = myChartTwo.getOption();
        option2.series[0].data = formTotalArr;
        myChartTwo.setOption(option2);
    }
    /** 资源统计（资源格式个人）柱图 */
    resourceForm(params);
    function resourceForm(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/getResourceFormNum",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceFormAdapter(data.data);
                }else{
                    alert("获取资源统计个人（资源格式）成功，但是没有相关数据！！");
                }
            }
        })
    }
    function resourceFormAdapter(data) {
        // 资源总量数组
        var formArr = [];
        var image,doc,video,audio,flash;
        if(data[0]==null){
            image = 0;    		            //图片
            doc = 0;    			         //文档
            video = 0;    		            //视频
            audio = 0;    		            //音频
            flash = 0;    		            //动画
        }else{
            image = data[0].image;    		            //图片
            doc = data[0].doc;    			            //文档
            video = data[0].video;    		            //视频
            audio = data[0].audio;    		            //音频
            flash = data[0].flash;    		            //动画
        }
        formArr = [image, doc, video, audio, flash];
        //获得图表的options对象
        var option2 = myChartTwo.getOption();

        option2.series[1].data = formArr;
        myChartTwo.setOption(option2);

    }
}


function paramsAndRequire (phasesubject2,startTime,endTime,userId,phasesubject1,$this) {
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
    /** 得到搜索条件的json对象 */
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:str,      //学科Id
        userId  :userId      //获取当前点击人员的id
    };
    var param={
        phaseId : phasesubject1,       //学段Id
        subjectId : phasesubject2,     //学科Id
        startTime : startTime,        //开始时间
        endTime : endTime,           //结束时间
        userId  :userId             //获取当前点击人员的id
    };
    var paramData={
        phaseId : phasesubject1,       //学段Id
        subjectId : phasesubject2,     //学科Id
        startTime : startTime,        //开始时间
        endTime : endTime,           //结束时间
        createUserId   :userId             //获取当前点击人员的id
    };
    /** 个人上传总量*/
    uploadNumber(params,$this);
    /** 资源类型统计*/
    secondResourceType(paramData,$this);
    /** 资源统计格式 */
    secondResourceForm(params,$this);
    /** 资源统计（发稿统计） */
    statisticsTopic(params,$this);
    /** 资源统计（审核统计）（审核统计-个人审核数量,上传审核数量,发稿审核数量） */
    statisticsVetted(params,$this);
    /** 资源统计（审核统计-发稿复审）*/
    topicVetted(params,$this);
    /** 资源统计（审核统计-发稿终审）*/
    topicVettedFinal(params,$this)
}

/** 个人上传总量*/
function uploadNumber(params,$this){
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryUploadNumber",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                uploadNumberAdapter(data.data,$this);
            }else{
                alert("获取资源统计（个人上传总量）成功，但是没有相关数据！！");
            }
        }
    })
}
function uploadNumberAdapter(data,$this){
    var uploadNumber;
    if(data[0]==null){
        $this.find(".uploadNumber").html(0);
    }else{
        $this.find(".uploadNumber").html(getValue(data[0].uploadNumber));
    }

}

/**
 * 清空table
 * */
var clearTable = function() {
    $(".barTableOne table tr").remove();
    var resultOne="<tr class='not'>" +
        "<th>编号</th>" +
        "<th>一级资源分类</th>" +
        "<th>二级资源分类</th>" +
        "<th>数量</th>" +
        "<th>小计</th>" +
        "</tr>";
    return resultOne;
};

/** 资源类型统计*/
function secondResourceType(param,$this){
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getResourceStatistics",
        dataType:"json",
        data:param,
        success:function (data) {
            if(data.status==0){
                localStorage.setItem("initAllData",JSON.stringify(data.data));
                // localStorage.setItem("nowParent",JSON.stringify($this));
                secondResourceTypeAdapter();
            }else{
                alert("获取资源类型统计成功，但是没有相关数据！！");
            }
        }
    })
}
function secondResourceTypeAdapter() {     //刚进来时，部分数据是隐藏的
    totalNum = 0;
    var resultOne = clearTable();
    var data = "";
    var hash = {};     //数组的对象去重

    data = JSON.parse(localStorage.getItem("initAllData")).reduce(function(item, next) {
        hash[next.primaryResourcesClassification] ? '' : hash[next.primaryResourcesClassification] = true && item.push(next);
        return item
    }, []);

    for(var i=0;i<data.length;i++){
        totalNum += data[i].subtotal;
        if(i<3){
            resultOne +="<tr class='tableTr'>" +
                "<td class='table_number'>"+(i+1)+"</td>" +
                "<td>"+getValue(data[i].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue(data[i].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(data[i].count)+"</td>" +
                "<td>"+getValue(data[i].subtotal)+"</td>" +
                "</tr>"
        }else if(i===3){
            resultOne +="<tr class='tableTr omit'>" +
                "<td>......</td>" +
                "<td>......</td>" +
                "<td class='secondType'>......</td>" +
                "<td class='smallCount'>......</td>" +
                "<td>......</td>" +
                "</tr>"
        }else if( i>=data.length-1){
            resultOne +="<tr class='tableTr'>" +
                "<td class='table_number'>"+(i+1)+"</td>" +
                "<td>"+getValue(data[i].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue(data[i].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(data[i].count)+"</td>" +
                "<td>"+getValue(data[i].subtotal)+"</td>" +
                "</tr>"
        }
    }

    resultOne +="<tr class='tableTr'><td>总计</td><td colspan='3'>-</td><td>"+ totalNum +"</td></tr><tr class='tableTr'><td class='l_td table_td' colspan='5'>显示全部</td></tr>";
    $(".barTableOne table").append(resultOne);

    $(".table_td").click(function () {
        fourResourceTypeAdapter();
    });
}
/** 个人展开全部的数据 */
function fourResourceTypeAdapter() {

    // var nowParent = JSON.parse(localStorage.getItem("nowParent"));
    var data = JSON.parse(localStorage.getItem("initAllData"));
    var item=[];
    var count=0;
    var countNum = 0;
    var firstData=data.splice(0,1);
    item=firstData;
    for(var i=0;i<data.length;i++){
        if(firstData[0].primaryResourcesClassification===data[i].primaryResourcesClassification){
            item=item.concat(data[i]);
            count++;
        }
    }
    data.splice(0,count);
    var result= clearTable();
    for(var j=0;j<item.length;j++){
        if(j===0){
            countNum++;
            result+="<tr class='tableTr'>" +
                // "<td rowspan='"+item.length+"' class='table_number'>"+getValue(item[j].nameNumber)+"</td>" +
                "<td rowspan='"+item.length+"' class='table_number'>"+countNum+"</td>" +
                "<td rowspan='"+item.length+"'>"+getValue(item[j].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue(item[j].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(item[j].count)+"</td>" +
                "<td rowspan='"+item.length+"'>"+getValue(item[j].subtotal)+"</td>" +
                "</tr>"

        }else{
            result+="<tr class='tableTr'>" +
                "<td class='secondType'>"+getValue(item[j].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(item[j].count)+"</td>" +
                "</tr>"
        }

    }
    $(".barTableOne table").append(result);
    var parent=$(".barTableOne table");
    fiveResourceTypeAdapter(parent,data,countNum);
}
function fiveResourceTypeAdapter(parent,data,countNum) {

    var cacheData = JSON.parse(localStorage.getItem("initAllData"));

    var items=[];
    var count=0;
    var firstData=data.splice(0,1);
    items=firstData;
    for(var i=0;i<data.length;i++){
        if(firstData[0].primaryResourcesClassification===data[i].primaryResourcesClassification){
            items=items.concat(data[i]);
            count++;
        }
    }
    data.splice(0,count);
    var result='';
    for(var j=0;j<items.length;j++){
        if(j===0){
            countNum++;
            result+="<tr class='tableTr'>" +
                // "<td rowspan='"+items.length+"' class='table_number'>"+getValue(items[j].nameNumber)+"</td>" +
                "<td rowspan='"+items.length+"' class='table_number'>"+countNum+"</td>" +
                "<td rowspan='"+items.length+"'>"+getValue(items[j].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue(items[j].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(items[j].count)+"</td>" +
                "<td rowspan='"+items.length+"'>"+getValue(items[j].subtotal)+"</td>" +
                "</tr>"
        }else{
            result+="<tr class='tableTr'>" +
                "<td class='secondType'>"+getValue(items[j].secondaryResourcesClassification)+"</td>" +
                "<td class='smallCount'>"+getValue(items[j].count)+"</td>" +
                "</tr>"
        }

    }
    parent.append(result);
    if(data.length != 0){
        fiveResourceTypeAdapter(parent,data,countNum);
    }else{
        parent.append("<tr class='tableTr'><td>总计</td><td colspan='3'>-</td><td>"+ totalNum +"</td></tr><tr class='tableTr'><td class='l_td table_td' colspan='5'>收起数据</td></tr>");

        $(".table_td").click(function () {
            JSON.parse(localStorage.getItem("initAllData"));
            secondResourceTypeAdapter();
        });
    }
    // var trArr = $(".table_number");
    // for(var i = 0; i < trArr.length; i++){
    //     $(trArr[i]).html(i+1);
    // }
}

/** 资源格式统计 */
function secondResourceForm(params,$this){
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getResourceFormNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                secondResourceFormAdapter(data.data,$this);
            }else{
                alert("获取资源格式统计成功，但是没有相关数据！！");
            }
        }
    })
}
function secondResourceFormAdapter(data,$this) {
    if(data[0]==null){
        $this.find("td.image").html(0);
        $this.find("td.yinpin").html(0);
        $this.find("td.video").html(0);
        $this.find("td.doc").html(0);
        $this.find("td.flash").html(0);
        $this.find("td.total").html(0);
    }else{
        $this.find("td.image").html(getValue(data[0].image));
        $this.find("td.yinpin").html(getValue(data[0].audio));
        $this.find("td.video").html(getValue(data[0].video));
        $this.find("td.doc").html(getValue(data[0].doc));
        $this.find("td.flash").html(getValue(data[0].flash));
        $this.find("td.total").html(getValue(data[0].image+data[0].audio+data[0].video+data[0].doc+data[0].flash));
    }

}

/** 资源统计（发稿统计） */
function statisticsTopic(params,$this) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getSelectedTopic",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                statisticsTopicAdapter(data.data,$this);
            }else{
                alert("获取资源统计（发稿统计）成功，但是没有相关数据！！");
            }
        }
    })
}
function statisticsTopicAdapter(data) {
    var topicNumber,topicSize,topicTime,topicWord;
    if(data[0].topicNumber==null||data[0].topicNumber==""||data[0].topicNumber==undefined){
        $(".topicNum").html(0);
    }else{
        topicNumber = getValue(data[0].topicNumber);    		        //发稿总量
        $(".topicNum").html(topicNumber);
    }

    if(data[0].topicsize==null||data[0].topicsize==""||data[0].topicsize==undefined){
        $(".topicSize").html(0);
    }else{
        topicSize = getValue(data[0].topicsize);    			        //资源大小
        $(".topicSize").html(Math.round(topicSize/1024/1024*100)/100);
    }

    if(data[0].topictime==null||data[0].topictime==""||data[0].topictime==undefined){
        $(".topicTime").html(0);
    }else{
        topicTime = getValue(data[0].topictime);    		            //音视频时长
        $(".topicTime").html(Math.round(topicTime));
    }

    if(data[0].topicword==null||data[0].topicword==""||data[0].topicword==undefined){
        $(".topicWord").html(0);
    }else{
        topicWord = getValue(data[0].topicword);    		            //发稿字数
        $(".topicWord").html(topicWord);
    }
}

/** 资源统计（审核统计）（审核统计-个人审核数量,上传审核数量,发稿审核数量） */
function statisticsVetted(params,$this) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceAuditNum",
        data:params,
        dataType:"json",
        success:function (data) {
            if(data.status==0){
                statisticsVettedAdapter(data.data,$this);
            }else{
                alert("获取资源统计（审核统计）成功，但是没有相关数据！！");
            }
        }
    })
}
function statisticsVettedAdapter(data,$this) {
    if(data[0]==null){
        $this.find(".topicvetted").html(0);
        $this.find(".uploadvetted").html(0);
        $this.find(".vettedNumber").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            var topicvetted = getValue(data[i].topicvetted);    	 //发稿审核
            var uploadvetted = getValue(data[i].uploadvetted);    	 //上传审核
            var vettedNumber = getValue(data[i].vettedNumber);       //个人审核总量
        }
        $this.find(".topicvetted").html(topicvetted);
        $this.find(".uploadvetted").html(uploadvetted);
        $this.find(".vettedNumber").html(vettedNumber);
    }
}

/** 资源统计（审核统计-发稿复审）*/
function topicVetted(params,$this) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryReappAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                topicVettedAdapter(data.data,$this);
            }else{
                alert("获取资源统计（发稿复审）成功，但是没有相关数据！！");
            }
        }
    })
}
function topicVettedAdapter(data,$this) {
    if(data[0]==null){
        $this.find(".topicrechecked").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            var topicrechecked = getValue(data[i].topicrechecked);  //发稿复审
        }
        $this.find(".topicrechecked").html(topicrechecked);
    }
}

/** 资源统计（审核统计-发稿终审）*/
function topicVettedFinal(params,$this) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryFinalAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                topicVettedFinalAdapter(data.data,$this);
            }else{
                alert("获取资源统计（发稿终审）成功，但是没有相关数据！！");
            }
        }
    })
}
function topicVettedFinalAdapter(data,$this) {
    if(data[0]==null){
        $this.find(".topicfinal").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            var topicfinal = getValue(data[i].topicfinal);   //发稿终审
        }
        $this.find(".topicfinal").html(topicfinal);
    }
}

/** 隔行换颜色 */
function changeColor(){
    var td=$("td.table_number");
    for(var i=0;i<td.length;i++){
        if(parseInt(td.eq(i).text())%2==0){
            td.eq(i).parent().css("background-color","#eaecf2")
        }
    }
}

/** 多余的table内容用省略号 */
function hideSecondType(){
    var secondType= $(".secondType");
    for(var j=0;j<secondType.length;j++){
        if(j<3){
            secondType.eq(j).parent().css("display","table-row");
        }else if(j>=3&&j<=(secondType.length-3)){
            secondType.eq(j).parent().css("display","none");
        }else{
            secondType.eq(j).parent().css("display","table-row");
        }
    }
    $(".omit").css("display","table-row");
}

/** 点击展开全部的类型table数据 */
function showTypeTable(obj) {
    /*获取当前的dom对象*/
    var $this = $(obj);
    if($this.text()=="展开全部"){
        var secondType= $(".secondType");
        for(var j=0;j<secondType.length;j++){
            secondType.eq(j).parent().css("display","table-row");
        }
        $(".omit").css("display","none");
        $this.html("收起数据");
    }else{
        hideSecondType();
        //$(".omit").css("display","none");
        $this.html("展开全部");
    }
}

/** 点击收起按钮 */
function hideAllDiv(obj) {
    /*获取当前的dom对象*/
    var $this = $(obj);
    $this.parents("tr").css("display", "none");
}

/** 点击类型按钮*/
function clickForm(obj){
    $this=$(obj);  //获取DOM元素
    $this.addClass("btn_click");
    $(".form").removeClass("btn_click");
    $this.parents(".peopleUploadAll").siblings(".barGraph").find(".bar").eq(0).css("display","block");
    $this.parents(".peopleUploadAll").siblings(".barGraph").find(".bar").eq(1).css("display","none");
    $this.parents(".peopleUploadAll").siblings(".barTable").find(".table_wrap").eq(0).css("display","block");
    $this.parents(".peopleUploadAll").siblings(".barTable").find(".table_wrap").eq(1).css("display","none");
}

/** 点击类型按钮 */
function clickType(obj) {
    $this=$(obj);
    $this.addClass("btn_click");
    $(".type").removeClass("btn_click");
    $this.parents(".peopleUploadAll").siblings(".barGraph").find(".bar").eq(0).css("display","none");
    $this.parents(".peopleUploadAll").siblings(".barGraph").find(".bar").eq(1).css("display","block");
    $this.parents(".peopleUploadAll").siblings(".barTable").find(".table_wrap").eq(0).css("display","none");
    $this.parents(".peopleUploadAll").siblings(".barTable").find(".table_wrap").eq(1).css("display","block");

}


/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val ==='')? "-": val;
}
