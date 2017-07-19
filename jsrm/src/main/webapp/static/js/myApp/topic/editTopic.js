/**
 * Created by John on 2016/10/27.
 */

var itemid = $.getUrlParam("itemId");   //获取itemId

var return_state;                       //状态，是保存还是打回

var return_url;                         //返回页面的url

var createTime = null;

$(function () {

    return_url=getBasePath()+ "static/html/topic/topic.html?itemId="+itemid;

    findSysDict("selectboxBox9", "resourceType", "selectbox10");
    findSysDict("selectbox0", "openType");
    findSysDict("selectbox11", "resourceFormat");
    findSysDict("copyright", "copyright");

    /**
     * 解析URL
     *@param {string} url 完整的URL地址
     *@returns {object} 自定义的对象
     */
    var myURL = parseURL(document.location.href);
    var myId=myURL.params.id;          //id
    return_state=myURL.params.state;    //待提交，或者已退回状态

    /** 查看详情 */
    editTopicAjax(myId);
    function editTopicAjax(id) {
        $.ajax({
            type:"post",
            url:getBasePath()+"selectTopic/querySelectTopic",
            dataType:"json",
            data:{
                "id":id
            },
            success:function (data) {
                if(data.status==0){
                    checkTopicAjaxAdapter(data.data.data);
                }else{
                    alert("获取信息失败！！");
                }

            },
            error:function () {
                alert("获取信息失败！！");
            }
        })
    }
    function checkTopicAjaxAdapter(data) {
        createTime = data.createDateTime;
        //审核引入的页面
        includeExamine(data.id, data.resourceType);
        /*资源编号*/
        $(".check_show").html(data.tResourceCode);
        $(".check_show").attr("id",data.tResourceCodeId);
        $(".check_show").attr("data-resourceFileCode",data.resourceFileCode);
        /*资源名称*/
        $(".iptFl").val(data.resourceName);
        /*发版类型*/
        $("#selectbox0").selectBox("selectForData", data.draftTypeId,false);
        /*版次*/
        $(".ipt").val(data.edition);
        /*ISBN号*/
        $(".ISBN").val(data.iSBN);          //????????????????????????????————————ISBN
        // $(".ISBN").val(data.ISBN);
        /*责任编辑*/
        $(".chargeEditor").html(data.createUserName);
        /*资源属性*/
        showAllCategories(data.categoresCode);
        /*知识点*/
        showAllKnowledges(data.knowledgeCode);
        /*资源一级类别*/
        $("#selectboxBox9").selectBox("selectForData", data.resourceTypeOneLevelId,true);
        /*资源二级类别*/
        $("#selectbox10").selectBox("selectForData", data.resourceTypeTwoLevelId,false);
        /*资源格式*/
        $("#selectbox11").selectBox("selectForData", data.resourceFormatId,false);
        /*资源描述*/
        $(".btm10 dd textarea").html(data.resourceDes);
        /*资源制作者*/
        $(".resourceMaker").val(data.resourceMaker);
        /*作者简介*/
        $(".aboutAuthor").html(data.makerIntro);
        /*使用对象*/
        if(data.useTarget=="teacher"){
            $("#teacher").prop("checked","checked");
        }else if(data.useTarget=="student"){
            $("#student").prop("checked","checked");
        }else if(data.useTarget=="teacher and student"){
            $("#teacher").prop("checked","checked");
            $("#student").prop("checked","checked");
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
        if(data.isAloneRes=="0"){
            $("#yes").prop("checked","checked");
        }else if(data.isAloneRes=="1"){
            $("#no").prop("checked","checked");
        }
        /*是否原创*/
        if(data.isOriginal=="0"){
            $("#yes01").prop("checked","checked");
        }else if(data.isOriginal=="1"){
            $("#no01").prop("checked","checked");
        }
        /*是否中文*/
        if(data.isChinese=="0"){
            $("#china").prop("checked","checked");
        }else if(data.isChinese=="1"){
            $("#enish").prop("checked","checked");
        }
        /*资源等级*/
        if(data.resourceLevel=="0"){
            $("#nice").prop("checked","checked");
        }else if(data.resourceLevel=="1"){
            $("#common").prop("checked","checked");
        }
        /*是否免费*/
        if(data.isFree=="0"){
            $("#free").prop("checked","checked");
        }else if(data.isFree=="1"){
            $("#charge").prop("checked","checked");
            $(".dot").val(data.cost);
        }
        /*初审日期*/
        //获取当前时间
        var date = new Date();
        var year=date.getFullYear();
        var month=Number(date.getMonth())+1;
        var day=date.getDate();
        var time=year+"-"+month+"-"+day;
        $("#createDateTime").html(time);
        /*初审人*/
        $("#createUserName").html(data.createUserName);
        /*状态*/
        return_state=data.state;
        //拿到审核人
    }

    /** 重置 */
    $(".btn_cz").click(function () {
        /*选题编号*/
        $(".check_show").html("");
        /*资源名称*/
        $(".iptFl").val("");
        /*发版类型*/
        $("#selectbox0").selectBox("setCaption","未选择","-1");
        /*版次*/
        $(".ipt").val("");
        /*ISBN号*/
        $(".ISBN").val("");
        /*责任编辑*/
        // $(".chargeEditor").html("");
        /*资源属性*/
        $("#selectbox1").selectBox("setCaption","学科","-1");
        $("#selectbox2").selectBox("setCaption","学段","-1");
        $("#selectbox3").selectBox("setCaption","版本","-1");
        $("#selectbox4").selectBox("setCaption","册次","-1");
        $("#selectbox5").selectBox("setCaption","章","-1");
        $("#selectbox6").selectBox("setCaption","节","-1");
        $("#selectbox7").selectBox("setCaption","目","-1");
        $("#selectbox8").selectBox("setCaption","课时","-1");
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
        $("#selectboxBox9").selectBox("setCaption","未选择","-1");
        /*资源二级类别*/
        $("#selectbox10").selectBox("setCaption","未选择","-1");
        /*资源格式*/
        $("#selectbox11").selectBox("setCaption","未选择","-1");
        /*资源描述*/
        $(".btm10 dd textarea").val("");
        /*资源制作者*/
        $(".resourceMaker").val("");
        /*作者简介*/
        $(".aboutAuthor").val("");
        /*使用对象*/
        if($("#teacher").prop("checked")){
            $("#teacher").removeProp("checked");
        }
        if($("#student").prop("checked")){
            $("#student").removeProp("checked");
        }
        /*资源来源*/
        $(".resourceSources").val("");
        /*版权*/
        $("#copyright").selectBox("setCaption","未选择","-1");
        /*年份*/
        $(".yearMonth").val("");
        /*是否是独家资源*/
        if($("#yes").prop("checked")){
            $("#yes").removeProp("checked");
        }
        if($("#no").prop("checked")){
            $("#no").removeProp("checked");
        }
        /*是否原创*/
        if($("#yes01").prop("checked")){
            $("#yes01").removeProp("checked");
        }
        if($("#no01").prop("checked")){
            $("#no01").removeProp("checked");
        }
        /*是否中文*/
        if($("#china").prop("checked")){
            $("#china").removeProp("checked");
        }
        if($("#enish").prop("checked")){
            $("#enish").removeProp("checked");
        }
        /*资源等级*/
        if($("#nice").prop("checked")){
            $("#nice").removeProp("checked");
        }
        if($("#common").prop("checked")){
            $("#common").removeProp("checked");
        }
        /*是否免费*/
        if($("#free").prop("checked")){
            $("#free").removeProp("checked");
            $(".dot").val("");
        }
        if($("#charge").prop("checked")){
            $("#charge").removeProp("checked");
            $(".dot").val("");
        }
    });
    
    /** 保存的数据 */
    function saveData(return_state,type) {
        var result={};//最后保存的数据
        result.createTime = createTime;
        /*状态*/
        result.state=return_state;
        /*id*/
        result.id=myId;
        /*选题编号*/
        result.tResourceCode=$(".check_show").html();
        result.tResourceCodeId=$(".check_show").attr("id");
        result.resourceFileCode=$(".check_show").attr("data-resourceFileCode");
        /*资源名称*/
        result.resourceName=$(".iptFl").val();
        /*发版类型*/
        result.draftTypeId=$("#selectbox0 li.selectbox_selected").data("value");
        result.draftTypeValue=$("#selectbox0 li.selectbox_selected").html();
        /*版次*/
        result.edition=$(".ipt").val();
        /*ISBN号*/
        result.ISBN=$(".ISBN").val();
        /*责任编辑*/
        result.createUserName=$(".chargeEditor").html();
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
        result.categoresCode=categoresCode;
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
        /*资源类别*/
        result.resourceTypeOneLevelId=$("#selectboxBox9 li.selectbox_selected").data("value");
        result.resourceTypeOneLevelValue=$("#selectboxBox9 li.selectbox_selected").html();
        /*类别二级*/
        result.resourceTypeTwoLevelId=$("#selectbox10 li.selectbox_selected").data("value");
        result.resourceTypeTwoLevelValue=$("#selectbox10 li.selectbox_selected").html();
        /*资源格式*/
        result.resourceFormatId=$("#selectbox11 li.selectbox_selected").data("value");
        result.resourceFormatValue=$("#selectbox11 li.selectbox_selected").html();
        /*资源描述*/
        // result.resourceDes=$(".btm10 dd textarea").html();
        result.resourceDes=$(".btm10 dd textarea").val();
        /*资源制作者*/
        result.resourceMaker=$(".resourceMaker").val();
        /*作者简介*/
        // result.makerIntro=$(".aboutAuthor").html();
        result.makerIntro=$(".aboutAuthor").val();
        /*使用对象*/
        if($("#teacher").prop("checked")&&$("#student").prop("checked")) {
            result.useTarget = "teacher and student";
        }else if($("#teacher").prop("checked")&&!$("#student").prop("checked")) {
            result.useTarget = "teacher";
        }else if($("#student").prop("checked")&&!$("#teacher").prop("checked")){
            result.useTarget = "student";
        }else if(!$("#student").prop("checked")&&!$("#teacher").prop("checked")){
            result.useTarget ="";
        }
        /*资源来源*/
        result.resourceSource=$(".resourceSources").val();
        /*版权*/
        result.copyright=$("#copyright li.selectbox_selected").data("value");
        /*年份*/
        result.yearMonth=$(".yearMonth").val();
        /*是否是独家资源*/
        if($("#yes").prop("checked")){
            result.isAloneRes="0";
        }else if($("#no").prop("checked")){
            result.isAloneRes="1";
        }else{
            result.isAloneRes="";
        }
        /*是否原创*/
        if($("#yes01").prop("checked")){
            result.isOriginal="0";
        }else if($("#no01").prop("checked")){
            result.isOriginal="1";
        }else{
            result.isOriginal="";
        }
        /*是否中文*/
        if($("#china").prop("checked")){
            result.isChinese="0";
        }else if($("#enish").prop("checked")){
            result.isChinese="1";
        }else{
            result.isChinese="";
        }
        /*资源等级*/
        if($("#nice").prop("checked")){
            result.resourceLevel="0";
        }else if($("#common").prop("checked")){
            result.resourceLevel="1";
        }else{
            result.resourceLevel="";
        }
        /*是否免费*/
        if($("#free").prop("checked")){
            result.isFree="0";
            result.cost="";
        }else if($("#charge").prop("checked")){
            result.isFree="1";
            result.cost=$(".dot").val();
        }else{
            result.isFree="";
            result.cost="";
        }

        if(type!=1){
            /*初审人初审意见*/
            result.appriveDesc=$("#appriveDesc").val();
            result.state = type;
        }
        return result;
    }

    /** 保存 */
    $(".btn_bc").click(function () {
        saveAJAX(return_state, 1);
    });

    /** 发稿 */
    $(".btn-fg").click(function () {
        saveAJAX(return_state, 2);
    });

    /** 返回 */
    $(".btn-grey").click(function () {
        window.location.href= return_url ;
    });
    
    /** 保存数据AJAX */
    function saveAJAX(type, upDateOrCommit){
        /**判断必填项有没有填写*/
        if($(".check_show").html() == ""){
            alert("请输入选题编号");
            return;
        }
        if($("#selectbox0 li.selectbox_selected").html()==undefined){
            alert("请选择发版类型");
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
        if($("#selectboxBox9 li.selectbox_selected").html()==undefined){
            alert("请选择资源类别");
            return;
        }
        if($("#selectbox11 li.selectbox_selected").html()==undefined){
            alert("请选择资源格式");
            return;
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
            alert("请选择中英文");
            return;
        }
        if(!($("#nice").prop("checked")||$("#common").prop("checked"))){
            alert("请选择资源等级");
            return;
        }
        if(!($("#free").prop("checked")||$("#charge").prop("checked"))){
            alert("请选择是否免费");
            return;
        }
        if($("#charge").prop("checked")){
            /** 收费被点击，看看费用有没有填写 */
            var re=/^[1-9][0-9]*$/;   //判断是不是正整数
            if(!$(".dot").val()) {
                alert("请输入金额！！");
                return;
            }else if(!(re.test($(".dot").val()))){
                alert("请输入正确的钱数（正整数）！！");
                return;
            }
        }
        if(upDateOrCommit != 1){
            if($("#appriveDesc").val() == ""){
                alert("请填写初审意见");
                return;
            }
        }

        $.ajax({
            type:"post",
            url:getBasePath()+"selectTopic/updateSelectTopic",
            dataType:"json",
            data:saveData(type,upDateOrCommit),
            success:function (data) {
                if(data.status == 0){
                    if(type == 1 && upDateOrCommit ==2){               //待提交
                        startProcess();
                    }else if(type==4 && upDateOrCommit ==2){           //退回
                        reStartProcess();
                    }else{
                        alert("保存数据成功！！");
                        window.location.href= return_url ;
                    }
                }else{
                    alert("保存数据失败！！");
                }
            },
            error:function () {
                alert("编辑数据失败！！")
            }
        })
    }

    /**发稿发起流程*/
    function startProcess(){
        $.ajax({
            type : "post",
            url : getBasePath() + "vettingRest/startWorkFlow",
            dataType : "json",
            data : {
                id : myId,
                resourceType:"DRA",
                appriveDesc : $("#appriveDesc").val()
            },
            success:function(data) {
                if(data.status  == "0"){
                    alert("提交成功");
                }else{
                    alert("提交失败，请在编辑页中重新提交");
                }
                window.location.href = return_url ;
            },
            error:function(){
                alert("待提交，出错了");
                window.location.href = return_url ;
            }
        });
    }

    /**发稿被打回提交流程*/
    function reStartProcess(){
        $.ajax({
            type : "post",
            url : getBasePath() + "vettingRest/submitTask",
            dataType : "json",
            data : {
                busiId : myId,
                busiType : "DRA",
                isPass : "pass",
                approveOpinion : $("#appriveDesc").val(),
                resourceFileCode:$(".check_show").attr("data-resourceFileCode")
            },
            success:function(data) {
                if(data.status  == "0"){
                    alert("提交成功");
                }else{
                    alert("提交失败，请在编辑页中重新提交");
                }
                window.location.href = return_url ;
            },
            error:function(){
                alert("已退回，出错了");
                window.location.href = return_url;
            }
        });
    }

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



/**
 * 解析URL
 *@param {string} url 完整的URL地址
 *@returns {object} 自定义的对象
 */
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

/**
 * 获取当前日期插件
 *
 * */
function CurentTime() {

    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}


/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){


}

/** 保存和发稿时，判断全选和反选是不是选中 */
function saveJudge(){
    
}