/**
 * Created by Administrator on 2016/11/3 0003.
 */

var id = $.getUrlParam("id");

var itemid = $.getUrlParam("itemId");

var recycleState = $.getUrlParam("state");

$(function () {
    // /**
    //  * 解析URL
    //  *@param {string} url 完整的URL地址
    //  *@returns {object} 自定义的对象
    //  */
    // function parseURL(url) {
    //     var a =  document.createElement('a');
    //     a.href = url;
    //     return {
    //         source: url,
    //         protocol: a.protocol.replace(':',''),
    //         host: a.hostname,
    //         port: a.port,
    //         query: a.search,
    //         params: (function(){
    //             var ret = {},
    //                 seg = a.search.replace(/^\?/,'').split('&'),
    //                 len = seg.length, i = 0, s;
    //             for (;i<len;i++) {
    //                 if (!seg[i]) { continue; }
    //                 s = seg[i].split('=');
    //                 ret[s[0]] = s[1];
    //             }
    //             return ret;
    //         })(),
    //         file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
    //         hash: a.hash.replace('#',''),
    //         path: a.pathname.replace(/^([^\/])/,'/$1'),
    //         relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
    //         segments: a.pathname.replace(/^\//,'').split('/')
    //     };
    // }
    // var myURL = parseURL(document.location.href);
    // var myId=myURL.params.id;
    // var recycleState = myURL.params.state;
    initDownloadBtn(id);
    /** 查看详情 */
    yulanAjax(id);
    function yulanAjax(id) {
        $.ajax({
            type:"post",
            url:getBasePath()+"resourceInfoRest/getResourceInfo2",
            dataType:"json",
            data:{
                "id":id,
                "state" : recycleState
            },
            success:function (data) {
                if(data.status==0){
                    yulanAjaxAdapter(data.data.data);
                }else{
                    alert("获取信息失败！！");
                }
            },
            error:function () {
                alert("获取信息失败！！");
            }
        })
    }
    function yulanAjaxAdapter(data) {

        var changeState = data.changeState;

        var filePath = data.filePath;
        var suffix = data.suffix;

        if(filePath == null) filePath = suffix;

        if(suffix != null) suffix = suffix.substring(suffix.lastIndexOf(".") + 1);

        checkState(changeState, filePath, suffix);

        //审核引入的页面
        includeExamine(data.id, data.resourceType);
        

        // showPreview(filePath);

        /*标题上的资源名称*/
        $("#resource_name").val(data.resourceName);

        /*ID号*/
        $(".infoList.pd10 li").eq(2).children().last().html(id);
        /*上传者*/
        $(".infoList.pd10 li").eq(0).children().last().html(data.createUserName);
        /*上传时间*/
        $(".infoList.pd10 li").eq(1).children().last().html(data.createDateTime);
        /*所属学科*/
        $(".subject").val(data.subject);
        /*资源类型*/
        $('.resourceType').val(getResourceType(data.resourceType));
        /*资源简介*/
        $('.resourceDes').val(data.resourceDes);

        /*资源属性*/
        showAll(data.categoresCode);

    }

    /** 返回 */
    $(".bg_green").click(function () {
        window.location.href="resource.html?itemId="+itemid;
    });

    btnFhUrl();     //如果是审批查看，则修改返回按钮页面地址
});

/** 资源属性 */
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
                $.each(rtnData.data, function (i, v) {
                    $("#show" + (i + 1)).val(v.name).attr("title",v.name);
                });
            }
        }
    });
}

/**
 * 设置返回按钮地址
 */
function btnFhUrl() {
    var fromPage=$.getUrlParam("formpage");
    if(fromPage == 'app') {     //如果是审批页面
        /**返回*/
        //$(".bg_green").click(function () {
        //    window.parent.location.href="../vetting/resourceVetting.html";
        //});
        $(".bg_green").hide();
    }
}

/** 文件判断 */
function getResourceType(state){
    var resourceType = "";
    switch (state) {
        case "ORI":
            resourceType ="原始文件";
            break;
        case "PRO":
            resourceType = "工程文件";
            break;
        case "END":
            resourceType ="成品文件";
            break;
    }
    return resourceType;
}