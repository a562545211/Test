/**
 * Created by sj.yuan on 2016/11/2.
 */


/** 保存和发稿时，判断全选和反选是不是选中 */
function saveJudge(){
    // /*资源编号或者选题编号*/
    // if($(".item-check").eq(0).prop("checked")){
    //     localStorage.setItem("cp-resourceTopicCode",$("#resourceTopicCode").val());   //资源编号
    //     localStorage.setItem("cp-tResourceCode",$("#tResourceCode").val());   //选题编号
    // }else{
    //     localStorage.removeItem("cp-resourceTopicCode");
    //     localStorage.removeItem("cp-tResourceCode");
    // }
    /*发版类型*/
    if($(".item-check").eq(0).prop("checked")){
        localStorage.setItem("cp-draftTypeId",$("#selectbox0 li.selectbox_selected").data("value"));//发版类型
        localStorage.setItem("cp-edition",$(".ipt").val());   //版次
        localStorage.setItem("cp-iSBN",$(".ISBN").val()); //ISBN
    }else{
        localStorage.removeItem("cp-draftTypeId");
        localStorage.removeItem("cp-edition");
        localStorage.removeItem("cp-iSBN");
    }
    /*资源名称*/
    if($(".item-check").eq(1).prop("checked")){
        localStorage.setItem("cp-tResourceCodeId",$(".check_show").attr("id")); //选题编号Id
        localStorage.setItem("cp-resourceName",$("#resourceName").val()); //资源名称
    }else{
        localStorage.removeItem("cp-tResourceCodeId");
        localStorage.removeItem("cp-resourceName");

    }
    /*资源属性*/
    if($(".item-check").eq(2).prop("checked")){
        /* 获得关联目录 */
        var categoresCode = "";
        var attribute_id = "data-value";
        attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
        for(var i = 1; i < 9; i++){
            if(i == 1){
                phaseId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
            }else if(i == 2){
                subjectId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
            }
            var select_value = $("#selectbox" + i + " .selectbox_selected").attr(attribute_id);
            if(select_value == undefined){
                break;
            }else{
                if(i == 1){
                    categoresCode = select_value;
                }else{
                    categoresCode += "," + select_value;
                }
            }
        }
        /** 保存categoresCode到localStorage*/
        localStorage.setItem("cp-_categoresCode",categoresCode);
        localStorage.setItem("cp-phaseId",phaseId);
        localStorage.setItem("cp-subjectId",subjectId);
        /*知识点*/
        var _knowledgeCode = "";
        var _knowledgesDom = $("div[id^=selectboxKnowledge]");
        for(var j=0; j < _knowledgesDom.length;j++ ){
            if($("div[id^=selectboxKnowledge" + (j + 1) + "]").find('ul li').hasClass("selectbox_selected")){
                _knowledgeCode += $("div[id^=selectboxKnowledge"+(j+1)+"]").find('ul .selectbox_selected').attr("data-id");
                if(! ((j+1) >= 4 && (j+1) % 4 == 0) ){
                    _knowledgeCode += ",";
                } else{
                    _knowledgeCode += ";";
                }
            }else{
                if ((j+1) >= 4 && (j+1) % 4 == 0) {
                    _knowledgeCode =_knowledgeCode.slice(0,-1)+ ";"
                }
            }
        }
        localStorage.setItem("cp-_knowledgeCode",_knowledgeCode);
    }else{
        localStorage.removeItem("cp-_categoresCode");
        localStorage.removeItem("cp-phaseId");
        localStorage.removeItem("cp-subjectId");
        localStorage.removeItem("cp-_knowledgeCode");
    }
    /*资源类别*/
    if($(".item-check").eq(3).prop("checked")){
        localStorage.setItem("cp-data-9",$("#selectboxBox9 li.selectbox_selected").data("value"));   //资源类别
        localStorage.setItem("cp-data-10",$("#selectbox10 li.selectbox_selected").data("value")); //类别二级
    }else{
        localStorage.removeItem("cp-data-9");
        localStorage.removeItem("cp-data-10");
    }
    /*资源格式*/
    if($(".item-check").eq(4).prop("checked")){
        localStorage.setItem("cp-data-11",$("#selectbox11 li.selectbox_selected").data("value")); //资源格式
    }else{
        localStorage.removeItem("cp-data-11");
    }
    /*字数*/
    if($(".item-check").eq(5).prop("checked")){
        localStorage.setItem("cp-wordCount",$(".wordCount").val()); //字数
        localStorage.setItem("cp-hover",$("#hover").val()); //小时
        localStorage.setItem("cp-minutes",$("#minutes").val()); //分钟
        localStorage.setItem("cp-seconds",$("#seconds").val()); //秒
        localStorage.setItem("cp-mapCount",$(".mapCount").val()); //图幅
    }else{
        localStorage.removeItem("cp-wordCount");
        localStorage.removeItem("cp-hover");
        localStorage.removeItem("cp-minutes");
        localStorage.removeItem("cp-seconds");
        localStorage.removeItem ("cp-mapCount");
    }
    /*资源描述*/
    if($(".item-check").eq(6).prop("checked")){
        localStorage.setItem("cp-resourceDes",$(".btm10 dd textarea").val()); //资源描述
    }else{
        localStorage.removeItem ("cp-resourceDes");
    }
    /*资源制作者*/
    if($(".item-check").eq(7).prop("checked")){
        localStorage.setItem("cp-resourceMaker",$(".resourceMaker").val()); //资源制作者
    }else{
        localStorage.removeItem ("cp-resourceMaker");
    }
    /*作者简介*/
    if($(".item-check").eq(8).prop("checked")){
        localStorage.setItem("cp-makerIntro",$(".aboutAuthor").val()); //作者简介
    }else{
        localStorage.removeItem ("cp-makerIntro");
    }
    /*使用对象*/
    if($(".item-check").eq(9).prop("checked")){
        if ($("#teacher").prop("checked")) {
            localStorage.setItem("cp-teacher","teacher"); //使用对象，老师
        }
        if ($("#student").prop("checked")) {
            localStorage.setItem("cp-student","student"); //使用对象，学生
        }
    }else{
        localStorage.removeItem ("cp-teacher");
        localStorage.removeItem ("cp-student");
    }
    /*资源来源*/
    if($(".item-check").eq(10).prop("checked")){
        localStorage.setItem("cp-resourceSources",$(".resourceSources").val()); //资源来源
    }else{
        localStorage.removeItem("cp-resourceSources");
    }
    /*版权*/
    if($(".item-check").eq(11).prop("checked")){
        localStorage.setItem("cp-copyright",$("#copyright li.selectbox_selected").data("value"));   //版权
        localStorage.setItem("cp-yearMonth",$(".yearMonth").val()); //年份
    }else{
        localStorage.removeItem("cp-copyright");
        localStorage.removeItem("cp-yearMonth");
    }
    /*独家资源*/
    if($(".item-check").eq(12).prop("checked")){
        if($("#yes").prop("checked")){
            localStorage.setItem("cp-isAloneRes","是"); //独家资源
        }else if($("#no").prop("checked")){
            localStorage.setItem("cp-isAloneRes","否"); //独家资源
        }
    }else{
        localStorage.removeItem("cp-isAloneRes");
    }
    /*原创资源*/
    if($(".item-check").eq(13).prop("checked")){
        if($("#yes01").prop("checked")){
            localStorage.setItem("cp-isOriginal","是"); //是否原创
        }else if($("#no01").prop("checked")){
            localStorage.setItem("cp-isOriginal","否"); //是否原创
        }
    }else{
        localStorage.removeItem("cp-isOriginal");
    }
    /*文种*/
    if($(".item-check").eq(14).prop("checked")){
        if($("#china").prop("checked")){
            localStorage.setItem("cp-isChinese","是"); //是否中文
        }else if($("#enish").prop("checked")){
            localStorage.setItem("cp-isChinese","否"); //是否中文
        }
    }else{
        localStorage.removeItem("cp-isChinese");
    }
    /*资源等级*/
    if($(".item-check").eq(15).prop("checked")){
        if($("#nice").prop("checked")){
            localStorage.setItem("cp-resourceLevel","精品"); //资源等级
        }else if($("#common").prop("checked")){
            localStorage.setItem("cp-resourceLevel","普通"); //资源等级
        }
    }else{
        localStorage.removeItem("cp-resourceLevel");
    }
    /*价格*/
    if($(".item-check").eq(16).prop("checked")){
        if($("#free").prop("checked")){
            localStorage.setItem("cp-isFree","是"); //是否免费
            // localStorage.setItem("fg-cost",""); //是否免费
        }else if($("#charge").prop("checked")){
            localStorage.setItem("cp-isFree","否"); //是否免费
            localStorage.setItem("cp-cost",$(".dot").val());
        }
    }else{
        localStorage.removeItem("cp-isFree");
        localStorage.removeItem("cp-cost");
    }
    /*电子课件*/
    if($(".item-check").eq(17).prop("checked")){
        if($("#yes1").prop("checked")){
            localStorage.setItem("cp-isElectron","是"); //电子教材
        }else if($("#no1").prop("checked")){
            localStorage.setItem("cp-isElectron","否"); //电子教材
        }
    }else{
        localStorage.removeItem("cp-isElectron");
    }
}

/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){
    // var cp_resourceTopicCode = localStorage.getItem("cp-resourceTopicCode");//资源编号
    // var cp_tResourceCode = localStorage.getItem("cp-tResourceCode");   //选题编号
    var cp_draftTypeId = localStorage.getItem("cp-draftTypeId");//发版类型
    var cp_edition = localStorage.getItem("cp-edition");//版次
    var cp_iSBN = localStorage.getItem("cp-iSBN");//ISBN
    var cp_tResourceCodeId = localStorage.getItem("cp-tResourceCodeId");//选题编号Id
    var cp_resourceName = localStorage.getItem("cp-resourceName");//资源名称
    var cp_categoresCode = localStorage.getItem("cp-_categoresCode");//资源属性
    var cp_phaseId = localStorage.getItem("cp-phaseId");//学段
    var cp_subjectId = localStorage.getItem("cp-subjectId");//学科
    var cp_knowledgeCode = localStorage.getItem("cp-_knowledgeCode");//知识点
    var cp_data_9 = localStorage.getItem("cp-data-9");//资源类别
    var cp_data_10 = localStorage.getItem("cp-data-10");//类别二级
    var cp_data_11 = localStorage.getItem("cp-data-11");//资源格式
    var cp_wordCount = localStorage.getItem("cp-wordCount");//字数
    var cp_hover = localStorage.getItem("cp-hover");//小时
    var cp_minutes = localStorage.getItem("cp-minutes");//分钟
    var cp_seconds = localStorage.getItem("cp-seconds");//秒
    var cp_mapCount = localStorage.getItem("cp-mapCount");//图幅
    var cp_resourceDes = localStorage.getItem("cp-resourceDes");//资源描述
    var cp_resourceMaker = localStorage.getItem("cp-resourceMaker");//资源制造者
    var cp_makerIntro = localStorage.getItem("cp-makerIntro");//作者简介
    var cp_teacher = localStorage.getItem("cp-teacher");//使用对象，老师
    var cp_student = localStorage.getItem("cp-student");//使用对象，学生
    var cp_resourceSources = localStorage.getItem("cp-resourceSources");//资源来源
    var cp_copyright = localStorage.getItem("cp-copyright");//版权
    var cp_yearMonth = localStorage.getItem("cp-yearMonth");//年份
    var cp_sAloneRes = localStorage.getItem("cp-isAloneRes");//独家资源
    var cp_isOriginal = localStorage.getItem("cp-isOriginal");//原创资源
    var cp_isChinese = localStorage.getItem("cp-isChinese");//文种
    var cp_resourceLevel = localStorage.getItem("cp-resourceLevel");//资源等级
    var cp_isFree = localStorage.getItem("cp-isFree");//价格
    var cp_cost = localStorage.getItem("cp-cost");//费用
    var cp_isElectron = localStorage.getItem("cp-isElectron");  //电子教材
    // /*资源编号*/
    // if(cp_resourceTopicCode !== null || cp_resourceTopicCode !== undefined || cp_resourceTopicCode !== ''){
    //     $("#resourceTopicCode").val(cp_resourceTopicCode);
    // }
    // /*选题编号*/
    // if(cp_tResourceCode !== null || cp_tResourceCode !== undefined || cp_tResourceCode !== ''){
    //     $("#tResourceCode").val(cp_tResourceCode);
    //     $(".check_show").html(cp_tResourceCode);
    //     $(".check_show").attr("id",cp_tResourceCodeId);
    // }
    /*发版类型*/
    if(cp_draftTypeId == 'add'){
        $("#selectbox0").selectBox("selectForData","add",true);
    }else if(cp_draftTypeId == 'revise'){
        $("#selectbox0").selectBox("selectForData","revise",true);
    }
    /*版次*/
    if(cp_edition !== null || cp_edition !== undefined || cp_edition !== ''){
        $(".ipt").val(cp_edition);
    }
    /*ISBN*/
    if(cp_iSBN !== null || cp_iSBN !== undefined || cp_iSBN !== ''){
        $(".ISBN").val(cp_iSBN);
    }
    /*资源名称*/
    if(cp_resourceName !== null || cp_resourceName !== undefined || cp_resourceName !== ''){
        $("#resourceName").val(cp_resourceName);
    }
    /*资源属性*/
    if(cp_categoresCode !== null || cp_categoresCode !== undefined || cp_categoresCode !== ''){
        showAllCategories(cp_categoresCode,"async");
    }
    /*知识点*/
    if(cp_knowledgeCode != null){
        var _knowLength= cp_knowledgeCode.split(";").length-1;
        initKnowledgesBy2(_knowLength,cp_phaseId,cp_subjectId);
        showAllKnowledges(cp_knowledgeCode);
    }
    /*资源类别*/
    if(cp_data_9 !== null || cp_data_9 !== undefined || cp_data_9 !== ''){
        $("#selectboxBox9").selectBox("selectForData",cp_data_9,true);
    }
    /*类别二级*/
    if(cp_data_10 !== null || cp_data_10 !== undefined || cp_data_10 !== ''){
        $("#selectbox10").selectBox("selectForData",cp_data_10,true);
    }
    /*资源格式*/
    if(cp_data_11 !== null || cp_data_11 !== undefined || cp_data_11 !== ''){
        $("#selectbox11").selectBox("selectForData", cp_data_11,true);
    }
    /*字数*/
    if(cp_wordCount !== null || cp_wordCount !== undefined || cp_wordCount !== ''){
        $(".wordCount").val(cp_wordCount);
    }
    /*小时*/
    if(cp_hover !== null || cp_hover !== undefined || cp_hover !== ''){
        $("#hover").val(cp_hover);
    }
    /*分钟*/
    if(cp_minutes !== null || cp_minutes !== undefined || cp_minutes !== ''){
        $("#minutes").val(cp_minutes);
    }
    /*秒*/
    if(cp_seconds !== null || cp_seconds !== undefined || cp_seconds !== ''){
        $("#seconds").val(cp_seconds);
    }
    /*图幅*/
    if(cp_mapCount !== null || cp_mapCount !== undefined || cp_mapCount !== ''){
        $(".mapCount").val(cp_mapCount);
    }
    /*资源描述*/
    if(cp_resourceDes !== null || cp_resourceDes !== undefined || cp_resourceDes !== ''){
        $(".btm10 dd textarea").val(cp_resourceDes);
    }
    /*资源制造者*/
    if(cp_resourceMaker !== null || cp_resourceMaker !== undefined || cp_resourceMaker !== ''){
        $(".resourceMaker").val(cp_resourceMaker);
    }
    /*作者简介*/
    if(cp_makerIntro !== null || cp_makerIntro !== undefined || cp_makerIntro !== ''){
        $(".aboutAuthor").val(cp_makerIntro);
    }
    /*使用对象，老师*/
    if(cp_teacher == 'teacher'){
        $("#teacher").prop("checked","checked");
    }
    /*使用对象，学生*/
    if(cp_student == 'student'){
        $("#student").prop("checked","checked");
    }
    /*资源来源*/
    if(cp_resourceSources !== null || cp_resourceSources !== undefined || cp_resourceSources !== ''){
        $(".resourceSources").val(cp_resourceSources);
    }
    /*版权*/
    if(cp_copyright !== null || cp_copyright !== undefined || cp_copyright !== ''){
        $("#copyright").selectBox("selectForData",cp_copyright,true);
    }
    /*年份*/
    if(cp_yearMonth !== null || cp_yearMonth !== undefined || cp_yearMonth !== ''){
        $(".yearMonth").val(cp_yearMonth);
    }else{
        $(".yearMonth").attr("disabled", "disabled");
    }
    /*独家资源*/
    if(cp_sAloneRes !== null || cp_sAloneRes !== undefined || cp_sAloneRes !== ''){
        if(cp_sAloneRes=="是"){
            $("#yes").prop("checked","checked");
        }else if(cp_sAloneRes=="否"){
            $("#no").prop("checked","checked");
        }
    }
    /*原创资源*/
    if(cp_isOriginal !== null || cp_isOriginal !== undefined || cp_isOriginal !== ''){
        if(cp_isOriginal=="是"){
            $("#yes01").prop("checked","checked");
        }else if(cp_isOriginal=="否"){
            $("#no01").prop("checked","checked");
        }
    }
    /*文种*/
    if(cp_isChinese !== null || cp_isChinese !== undefined || cp_isChinese !== ''){
        if(cp_isChinese=="是"){
            $("#china").prop("checked","checked");
        }else if(cp_isChinese=="否"){
            $("#enish").prop("checked","checked");
        }
    }
    /*资源等级*/
    if(cp_resourceLevel !== null || cp_resourceLevel !== undefined || cp_resourceLevel !== ''){
        if(cp_resourceLevel=="精品"){
            $("#nice").prop("checked","checked");
        }else if(cp_resourceLevel=="普通"){
            $("#common").prop("checked","checked");
        }
    }
    /*价格*/
    if(cp_isFree !== null || cp_isFree !== undefined || cp_isFree !== ''){
        if(cp_isFree=="是"){
            $("#free").prop("checked","checked");
        }else if(cp_isFree=="否"){
            $("#charge").prop("checked","checked");
            $(".dot").val(cp_cost);
        }
    }
    /*电子教材*/
    if(cp_isElectron !== null || cp_isElectron !== undefined || cp_isElectron !== ''){
        if(cp_isElectron=="是"){
            $("#yes1").prop("checked","checked");
        }else if(cp_isElectron=="否"){
            $("#no1").prop("checked","checked");
        }
    }

}

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
    clearKnowledge();   //清空资源属性和知识点
    /*资源属性*/
    showAllCategories(data.categoresCode);
    /*知识点*/
    if(data.knowledgeCode != "") {
        var _knowLength= data.knowledgeCode.split(";").length-1;
        initKnowledgesBy2(_knowLength);
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

/** 重置 */
function clear() {
    /*选题编号*/
    $(".check_show").html("");
    $("#resourceTopicCode").val("");
    $("#tResourceCode").val("");

    /*资源名称*/
    $(".iptFl").val("");
    /*发版类型*/
    $("#selectbox0").selectBox("setCaption", "未选择", "-1");
    /*版次*/
    $(".ipt").val("");
    /*ISBN号*/
    $(".ISBN").val("");
    /*责任编辑*/
    // $(".chargeEditor").html("");
    /*资源属性*/
    $("#selectbox1").selectBox("setCaption", "学段", "-1");
    $("#selectbox2").selectBox("setCaption", "学科", "-1");
    $("#selectbox3").selectBox("setCaption", "版本", "-1");
    $("#selectbox4").selectBox("setCaption", "册次", "-1");
    $("#selectbox5").selectBox("setCaption", "章", "-1");
    $("#selectbox6").selectBox("setCaption", "节", "-1");
    $("#selectbox7").selectBox("setCaption", "目", "-1");
    $("#selectbox8").selectBox("setCaption", "课时", "-1");
    /*知识点*/
    var knowledgeLength= $("#knowledgeAdd").children("dd").length;
    $("#knowledgeAdd").children("dd").eq(0).find("#selectboxKnowledge1").selectBox("setCaption","一级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(1).find("#selectboxKnowledge2").selectBox("setCaption","二级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(2).find("#selectboxKnowledge3").selectBox("setCaption","三级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(3).find("#selectboxKnowledge4").selectBox("setCaption","四级知识点","-1");
    for(var i=knowledgeLength-1;i>=4;i--){
        $("#knowledgeAdd").children("dd").eq(i).remove();
    }
    /*资源一级类别*/
    $("#selectboxBox9").selectBox("setCaption", "未选择", "-1");
    /*资源二级类别*/
    $("#selectbox10").selectBox("setCaption", "未选择", "-1");
    /*资源格式*/
    $("#selectbox11").selectBox("setCaption", "未选择", "-1");
    /*字数*/
    $(".wordCount").val("");
    /*时长*/
    $("#hover").val("");
    $("#minutes").val("");
    $("#seconds").val("");
    /*图幅数*/
    $(".mapCount").val("");
    /*资源描述*/
    $(".btm10 dd textarea").val("");
    /*资源制作者*/
    $(".resourceMaker").val("");
    /*作者简介*/
    $(".aboutAuthor").val("");
    /*使用对象*/
    if ($("#teacher").prop("checked")) {
        $("#teacher").removeProp("checked");
    }
    if ($("#student").prop("checked")) {
        $("#student").removeProp("checked");
    }
    /*资源来源*/
    $(".resourceSources").val("");
    /*版权*/
    $(".copyright").val("");
    /*年份*/
    $(".yearMonth").val("");
    /*是否是独家资源*/
    if ($("#yes").prop("checked")) {
        $("#yes").removeProp("checked");
    }
    if ($("#no").prop("checked")) {
        $("#no").removeProp("checked");
    }
    /*是否原创*/
    if ($("#yes01").prop("checked")) {
        $("#yes01").removeProp("checked");
    }
    if ($("#no01").prop("checked")) {
        $("#no01").removeProp("checked");
    }
    /*是否中文*/
    if ($("#china").prop("checked")) {
        $("#china").removeProp("checked");
    }
    if ($("#enish").prop("checked")) {
        $("#enish").removeProp("checked");
    }
    /*资源等级*/
    if ($("#nice").prop("checked")) {
        $("#nice").removeProp("checked");
    }
    if ($("#common").prop("checked")) {
        $("#common").removeProp("checked");
    }
    /*是否免费*/
    if ($("#free").prop("checked")) {
        $("#free").removeProp("checked");
        $(".dot").val("");
    }
    if ($("#charge").prop("checked")) {
        $("#charge").removeProp("checked");
        $(".dot").val("");
    }
    /*电子课件*/
    if ($("#yes1").prop("checked")) {
        $("#yes1").removeProp("checked");
    }
    if ($("#no1").prop("checked")) {
        $("#no1").removeProp("checked");
    }
}

$(function () {
    /*进入页面全部全选*/
    // var check
    // for(){
    //
    // }

    $(".btn_hq").click(function () {
        clear();
        var resourceTopicCode = $(this).parent().find("input[name='resourceTopicCode']").val();
        getInfoByCode(resourceTopicCode);

    });

    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
    getSession();
    //getAudit();

    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });

    findSysDict("selectboxBox9", "resourceType", "selectbox10");
    findSysDict("selectbox0", "openType");
    findSysDict("selectbox11", "resourceFormat");
    findSysDict("copyright", "copyright");

    

    /**
     * 解析URL
     *@param {string} url 完整的URL地址
     *@returns {object} 自定义的对象
     */
    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }
    var myURL = parseURL(document.location.href);
    var myId = myURL.params.id;

    /** 重置 */
    $(".btn_cz").click(function () {
        clear();
    });

    /** 保存的数据 */
    function saveData(type) {
        var result = {};//最后保存的数据

        /**获得关联(资源属性)目录*/
        var categoresCode = "";
        var attribute_id = "data-value";
        attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
        for(var i = 1; i < 9; i++){
            var select_value = $("#selectbox" + i + " .selectbox_selected").attr(attribute_id);
            if(select_value == undefined){
                break;
            }else{
                if(i == 1){
                    categoresCode = select_value;
                }else{
                    categoresCode += "," + select_value;
                }
            }
        }
        /*id*/
        result.id = myId;
        /*选题编号*/
        // result.tResourceCode = $(".check_show").html();
        result.tResourceCode = $("#tResourceCode").val();
        result.tResourceCodeId = $(".check_show").parent().parent().attr("data-value");

        result.resourceFileCode = $("#resourceTopicCode").val();
        /*资源名称*/
        result.resourceName = $("#resourceName").val();
        if(type==2){
            // result.fileSize = $("#fileSize").html();
            // result.fileName = $("#file").val();
            result.fileName = ui.getFileName();
        }
        /*发版类型*/
        result.draftTypeId = $("#selectbox0 li.selectbox_selected").data("value");
        result.draftTypeValue = $("#selectbox0 li.selectbox_selected").html();
        /*版次*/
        result.edition = $(".ipt").val();
        /*ISBN号*/
        result.ISBN = $(".ISBN").val();
        /*资源属性*/
        result.categoresCode = categoresCode;
        /*学段*/
        result.phaseId=$("#selectbox1 li.selectbox_selected").data("id"); //学段ID
        result.phase = $("#selectbox1 li.selectbox_selected").html();
        /*学科*/
        result.subjectId=$("#selectbox2 li.selectbox_selected").data("id");
        result.subject = $("#selectbox2 li.selectbox_selected").html();
        /*知识点*/
        var _knowledgeCode = "";
        var _knowledgesDom = $("div[id^=selectboxKnowledge]");
        for(var j=0; j < _knowledgesDom.length;j++ ){
            if($("div[id^=selectboxKnowledge" + (j + 1) + "]").find('ul li').hasClass("selectbox_selected")){
                _knowledgeCode += $("div[id^=selectboxKnowledge"+(j+1)+"]").find('ul .selectbox_selected').attr("data-id");
                if(! ((j+1) >= 4 && (j+1) % 4 == 0) ){
                    _knowledgeCode += ",";
                } else{
                    _knowledgeCode += ";";
                }
            }else{
                if ((j+1) >= 4 && (j+1) % 4 == 0) {
                    _knowledgeCode =_knowledgeCode.slice(0,-1)+ ";"
                }
            }
        }
        result.knowledgeCode = _knowledgeCode;
        /*资源一级类别*/
        result.resourceTypeOneLevelId = $("#selectboxBox9 li.selectbox_selected").data("value");
        result.resourceTypeOneLevelValue = $("#selectboxBox9 li.selectbox_selected").html();
        /*资源二级类别*/
        result.resourceTypeTwoLevelId = $("#selectbox10 li.selectbox_selected").data("value");
        result.resourceTypeTwoLevelValue = $("#selectbox10 li.selectbox_selected").html();
        /*资源格式*/
        result.resourceFormatId = $("#selectbox11 li.selectbox_selected").data("value");
        result.resourceFormatValue = $("#selectbox11 li.selectbox_selected").html();
        /*字数*/
        result.wordCount = $(".wordCount").val();
        /*时长*/
        result.timeCount = Number($("#hover").val()*3600) + Number($("#minutes").val()*60)+Number($("#seconds").val());
        result.mapCount = $(".mapCount").val();
        /*资源描述*/
        // result.resourceDes=$(".btm10 dd textarea").html();
        result.resourceDes = $(".btm10 dd textarea").val();
        /*资源制作者*/
        result.resourceMaker = $(".resourceMaker").val();
        /*作者简介*/
        // result.makerIntro=$(".aboutAuthor").html();
        result.makerIntro = $(".aboutAuthor").val();
        /*使用对象*/
        if ($("#teacher").prop("checked") && $("#student").prop("checked")) {
            result.useTarget = "teacher and student";
        } else if ($("#teacher").prop("checked") && !$("#student").prop("checked")) {
            result.useTarget = "teacher";
        } else if ($("#student").prop("checked") && !$("#teacher").prop("checked")) {
            result.useTarget = "student";
        } else if (!$("#student").prop("checked") && !$("#teacher").prop("checked")) {
            result.useTarget = "";
        }
        /*资源来源*/
        result.resourceSource = $(".resourceSources").val();
        /*版权*/
        result.copyright=$("#copyright li.selectbox_selected").data("value");
        /*年份*/
        result.yearMonth=$(".yearMonth").val();
        /*是否是独家资源*/
        if ($("#yes").prop("checked")) {
            result.isAloneRes = "0";
        } else if ($("#no").prop("checked")) {
            result.isAloneRes = "1";
        } else {
            result.isAloneRes = "";
        }
        /*是否原创*/
        if ($("#yes01").prop("checked")) {
            result.isOriginal = "0";
        } else if ($("#no01").prop("checked")) {
            result.isOriginal = "1";
        } else {
            result.isOriginal = "";
        }
        /*是否中文*/
        if ($("#china").prop("checked")) {
            result.isChinese = "0";
        } else if ($("#enish").prop("checked")) {
            result.isChinese = "1";
        } else {
            result.isChinese = "";
        }
        /*资源等级*/
        if ($("#nice").prop("checked")) {
            result.resourceLevel = "0";
        } else if ($("#common").prop("checked")) {
            result.resourceLevel = "1";
        } else {
            result.resourceLevel = "";
        }
        /*是否免费*/
        if ($("#free").prop("checked")) {
            result.isFree = "0";
            result.cost = "";
        } else if ($("#charge").prop("checked")) {
            result.isFree = "1";
            result.cost = $(".dot").val();
        } else {
            result.isFree = "";
            result.cost = "";
        }
        /*电子课件*/
        if ($("#yes1").prop("checked")) {
            result.isElectron = "0";
        } else if ($("#no1").prop("checked")) {
            result.isElectron = "1";
        } else {
            result.isElectron = "";
        }
        if(typeof(result.subjectId) == "undefined" ){
            alert("请选择学科");
            return;
        }

        return result;
    }

    /**判断必填项有没有填写*/
    function judgeAJAX(type) {
        var resourceType = "END";
        var subjectId= $("#selectbox2 li.selectbox_selected").data("id");
        if($(".check_show").html() == ""){
            alert("请输入选题编号");
            return;
        }
        if($("#selectbox0 li.selectbox_selected").html()== undefined ){
            alert("请选择发版类型");
            return;
        }
        if($("#resourceName").val()==""){
            alert("请输入资源名称");
            return;
        }
        if($(".ipt").val()==""){
            alert("请输入版次");
            return;
        }
        if($("#selectbox1 li.selectbox_selected").data("id")==""){
            alert("请选择资源属性");
            return;
        }
        if($("#chose-yes").prop("checked")){
            if($("#selectboxKnowledge1 li.selectbox_selected").data("id")==""||$("#selectboxKnowledge1 li.selectbox_selected").html()==undefined){
                alert("请选择知识点");
                return;
            }
        }

        if($("#selectboxBox9 li.selectbox_selected").html()== undefined ){
            alert("请选择资源类别");
            return;
        }

        if($("#selectbox11 li.selectbox_selected").html()==undefined){
            alert("请选择资源格式");
            return;
        }
        if($(".wordCount").val()==""){
            alert("请输入字数");
            return;
        }else{
            if(!/^\d+$/.test($(".wordCount").val())){
                alert("字数格式不正确，请输入从零开始的整数");
                return;
            }
        }
        if($("#hover").val()==""){
            alert("请输入小时的时长");
            return;
        }else{
            if(!/^\d+$/.test($("#hover").val())){
                alert("时长格式不正确，请输入从零开始的整数");
                return;
            }
        }
        if($("#minutes").val()==""){
            alert("请输入分钟的时长");
            return;
        }
        if($("#seconds").val()==""){
            alert("请输入秒的时长");
            return;
        }
        if($(".mapCount").val()==""){
            alert("请输入图幅数");
            return;
        }else{
            if(!/^\d+$/.test($(".mapCount").val())){
                alert("图幅数格式不正确，请输入从零开始的整数");
                return;
            }
        }
        if($(".btm10 dd textarea").val()==""){
            alert("请输入资源描述");
            return;
        }
        if($(".aboutAuthor").val()==""){
            alert("请输入作者简介");
            return;
        }
        if(!($("#student").prop("checked")||$("#teacher").prop("checked"))){
            alert("请选择使用对象");
            return;
        }
        if($(".resourceSources").val()==""){
            alert("请输入资源来源");
            return;
        }
        if($("#copyright li.selectbox_selected").html()==undefined){
            alert("请选择版权");
            return;
        }
        //如果选择的是限期的
        if($("#copyright li.selectbox_selected").attr("data-value") == "deadline"){
            if($(".yearMonth").val()==""){
                alert("请输入年份");
                return;
            }
            if(!/^[1-9]\d{3}$/.test($(".yearMonth").val())){
                alert("请输入正确的年份格式，如2016");
                return;
            }
        }
        if(!($("#china").prop("checked")||$("#enish").prop("checked"))){
            alert("请选择文种");
            return;
        }
        if(!($("#nice").prop("checked")||$("#common").prop("checked"))){
            alert("请选择资源等级");
            return;
        }
        if(!($("#free").prop("checked")||$("#charge").prop("checked"))){
            alert("请选择价格");
            return;
        }else{
            if($("#charge").prop("checked")){
                if($(".dot").val()==""){
                    alert("请输入价格");
                    return;
                }else{
                    if(!/^\d+(\.\d+)?$/.test($(".dot").val())){
                        alert("价格格式不正确，请输入从零开始的数字");
                        return;
                    }
                }
            }
        }
        if(!($("#yes1").prop("checked")||$("#no1").prop("checked"))){
            alert("请选择电子课件");
            return;
        }
        if(type==2){
            var fileVal = $("#file").val();
            if(fileVal=='' || fileVal==undefined) {     //如果附件为空
                alert("附件没有上传！！");
                return;
            }
        }
        if($("input[name='chose']:checked").val() == "1") {
            $.post(getBasePath() + "/resourceManage/validateResourceCode", {"resourceFileCode": $("#resourceTopicCode").val()}, function (rtnData) {
                if (rtnData.data != "0") {
                    $(".alertboxC").show();
                    return;
                }
            }, "json");

        }

        if(type == 2){//如果是保存状态提交
            if(fileVal == ""){//没有选择文件
                alert("请选择文件");
                return;
            }
            getAudit(resourceType, subjectId);
            if(audit_id == null && audit_name == null){
                //alert("没有审批人，不能提交");
                return;
            }
        }

        var _data = saveData();

        if(_data == null){
            return;
        }

        $.ajax({
            type: "post",
            url: getBasePath() + "resourceManage/saveEndFile",
            data: _data,
            async : false,
            dataType:"json",
            success: function (data) {
                if (type == 1) {    //只保存
                    alert("保存信息成功！！");
                    if (data.status == 0) {
                        window.location.href = return_url;
                    }
                } else {           //提交
                    if (data.status == 0) {
                        if($("#file").val() != "") {
                            console.log("成品提交id：" + data.data.id);
                            console.log("成品提交type：" + data.data.type);
                            showUpload();
                            file_id = data.data.id;
                            ui.setBusiId(data.data.id);
                            ui.setBusiType(data.data.type);
                            ui.checkFile();
                        }
                    }
                }
            },
            error: function () {
                alert("保存信息失败")
            }
        });
    }

    $(".btn_bc").click(function () {
        // saveData(1);
        judgeAJAX(1);
        saveJudge()
    });

    /**发稿*/
    $(".btn_tj").click(function () {
        // saveData(2);
        judgeAJAX(2);
        saveJudge()
    });

    /**点击返回*/
    $(".btn_fh").click(function () {
    	var url= return_url.substring(0, return_url.indexOf("?"));
    	url+="?itemId=1";
        window.location.href = url;
        // window.history.go(-1);
    });

    /**点击分钟*/
    $("#minutes").on("blur",function () {
        if($(this).val()!=""){
            if(!/^([0-9]|[1-5][0-9])$/.test($(this).val())){
                $("#minutes").val("");
                alert("请输入0到59的整数分钟");
            }
        }
    });
    /**点击秒*/
    $("#seconds").on("blur",function () {
        if($(this).val()!=""){
            if(!/^([0-9]|[1-5][0-9])$/.test($(this).val())){
                $("#seconds").val("");
                alert("请输入0到59的整数秒");
            }
        }
    });
    
    /** 点击减号*/
    $(".cutSelectbox span").on("click",function () {
        var knowledgeLength= $("#knowledgeAdd").children("dd").length;
        if(knowledgeLength!="4"){
            for(var i=knowledgeLength-1;i>knowledgeLength-5;i--){
                $("#knowledgeAdd").children("dd").eq(i).remove();
            }
        }else{
            alert("已是最后一级知识点，不能减少。");
        }
    })
});

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


function setSelectUserNo(radioObj){

    var radioCheck= $(radioObj).val();
    if("1"==radioCheck){
        $(radioObj).attr("checked",false);
        $(radioObj).val("0");
    }else{
        $(radioObj).val("1");
    }
}