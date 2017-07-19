/**
 * Created by John on 2016/10/28.
 */

var itemid = $.getUrlParam("itemId");    //获取itemId

var return_url;                          //返回页面的url

var approverId="";

var approver="";

$(function () {

    /** 刚进入页面知识点显示灰色*/
    clearKnowledge();

    return_url=getBasePath()+ "static/html/topic/topic.html?itemId="+itemid;
    
    /** 获取当前登录人信息 */
    getAudit();

    findSysDict("selectboxBox9", "resourceType", "selectbox10");
    findSysDict("selectbox0", "openType");
    findSysDict("selectbox11", "resourceFormat");
    findSysDict("copyright", "copyright");

    /** 进入页面时，判断全选和反选是不是选中 */
    loginJudge();

    /** 保存的数据 */
    function saveData(type) {
        var result={};//最后保存的数据
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
        /*资源类型*/
        result.resourceType="DRA";
        /*选题编号*/
        result.tResourceCode=$(".check_show").html();
        result.tResourceCodeId=$(".check_show").attr("id");
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
        //result.createUserName=$(".chargeEditor").html();
        /*资源属性*/
        result.categoresCode=categoresCode;
        /*学段*/
        result.phaseId=$("#selectbox1 li.selectbox_selected").data("id");
        result.phase=$("#selectbox1 li.selectbox_selected").html();
        /*学科*/
        result.subjectId=$("#selectbox2 li.selectbox_selected").data("id");
        result.subject=$("#selectbox2 li.selectbox_selected").html();
        /*资源一级类别*/
        result.resourceTypeOneLevelId=$("#selectboxBox9 li.selectbox_selected").data("value");
        result.resourceTypeOneLevelValue=$("#selectboxBox9 li.selectbox_selected").html();
        /*资源二级类别*/
        result.resourceTypeTwoLevelId=$("#selectbox10 li.selectbox_selected").data("value");
        result.resourceTypeTwoLevelValue=$("#selectbox10 li.selectbox_selected").html();
        /*资源格式*/
        result.resourceFormatId=$("#selectbox11 li.selectbox_selected").data("value");
        result.resourceFormatValue=$("#selectbox11 li.selectbox_selected").html();
        /*资源描述*/
        result.resourceDes=$(".btm10 dd textarea").val();
        /*资源制作者*/
        result.resourceMaker=$(".resourceMaker").val();
        /*作者简介*/
        result.makerIntro=$(".aboutAuthor").val();
        //知识点
        var _knowledgeCode = "";
        var _knowledgesDom = $("div[id^=selectboxKnowledge]").find('ul .selectbox_selected');
        $.each(_knowledgesDom, function (i, v) {
            if(i != 0){
                var div_id_num = $(this).closest(".selectbox").attr('id').split("selectboxKnowledge")[1];
                if(div_id_num % 4 == 1){
                    _knowledgeCode += ";";
                }else{
                    _knowledgeCode += ",";
                }
            }
            _knowledgeCode += $(this).attr("data-id");
        });
        result.knowledgeCode = _knowledgeCode;
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
        }
        result.approver = approver;
        result.approverId = approverId;
        result.state = type;
        return result;
    }

    /** 判断必填项有没有填写 */
    function judgeAJAX(type) {

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
        if($("#selectboxKnowledge1 li.selectbox_selected").data("id")==""||$("#selectboxKnowledge1 li.selectbox_selected").html()==undefined){
            alert("请选择知识点");
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
        /** 如果选择的是限期的 */
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

        if(type != 1){
            if($("#appriveDesc").val() == ""){
                alert("请填写初审意见");
                return;
            }
        }

        $.ajax({
            type:"post",
            url:getBasePath()+"selectTopic/saveSelectTopic",
            dataType:"json",
            data:saveData(type),
            success:function (data) {
                if(type == 1){    //只保存
                    if(data.status == 0){
                        alert("保存信息成功！！");
                        window.location.href = return_url ;
                    }
                }else {           //发稿
                    if (data.status == 0) {
                        startProcess(data.data.data.id);
                    }
                }
            },
            error:function () {
                alert("保存信息失败！！")
            }
        })
    }

    /** 保存 */
    $(".btn_bc").click(function () {
        judgeAJAX(1);
        saveJudge()
    });

    /** 发稿 */
    $(".btn-fg").click(function () {
        judgeAJAX(2);
        saveJudge()
    });

    /** 返回 */
    $(".btn-grey").click(function () {
    	var url= return_url.substring(0, return_url.indexOf("?"));
    	url+="?itemId=2";
        window.location.href= url ;
    });

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

/** 获取当前登录人信息 */
function getAudit() {
    //获取当前时间
    var date = new Date();
    var year=date.getFullYear();
    var month=Number(date.getMonth())+1;
    var day=date.getDate();
    var time=year+"-"+month+"-"+day;
    $.ajax({
        type:"post",
        url:getBasePath()+"userRest/getUserInfo",
        dataType:"json",
        success:function (data) {
            if(data.status==0){
                //alert("id：" + data.data.data.id + "-----name:" + data.data.data.username);
                approverId=data.data.data.id;
                approver=data.data.data.username;
                $(".chargeEditor").html(data.data.data.username);
                $("#createUserName").html(data.data.data.username);
                $("#createDateTime").html(time);
            }else{
                alert("获取当前登录人信息,失败！！");
                window.location.href= return_url ;
            }
        },
        error:function () {
            alert("获取登录人信息，出错了");
            window.location.href = return_url ;
        }
    });
}

/** 发稿发起流程 */
function startProcess(id){
    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/startWorkFlow",
        dataTpe:"json",
        data:{
            id:id,
            resourceType:"DRA",
            appriveDesc : $("#appriveDesc").val()
        },
        success:function (data) {
            var data=JSON.parse(data);
            if(data.status=="0"){
                alert("发稿提交成功")
            }else{
                alert("发稿提交失败，请在编辑页重新提交");
            }
            window.location.href= return_url ;
        },
        error:function () {
            alert("发稿提交，出错了");
            window.location.href= return_url ;
        }
    })
}

/** 保存和发稿时，判断全选和反选是不是选中 */
function saveJudge(){
    /*资源名称*/
    if($(".item-check").eq(0).prop("checked")){
        localStorage.setItem("fg-resourceName",$(".iptFl").val());
        // localStorage.setItem("fg-tResourceCode",$(".check_show").html());   //选题编号
        // localStorage.setItem("fg-tResourceCodeId",$(".check_show").attr("id")); //选题编号Id
    }else{
        localStorage.removeItem("fg-resourceName");
        // localStorage.removeItem("fg-tResourceCode");
        // localStorage.removeItem("fg-tResourceCodeId");
    }
    /*发稿类型*/
    if($(".item-check").eq(1).prop("checked")){
        localStorage.setItem("fg-draftTypeId",$("#selectbox0 li.selectbox_selected").data("value"));//发版类型
        localStorage.setItem("fg-edition",$(".ipt").val());   //版次
        localStorage.setItem("fg-iSBN",$(".ISBN").val()); //ISBN
    }else{
        localStorage.removeItem("fg-draftTypeId");
        localStorage.removeItem("fg-edition");
        localStorage.removeItem("fg-iSBN");
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
        localStorage.setItem("fg-categoresCode",categoresCode);
        localStorage.setItem("fg-phaseId",phaseId);
        localStorage.setItem("fg-subjectId",subjectId);
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
        localStorage.setItem("fg-knowledgeCode",_knowledgeCode);
    }else{
        localStorage.removeItem("fg-categoresCode");
        localStorage.removeItem("fg-phaseId");
        localStorage.removeItem("fg-subjectId");
        localStorage.removeItem("fg-knowledgeCode");
    }
    /*资源类别和类别二级*/
    if($(".item-check").eq(3).prop("checked")){
        localStorage.setItem("fg-data-9",$("#selectboxBox9 li.selectbox_selected").data("value"));   //资源类别
        localStorage.setItem("fg-data-10",$("#selectbox10 li.selectbox_selected").data("value")); //类别二级
    }else{
        localStorage.removeItem("fg-data-9");
        localStorage.removeItem("fg-data-10");
    }
    /*资源格式*/
    if($(".item-check").eq(4).prop("checked")){
        localStorage.setItem("fg-data-11",$("#selectbox11 li.selectbox_selected").data("value")); //资源格式
    }else{
        localStorage.removeItem("fg-data-11");
    }
    /*资源描述*/
    if($(".item-check").eq(5).prop("checked")){
        localStorage.setItem("fg-resourceDes",$(".btm10 dd textarea").val()); //资源描述
    }else{
        localStorage.removeItem ("fg-resourceDes");
    }
    /*资源制作者*/
    if($(".item-check").eq(6).prop("checked")){
        localStorage.setItem("fg-resourceMaker",$(".resourceMaker").val()); //资源制作者
    }else{
        localStorage.removeItem ("fg-resourceMaker");
    }
    /*作者简介*/
    if($(".item-check").eq(7).prop("checked")){
        localStorage.setItem("fg-makerIntro",$(".aboutAuthor").val()); //作者简介
    }else{
        localStorage.removeItem ("fg-makerIntro");
    }
    /*使用对象*/
    if($(".item-check").eq(8).prop("checked")){
        if ($("#teacher").prop("checked")) {
            localStorage.setItem("fg-teacher","teacher"); //使用对象，老师
        }
        if ($("#student").prop("checked")) {
            localStorage.setItem("fg-student","student"); //使用对象，学生
        }
    }else{
        localStorage.removeItem ("fg-teacher");
        localStorage.removeItem ("fg-student");
    }
    /*资源来源*/
    if($(".item-check").eq(9).prop("checked")){
        localStorage.setItem("fg-resourceSources",$(".resourceSources").val()); //资源来源
    }else{
        localStorage.removeItem("fg-resourceSources");
    }
    /*版权*/
    if($(".item-check").eq(10).prop("checked")){
        localStorage.setItem("fg-copyright",$("#copyright li.selectbox_selected").data("value"));   //版权
        localStorage.setItem("fg-yearMonth",$(".yearMonth").val()); //年份
    }else{
        localStorage.removeItem("fg-copyright");
        localStorage.removeItem("fg-yearMonth");
    }
    /*独家资源*/
    if($(".item-check").eq(11).prop("checked")){
        if($("#yes").prop("checked")){
            localStorage.setItem("fg-isAloneRes","是"); //独家资源
        }else if($("#no").prop("checked")){
            localStorage.setItem("fg-isAloneRes","否"); //独家资源
        }
    }else{
        localStorage.removeItem("fg-isAloneRes");
    }
    /*原创资源*/
    if($(".item-check").eq(12).prop("checked")){
        if($("#yes01").prop("checked")){
            localStorage.setItem("fg-isOriginal","是"); //是否原创
        }else if($("#no01").prop("checked")){
            localStorage.setItem("fg-isOriginal","否"); //是否原创
        }
    }else{
        localStorage.removeItem("fg-isOriginal");
    }
    /*文种*/
    if($(".item-check").eq(13).prop("checked")){
        if($("#china").prop("checked")){
            localStorage.setItem("fg-isChinese","是"); //是否中文
        }else if($("#enish").prop("checked")){
            localStorage.setItem("fg-isChinese","否"); //是否中文
        }
    }else{
        localStorage.removeItem("fg-isChinese");
    }
    /*资源等级*/
    if($(".item-check").eq(14).prop("checked")){
        if($("#nice").prop("checked")){
            localStorage.setItem("fg-resourceLevel","精品"); //资源等级
        }else if($("#common").prop("checked")){
            localStorage.setItem("fg-resourceLevel","普通"); //资源等级
        }
    }else{
        localStorage.removeItem("fg-resourceLevel");
    }
    /*价格*/
    if($(".item-check").eq(15).prop("checked")){
        if($("#free").prop("checked")){
            localStorage.setItem("fg-isFree","是"); //是否免费
            // localStorage.setItem("fg-cost",""); //是否免费
        }else if($("#charge").prop("checked")){
            localStorage.setItem("fg-isFree","否"); //是否免费
            localStorage.setItem("fg-cost",$(".dot").val());
        }
    }else{
        localStorage.removeItem("fg-isFree");
        localStorage.removeItem("fg-cost");
    }
}

/** 进入页面时，判断全选和反选是不是选中 */
function loginJudge(){
    var fg_resourceName = localStorage.getItem("fg-resourceName");     //资源名称
    var fg_draftTypeId = localStorage.getItem("fg-draftTypeId");   //发稿类型
    var fg_edition = localStorage.getItem("fg-edition");   //版次
    var fg_iSBN = localStorage.getItem("fg-iSBN");   //ISBN
    var fg_categoresCode = localStorage.getItem("fg-categoresCode");   //资源属性
    var fg_phaseId = localStorage.getItem("fg-phaseId");               //学段Id
    var fg_subjectId = localStorage.getItem("fg-subjectId");           //学科Id
    var fg_knowledgeCode = localStorage.getItem("fg-knowledgeCode");   //知识点
    var fg_data_9 = localStorage.getItem("fg-data-9");//资源类别
    var fg_data_10 = localStorage.getItem("fg-data-10");//类别二级
    var fg_data_11 = localStorage.getItem("fg-data-11");//资源格式
    var fg_resourceDes = localStorage.getItem("fg-resourceDes");//资源描述
    var fg_resourceMaker = localStorage.getItem("fg-resourceMaker");//资源制造者
    var fg_makerIntro = localStorage.getItem("fg-makerIntro");//作者简介
    var fg_teacher = localStorage.getItem("fg-teacher");//使用对象 ，老师
    var fg_student = localStorage.getItem("fg-student");//使用对象，学生
    var fg_resourceSources = localStorage.getItem("fg-resourceSources");//资源来源
    var fg_copyright = localStorage.getItem("fg-copyright");//版权
    var fg_yearMonth = localStorage.getItem("fg-yearMonth");//年月
    var fg_sAloneRes = localStorage.getItem("fg-isAloneRes");//独家资源
    var fg_isOriginal = localStorage.getItem("fg-isOriginal");//原创资源
    var fg_isChinese = localStorage.getItem("fg-isChinese");//文种
    var fg_resourceLevel = localStorage.getItem("fg-resourceLevel");//资源等级
    var fg_isFree = localStorage.getItem("fg-isFree");//价格
    var fg_cost = localStorage.getItem("fg-cost");//点
    /*资源名称*/
    if(fg_resourceName != null){
        $(".iptFl").val(fg_resourceName);
    }
    /*发稿类型*/
    if(fg_draftTypeId != null){
        $("#selectbox0").selectBox("selectForData",fg_draftTypeId,true);
    }
    /*版次*/
    if(fg_edition != null ){
        $(".ipt").val(fg_edition);
    }
    /*ISBN*/
    if(fg_iSBN != null ){
        $(".ISBN").val(fg_iSBN);
    }
    /*资源属性*/
    if(fg_categoresCode != null){
        showAllCategories(fg_categoresCode,"async");
        // showAllCategories(fg_categoresCode);
    }
    /*知识点*/
    if(fg_knowledgeCode != null ){
        var _knowLength= fg_knowledgeCode.split(";").length-1;
        initKnowledgesBy2(_knowLength,fg_phaseId,fg_subjectId);
        showAllKnowledges(fg_knowledgeCode);
    }
    /*资源类别*/
    if(fg_data_9 != null ){
        $("#selectboxBox9").selectBox("selectForData",fg_data_9,true);
    }
    /*类别二级*/
    if(fg_data_10 != null ){
        $("#selectbox10").selectBox("selectForData",fg_data_10,true);
    }
    /*资源格式*/
    if(fg_data_11 != null ){
        $("#selectbox11").selectBox("selectForData", fg_data_11,true);
    }
    /*资源描述*/
    if(fg_resourceDes != null ){
        $(".btm10 dd textarea").val(fg_resourceDes);
    }
    /*资源制造者*/
    if(fg_resourceMaker != null ){
        $(".resourceMaker").val(fg_resourceMaker);
    }
    /*作者简介*/
    if(fg_makerIntro != null ){
        $(".aboutAuthor").val(fg_makerIntro);
    }
    /*使用对象，老师*/
    if(fg_teacher == 'teacher'){
        $("#teacher").prop("checked","checked");
    }
    /*使用对象，学生*/
    if(fg_student == 'student'){
        $("#student").prop("checked","checked");
    }
    /*资源来源*/
    if(fg_resourceSources != null ){
        $(".resourceSources").val(fg_resourceSources);
    }
    /*版权*/
    if(fg_copyright != null ){
        $("#copyright").selectBox("selectForData", fg_copyright,true);
    }
    /*年月*/
    if(fg_yearMonth != null ){
        $(".yearMonth").val(fg_yearMonth);
    }else{
        $(".yearMonth").attr("disabled", "disabled");
    }
    /*独家资源*/
    if(fg_sAloneRes != null ){
        if(fg_sAloneRes=="是"){
            $("#yes").prop("checked","checked");
        }else if(fg_sAloneRes=="否"){
            $("#no").prop("checked","checked");
        }
    }
    /*原创资源*/
    if(fg_isOriginal != null ){
        if(fg_isOriginal=="是"){
            $("#yes01").prop("checked","checked");
        }else if(fg_isOriginal=="否"){
            $("#no01").prop("checked","checked");
        }
    }
    /*文种*/
    if(fg_isChinese != null){
        if(fg_isChinese=="是"){
            $("#china").prop("checked","checked");
        }else if(fg_isChinese=="否"){
            $("#enish").prop("checked","checked");
        }
    }
    /*资源等级*/
    if(fg_resourceLevel != null ){
        if(fg_resourceLevel=="精品"){
            $("#nice").prop("checked","checked");
        }else if(fg_resourceLevel=="普通"){
            $("#common").prop("checked","checked");
        }
    }
    /*价格*/
    if(fg_isFree != null ){
        if(fg_isFree=="是"){
            $("#free").prop("checked","checked");
        }else if(fg_isFree=="否"){
            $("#charge").prop("checked","checked");
            $(".dot").val(localStorage.getItem("fg-cost"));
        }
    }

}