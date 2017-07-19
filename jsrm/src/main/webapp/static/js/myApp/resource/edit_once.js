
/**
 * Created by sj.yuan on 2016/11/2.
 */

/** 重置 */
function clear() {
    /*选题编号*/
    $(".check_show").html("");
    /*资源名称*/
    $(".iptFl").val("");
    /*发版类型*/
    $("#selectbox0").selectBox("setCaption", "未选择", "-1");
    /*版次*/
    $(".ipt").val("");
    /*ISBN号*/
    $(".ISBN").val("");
    /*责任编辑*/
    $(".chargeEditor").html("");
    /*资源属性*/
    $("#selectbox1").selectBox("setCaption", "学科", "-1");
    $("#selectbox2").selectBox("setCaption", "学段", "-1");
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
    $("#selectbox9").selectBox("setCaption", "未选择", "-1");
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
    $("#copyright").selectBox("setCaption","未选择","-1");
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

    findSysDict("selectbox9", "resourceType", "selectbox10");
    findSysDict("selectbox0", "openType");
    findSysDict("selectbox11", "resourceFormat");
    findSysDict("copyright", "copyright");

    /** 资源编号 提取信息 */
    $(".btn_hq").click(function () {

        var resourceTopicCode = $(this).parent().find("input[name='resourceTopicCode']").val();
        $.post(getBasePath() + "/selectTopic/getResourceInfoByTopicCode", {"resourceTopicCode": resourceTopicCode}, function (rtnData) {
            if (rtnData.status == "0") {
                var info = rtnData.data;
                if (info == null) {
                    alert("改资源编号暂无绑定属性");
                } else {
                    checkTopicAjaxAdapter(info);
                }
            }
        }, "json");
        clear();
    });

    return_url = getBasePath() + "static/html/resource/resource.html?itemId="+itemid;
    getSession();

    ui = new html5MultUpload("file", null, null, function (e) {
        inUpload(e);
    });

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

    $.ajax({
        url: getBasePath() + "/resourceManage/selectResourceManageById",
        type: "post",
        data: {"id": myId},
        dataType: "json",
        success: function (rtnData) {
            if (rtnData.status == "0") {
                var info = rtnData.data;
                if (info == null) {
                    alert("该资源编号暂无绑定属性");
                } else {
                    checkTopicAjaxAdapter(info);
                }
            }
        }
    });

    function checkTopicAjaxAdapter(data) {
        return_state = data.state;
        //审核引入的页面
        includeExamine(data.id, data.resourceType);
        /*资源编号*/
        $("#resourceTopicCode").val(data.resourceFileCode);
        $("#tResourceCode").val(data.tResourceCode);
        if(data.resourceFileCode==""||data.resourceFileCode==undefined ){
            $("#selenumber").next().html("选题编号");
            $(".check_show").html(data.tResourceCode);
            $("#btn_xz_alert").click(function () {
                $("#btn_xz_alertD").hide();
                $("#btn_xz_alertb").show();
            });
            alert_B_ajax();
        }else{
            $("#selenumber").next().html("资源编号");
            $(".check_show").html(data.resourceFileCode);
            $("#btn_xz_alert").click(function () {
                $("#btn_xz_alertD").show();
                $("#btn_xz_alertb").hide();
            });
        }

        $(".check_show").parent().parent().attr("data-value",data.tResourceCodeId);
        /*体系级联*/
        showAllCategories(data.categoresCode);
        /*知识点*/
        showAllKnowledges(data.knowledgeCode);
        /*资源名称*/
        $(".iptFl").val(data.resourceName);
        /*发版类型*/
        $("#selectbox0").selectBox("selectForData", data.draftTypeId, false);

        /*版次*/
        $(".ipt").val(data.edition);
        /*ISBN号*/
        $(".ISBN").val(data.iSBN);
        /*责任编辑*/
        $(".chargeEditor").html(data.createUserName);
        // console.log(data.createUserName);
        /*选择上传文件*/
        $("#aim").html(data.fileName);
        $("#fileSize").html(bytesToSize(data.fileSize));

        /*资源一级类别*/
        $("#selectbox9").selectBox("selectForData", data.resourceTypeOneLevelId, true);
        /*资源二级类别*/
        $("#selectbox10").selectBox("selectForData", data.resourceTypeTwoLevelId, false);
        /*资源格式*/
        $("#selectbox11").selectBox("selectForData", data.resourceFormatId, false);
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

    /** 保存的数据 */
    function saveData(type) {
        var result = {};//最后保存的数据
        
        /*id*/
        result.id = myId;

        result.resourceFileCode = $("#resourceTopicCode").val();
        /*选题编号*/
        result.tResourceCode = $("#tResourceCode").val();
        result.tResourceCodeId = $(".check_show").parent().parent().attr("data-value");
        /*资源名称*/
        result.resourceName = $(".zy_name").val();
        if(type==2){
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
        result.categoresCode = categoresCode;

        var phaseId = $("#selectbox1 li.selectbox_selected").data("id");
        var phase = $("#selectbox1 li.selectbox_selected").html();
        /*学科*/
        var subjectId= $("#selectbox2 li.selectbox_selected").data("id");
        var subject = $("#selectbox2 li.selectbox_selected").html();
        
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
        result.phase = phase;
        result.phaseId = phaseId;
        result.subject = subject;
        result.subjectId = subjectId;

        
        /*资源一级类别*/
        result.resourceTypeOneLevelId = $("#selectbox9 li.selectbox_selected").data("value");
        result.resourceTypeOneLevelValue = $("#selectbox9 li.selectbox_selected").html();
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
        result.copyright = $("#copyright li.selectbox_selected").data("value");
        /*年份*/
        result.yearMonth = $(".yearMonth").val();
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
        return result;
    }

    /** 判断必填项有没有填写 */
    function judgeAJAX(type) {
        var resourceType = "END";
        resource_type = resourceType;
        var fileVal = $("#file").val();
        var subjectId= $("#selectbox2 li.selectbox_selected").data("id");
        var fileName = ui.getFileName();

        if($(".check_show").html() == ""){
            alert("请输入选题编号");
            return;
        }
        if($("#selectbox0 li.selectbox_selected").html()== undefined ){
            alert("请选择发版类型");
            return;
        }
        if($(".ipt").val()==""){
            alert("请输入版次");
            return;
        }
        if($("#selectbox1 li.selectbox_selected").data("id")=="" && $("#selectbox2 li.selectbox_selected").data("id")==""){
            alert("请选择资源属性");
            return;
        }
        if($("#selectbox9 li.selectbox_selected").html()== undefined ){
            alert("请选择资源类别");
            return;
        }
        if($("#selectbox11 li.selectbox_selected").html()== undefined ){
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
            // alert($("#student").prop("checked")||$("#teacher").prop("checked"));
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
            alert("请选择中英文");
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
        if(type == 2 && return_state == 1){//如果是保存状态提交
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
        $.ajax({
            type: "post",
            url: getBasePath() + "resourceManage/updateEndFileMessage",
            data: _data,
            dataType:"json",
            success: function (data) {

                if(type == 1){//只保存
                    if(data.status == 0){
                        alert("保存数据成功！！");
                    }else{
                        alert("保存数据失败！！");
                    }
                    window.location.href = return_url ;
                }else {//提交之后上传文件
                    if (data.status == 0) {
                        if(fileName != null && fileName != ""){//如果需要上传文件
                            showUpload();
                            file_id = data.data.id;
                            ui.setBusiId(data.data.id);
                            ui.setBusiType(data.data.resourceType);
                            ui.checkFile();
                        }else{//不需要上传文件，直接提交流程
                            reStartProcess();
                        }
                    }else{//如果后台报错，打印错误信息，返回列表页
                        alert(data.message);
                        window.location.href = return_url;
                    }
                }
            },
            error: function () {
                alert("保存信息失败！！")
            }
        });
    }
    
    /** 重置 */
    $(".btn_cz").click(function () {
        clear();
    });

    /** 保存 */
    $(".btn_bc").click(function () {
        judgeAJAX(1);
    });

    /** 提交 */
    $(".btn_tj").click(function () {
        judgeAJAX(2);
    });
    
    /** 点击返回 */
    $(".btn_fh").click(function () {
        window.location.href=return_url;
    });

    /**点击分钟*/
    $("#minutes").on("blur",function () {
        if(!/^([0-9]|[1-5][0-9])$/.test($(this).val())){
            alert("请输入0到59的整数分钟");
            $("#minutes").val("");
        }
    });
    /**点击秒*/
    $("#seconds").on("blur",function () {
        if(!/^([0-9]|[1-5][0-9])$/.test($(this).val())){
            alert("请输入0到59的整数秒");
            $("#seconds").val("");
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

/** 弹出框b的ajax */
function alert_B_ajax() {
    $.ajax({
        type: "post",
        url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
        dataType: "json",
        success: function (data) {
            if (data.status == 0) {
                selectBoxAdapter(data.data.data);
            } else {
                alert("获取信息失败！！");
            }
        },
        error: function () {
            alert("获取信息失败！！");
        }
    });
}
/**
 * 弹出框table数据
 * */
function selectBoxAdapter(data) {
    //$_categoresCode = data.categoresCode;
    //清空table
    $("#table_data tr:not(:first)").remove();
    var result = "";
    for (var i = 0; i < data.length; i++) {
        var code = getValue(data[i].code);
        var name = getValue(data[i].name);
        var createUserName = getValue(data[i].createUserName);
        var createTime = data[i].createTime.split(" ")[0];
        var id = data[i].id;
        var categoresCode = data[i].categoresCode;
        result += "<tr data-value='" + id + "' data-code='" + categoresCode + "'>"
            + "<td><input type='radio' name='check'></td>"
            + "<td>" + code + "</td>"
            + "<td>" + name + "</td>"
            + "<td>" + createUserName + "</td>"
            + "<td>" + createTime + "</td>" +
            "</tr>"
    }
    $("#table_data").append(result);
}

/**
 * 获取data值
 * @param val
 * @returns {boolean}
 */
function getValue(val) {
    return (val == undefined) ? '-' : val;
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


/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){

}

/** 保存和提交时，判断全选和反选是不是选中 */
function saveJudge(){

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


