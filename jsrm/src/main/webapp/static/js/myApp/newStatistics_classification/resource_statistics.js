/**
 * Created by xzb on 2016/12/2.
 */
function paramsAndRequire (paraId,startTime,endTime) {
    /** 得到搜索条件的json对象 */
    var param = {
        categoriesId : paraId                               			//年级册次
    };
    var params={
        startTime:startTime,    //开始时间
        endTime:endTime,        //结束时间
        categoriesId:paraId              //目录id
    };
    /** 资源分类统计(资源类型总量)柱状图 */
    resourceTypeTotal(param);
    /** 资源分类统计(资源类型个人)柱图 */
    resourceType(params);
    /** 资源分类统计(资源格式总量) */
    resourceFormTotal(param);
    /** 资源统计（资源格式个人）柱图 */
    resourceForm(params);
    /** 资源统计（发稿统计） */
    statisticsTopic(params);
    /** 资源统计（审核统计）（审核统计-个人审核数量,上传审核数量,发稿审核数量） */
    statisticsVetted(params);
    /** 资源统计（审核统计-发稿复审）*/
    topicVetted(params);
    /** 资源统计（审核统计-发稿终审）*/
    topicVettedFinal(params)
}

/** 资源分类统计(资源类型总量)柱状图 */
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
                alert("获取资源统计（资源资源类型总量）失败");
            }
        }
    })
}
function resourceTypeTotalAdapter(data) {
    // 资源总量数组
    var totalResourceArr = [];
    for(var i = 0; i < data.length; i++){
        var coursewareAll = getValue(data.coursewareAll);    //总课件
        var smallclassAll = getValue(data.smallclassAll);    //总微课
        var designAll = getValue(data.designAll);			  //总教学设计
        var practiceAll = getValue(data.practiceAll);    	  //总同步练习
        var materialAll = getValue(data.materialAll);        //总素材
        var learinngAll = getValue(data.learinngAll);        //总学案
        var researchAll = getValue(data.researchAll);        //总教学研究
        var expandAll = getValue(data.expandAll);            //总拓展资源
        var EtextbookAll = getValue(data.EtextbookAll);      //总电子课本
        var teacherbookAll = getValue(data.teacherbookAll);  //总教师用书
        var CurriculumAndInterpretationAll = getValue(data.CurriculumAndInterpretationAll);    															  //总课表与解读
        var teachingvideoAll = getValue(data.teachingvideoAll);    //总教学视频
        var experimentAll = getValue(data.experimentAll);    //总实验
        var mediumtestAll = getValue(data.mediumtestAll);     //总中考
        var nationaltestAll = getValue(data.nationaltestAll);    //总高考
        var primarytestAll = getValue(data.primarytestAll);    //总小学竞赛
        var middletestAll = getValue(data.middletestAll);    //总初中竞赛
        var hightestAll = getValue(data.hightestAll);        //总高中竞赛
        var knowledgedetailAll = getValue(data.knowledgedetailAll);    //总知识详解
        var studyvideoAll = getValue(data.studyvideoAll);    //总学习视频
        var textexplainAll = getValue(data.textexplainAll);    //总课文全解
        var currentpointAll = getValue(data.currentpointAll);    //总时政要点
        var practicaleducationAll = getValue(data.practicaleducationAll);    //总实践教育
        var nounsexplanationAll = getValue(data.nounsexplanationAll);    //总名词解释

        totalResourceArr = [coursewareAll, smallclassAll, designAll, practiceAll, materialAll, learinngAll, researchAll, expandAll, EtextbookAll, teacherbookAll, CurriculumAndInterpretationAll, teachingvideoAll, experimentAll, mediumtestAll, nationaltestAll, primarytestAll, middletestAll, hightestAll, knowledgedetailAll, studyvideoAll, textexplainAll, currentpointAll, practicaleducationAll, nounsexplanationAll];
    }

    /** 获得图表的options对象 */
    var option = myChartOne.getOption();
    /** 资源总量配置 */
    option.series[0].data = totalResourceArr;
    myChartOne.setOption(option);
}

/** 资源分类统计(资源类型个人)柱图 */
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
                alert("获取资源统计（资源类型个人数据）失败");
            }
        }
    })
}
function resourceTypeAdapter(data) {
    // 已筛选资源量数组
    var selectResourceArr = [];
    for(var i = 0; i < data.length; i++){
        var courseware = getValue(data.courseware);    //课件
        var smallclass = getValue(data.smallclass);    //微课
        var design = getValue(data.design);			  //教学设计
        var practice = getValue(dat.practice);    	  //同步练习
        var material = getValue(data.material);        //素材
        var learinng = getValue(data.learinng);        //学案
        var research = getValue(data.research);        //教学研究
        var expand = getValue(data.expand);            //拓展资源
        var Etextbook = getValue(data.Etextbook);      //电子课本
        var teacherbook = getValue(data.teacherbook);  //教师用书
        var CurriculumAndInterpretation = getValue(data.CurriculumAndInterpretation);  //课表与解读
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

        selectResourceArr = [courseware, smallclass, design, practice, material, learinng, research, expand, Etextbook, teacherbook, CurriculumAndInterpretation, teachingvideo, experiment, mediumtest, nationaltest, primarytest, middletest, hightest, knowledgedetail, studyvideo, textexplain, currentpoint, practicaleducation, nounsexplanation];
    }

    /** 获得图表的options对象 */
    var option = myChartOne.getOption();
    /** 已筛选资源总量配置 */
    option.series[1].data = selectResourceArr;
    myChartOne.setOption(option);
}

/** 资源分类统计(资源格式总量) */
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
                alert("获取资源统计（资源格式总量）失败");
            }
        }
    })
}
function resourceFormTotalAdapter(data) {
    // 资源总量数组
    var formTotalArr = [];
    for(var i = 0; i < data.length; i++){
        var image = getValue(data[i].image);    		            //图片
        var doc = getValue(data[i].doc);    			            //文档
        var video = getValue(data[i].video);    		            //视频
        var audio = getValue(data[i].audio);    		            //音频
        var flash = getValue(data[i].flash);    		            //动画
        // var total = image + doc + video + audio + flash;    		//总计

        formTotalArr = [image, doc, video, audio, flash];
    }
    //获得图表的options对象
    var option2 = myChartTwo.getOption();
    option2.series[0].data = formArrTotal;
    myChartTwo.setOption(option2);
}

/** 资源统计（资源格式个人）柱图 */
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
                alert("获取资源统计（资源格式个人数据）失败");
            }
        }
    })
}
function resourceFormAdapter(data) {
    // 资源总量数组
    var formArr = [];
    for(var i = 0; i < data.length; i++){
        var image = getValue(data[i].image);    		            //图片
        var doc = getValue(data[i].doc);    			            //文档
        var video = getValue(data[i].video);    		            //视频
        var audio = getValue(data[i].audio);    		            //音频
        var flash = getValue(data[i].flash);    		            //动画
        // var total = image + doc + video + audio + flash;    		//总计

        formArr = [image, doc, video, audio, flash];
    }
    //获得图表的options对象
    var option2 = myChartTwo.getOption();
    option2.series[1].data = formArr;
    myChartTwo.setOption(option2);
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
                alert("获取资源统计（发稿统计）失败");
            }
        }
    })
}
function statisticsTopicAdapter(data) {
    for(var i = 0; i < data.length; i++){
        var topicNumber = getValue(data[i].topicNumber);    		        //发稿总量
        var topicSize = getValue(data[i].topicsize);    			        //资源大小
        var topicTime = getValue(data[i].topictime);    		            //音视频时长
        var topicWord = getValue(data[i].topicword);    		            //发稿字数
    }
    $(".topicNum").html(topicNumber);
    $(".topicWord").html(topicWord);
    $(".topicTime").html(topicTime);
    $(".topicSize").html(topicSize);
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
                alert("获取资源统计（审核统计）失败");
            }
        }
    })
}
function statisticsVettedAdapter(data) {
    for(var i = 0; i < data.length; i++){
        var topicvetted = getValue(data[i].topicvetted);    	 //发稿审核
        var uploadvetted = getValue(data[i].uploadvetted);    	 //上传审核
        var vettedNumber = getValue(data[i].vettedNumber);       //个人审核总量
    }
    $(".topicvetted").html(topicvetted);
    $(".uploadvetted").html(uploadvetted);
    $(".vettedNumber").html(vettedNumber);
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
                alert("获取资源统计（发稿复审）失败");
            }
        }
    })
}
function topicVettedAdapter(data) {
    for(var i = 0; i < data.length; i++){
        var topicrechecked = getValue(data[i].topicrechecked);  //发稿复审
    }
    $(".topicrechecked").html(topicrechecked);
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
                alert("获取资源统计（发稿终审）失败");
            }
        }
    })
}
function topicVettedFinalAdapter(data) {
    for(var i = 0; i < data.length; i++){
        var topicfinal = getValue(data[i].topicfinal);   //发稿终审
    }
    $(".topicfinal").html(topicfinal);
}


/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val==undefined)? "-": val;
}