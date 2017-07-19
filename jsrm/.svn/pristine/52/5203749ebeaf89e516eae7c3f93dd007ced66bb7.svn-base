/**
 * Created by John on 2016/10/27.
 */

var itemid = $.getUrlParam("itemId");

var return_url;

$(function () {

    return_url=getBasePath()+ "static/html/topic/topic.html?itemId="+itemid;

    var myURL = parseURL(document.location.href);
    var myId=myURL.params.id;
    
    /**查看详情*/
    checkTopicAjax(myId);
    function checkTopicAjax(id) {
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
        //审核引入的页面
        includeExamine(data.id, data.resourceType);
        /*资源编号*/
        $(".check_show").html(data.tResourceCode);
        // $(".check_show").attr("id","data");
        $(".check_show").attr("id",data.tResourceCodeId);
        /*资源名称*/
        $(".iptFl").val(data.resourceName);
        /*发版类型*/
        $("#selectbox0").attr("title",data.draftTypeValue).val(data.draftTypeValue);
        /*版次*/
        $(".ipt").val(data.edition);
        /*ISBN号*/
        $(".ISBN").val(data.iSBN);    //????????????????????????????————————ISBN
        /*责任编辑*/
        $(".chargeEditor").html(data.createUserName);
        // console.log(data.createUserName);
        /*资源属性*/
        showAll(data.categoresCode);
        /*资源一级类别*/
        $("#selectbox9").attr("title",data.resourceTypeOneLevelValue).val(data.resourceTypeOneLevelValue);
        /*资源二级类别*/
        if(data.resourceTypeTwoLevelValue != null && data.resourceTypeTwoLevelValue != "")
            $("#selectbox10").attr("title",data.resourceTypeTwoLevelValue).val(data.resourceTypeTwoLevelValue);
        /*资源格式*/
        $("#selectbox11").attr("title",data.resourceFormatValue).val(data.resourceFormatValue);
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
        // $(".copyright").val(data.copyright);
        if(data.copyright=="forever"){
            $(".copyright").val("永久");
        }else if(data.copyright=="none"){
            $(".copyright").val("无");
        }else{
            $(".copyright").val("限期");
        }
        /*年份*/
        $(".yearMonth").val(data.yearMonth);
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
        //增加知识点
        if(data.knowledgeCode != null && data.knowledgeCode != ""){
            showKnowledge(data.knowledgeCode);
        }
    }
    
    function showKnowledge(ids){
        $.ajax({
            url: getBasePath() + "/knowledge/getdgeKnowlesByIds",
            type: "post",
            traditional: true,
            data: {ids: ids},
            dataType: "json",
            success: function (rtnData) {
                if (rtnData.status == "0") {
                    var _length = rtnData.data.length;
                    var _str = "";
                    $.each(rtnData.data, function (i, v) {
                        $.each(v, function (index, item) {
                            var _name = item.name;
                            _str += _name;
                            if(index != v.length - 1) {
                                _str += "&nbsp;->&nbsp;";
                            }
                        });
                        _str += "<br/>"
                    });
                    $("#addKnowledage").html(_str);
                }
            }
        });
    }

    function showAll(data){
        $.ajax({
            url: getBasePath() + "/category/getCategoriesByIds",
            type: "post",
            traditional: true,
            data: {"ids": data},
            async: "false",
            dataType: "json",
            success: function (rtnData) {
                if (rtnData.status == "0") {
                    var _str='';
                    var data= rtnData.data;
                    // $.each(rtnData.data, function (i, v) {
                    //     $("#selectbox"+(i+1)).attr("title",v.name).val(v.name);
                    // });
                    for(var i=0;i<data.length;i++){
                        if(i<4){
                            $("#selectbox"+(i+1)).attr("title",data[i].name).val(data[i].name);
                        }else{
                            var _name = data[i].name;
                            _str += _name;
                            if(i != data.length - 1) {
                                _str += "&nbsp;->&nbsp;";
                            }
                        }
                    }
                    $("#selectbox5678").html(_str);
                }
            }
        });
    }

    /**返回*/
    $(".btn-grey").click(function () {
        window.location.href= return_url ;
    });

    btnFhUrl();     //如果是审批查看，则修改返回按钮页面地址
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
 * 设置返回按钮地址
 */
function btnFhUrl() {
    var myURL = parseURL(document.location.href);
    var fromPage=myURL.params.formpage;

    if(fromPage == 'app') {     //如果是审批页面
        /**返回*/
        //$(".btn-grey").click(function () {
        //    window.parent.location.href="../vetting/topicVetting.html";
        //});
        $(".btn-grey").hide();
    }
}

