/**
 * Created by jhzhang on 2016/11/28.
 */

var phasesubjectData;         //保存临时的学科和学段的信息
var phasesubject1;            //学段ID
var phasesubject2;            //学科ID
var startTime;                //开始时间
var endTime;                  //结束时间
var userId;
$(function(){
    userId = $.getUrlParam("userId");
    /** 日历组件初始化代码 */
    setDateTime();
    function setDateTime(){
        //日期设置
        // $.datetimepicker.setLocale('ch');
        $('#dates_start1').datetimepicker({
            // yearOffset:222,
            lang:'ch',
            timepicker:false,
            format:'Y-m-d',
            formatDate:'Y-m-d',
            // timepickerScrollbar:false,
            // forceParse:false,
            onShow:function( ct ) {
                this.setOptions({
                    maxDate: $('#dates_end1').val() ? $('#dates_end1').val() : false
                })
            }
        });
        $('#dates_end1').datetimepicker({
            // yearOffset:222,
            lang:'ch',
            timepicker:false,
            format:'Y-m-d',
            formatDate:'Y-m-d',
            // timepickerScrollbar:false,
            // forceParse:false,
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
            async:false,
            success: function (data) {
                if(data.status=="0"){
                    loadKnowledgeAdapter(data.data);
                }else{
                    alert("获取学段和学科信息成功，但是没有匹配的学段和学科！！");
                }
            }
        });
    }
    function loadKnowledgeAdapter(data){
        phasesubjectData=data;
        $("#phasesubject1 ").selectBox("removeAll");
        $("#phasesubject2 ").selectBox("removeAll");
        var numberOne=1;
        var numberTwo=1;
        $(data).each(function (i) {
            if(data[i].deep==1&&numberOne==1){
                numberOne++;
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" class='selectbox_selected'  title='"+data[i].name+"'>" + data[i].name + "</li>");
                $("#phasesubject1").selectBox("selectForData", data[i].dataAuthorityId,true);
                phasesubject1=data[i].dataAuthorityId;   //学科ID
                for(var j=0;j<phasesubjectData.length;j++){
                    if(phasesubjectData[j].parentId===data[i].dataAuthorityId){
                        if(numberTwo==1){
                            $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[j].dataAuthorityId + "\" title='"+phasesubjectData[j].name+"'>" + phasesubjectData[j].name + "</li>");
                            $("#phasesubject2").selectBox("selectForData", phasesubjectData[j].dataAuthorityId,true);
                            phasesubject2=phasesubjectData[j].dataAuthorityId;   //学科ID
                            numberTwo++;
                            // console.log(phasesubject2);
                        }else{
                            $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[j].dataAuthorityId + "\" title='"+phasesubjectData[j].name+"'>" + phasesubjectData[j].name + "</li>");
                        }
                    }
                }
            }else if(data[i].deep==1&&numberOne!=1){
                $("#phasesubject1").find(".selectbox_body").append("<li data-value=\"" + data[i].dataAuthorityId + "\" title='"+data[i].name+"'>" + data[i].name + "</li>");
            }
        })
    }

    /** 点击学段适配学科 */
    $("#phasesubject1").selectBox("callback",function(_data){
        phasesubject1 = _data;   //学科ID
        $("#phasesubject2 ").selectBox("removeAll");
        var parentId = _data;
        for(var i=0;i<phasesubjectData.length;i++){
            if(phasesubjectData[i].parentId===parentId){
                $("#phasesubject2").find(".selectbox_body").append("<li data-value=\"" + phasesubjectData[i].dataAuthorityId + "\" class='selectbox_selected' title='"+phasesubjectData[i].name+"'>" + phasesubjectData[i].name + "</li>");
                $("#phasesubject2").selectBox("selectForData", phasesubjectData[i].dataAuthorityId,true);
                phasesubject2 = phasesubjectData[i].dataAuthorityId;   //学科ID
            }
        }
        $("#phasesubject2").selectBox("callback",function(_data){
            phasesubject2= _data;
        });
    });

    /** 点击类型和格式 */
    $(".type_form").click(function () {
        $(this).addClass("btn_click").siblings().removeClass("btn_click");
        var index=$(this).index();
        var bar=$(".bar");
        for(var i=0;i<bar.length;i++){
            if(i==index){
                bar.eq(i).css("display","block");
            }else{
                bar.eq(i).css("display","none");
            }
        }
    });

    /** 基于准备好的dom，初始化echarts实例 */
    var myChartOne = echarts.init(document.getElementById('barGraphOne'));
    var myChartTwo = echarts.init(document.getElementById('barGraphTwo'));
    /* 显示标题，图例和空的坐标轴 */
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


    /** 进入页面适配数据 */
    paramsAndRequire (phasesubject1,phasesubject2,startTime,endTime,userId);

    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
    var param = {
        categoriesId : str
    };
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:str,
        userId:userId
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
                    alert("获取资源统计（资源分类）成功，但是没有相关数据！！");
                }
            }
        })
    }
    function resourceTypeTotalAdapter(data) {
        var data=data[0];
        // 资源总量数组
        var totalResourceArr = [];
        var coursewareAll;    //总课件
        var smallclassAll;    //总微课
        var designAll;			  //总教学设计
        var practiceAll;    	  //总同步练习
        var materialAll;        //总素材
        var learinngAll;        //总学案
        var researchAll;        //总教学研究
        var expandAll;            //总拓展资源
        var etextbookAll;      //总电子课本
        var teacherbookAll;  //总教师用书
        var curriculumAndInterpretationAll;    															  //总课表与解读
        var teachingvideoAll;    //总教学视频
        var experimentAll;    //总实验
        var mediumtestAll;     //总中考
        var nationaltestAll;    //总高考
        var primarytestAll;    //总小学竞赛
        var middletestAll;    //总初中竞赛
        var hightestAll;        //总高中竞赛
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
            practicaleducationAll = 0;    //总实践教育
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
                    alert("获取资源统计（资源分类）成功，但是没有相关数据！！");
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
                    alert("获取资源统计（资源格式）成功，但是没有相关数据！！");
                }
            }
        })
    }
    function resourceFormTotalAdapter(data) {
        // 资源总量数组
        var formTotalArr = [];
        var image,doc,video,audio,flash;
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
                    alert("获取资源统计（资源格式）成功，但是，没有相关数据！！");
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



    /** 点击统计按钮 */
    $(".btn-statistics").click(function () {

        startTime=$("#dates_start1").val();     //开始时间
        endTime=$("#dates_end1").val();         //结束时间

        /** 点击统计按钮适配数据 */
        paramsAndRequire (phasesubject1,phasesubject2,startTime,endTime,userId);

        /** id参数 */
        var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
        var param = {
            categoriesId : str
        };
        var params={
            startTime:startTime,    //开始时间
            endTime:endTime,        //结束时间
            categoriesId:str,
            userId:userId
        };

        /** 资源分类统计(资源类型总量)柱状图 */
        resourceTypeTotal(param);
        /** 资源分类统计(资源类型个人)柱图 */
        resourceType(params);
        /** 资源分类统计(资源格式总量) */
        resourceFormTotal(param);
        /** 资源统计（资源格式个人）柱图 */
        resourceForm(params);

    });
});


function paramsAndRequire (phasesubject1,phasesubject2,startTime,endTime,userId) {
    /** id参数 */
    var str = JSON.stringify([{"deep":1,"id":phasesubject1},{"deep":2,"id":phasesubject2}]);
    /** 得到搜索条件的json对象 */
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:str,
        userId:userId
    };
    /** 个人上传总量*/
    uploadNumber(params);
    /** 资源统计（发稿统计） */
    statisticsTopic(params);
    /** 资源统计（审核统计）（审核统计-个人审核数量,上传审核数量,发稿审核数量） */
    statisticsVetted(params);
    /** 资源统计（审核统计-发稿复审）*/
    topicVetted(params);
    /** 资源统计（审核统计-发稿终审）*/
    topicVettedFinal(params)
}

/** 个人上传总量*/
function uploadNumber(params){
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryUploadNumber",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                uploadNumberAdapter(data.data);
            }else{
                alert("获取个人上传总量成功，但是没有数据！！");
            }
        }
    })
}
function uploadNumberAdapter(data){
    var uploadNumber;
    if(data[0]==null){
        $(".uploadNumber").html(0);
    }else{
        uploadNumber=getValue(data[0].uploadNumber);
        $(".uploadNumber").html(uploadNumber);
    }
}

/** 资源统计（发稿统计） */
function statisticsTopic(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/getSelectedTopic",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                statisticsTopicAdapter(data.data);
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
                alert("获取资源统计（审核统计）成功，但是没有数据！");
            }
        }
    })
}
function statisticsVettedAdapter(data) {
    var topicvetted,uploadvetted,vettedNumber;
    if(data[0]==null){
        $(".topicvetted").html(0);
        $(".uploadvetted").html(0);
        $(".vettedNumber").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            topicvetted = getValue(data[i].topicvetted);    	 //发稿审核
            uploadvetted = getValue(data[i].uploadvetted);    	 //上传审核
            vettedNumber = getValue(data[i].vettedNumber);       //个人审核总量
        }
        $(".topicvetted").html(topicvetted);
        $(".uploadvetted").html(uploadvetted);
        $(".vettedNumber").html(vettedNumber);
    }
}

/** 资源统计（审核统计-发稿复审）*/
function topicVetted(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryReappAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                topicVettedAdapter(data.data);
            }else{
                alert("获取资源统计（发稿复审）成功，但是没有数据！！");
            }
        }
    })
}
function topicVettedAdapter(data) {
    var topicrechecked;
    if(data[0]==null){
        $(".topicrechecked").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            topicrechecked = getValue(data[i].topicrechecked);  //发稿复审
        }
        $(".topicrechecked").html(topicrechecked);
    }
}

/** 资源统计（审核统计-发稿终审）*/
function topicVettedFinal(params) {
    $.ajax({
        type:"post",
        url:getBasePath() + "statisticalAnalysis/queryFinalAuditNum",
        dataType:"json",
        data:params,
        success:function (data) {
            if(data.status==0){
                topicVettedFinalAdapter(data.data);
            }else{
                alert("获取资源统计（发稿终审）成功，但是没有相关数据！！");
            }
        }
    })
}
function topicVettedFinalAdapter(data) {
    var topicfinal;
    if(data[0]==null){
        $(".topicfinal").html(0);
    }else{
        for(var i = 0; i < data.length; i++){
            topicfinal = getValue(data[i].topicfinal);   //发稿终审
        }
        $(".topicfinal").html(topicfinal);
    }
}


/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}
