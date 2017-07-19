/**
 * Created by haoluo on 2016/11/24.
 */

/** 进入页面时隐藏格式柱状图 */
window.onload = function () {
    $(".switch2").hide();
}
var sss = 0;
/** 一二级资源分类表格总计 */
var totalNum = 0;
/** 四个饼图数据 */
var one = 0;
var two = 0;
var three = 0;
var four = 0;
/** 记录ID */
var id1 = "";
var id2 = "";
var id3 = "";
var id4 = "";
/** 饼图变化 */
// 学段
var phaseStr = "";
// 学科
var subjectStr = "";
// 版本
var versionStr = "";
//年级册次
var volumeStr = "";
// 资源类型
var rTypeStr = "课件";
/** 饼图变化(记录各个筛选条件下的资源量) */
/** 总资源 */
var allNum = 0;
/** 学段资源 */
var phaseNum = 0;
/** 学科资源 */
var subjectNum = 0;
/** 版本资源 */
var versionNum = 0;
/** 册次资源 */
var volumeNum = 0;
/** 类型资源 */
var typeNum = 0;
/** 各筛选条件下资源 */
var mainNum = 0;

$(function () {
    $('#dates_start1').val("");
    /** 进入页面适配数据*/
    /** 资源统计（学段学科+年级册次） */
    selectGrade();
    /** 资源统计（总资源量）柱图 默认显示一条柱 */
    resourceTypeTotalOnce();
    /** 资源统计（总资源格式）柱图 默认显示一条柱*/
    resourceFormTotalOnce();
    /** 资源类型统计（表格）*/
    secondResourceType();
    /** 资源统计（发稿统计） */
    statisticsTopic();
    /** 资源统计（发稿复审） */
    recheckTopic();
    /** 资源统计（发稿终审） */
    finalTopic();
    /** 资源统计（审核统计） */
    statisticsVetted();

    /** switch1 统计图组件初始化 */
    var myChart = echarts.init($("#chart").get(0));
    myChart.setOption({
        //鼠标提示框
        tooltip: {
            trigger: 'axis'
        },
        //图例
        legend: {
            orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
            x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
            data:['资源总量'],
            left:"0",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        grid:{
            x:50,
            x2:50
        },
        xAxis: {
            data: ["课件","微课","教案","同步练习","素材","学案","教学指导与研究","拓展资源","电子课本","教师用书","课标与解读","教学视频","实验","中考","高考","竞赛","知识详解","学习视频","课文全解","时政要点"],
            axisLabel:{
                interval:"0",              //所有的名称都显示
                //rotate:-20,               //名称倾斜
                margin:15
            },
            axisTick:{
                alignWithLabel:true,        //设置向下的箭头在中间
                lineStyle:{
                    width:"2"
                }
            }
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
        yAxis: [
            {
                type : 'value'
            }
        ],
        dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start:0,      // 左边在 10% 的位置。
                end: 50,         // 右边在 50% 的位置。
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
                start:0,      // 左边在 0% 的位置。
                end: 50,         // 右边在 50% 的位置。
                zoomLock:true
            }
        ],
        series: [
            {
                name: '资源总量',
                type: 'bar',
                // data: [40, 20, 50, 30, 60, 55,30,25,55,40,40, 20, 50, 30, 60, 55,30,25,55,40,30,25,55,40],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barGap: '-40%',
                barWidth:'45'
            }
            // {
            //     name:"筛选条件下资源量",
            //     type:"bar",
            //     // data:[20,7,15,8,2,25,23,10,20,30,40,17,15,18,42,25,23,10,20,30,23,10,20,30],
            //     itemStyle:{
            //         normal:{           //通用样式
            //             color:"#2196f4"
            //         }
            //     },
            //     barGap: '-40%'         //两个柱状图之间的距离
            // }
        ]
    });
    /** switch2 统计图组件初始化 */
    var myChart2 = echarts.init($("#chart2").get(0));
    myChart2.setOption({
        //鼠标提示框
        tooltip: {
            trigger: 'axis'
        },
        //图例
        legend: {
            orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
            x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
            data:['资源总量'],
            left:"3",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        grid:{
            x:50
        },
        xAxis: {
            data: ["图片","文档","视频","音频","动画"],
            axisLabel:{
                interval:"0",              //所有的名称都显示
                //rotate:-20,               //名称倾斜
                margin:15
            },
            axisTick:{
                alignWithLabel:true,        //设置向下的箭头在中间
                lineStyle:{
                    width:"2"
                }
            }
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
        yAxis: [
            {
                type : 'value'
            }
        ],
        series: [
            {
                name: '资源总量',
                type: 'bar',
                // data: [40, 20, 50, 30, 66],
                barWidth:40,
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barGap: '-40%',         //两个柱状图之间的距离
                barWidth:"45"
            }
            // {
            //     name:'筛选条件下资源量',
            //     type:'bar',
            //     // data:[30,10,30,20,40],
            //     barWidth:40,
            //     itemStyle:{
            //         normal:{           //通用样式
            //             color:"#2196f4"
            //         }
            //     },
            //     barGap: '-40%'         //两个柱状图之间的距离
            // }
        ]
    });

    /** 日历组件初始化代码 */
    setDateTime();
    function setDateTime(){
        //日期设置
        // $.datetimepicker.setLocale('ch');
        $('#dates_start1').datetimepicker({
            //yearOffset:222,
            lang:'ch',
            timepicker:false,
            format:'Y-m-d',
            formatDate:'Y-m-d',
            onShow:function( ct ) {
                this.setOptions({
                    maxDate: $('#dates_end1').val() ? $('#dates_end1').val() : false
                })
            }
        });
        $('#dates_end1').datetimepicker({
            //yearOffset:222,
            lang:'ch',
            timepicker:false,
            format:'Y-m-d',
            formatDate:'Y-m-d',
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
        });
        $("#endDate").change(function () {
            var startDay = $("#endDate").datepicker("getDate");
            var endDay = $("#endDate").datepicker("getDate");
            vm.enddate = getFormatDate(endDay);
            if (vm.enddate && vm.enddate != '') {
                $("#endDate").datepicker("option", "maxDate", vm.enddate);
            }
        });
        /** 点击最近时间切换 */
        getTime();
    }

    /** 资源统计和工作量统计切换 */
    $(".resource_statistics").click(function() {
        $(".resource_statistics").removeClass("btn_click");
        $(this).addClass("btn_click");
    });
    /** 章节统计和知识点统计切换 */
    $(".chapter_statistics").click(function() {
        $(".chapter_statistics").removeClass("btn_click");
        $(this).addClass("btn_click");
    });
    /**显示更多（收起）*/
    $('.jiantou p').click(function(){
        if ($(this).hasClass("more")) {
            // 显示更多
            if($(".grade_items li").length > 10){
                $(".grade_items").css("height","60px").addClass("box_shadow");
            }
            $(this).html("收起").removeClass("more").addClass("hide");
            $(".jian_b").css("borderTopColor","#f7941d");
        } else {
            // 收起
            $(this).html("更多").removeClass("hide").addClass("more");
            $(".jian_b").css("borderTopColor","#319aff");
            $(".grade_items").css("height","30px").removeClass("box_shadow");
        }
    });

    /**类型格式切换*/
    $(".type").click(function () {
        $(".type_form").removeClass("btn_click");
        $(this).addClass("btn_click");
        $(".switch1").show();
        $(".switch2").hide();
        var startTime=$("#dates_start1").val();     //开始时间
        var endTime=$("#dates_end1").val();         //结束时间
        var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":id4}]);
        var id = {
            "categoriesId":str
        };
        var idAndTime = {
            "categoriesId":str,
            "startTime":startTime,
            "endTime":endTime
        };

        if(startTime != "" && endTime != ""){
            //如果发生时间筛选，出现第二条柱
            barOne(id,idAndTime);
        }else{
            /** 资源统计（总资源量）柱图 默认显示一条柱 */
            resourceTypeTotalOnce(id);
        }
    });
    $(".form").click(function () {
        $(".type_form").removeClass("btn_click");
        $(this).addClass("btn_click");
        $(".switch2").show();
        $(".switch1").hide();
        var startTime=$("#dates_start1").val();     //开始时间
        var endTime=$("#dates_end1").val();         //结束时间
        var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":id4}]);
        var id = {
            "categoriesId":str
        };
        var idAndTime = {
            "categoriesId":str,
            "startTime":startTime,
            "endTime":endTime
        };

        if(startTime != "" && endTime != ""){
            //如果发生时间筛选，出现第二条柱
            barTwo(id,idAndTime);
        }else{
            /** 资源统计（总资源格式）柱图 默认显示一条柱*/
            resourceFormTotalOnce(id);
        }
    });

    // /** 点击最近时间切换 */
    var time = Date.parse(new Date())/1000;
    var oneMonth = 30*24*60*60;
    var threeMonth = 3*oneMonth;
    var sixMonth = 6*oneMonth;
    var timeNow=getLocalTime(time);
    var oneMonthLater=getLocalTime(time-oneMonth);
    var threeMonthLater=getLocalTime(time-threeMonth);
    var sixMonthLater=getLocalTime(time-sixMonth);
    $("#dates_start1").val("");
    $("#dates_end1").val("");
    $(".time_common").click(function () {
        $(this).addClass("btn_click").siblings().removeClass("btn_click");
        if($(this).data("date")=="one"){
            $("#dates_start1").val(oneMonthLater);
            $("#dates_end1").val(timeNow);
        }else if($(this).data("date")=="three"){
            $("#dates_start1").val(threeMonthLater);
            $("#dates_end1").val(timeNow);
        }else{
            $("#dates_start1").val(sixMonthLater);
            $("#dates_end1").val(timeNow);
        }
    });
    /** 时间戳转换成日期格式*/
    function getLocalTime(nS) {
        var time =new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g,"-").split(" ")[0];
        var arr=time.split("-");
        if(arr[1]<10){
            arr[1]="0"+arr[1]
        }
        if(arr[2]<10){
            arr[2]="0"+arr[2]
        }
        arr = arr.join("-");
        return arr;
    }
    /** 资源统计（总资源类型）柱图 默认显示一条柱 */
    function resourceTypeTotalOnce(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/queryResourceTypeNumTotal",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceTypeTotalOnceAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceTypeTotalOnceAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var totalResourceArr;
        if(data == null){
            var coursewareAll = 0;    //总课件
            var smallclassAll = 0;    //总微课
            var designAll = 0;			  //总教学设计
            var practiceAll = 0;    	  //总同步练习
            var materialAll = 0;        //总素材
            var learinngAll = 0;        //总学案
            var researchAll = 0;        //总教学研究
            var expandAll = 0;            //总拓展资源
            var etextbookAll = 0;      //总电子课本
            var teacherbookAll = 0;  //总教师用书
            var curriculumAndInterpretationAll = 0; //总课表与解读
            var teachingvideoAll = 0;    //总教学视频
            var experimentAll = 0;    //总实验
            var mediumtestAll = 0;     //总中考
            var nationaltestAll = 0;    //总高考
            var primarytestAll = 0;    //总小学竞赛
            var middletestAll = 0;    //总初中竞赛
            var hightestAll = 0;        //总高中竞赛
            var knowledgedetailAll = 0;    //总知识详解
            var studyvideoAll = 0;    //总学习视频
            var textexplainAll = 0;    //总课文全解
            var currentpointAll = 0;    //总时政要点
            var practicaleducationAll = 0;    //总实践教育
            var nounsexplanationAll = 0;    //总名词解释
        }else{
            var coursewareAll = data.courseware;    //总课件
            var smallclassAll = data.smallclass;    //总微课
            var designAll = data.design;			  //总教学设计
            var practiceAll = data.practice;    	  //总同步练习
            var materialAll = data.material;        //总素材
            var learinngAll = data.learinng;        //总学案
            var researchAll = data.research;        //总教学研究
            var expandAll = data.expand;            //总拓展资源
            var etextbookAll = data.etextbook;      //总电子课本
            var teacherbookAll = data.teacherbook;  //总教师用书
            var curriculumAndInterpretationAll = data.curriculumAndInterpretation; //总课表与解读
            var teachingvideoAll = data.teachingvideo;    //总教学视频
            var experimentAll = data.experiment;    //总实验
            var mediumtestAll = data.mediumtest;     //总中考
            var nationaltestAll = data.nationaltest;    //总高考
            var primarytestAll = data.primarytest;    //总小学竞赛
            var middletestAll = data.middletest;    //总初中竞赛
            var hightestAll = data.hightest;        //总高中竞赛
            var knowledgedetailAll = data.knowledgedetail;    //总知识详解
            var studyvideoAll = data.studyvideo;    //总学习视频
            var textexplainAll = data.textexplain;    //总课文全解
            var currentpointAll = data.currentpoint;    //总时政要点
            var practicaleducationAll = data.practicaleducation;    //总实践教育
            var nounsexplanationAll = data.nounsexplanation;    //总名词解释
        }
        var totalTestAll = primarytestAll + middletestAll + hightestAll;

        totalResourceArr = [coursewareAll, smallclassAll, designAll, practiceAll, materialAll, learinngAll, researchAll, expandAll, etextbookAll, teacherbookAll, curriculumAndInterpretationAll, teachingvideoAll, experimentAll, mediumtestAll, nationaltestAll, totalTestAll, knowledgedetailAll, studyvideoAll, textexplainAll, currentpointAll];

        var num = 0;
        for(var i = 0; i < totalResourceArr.length; i++){
            num += parseInt(totalResourceArr[i] - 0);
        }
        allNum = num;
        $(".resourceTotal").html(allNum);
        /** switch1 统计图组件初始化 */
        var myChart = echarts.init($("#chart").get(0));
        myChart.setOption({
            //鼠标提示框
            tooltip: {
                trigger: 'axis'
            },
            //图例
            legend: {
                orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
                x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
                data:['资源总量'],
                left:"0",
                itemHeight: 14,
                itemWidth: 14,
                selectedMode:false      //鼠标点击click点击关闭
            },
            grid:{
                x:50,
                x2:50
            },
            xAxis: {
                data: ["课件","微课","教案","同步练习","素材","学案","教学指导与研究","拓展资源","电子课本","教师用书","课标与解读","教学视频","实验","中考","高考","竞赛","知识详解","学习视频","课文全解","时政要点"],
                axisLabel:{
                    interval:"0",              //所有的名称都显示
                    //rotate:-20,               //名称倾斜
                    margin:15
                },
                axisTick:{
                    alignWithLabel:true,        //设置向下的箭头在中间
                    lineStyle:{
                        width:"2"
                    }
                }
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
            yAxis: [
                {
                    type : 'value'
                }
            ],
            dataZoom: [
                {   // 这个dataZoom组件，默认控制x轴。
                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                    start:0,      // 左边在 10% 的位置。
                    end: 50,         // 右边在 50% 的位置。
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
                    start:0,      // 左边在 0% 的位置。
                    end: 50,         // 右边在 50% 的位置。
                    zoomLock:true
                }
            ],
            series: [
                {
                    name: '资源总量',
                    type: 'bar',
                    // data: [40, 20, 50, 30, 60, 55,30,25,55,40,40, 20, 50, 30, 60, 55,30,25,55,40,30,25,55,40],
                    itemStyle:{
                        normal:{           //通用样式
                            color:"#b2dbfb"
                        }
                    },
                    barGap: '-40%',
                    barWidth:'45'
                }
                // {
                //     name:"筛选条件下资源量",
                //     type:"bar",
                //     // data:[20,7,15,8,2,25,23,10,20,30,40,17,15,18,42,25,23,10,20,30,23,10,20,30],
                //     itemStyle:{
                //         normal:{           //通用样式
                //             color:"#2196f4"
                //         }
                //     },
                //     barGap: '-40%'         //两个柱状图之间的距离
                // }
            ]
        });

        /** 获得图表的options对象 */
        var option = myChart.getOption();
        /** 资源总量柱状图配置 */
        option.series[0].data = totalResourceArr;
        myChart.setOption(option);
    }

    /** 资源统计（总资源格式）柱图 默认显示一条柱 */
    function resourceFormTotalOnce(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/getResourceFormNumTotal",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceFormTotalOnceAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceFormTotalOnceAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var formTotalArr;
        if(data == null){
            var image = 0;    		            //图片
            var doc = 0;    			            //文档
            var video = 0;    		            //视频
            var audio = 0;    		            //音频
            var flash = 0;    		            //动画
            var total = 0;                      //总计
        }else{
            var image = data.image;    		            //图片
            var doc = data.doc;    			            //文档
            var video = data.video;    		            //视频
            var audio = data.audio;    		            //音频
            var flash = data.flash;    		            //动画
            var total = image + doc + video + audio + flash; //总计
        }
        formTotalArr = [image, doc, video, audio, flash];

        /** switch2 统计图组件初始化 */
        var myChart2 = echarts.init($("#chart2").get(0));
        myChart2.setOption({
            //鼠标提示框
            tooltip: {
                trigger: 'axis'
            },
            //图例
            legend: {
                orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
                x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
                data:['资源总量'],
                left:"3",
                itemHeight: 14,
                itemWidth: 14,
                selectedMode:false      //鼠标点击click点击关闭
            },
            grid:{
                x:50
            },
            xAxis: {
                data: ["图片","文档","视频","音频","动画"],
                axisLabel:{
                    interval:"0",              //所有的名称都显示
                    //rotate:-20,               //名称倾斜
                    margin:15
                },
                axisTick:{
                    alignWithLabel:true,        //设置向下的箭头在中间
                    lineStyle:{
                        width:"2"
                    }
                }
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
            yAxis: [
                {
                    type : 'value'
                }
            ],
            series: [
                {
                    name: '资源总量',
                    type: 'bar',
                    // data: [40, 20, 50, 30, 66],
                    barWidth:40,
                    itemStyle:{
                        normal:{           //通用样式
                            color:"#b2dbfb"
                        }
                    },
                    barGap: '-40%',         //两个柱状图之间的距离
                    barWidth:"45"
                }
                // {
                //     name:'筛选条件下资源量',
                //     type:'bar',
                //     // data:[30,10,30,20,40],
                //     barWidth:40,
                //     itemStyle:{
                //         normal:{           //通用样式
                //             color:"#2196f4"
                //         }
                //     },
                //     barGap: '-40%'         //两个柱状图之间的距离
                // }
            ]
        });
        //获得图表的options对象
        var option2 = myChart2.getOption();
        option2.series[0].data = formTotalArr;
        myChart2.setOption(option2);
        //资源格式表格
        $(".t_image").html(image);
        $(".t_video").html(video);
        $(".t_audio").html(audio);
        $(".t_flash").html(flash);
        $(".t_doc").html(doc);
        $(".t_total").html(total);
    }

    /** 资源统计（学段学科+年级册次） */
    function selectGrade() {
        $.ajax({
            type:"post",
            url:getBasePath()+"statisticalAnalysis/getCategory",
            dataType:"json",
            success:function (data) {
                if(data.status==0){
                    selectGradeAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    };
    function selectGradeAdapter(data) {
        $("#phaseBox li, #subjectBox li").remove();
        $(".version").find("ul").html("");
        $(".grade_items li:nth-child(n+1)").remove();
        $("#phaseValue").val("");
        var firstBoxStr = "";
        $(data).each(function (index,ele) {
            if (data[index].deep == 1) {
                firstBoxStr += "<li data-deep='" + data[index].deep + "' data-value='" + data[index].id + "' title='"+data[index].name+"'>" + data[index].name + "</li>";
            }
        });
        firstBoxStr = "<li>全部</li>" + firstBoxStr;
        $("#phaseBox").append(firstBoxStr);
        $("#phasesubject1").selectBox("callback",function(_data,_caption,_selectbox,_selectchild){
            $(".pie").hide();
            var startTime=$("#dates_start1").val();     //开始时间
            var endTime=$("#dates_end1").val();         //结束时间
            //置空学科记录
            if(_caption === "全部"){
                phaseStr = "";
            }else{
                phaseStr = _caption;
            }
            subjectStr = "";
            versionStr = "";
            volumeStr = "";
            /** 如果选择全部，参数全部置空 */
            if(_caption === "全部"){
                id1 = "";
            }else{
                id1 = _data;
            }
            id2 = "";
            id3 = "";
            id4 = "";
            /** id参数 */
            var str = JSON.stringify([{"deep" :1, "id" : id1}]);
            var params = {
                "categoriesId":str
            };
            /** id+时间参数 */
            var idAndTime = {
                "categoriesId":str,
                "startTime":startTime,
                "endTime":endTime
            }
            /** 时间+学段学科参数参数 */
            var gradeAndTime = {
                "phaseId":id1,
                "subjectId":id2,
                "versionId":id3,
                "booksId":id4,
                "startTime":startTime,
                "endTime":endTime
            }
            var parentId = _data;
            $(".version, .volume").hide();
            $("#phasesubject2 ").selectBox("removeAll");
            var $this = $(this);
            var secondBoxStr = ""
            $.post(getBasePath()+"statisticalAnalysis/getCategory", {"categoriesId": _data}, function (btnData) {
                if (btnData.status == "0") {
                    var _subject = btnData.data;
                    $(_subject).each(function (index,ele) {
                        if(ele.deep == 2 && ele.parentId === parentId) {
                            var upParent = $("[data-value=" + ele.parentId + "]");
                            if(upParent.length != 0){
                                secondBoxStr += "<li data-deep='" + data[index].deep + "' data-value='" + data[index].id + "' title='"+data[index].name+"'>" + data[index].name + "</li>";
                            }
                        }
                    });
                    secondBoxStr = "<li>全部</li>" + secondBoxStr;
                    $("#subjectBox").append(secondBoxStr);
                }
            }, "json");
        });
        $("#phasesubject2").selectBox("callback",function(_data,_caption,_selectbox,_selectchild){
            $(".pie").hide();
            var startTime=$("#dates_start1").val();     //开始时间
            var endTime=$("#dates_end1").val();
            if(_caption === "全部"){
                subjectStr = "";
            }else{
                subjectStr = _caption;
            }
            versionStr = "";
            volumeStr = "";
            /** 如果选择全部，参数全部置空 */
            if(_caption === "全部"){
                id2 = "";
                id3 = "";
                id4 = "";
                $(".version").hide();
            }else{
                id2 = _data;
                id3 = "";
                id4 = "";
                $(".version").show();
            }
            /** id参数 */
            var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":_data}]);
            var params = {
                "categoriesId":str
            };
            /** id+时间参数 */
            var idAndTime = {
                "categoriesId":str,
                "startTime":startTime,
                "endTime":endTime
            }
            /** 时间+学段学科参数参数 */
            var gradeAndTime = {
                "phaseId":id1,
                "subjectId":id2,
                "versionId":id3,
                "booksId":id4,
                "startTime":startTime,
                "endTime":endTime
            }
            $(".volume").hide();
            var pId = _data;

            gradeBookStr = phaseStr + subjectStr;
            $(".version").find("ul").html("");
            $(".grade_items li").remove();

            $.post(getBasePath()+"statisticalAnalysis/getCategory", {"categoriesId": _data}, function (btnData) {
                if (btnData.status == "0") {
                    var _subject = btnData.data;
                    $(_subject).each(function (index,ele) {
                        if(ele.deep == 3 && ele.parentId === pId) {
                            var upParent = $("[data-value=" + ele.parentId + "]");
                            if(upParent.length != 0){
                                $(".version ul").append("<li onclick='versionClick(this)' data-deep='" + data[index].deep + "' data-value='" + data[index].id + "' title='"+data[index].name+"'>" + data[index].name + "</li>");
                            }
                        }
                    });
                }
            }, "json");
        });
    }

    /** 多余的table内容用省略号*/
    hideSecondType();
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

    /** 点击展开全部*/
    $(".table_td").click(function () {
        if($(this).text()=="展开全部"){
            var secondType= $(".secondType");
            for(var j=0;j<secondType.length;j++){
                secondType.eq(j).parent().css("display","table-row");
            }
            $(".omit").css("display","none");
            $(this).html("收起数据");
        }else{
            hideSecondType();
            //$(".omit").css("display","none");
            $(this).html("展开全部");
        }
    });

    /** 点击统计按钮 */
    $(".statistics_btn").click(function () {
        $(".resourceTotal").html(allNum);
        var startTime=$("#dates_start1").val();     //开始时间
        var endTime=$("#dates_end1").val();         //结束时间
        var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":id4}]);
        var str1 = JSON.stringify([{"deep":1,"id":""},{"deep":2,"id":""},{"deep":3,"id":""},{"deep":4,"id":""}]);
        var str2 = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":""},{"deep":3,"id":""},{"deep":4,"id":""}]);
        var str3 = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":""},{"deep":4,"id":""}]);
        var str4 = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":""}]);
        var str5 = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":id4}]);
        /** id参数 */
        var id = {
            "categoriesId":str
        }
        /** id+时间参数 */
        var idAndTime = {
            "categoriesId":str,
            "startTime":startTime,
            "endTime":endTime
        }
        var params1 = {
            "categoriesId":str1,
            "startTime":startTime,
            "endTime":endTime
        }
        var params2 = {
            "categoriesId":str2,
            "startTime":startTime,
            "endTime":endTime
        }
        var params3 = {
            "categoriesId":str3,
            "startTime":startTime,
            "endTime":endTime
        }
        var params4 = {
            "categoriesId":str4,
            "startTime":startTime,
            "endTime":endTime
        }
        var params5 = {
            "categoriesId":str5,
            "startTime":startTime,
            "endTime":endTime
        }
        /** 时间+学段学科参数 */
        var gradeAndTime = {
            "phaseId":id1,
            "subjectId":id2,
            "versionId":id3,
            "booksId":id4,
            "startTime":startTime,
            "endTime":endTime
        }
        getmainNum(params1);
        if(id1 != ""){
            getPhaseNum(params2);
        }
        if(id2 != ""){
            getSubjectNum(params3);
        }
        if(id3 != ""){
            getVersionNum(params4);
        }
        if(id4 != ""){
            getVolumeNum(params5);
        }
        if(startTime != "" && endTime != ""){
            //如果发生时间筛选，出现第二条柱
            barOne(id,idAndTime);
            barTwo(id,idAndTime);
        }else{
            /** 资源统计（总资源量）柱图 默认显示一条柱 */
            resourceTypeTotalOnce(id);
            /** 资源统计（总资源格式）柱图 默认显示一条柱*/
            resourceFormTotalOnce(id);
        }
        if(id2 != "") {
            //出现饼图并刷新饼图数据
            $(".pie").show();
            $(".pSource").html(phaseStr);
            $(".sSource").html(subjectStr);
            $(".vSource").html(volumeStr);
            $(".tSource").html(rTypeStr);
            if(versionStr == ""){
                //图1数据
                one = Math.round((subjectNum / phaseNum) * 1000)/10;
                //图2数据
                two = Math.round((subjectNum / mainNum) * 1000)/10;
                //图3数据
                three = Math.round((typeNum / phaseNum) * 1000)/10;
                //图4数据
                four = Math.round((typeNum / subjectNum) * 1000)/10;
            }else if(volumeStr == ""){
                //图1数据
                one = Math.round((versionNum / phaseNum) * 1000)/10;
                //图2数据
                two = Math.round((versionNum / mainNum) * 1000)/10;
                //图3数据
                three = Math.round((typeNum / phaseNum) * 1000)/10;
                //图4数据
                four = Math.round((typeNum / subjectNum) * 1000)/10;
            }else if(volumeStr != ""){
                //图1数据
                one = Math.round((volumeNum / phaseNum) * 1000)/10;
                //图2数据
                two = Math.round((volumeNum / mainNum) * 1000)/10;
                //图3数据
                three = Math.round((typeNum / phaseNum) * 1000)/10;
                //图4数据
                four = Math.round((typeNum / subjectNum) * 1000)/10;
            }
            if(phaseNum == 0) {
                one = 0;
                three = 0;
            }
            if(mainNum == 0){
                two = 0;
            }
            if(subjectNum == 0){
                four = 0;
            }
            if(one > 100){
                one = 100;
            }
            if(two > 100){
                two = 100;
            }
            if(three > 100){
                three = 100;
            }
            if(four > 100){
                four = 100;
            }
            $("#pie1,#pie2,#pie3,#pie4").html("");
            $("#pie1").circliful({
                animation:1,
                animationstep:5,
                foregroundColor:"rgba(247,148,29,1)",
                backgroundColor:"rgba(247,148,29,0.4)",
                foregroundBorderWidth:15,
                backgroundBorderWidth:10,
                percent:one
            });
            $("#pie2").circliful({
                animation:1,
                animationstep:5,
                foregroundColor:"rgba(189,154,247,1)",
                backgroundColor:"rgba(189,154,247,0.4)",
                foregroundBorderWidth:15,
                backgroundBorderWidth:10,
                percent:two
            });
            $("#pie3").circliful({
                animation:1,
                animationstep:5,
                foregroundColor:"rgba(49,154,255,1)",
                backgroundColor:"rgba(49,154,255,0.4)",
                foregroundBorderWidth:15,
                backgroundBorderWidth:10,
                percent:three
            });
            $("#pie4").circliful({
                animation:1,
                animationstep:5,
                foregroundColor:"rgba(159,210,104,1)",
                backgroundColor:"rgba(159,210,104,0.4)",
                foregroundBorderWidth:15,
                backgroundBorderWidth:10,
                percent:four
            });
        }

        /** 资源统计（发稿统计） */
        statisticsTopic(idAndTime);
        /** 资源统计（发稿复审） */
        recheckTopic(idAndTime);
        /** 资源统计（发稿终审） */
        finalTopic(idAndTime);
        /** 资源统计（审核统计） */
        statisticsVetted(idAndTime);
        /** 资源类型统计（表格）*/
        secondResourceType(gradeAndTime);
    });
});
/** 点击版本 刷新柱图，饼图，表格，发稿统计，审核统计 */
function versionClick(obj) {
    $this =$(obj);
    var arr = [];
    $(".volume").show();
    $(".grade_items li").remove();
    var startTime=$("#dates_start1").val();     //开始时间
    var endTime=$("#dates_end1").val();         //结束时间
    versionStr = $this.html();
    volumeStr = "";
    id3 = $this.data("value");
    id4 = "";
    currentId = $this.data("value");
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3}]);
    var params = {
        "categoriesId":str
    };
    /** id+时间参数 */
    var idAndTime = {
        "categoriesId":str,
        "startTime":startTime,
        "endTime":endTime
    }
    /** 时间+学段学科参数参数 */
    var gradeAndTime = {
        "phaseId":id1,
        "subjectId":id2,
        "versionId":id3,
        "booksId":id4,
        "startTime":startTime,
        "endTime":endTime
    }
    $(".version ul li").removeClass("btn_click");
    $this.addClass("btn_click");
    var paId = $this.data("value");
    $.post(getBasePath()+"statisticalAnalysis/getCategory", {"categoriesId": paId}, function (btnData) {
        if (btnData.status == "0") {
            var _subject = btnData.data;
            $(_subject).each(function (index,ele) {
                if(ele.deep == 4 && ele.parentId == paId) {
                    arr.push(ele);
                    $(".grade_items").append("<li data-deep='" + _subject[index].deep + "' data-value='" + _subject[index].id + "'onclick='volumeClick(this)' title='"+_subject[index].name+"'>" + _subject[index].name + "</li>");
                }
            });
            if(arr.length < 12){
                $(".jiantou").css("display","none");
            }else{
                $(".jiantou").css("display","block");
            }
        }
    }, "json");
};

/** 点击年级册次 刷新柱图，饼图，表格，发稿统计，审核统计 */
function volumeClick(obj) {
    //数量置零
    $this =$(obj);
    var length = $(".grade_items li").length;
    if(length > 10){
        $(".jiantou").css("display","block");
    }else{
        $(".jiantou").css("display","none");
    }
    var startTime=$("#dates_start1").val();     //开始时间
    var endTime=$("#dates_end1").val();         //结束时间
    volumeStr = $this.html();
    currentId = $this.data("value");
    id4 = $this.data("value");
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":id1},{"deep":2,"id":id2},{"deep":3,"id":id3},{"deep":4,"id":id4}]);
    var params = {
        "categoriesId":str
    }

    /** id+时间参数 */
    var idAndTime = {
        "categoriesId":str,
        "startTime":startTime,
        "endTime":endTime
    }
    /** 时间+学段学科参数参数 */
    var gradeAndTime = {
        "phaseId":id1,
        "subjectId":id2,
        "versionId":id3,
        "booksId":id4,
        "startTime":startTime,
        "endTime":endTime
    }
    $this =$(obj);
    var temp = $this.html();
    var first = $(".grade_items li:first-child");
    var id = $this.data("value");
    if($(first).hasClass('word_click')){
        $(first).remove();
    }
    $(".grade_items").css("height","30px").removeClass("box_shadow");
    $(".grade_items").prepend("<li class='word_click btn_click select_li'>" + temp + "</li>");
    $(".jiantou p").html("更多").removeClass("hide").addClass("more");
    $(".jian_b").css("borderTopColor","#319aff");
}

/** 资源统计（发稿统计） */
function statisticsTopic(params) {
    $.ajax({
        // type:"get",
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getSelectedTopic",
        // url:"http://localhost:8080/static/js/myApp/json/statisticsTopic.json",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                statisticsTopicAdapter(data.data);
            }else{
                // alert("请求成功，没有数据！！！");
            }
        }
    })
}
function statisticsTopicAdapter(data) {
    var data = data[0];
    if(data == null){
        $(".topicNum").html(0);
        $(".topicWord").html(0);
        $(".topicTime").html(0);
        $(".topicSize").html(0);
    }else{
        var topicNumber = getValue(data.topicNumber);    		        //发稿总量
        var topicSize = getValue(data.topicsize);    			        //资源大小
        var topicTime = getValue(data.topictime);    		            //音视频时长
        var topicWord = getValue(data.topicword);    		            //发稿字数
        $(".topicNum").html(topicNumber);
        $(".topicWord").html(topicWord);
        $(".topicTime").html(Math.round(topicTime));
        $(".topicSize").html(Math.round(topicSize/1024/1024*100)/100);
    }
}
/** 资源统计（发稿复审） */
function recheckTopic(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryReappAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                recheckTopicAdapter(data.data);
            }else{
                // alert("请求成功，没有数据！！！");
            }
        }
    })
}
function recheckTopicAdapter(data) {
    var data = data[0];
    if(data == null){
        $(".topicrechecked").html(0);
    }else{
        var topicrechecked = getValue(data.topicrechecked);    		    //发稿复审总量
        $(".topicrechecked").html(topicrechecked);
    }
}

/** 资源统计（发稿终审） */
function finalTopic(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryFinalAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                finalTopicAdapter(data.data);
            }else{
                // alert("请求成功，没有数据！！！");
            }
        }
    })
}
function finalTopicAdapter(data) {
    var data = data[0];
    if(data == null){
        $(".topicfinal").html(0);
    }else{
        var topicfinal = getValue(data.topicfinal);    		        //发稿终审总量
        $(".topicfinal").html(topicfinal);
    }
}
/** 资源统计（审核统计） */
function statisticsVetted(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                statisticsVettedAdapter(data.data);
            }else{
                // alert("请求成功，没有数据！！！");
            }
        }
    })
}
function statisticsVettedAdapter(data) {
    var data = data[0];
    if(data == null){
        $(".topicvetted").html(0);
        $(".uploadvetted").html(0);
        $(".vettedNumber").html(0);
    }else{
        var topicvetted = getValue(data.topicvetted);    		            //发稿审核
        var uploadvetted = getValue(data.uploadvetted);    			        //上传审核
        var vettedNumber = getValue(data.vettedNumber);    		            //审核总量
        $(".topicvetted").html(topicvetted);
        $(".uploadvetted").html(uploadvetted);
        $(".vettedNumber").html(vettedNumber);
    }
}

/** 资源类型统计（表格）*/
function secondResourceType(params){
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getResourceStatistics",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                localStorage.setItem("initAllData",JSON.stringify(data.data));
                secondResourceTypeAdapter();
            }else{
                // alert("请求成功，没有数据！！！");
            }
        }
    })
}
function secondResourceTypeAdapter() {     //刚进来时，部分数据是隐藏的
    totalNum = 0;
    var data = "";
    $("#resourceTab tr:not(:first)").remove();
    var resultOne="";
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
                "<td>"+getValue1(data[i].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue1(data[i].secondaryResourcesClassification)+"</td>" +
                "<td class='border_right'>"+data[i].count+"</td>" +
                "<td>"+data[i].subtotal+"</td>" +
                "</tr>"
        }else if(i===3){
            resultOne +="<tr class='tableTr omit'>" +
                "<td>......</td>" +
                "<td>......</td>" +
                "<td class='secondType'>......</td>" +
                "<td class='border_right'>......</td>" +
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
    $("#resourceTab").append(resultOne);

    $(".table_td").click(function () {
        fourResourceTypeAdapter();
        $("#resourceTab tr").css("display","");
    });
}

/** 展开全部的数据 */
function fourResourceTypeAdapter() {

    var data = JSON.parse(localStorage.getItem("initAllData"));
    $("#resourceTab tr:not(:first)").remove();
    var item=[];
    var count=0;
    var firstData=data.splice(0,1);
    item=firstData;

    for(var i=0;i<data.length;i++){
        if(firstData[0].primaryResourcesClassification===data[i].primaryResourcesClassification){
            item=item.concat(data[i]);
            count++;
        }
    }
    data.splice(0,count);
    var result='';
    for(var j=0;j<item.length;j++){
        if(j===0){
            result+="<tr class='tableTr'>" +
                "<td rowspan='"+item.length+"' class='table_number'>"+item[j].nameNumber+"</td>" +
                "<td rowspan='"+item.length+"'>"+getValue1(item[j].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue1(item[j].secondaryResourcesClassification)+"</td>" +
                "<td class='border_right'>"+item[j].count+"</td>" +
                "<td rowspan='"+item.length+"'>"+item[j].subtotal+"</td>" +
                "</tr>"
        }else{
            result+="<tr class='tableTr'>" +
                "<td class='secondType'>"+getValue1(item[j].secondaryResourcesClassification)+"</td>" +
                "<td class='border_right'>"+item[j].count+"</td>" +
                "</tr>"
        }

    }
    $("#resourceTab").append(result);
    var parent=$("#resourceTab");
    fiveResourceTypeAdapter(parent,data);
}
function fiveResourceTypeAdapter(parent,data) {
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
            result+="<tr class='tableTr'>" +
                "<td rowspan='"+items.length+"' class='table_number'>"+items[j].nameNumber+"</td>" +
                "<td rowspan='"+items.length+"'>"+getValue1(items[j].primaryResourcesClassification)+"</td>" +
                "<td class='secondType'>"+getValue1(items[j].secondaryResourcesClassification)+"</td>" +
                "<td class='border_right'>"+items[j].count+"</td>" +
                "<td rowspan='"+items.length+"'>"+items[j].subtotal+"</td>" +
                "</tr>"
        }else{
            result+="<tr class='tableTr'>" +
                "<td class='secondType'>"+getValue1(items[j].secondaryResourcesClassification)+"</td>" +
                "<td class='border_right'>"+items[j].count+"</td>" +
                "</tr>"
        }
    }
    parent.append(result);
    if(data.length != 0){
        fiveResourceTypeAdapter(parent,data);
    }else{
        parent.append("<tr class='tableTr'><td>总计</td><td colspan='3'>-</td><td>"+ totalNum +"</td></tr><tr class='tableTr'><td class='l_td table_td' colspan='5'>收起数据</td></tr>");
        $(".table_td").click(function () {
            JSON.parse(localStorage.getItem("initAllData"));
            secondResourceTypeAdapter();
        });
    }
    var trArr = $(".table_number");
    for(var i = 0; i < trArr.length; i++){
        $(trArr[i]).html(i+1);
    }
}
function getValue(val) {
    return (val===undefined)? 0: val;
}
function getValue1(val) {
    return (val === "")?"-":val;
}
function barOne(params1,params2) {
    var id = params1;
    var idAndTime = params2;
    /** switch1 统计图组件初始化 */
    var myChart = echarts.init($("#chart").get(0));
    myChart.setOption({
        //鼠标提示框
        tooltip: {
            trigger: 'axis'
        },
        //图例
        legend: {
            orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
            x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
            data:['资源总量','已筛选时间段条件下资源量'],
            left:"0",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        grid:{
            x:50,
            x2:50
        },
        xAxis: {
            data: ["课件","微课","教案","同步练习","素材","学案","教学指导与研究","拓展资源","电子课本","教师用书","课标与解读","教学视频","实验","中考","高考","竞赛","知识详解","学习视频","课文全解","时政要点"],
            axisLabel:{
                interval:"0",              //所有的名称都显示
                //rotate:-20,               //名称倾斜
                margin:15
            },
            axisTick:{
                alignWithLabel:true,        //设置向下的箭头在中间
                lineStyle:{
                    width:"2"
                }
            }
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
        yAxis: [
            {
                type : 'value'
            }
        ],
        dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start:0,      // 左边在 10% 的位置。
                end: 50,         // 右边在 50% 的位置。
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
                start:0,      // 左边在 0% 的位置。
                end: 50,         // 右边在 50% 的位置。
                zoomLock:true
            }
        ],
        series: [
            {
                name: '资源总量',
                type: 'bar',
                // data: [40, 20, 50, 30, 60, 55,30,25,55,40,40, 20, 50, 30, 60, 55,30,25,55,40,30,25,55,40],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barGap: '-40%'
            },
            {
                name:"已筛选时间段条件下资源量",
                type:"bar",
                // data:[20,7,15,8,2,25,23,10,20,30,40,17,15,18,42,25,23,10,20,30,23,10,20,30],
                itemStyle:{
                    normal:{           //通用样式
                        color:"#2196f4"
                    }
                },
                barGap: '-40%'         //两个柱状图之间的距离
            }
        ]
    });

    myChart.on("click", function (aa) {
        if(aa.seriesName === "已筛选时间段条件下资源量"){
            rTypeStr = aa.name;
            typeNum = aa.data;
        }
    });
    /** 资源统计（总资源类型）柱图 默认显示一条柱 */
    resourceTypeTotal(id);
    function resourceTypeTotal(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/queryResourceTypeNumTotal",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceTypeTotalAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceTypeTotalAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var totalResourceArr;
        if(data == null) {
            var coursewareAll = 0;    //总课件
            var smallclassAll = 0;    //总微课
            var designAll = 0;			  //总教学设计
            var practiceAll = 0;    	  //总同步练习
            var materialAll = 0;        //总素材
            var learinngAll = 0;        //总学案
            var researchAll = 0;        //总教学研究
            var expandAll = 0;            //总拓展资源
            var etextbookAll = 0;      //总电子课本
            var teacherbookAll = 0;  //总教师用书
            var curriculumAndInterpretationAll = 0; //总课表与解读
            var teachingvideoAll = 0;    //总教学视频
            var experimentAll = 0;    //总实验
            var mediumtestAll = 0;     //总中考
            var nationaltestAll = 0;    //总高考
            var primarytestAll = 0;    //总小学竞赛
            var middletestAll = 0;    //总初中竞赛
            var hightestAll = 0;        //总高中竞赛
            var knowledgedetailAll = 0;    //总知识详解
            var studyvideoAll = 0;    //总学习视频
            var textexplainAll = 0;    //总课文全解
            var currentpointAll = 0;    //总时政要点
            var practicaleducationAll = 0;    //总实践教育
            var nounsexplanationAll = 0;    //总名词解释
        }else{
            var coursewareAll = getValue(data.courseware);    //总课件
            var smallclassAll = getValue(data.smallclass);    //总微课
            var designAll = getValue(data.design);			  //总教学设计
            var practiceAll = getValue(data.practice);    	  //总同步练习
            var materialAll = getValue(data.material);        //总素材
            var learinngAll = getValue(data.learinng);        //总学案
            var researchAll = getValue(data.research);        //总教学研究
            var expandAll = getValue(data.expand);            //总拓展资源
            var etextbookAll = getValue(data.etextbook);      //总电子课本
            var teacherbookAll = getValue(data.teacherbook);  //总教师用书
            var curriculumAndInterpretationAll = getValue(data.curriculumAndInterpretation); //总课表与解读
            var teachingvideoAll = getValue(data.teachingvideo);    //总教学视频
            var experimentAll = getValue(data.experiment);    //总实验
            var mediumtestAll = getValue(data.mediumtest);     //总中考
            var nationaltestAll = getValue(data.nationaltest);    //总高考
            var primarytestAll = getValue(data.primarytest);    //总小学竞赛
            var middletestAll = getValue(data.middletest);    //总初中竞赛
            var hightestAll = getValue(data.hightest);        //总高中竞赛
            var knowledgedetailAll = getValue(data.knowledgedetail);    //总知识详解
            var studyvideoAll = getValue(data.studyvideo);    //总学习视频
            var textexplainAll = getValue(data.textexplain);    //总课文全解
            var currentpointAll = getValue(data.currentpoint);    //总时政要点
            var practicaleducationAll = getValue(data.practicaleducation);    //总实践教育
            var nounsexplanationAll = getValue(data.nounsexplanation);    //总名词解释
        }
        var totalTestAll = primarytestAll + middletestAll + hightestAll;
        totalResourceArr = [coursewareAll, smallclassAll, designAll, practiceAll, materialAll, learinngAll, researchAll, expandAll, etextbookAll, teacherbookAll, curriculumAndInterpretationAll, teachingvideoAll, experimentAll, mediumtestAll, nationaltestAll, totalTestAll, knowledgedetailAll, studyvideoAll, textexplainAll, currentpointAll];
        var num = 0;
        for(var i = 0; i < totalResourceArr.length; i++){
            num += parseInt(totalResourceArr[i] - 0);
        }
        allNum = num;
        $(".resourceTotal").html(allNum);
        if(allNum == 0){
            $(".p_tips").show();
        }else{
            $(".p_tips").hide();
        }
        /** 获得图表的options对象 */
        var option = myChart.getOption();
        /** 资源总量柱状图配置 */
        option.series[0].data = totalResourceArr;
        myChart.setOption(option);
    }

    /** 资源统计（已筛选资源量）柱图 发生筛选后显示两条柱 */
    resourceTypeSelect(idAndTime);
    function resourceTypeSelect(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceTypeSelectAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceTypeSelectAdapter(data) {
        var data=data[0];
        // 资源量数组
        var selectResourceArr;
        if(data == null){
            var courseware = 0;    //课件
            var smallclass = 0;    //微课
            var design = 0;			  //教学设计
            var practice = 0;    	  //同步练习
            var material = 0;        //素材
            var learinng = 0;        //学案
            var research = 0;        //教学研究
            var expand = 0;            //拓展资源
            var etextbook = 0;      //电子课本
            var teacherbook = 0;  //教师用书
            var curriculumAndInterpretation = 0;    															  //总课表与解读
            var teachingvideo = 0;    //教学视频
            var experiment = 0;    //实验
            var mediumtest = 0;     //中考
            var nationaltest = 0;    //高考
            var primarytest = 0;    //小学竞赛
            var middletest = 0;    //初中竞赛
            var hightest = 0;        //高中竞赛
            var knowledgedetail = 0;    //知识详解
            var studyvideo = 0;    //学习视频
            var textexplain = 0;    //课文全解
            var currentpoint = 0;    //时政要点
            var practicaleducation = 0;    //实践教育
            var nounsexplanation = 0;    //名词解释
        }else{
            var courseware = getValue(data.courseware);    //课件
            var smallclass = getValue(data.smallclass);    //微课
            var design = getValue(data.design);			  //教学设计
            var practice = getValue(data.practice);    	  //同步练习
            var material = getValue(data.material);        //素材
            var learinng = getValue(data.learinng);        //学案
            var research = getValue(data.research);        //教学研究
            var expand = getValue(data.expand);            //拓展资源
            var etextbook = getValue(data.etextbook);      //电子课本
            var teacherbook = getValue(data.teacherbook);  //教师用书
            var curriculumAndInterpretation = getValue(data.curriculumAndInterpretation);    															  //总课表与解读
            var teachingvideo = getValue(data.teachingvideo);    //教学视频
            var experiment = getValue(data.experiment);    //实验
            var mediumtest = getValue(data.mediumtest);     //中考
            var nationaltest = getValue(data.nationaltest);    //高考
            var primarytest = getValue(data.primarytest);    //小学竞赛
            var middletest = getValue(data.middletest);    //初中竞赛
            var hightest = getValue(data.hightest);        //高中竞赛
            var knowledgedetail = getValue(data.knowledgedetail);    //知识详解
            var studyvideo = getValue(data.studyvideo);    //学习视频
            var textexplain = getValue(data.textexplain);    //课文全解
            var currentpoint = getValue(data.currentpoint);    //时政要点
            var practicaleducation = getValue(data.practicaleducation);    //实践教育
            var nounsexplanation = getValue(data.nounsexplanation);    //名词解释
        }
        var totalTest = primarytest + middletest + hightest;
        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, totalTest, knowledgedetail, studyvideo, textexplain, currentpoint];
        var num = 0;
        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        /** 获得图表的options对象 */
        var option = myChart.getOption();
        /** 资源总量配置 */
        option.series[1].data = selectResourceArr;
        myChart.setOption(option);
    }
}
function barTwo(params1,params2) {
    var id = params1;
    var idAndTime = params2;
    /** switch2 统计图组件初始化 */
    var myChart2 = echarts.init($("#chart2").get(0));
    myChart2.setOption({
        //鼠标提示框
        tooltip: {
            trigger: 'axis'
        },
        //图例
        legend: {
            orient:"vertical",//布局方式,默认为水平布局,可选为:'horizontal'|'vertical'
            x : 'left',//水平安放位置,默认为全图居中,可选为:'center'|'left'|'right'|{number}(x坐标,单位px)
            data:['资源总量','筛选条件下资源量'],
            left:"3",
            itemHeight: 14,
            itemWidth: 14,
            selectedMode:false      //鼠标点击click点击关闭
        },
        grid:{
            x:50
        },
        xAxis: {
            data: ["图片","文档","视频","音频","动画"],
            axisLabel:{
                interval:"0",              //所有的名称都显示
                //rotate:-20,               //名称倾斜
                margin:15
            },
            axisTick:{
                alignWithLabel:true,        //设置向下的箭头在中间
                lineStyle:{
                    width:"2"
                }
            }
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
        yAxis: [
            {
                type : 'value'
            }
        ],
        series: [
            {
                name: '资源总量',
                type: 'bar',
                // data: [40, 20, 50, 30, 66],
                barWidth:40,
                itemStyle:{
                    normal:{           //通用样式
                        color:"#b2dbfb"
                    }
                },
                barGap: '-40%'         //两个柱状图之间的距离
            },
            {
                name:'筛选条件下资源量',
                type:'bar',
                // data:[30,10,30,20,40],
                barWidth:40,
                itemStyle:{
                    normal:{           //通用样式
                        color:"#2196f4"
                    }
                },
                barGap: '-40%'         //两个柱状图之间的距离
            }
        ]
    });
    /** 资源统计（总资源格式）柱图 默认显示一条柱 柱图+表格*/
    resourceFormTotal(id);
    function resourceFormTotal(params) {
        $.ajax({
            type:"post",
            url:getBasePath() + "statisticalAnalysis/getResourceFormNumTotal",
            dataType:"json",
            data:params,
            success:function (data) {
                if(data.status==0){
                    resourceFormTotalAdapter(data.data);
                }else{
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceFormTotalAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var formTotalArr;
        if(data == null){
            var image = 0;    		            //图片
            var doc = 0;    			            //文档
            var video = 0;    		            //视频
            var audio = 0;    		            //音频
            var flash = 0;    		            //动画
            var total = 0;    		//总计
        }else{
            var image = getValue(data.image);    		            //图片
            var doc = getValue(data.doc);    			            //文档
            var video = getValue(data.video);    		            //视频
            var audio = getValue(data.audio);    		            //音频
            var flash = getValue(data.flash);    		            //动画
            var total = image + doc + video + audio + flash;    		//总计
        }
        formTotalArr = [image, doc, video, audio, flash];
        //获得图表的options对象
        var option2 = myChart2.getOption();
        option2.series[0].data = formTotalArr;
        myChart2.setOption(option2);
    }
    /** 资源统计（已筛选资源格式）发生筛选后显示两条柱  柱图 */
    resourceForm(idAndTime);
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
                    // alert("请求成功，没有数据！！！");
                }
            }
        })
    }
    function resourceFormAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var formArr;
        if(data == null){
            var image = 0;    		            //图片
            var doc = 0;    			        //文档
            var video = 0;    		            //视频
            var audio = 0;    		            //音频
            var flash = 0;    		            //动画
            var total = 0;    		//总计
        }else{
            var image = getValue(data.image);    		            //图片
            var doc = getValue(data.doc);    			            //文档
            var video = getValue(data.video);    		            //视频
            var audio = getValue(data.audio);    		            //音频
            var flash = getValue(data.flash);    		            //动画
            var total = image + doc + video + audio + flash;    		//总计
        }
        formArr = [image, doc, video, audio, flash];
        //获得图表的options对象
        var option2 = myChart2.getOption();
        option2.series[1].data = formArr;
        myChart2.setOption(option2);
        //资源格式表格
        $(".t_image").html(image);
        $(".t_video").html(video);
        $(".t_audio").html(audio);
        $(".t_flash").html(flash);
        $(".t_doc").html(doc);
        $(".t_total").html(total);
    }
}

/** 获取资源总量 */
function getmainNum(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
        dataType:"json",
        async : false,
        data:params,
        success:function (data) {
            if(data.status==0){
                getmainAdapter(data.data);
            }else{
                // alert("获取资源统计（资源分类）失败");
            }
        }
    })
}
function getmainAdapter(data) {
    var data=data[0];
    if(data == null){
        num = 0;
        typeNum = 0;
    }else{
        // 资源量数组
        var selectResourceArr;
        var courseware = data.courseware;    //课件
        var smallclass = data.smallclass;    //微课
        var design = data.design;			  //教学设计
        var practice = data.practice;    	  //同步练习
        var material = data.material;        //素材
        var learinng = data.learinng;        //学案
        var research = data.research;        //教学研究
        var expand = data.expand;            //拓展资源
        var etextbook = data.etextbook;      //电子课本
        var teacherbook = data.teacherbook;  //教师用书
        var curriculumAndInterpretation = data.curriculumAndInterpretation;    															  //总课表与解读
        var teachingvideo = data.teachingvideo;    //教学视频
        var experiment = data.experiment;    //实验
        var mediumtest = data.mediumtest;     //中考
        var nationaltest = data.nationaltest;    //高考
        var primarytest = data.primarytest;    //小学竞赛
        var middletest = data.middletest;    //初中竞赛
        var hightest = data.hightest;        //高中竞赛
        var totalTest = primarytest + middletest + hightest; //竞赛
        var knowledgedetail = data.knowledgedetail;    //知识详解
        var studyvideo = data.studyvideo;    //学习视频
        var textexplain = data.textexplain;    //课文全解
        var currentpoint = data.currentpoint;    //时政要点
        var practicaleducation = data.practicaleducation;    //实践教育
        var nounsexplanation = data.nounsexplanation;    //名词解释
        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, totalTest, knowledgedetail, studyvideo, textexplain, currentpoint];
        var num = 0;
        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        if(rTypeStr === "课件"){
            typeNum = data.courseware;
        }else if(rTypeStr === "微课"){
            typeNum = data.smallclass;
        }else if(rTypeStr === "教案"){
            typeNum = data.design;
        }else if(rTypeStr === "同步练习"){
            typeNum = data.practice;
        }else if(rTypeStr === "素材"){
            typeNum = data.material;
        }else if(rTypeStr === "学案"){
            typeNum = data.learinng;
        }else if(rTypeStr === "教学指导与研究"){
            typeNum = data.research;
        }else if(rTypeStr === "拓展资源"){
            typeNum = data.expand;
        }else if(rTypeStr === "电子课本"){
            typeNum = data.etextbook;
        }else if(rTypeStr === "教师用书"){
            typeNum = data.teacherbook;
        }else if(rTypeStr === "总课标与解读"){
            typeNum = data.curriculumAndInterpretation
        }else if(rTypeStr === "教学视频"){
            typeNum = data.teachingvideo;
        }else if(rTypeStr === "实验"){
            typeNum = data.experiment;
        }else if(rTypeStr === "中考"){
            typeNum = data.mediumtest;
        }else if(rTypeStr === "高考"){
            typeNum = data.nationaltest;
        }else if(rTypeStr === "小学竞赛"){
            typeNum = data.primarytest;
        }else if(rTypeStr === "初中竞赛"){
            typeNum = data.middletest;
        }else if(rTypeStr === "高中竞赛"){
            typeNum = data.hightest;
        }else if(rTypeStr === "竞赛"){
            typeNum = totalTest;
        }else if(rTypeStr === "知识详解"){
            typeNum = data.knowledgedetail;
        }else if(rTypeStr === "学习视频"){
            typeNum = data.studyvideo;
        }else if(rTypeStr === "课文全解"){
            typeNum = data.textexplain;
        }else if(rTypeStr === "时政要点"){
            typeNum = data.currentpoint;
        }else if(rTypeStr === "实践教育"){
            typeNum = data.practicaleducation;
        }else if(rTypeStr === "名词解释"){
            typeNum = data.nounsexplanation;
        }
    }
    mainNum = num;
}
/** 学段筛选条件下资源量 */
function getPhaseNum(phaseId) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
        dataType:"json",
        async : false,
        data:phaseId,
        success:function (data) {
            if(data.status==0){
                phaseNumAdapter(data.data);
            }else{
                // alert("获取资源统计（资源分类）失败");
            }
        }
    })
}
function phaseNumAdapter(data) {
    var num = 0;
    var data=data[0];
    if(data == null){
        num = 0;
        typeNum = 0;
    }else{
        // 资源量数组
        var selectResourceArr;
        var courseware = data.courseware;    //课件
        var smallclass = data.smallclass;    //微课
        var design = data.design;			  //教学设计
        var practice = data.practice;    	  //同步练习
        var material = data.material;        //素材
        var learinng = data.learinng;        //学案
        var research = data.research;        //教学研究
        var expand = data.expand;            //拓展资源
        var etextbook = data.etextbook;      //电子课本
        var teacherbook = data.teacherbook;  //教师用书
        var curriculumAndInterpretation = data.curriculumAndInterpretation;    															  //总课表与解读
        var teachingvideo = data.teachingvideo;    //教学视频
        var experiment = data.experiment;    //实验
        var mediumtest = data.mediumtest;     //中考
        var nationaltest = data.nationaltest;    //高考
        var primarytest = data.primarytest;    //小学竞赛
        var middletest = data.middletest;    //初中竞赛
        var hightest = data.hightest;        //高中竞赛
        var totalTest = primarytest + middletest + hightest;
        var knowledgedetail = data.knowledgedetail;    //知识详解
        var studyvideo = data.studyvideo;    //学习视频
        var textexplain = data.textexplain;    //课文全解
        var currentpoint = data.currentpoint;    //时政要点
        var practicaleducation = data.practicaleducation;    //实践教育
        var nounsexplanation = data.nounsexplanation;    //名词解释
        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, totalTest, knowledgedetail, studyvideo, textexplain, currentpoint];

        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        if(rTypeStr === "课件"){
            typeNum = data.courseware;
        }else if(rTypeStr === "微课"){
            typeNum = data.smallclass;
        }else if(rTypeStr === "教案"){
            typeNum = data.design;
        }else if(rTypeStr === "同步练习"){
            typeNum = data.practice;
        }else if(rTypeStr === "素材"){
            typeNum = data.material;
        }else if(rTypeStr === "学案"){
            typeNum = data.learinng;
        }else if(rTypeStr === "教学指导与研究"){
            typeNum = data.research;
        }else if(rTypeStr === "拓展资源"){
            typeNum = data.expand;
        }else if(rTypeStr === "电子课本"){
            typeNum = data.etextbook;
        }else if(rTypeStr === "教师用书"){
            typeNum = data.teacherbook;
        }else if(rTypeStr === "总课标与解读"){
            typeNum = data.curriculumAndInterpretation
        }else if(rTypeStr === "教学视频"){
            typeNum = data.teachingvideo;
        }else if(rTypeStr === "实验"){
            typeNum = data.experiment;
        }else if(rTypeStr === "中考"){
            typeNum = data.mediumtest;
        }else if(rTypeStr === "高考"){
            typeNum = data.nationaltest;
        }else if(rTypeStr === "小学竞赛"){
            typeNum = data.primarytest;
        }else if(rTypeStr === "初中竞赛"){
            typeNum = data.middletest;
        }else if(rTypeStr === "高中竞赛"){
            typeNum = data.hightest;
        }else if(rTypeStr === "竞赛"){
            typeNum = totalTest;
        }else if(rTypeStr === "知识详解"){
            typeNum = data.knowledgedetail;
        }else if(rTypeStr === "学习视频"){
            typeNum = data.studyvideo;
        }else if(rTypeStr === "课文全解"){
            typeNum = data.textexplain;
        }else if(rTypeStr === "时政要点"){
            typeNum = data.currentpoint;
        }else if(rTypeStr === "实践教育"){
            typeNum = data.practicaleducation;
        }else if(rTypeStr === "名词解释"){
            typeNum = data.nounsexplanation;
        }
    }
    phaseNum = num;
}
/** 学科筛选条件下资源量 */
function getSubjectNum(subjectId) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
        dataType:"json",
        async : false,
        data:subjectId,
        success:function (data) {
            if(data.status==0){
                subjectNumAdapter(data.data);
            }else{
                // alert("获取资源统计（资源分类）失败");
            }
        }
    })
}
function subjectNumAdapter(data) {
    var data=data[0];
    if(data == null){
        num = 0;
        typeNum = 0;
    }else{
        // 资源量数组
        var selectResourceArr;

        var courseware = data.courseware;    //课件
        var smallclass = data.smallclass;    //微课
        var design = data.design;			  //教学设计
        var practice = data.practice;    	  //同步练习
        var material = data.material;        //素材
        var learinng = data.learinng;        //学案
        var research = data.research;        //教学研究
        var expand = data.expand;            //拓展资源
        var etextbook = data.etextbook;      //电子课本
        var teacherbook = data.teacherbook;  //教师用书
        var curriculumAndInterpretation = data.curriculumAndInterpretation;    															  //总课表与解读
        var teachingvideo = data.teachingvideo;    //教学视频
        var experiment = data.experiment;    //实验
        var mediumtest = data.mediumtest;     //中考
        var nationaltest = data.nationaltest;    //高考
        var primarytest = data.primarytest;    //小学竞赛
        var middletest = data.middletest;    //初中竞赛
        var hightest = data.hightest;        //高中竞赛
        var totalTest = primarytest + middletest + hightest; //竞赛
        var knowledgedetail = data.knowledgedetail;    //知识详解
        var studyvideo = data.studyvideo;    //学习视频
        var textexplain = data.textexplain;    //课文全解
        var currentpoint = data.currentpoint;    //时政要点
        var practicaleducation = data.practicaleducation;    //实践教育
        var nounsexplanation = data.nounsexplanation;    //名词解释

        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, totalTest, knowledgedetail, studyvideo, textexplain, currentpoint];
        var num = 0;
        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        if(rTypeStr === "课件"){
            typeNum = data.courseware;
        }else if(rTypeStr === "微课"){
            typeNum = data.smallclass;
        }else if(rTypeStr === "教案"){
            typeNum = data.design;
        }else if(rTypeStr === "同步练习"){
            typeNum = data.practice;
        }else if(rTypeStr === "素材"){
            typeNum = data.material;
        }else if(rTypeStr === "学案"){
            typeNum = data.learinng;
        }else if(rTypeStr === "教学指导与研究"){
            typeNum = data.research;
        }else if(rTypeStr === "拓展资源"){
            typeNum = data.expand;
        }else if(rTypeStr === "电子课本"){
            typeNum = data.etextbook;
        }else if(rTypeStr === "教师用书"){
            typeNum = data.teacherbook;
        }else if(rTypeStr === "总课标与解读"){
            typeNum = data.curriculumAndInterpretation
        }else if(rTypeStr === "教学视频"){
            typeNum = data.teachingvideo;
        }else if(rTypeStr === "实验"){
            typeNum = data.experiment;
        }else if(rTypeStr === "中考"){
            typeNum = data.mediumtest;
        }else if(rTypeStr === "高考"){
            typeNum = data.nationaltest;
        }else if(rTypeStr === "小学竞赛"){
            typeNum = data.primarytest;
        }else if(rTypeStr === "初中竞赛"){
            typeNum = data.middletest;
        }else if(rTypeStr === "高中竞赛"){
            typeNum = data.hightest;
        }else if(rTypeStr === "竞赛"){
            typeNum = totalTest;
        }else if(rTypeStr === "知识详解"){
            typeNum = data.knowledgedetail;
        }else if(rTypeStr === "学习视频"){
            typeNum = data.studyvideo;
        }else if(rTypeStr === "课文全解"){
            typeNum = data.textexplain;
        }else if(rTypeStr === "时政要点"){
            typeNum = data.currentpoint;
        }else if(rTypeStr === "实践教育"){
            typeNum = data.practicaleducation;
        }else if(rTypeStr === "名词解释"){
            typeNum = data.nounsexplanation;
        }
    }
    subjectNum = num;
}
/** 版本筛选条件下资源量 */
function getVersionNum(versionId) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
        dataType:"json",
        async : false,
        data:versionId,
        success:function (data) {
            if(data.status==0){
                getVersionNumAdapter(data.data);
            }else{
                // alert("获取资源统计（资源分类）失败");
            }
        }
    })
}
function getVersionNumAdapter(data) {
    var data=data[0];
    if(data == null){
        num = 0;
        typeNum = 0;
    }else{
        // 资源量数组
        var selectResourceArr;
        var courseware = data.courseware;    //课件
        var smallclass = data.smallclass;    //微课
        var design = data.design;			  //教学设计
        var practice = data.practice;    	  //同步练习
        var material = data.material;        //素材
        var learinng = data.learinng;        //学案
        var research = data.research;        //教学研究
        var expand = data.expand;            //拓展资源
        var etextbook = data.etextbook;      //电子课本
        var teacherbook = data.teacherbook;  //教师用书
        var curriculumAndInterpretation = data.curriculumAndInterpretation;    															  //总课表与解读
        var teachingvideo = data.teachingvideo;    //教学视频
        var experiment = data.experiment;    //实验
        var mediumtest = data.mediumtest;     //中考
        var nationaltest = data.nationaltest;    //高考
        var primarytest = data.primarytest;    //小学竞赛
        var middletest = data.middletest;    //初中竞赛
        var hightest = data.hightest;        //高中竞赛
        var totalTest = primarytest + middletest + hightest; //竞赛
        var knowledgedetail = data.knowledgedetail;    //知识详解
        var studyvideo = data.studyvideo;    //学习视频
        var textexplain = data.textexplain;    //课文全解
        var currentpoint = data.currentpoint;    //时政要点
        var practicaleducation = data.practicaleducation;    //实践教育
        var nounsexplanation = data.nounsexplanation;    //名词解释

        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, totalTest, knowledgedetail, studyvideo, textexplain, currentpoint];
        var num = 0;
        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        if(rTypeStr === "课件"){
            typeNum = data.courseware;
        }else if(rTypeStr === "微课"){
            typeNum = data.smallclass;
        }else if(rTypeStr === "教案"){
            typeNum = data.design;
        }else if(rTypeStr === "同步练习"){
            typeNum = data.practice;
        }else if(rTypeStr === "素材"){
            typeNum = data.material;
        }else if(rTypeStr === "学案"){
            typeNum = data.learinng;
        }else if(rTypeStr === "教学指导与研究"){
            typeNum = data.research;
        }else if(rTypeStr === "拓展资源"){
            typeNum = data.expand;
        }else if(rTypeStr === "电子课本"){
            typeNum = data.etextbook;
        }else if(rTypeStr === "教师用书"){
            typeNum = data.teacherbook;
        }else if(rTypeStr === "总课标与解读"){
            typeNum = data.curriculumAndInterpretation
        }else if(rTypeStr === "教学视频"){
            typeNum = data.teachingvideo;
        }else if(rTypeStr === "实验"){
            typeNum = data.experiment;
        }else if(rTypeStr === "中考"){
            typeNum = data.mediumtest;
        }else if(rTypeStr === "高考"){
            typeNum = data.nationaltest;
        }else if(rTypeStr === "小学竞赛"){
            typeNum = data.primarytest;
        }else if(rTypeStr === "初中竞赛"){
            typeNum = data.middletest;
        }else if(rTypeStr === "高中竞赛"){
            typeNum = data.hightest;
        }else if(rTypeStr === "知识详解"){
            typeNum = data.knowledgedetail;
        }else if(rTypeStr === "学习视频"){
            typeNum = data.studyvideo;
        }else if(rTypeStr === "课文全解"){
            typeNum = data.textexplain;
        }else if(rTypeStr === "时政要点"){
            typeNum = data.currentpoint;
        }else if(rTypeStr === "实践教育"){
            typeNum = data.practicaleducation;
        }else if(rTypeStr === "名词解释"){
            typeNum = data.nounsexplanation;
        }
    }
    versionNum = num;
}
/** 册次筛选条件下资源量 */
function getVolumeNum(volumeId) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryResourceTypeNum",
        dataType:"json",
        async : false,
        data:volumeId,
        success:function (data) {
            if(data.status==0){
                getVolumeNumAdapter(data.data);
            }else{
                // alert("获取资源统计（资源分类）失败");
            }
        }
    })
}
function getVolumeNumAdapter(data) {
    var data=data[0];
    if(data == null){
        num = 0;
        typeNum = 0;
    }else{
        // 资源量数组
        var selectResourceArr;
        var courseware = data.courseware;    //课件
        var smallclass = data.smallclass;    //微课
        var design = data.design;			  //教学设计
        var practice = data.practice;    	  //同步练习
        var material = data.material;        //素材
        var learinng = data.learinng;        //学案
        var research = data.research;        //教学研究
        var expand = data.expand;            //拓展资源
        var etextbook = data.etextbook;      //电子课本
        var teacherbook = data.teacherbook;  //教师用书
        var curriculumAndInterpretation = data.curriculumAndInterpretation;    															  //总课表与解读
        var teachingvideo = data.teachingvideo;    //教学视频
        var experiment = data.experiment;    //实验
        var mediumtest = data.mediumtest;     //中考
        var nationaltest = data.nationaltest;    //高考
        var primarytest = data.primarytest;    //小学竞赛
        var middletest = data.middletest;    //初中竞赛
        var hightest = data.hightest;        //高中竞赛
        var totalTest = primarytest + middletest + hightest; //竞赛
        var knowledgedetail = data.knowledgedetail;    //知识详解
        var studyvideo = data.studyvideo;    //学习视频
        var textexplain = data.textexplain;    //课文全解
        var currentpoint = data.currentpoint;    //时政要点
        var practicaleducation = data.practicaleducation;    //实践教育
        var nounsexplanation = data.nounsexplanation;    //名词解释
        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, etextbook, teacherbook, curriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, primarytest, middletest, hightest, knowledgedetail, studyvideo, textexplain, currentpoint, practicaleducation, nounsexplanation];
        var num = 0;
        for(var i = 0; i < selectResourceArr.length; i++){
            num += parseInt(selectResourceArr[i] - 0);
        }
        if(rTypeStr === "课件"){
            typeNum = data.courseware;
        }else if(rTypeStr === "微课"){
            typeNum = data.smallclass;
        }else if(rTypeStr === "教案"){
            typeNum = data.design;
        }else if(rTypeStr === "同步练习"){
            typeNum = data.practice;
        }else if(rTypeStr === "素材"){
            typeNum = data.material;
        }else if(rTypeStr === "学案"){
            typeNum = data.learinng;
        }else if(rTypeStr === "教学指导与研究"){
            typeNum = data.research;
        }else if(rTypeStr === "拓展资源"){
            typeNum = data.expand;
        }else if(rTypeStr === "电子课本"){
            typeNum = data.etextbook;
        }else if(rTypeStr === "教师用书"){
            typeNum = data.teacherbook;
        }else if(rTypeStr === "总课标与解读"){
            typeNum = data.data.curriculumAndInterpretation
        }else if(rTypeStr === "教学视频"){
            typeNum = data.teachingvideo;
        }else if(rTypeStr === "实验"){
            typeNum = data.experiment;
        }else if(rTypeStr === "中考"){
            typeNum = data.mediumtest;
        }else if(rTypeStr === "高考"){
            typeNum = data.nationaltest;
        }else if(rTypeStr === "小学竞赛"){
            typeNum = data.primarytest;
        }else if(rTypeStr === "初中竞赛"){
            typeNum = data.middletest;
        }else if(rTypeStr === "高中竞赛"){
            typeNum = data.hightest;
        }else if(rTypeStr === "竞赛"){
            typeNum = totalTest;
        }else if(rTypeStr === "知识详解"){
            typeNum = data.knowledgedetail;
        }else if(rTypeStr === "学习视频"){
            typeNum = data.studyvideo;
        }else if(rTypeStr === "课文全解"){
            typeNum = data.textexplain;
        }else if(rTypeStr === "时政要点"){
            typeNum = data.currentpoint;
        }else if(rTypeStr === "实践教育"){
            typeNum = data.practicaleducation;
        }else if(rTypeStr === "名词解释"){
            typeNum = data.nounsexplanation;
        }
    }
    volumeNum = num;
}