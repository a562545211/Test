/**
 * Created by jichao on 2016/10/27.
 * 分页
 */

function Pagination(_url, _pageId, _callBack){

    var url = _url;
    var callBack = _callBack;
    var pageId = _pageId;
    var pageSize = 10;
    var groupPage = 5;
    var params;
    var sessionUserId = "";//定义当前登录人的userId，后台返回
    //返回页数
    var returnParams = {};


    var returnObj = {
        searchList : function (pageNo){
            searchList(pageNo, params);
        },
        search : function(_params, _page){
            search(_params, _page);
        },
        getsessionUserId : function(){
            return sessionUserId;
        },
        returnParams : function(){
            return returnParams;
        }
    }

    function searchList(pageNo, params) {
        params["pageNo"] = pageNo;
        params["pageSize"] = pageSize;
        $.ajax({
            type : "post",
            url : url,
            dataType : "json",
            data : params,
            success:function(data) {
                //console.log(data);
                if(data.status == 0){
                    //console.log(data.data.data);
                    //console.log(data.data.data.currentPageNo);
                    returnParams["currentPageNo"] = data.data.data.currentPageNo;
                    returnParams["pageSize"] = pageSize;
                    sessionUserId = data.data.userId;
                    fillData(data.data.data);//填充数据
                }else{
                    alert(data.message);
                }
            },
            error:function(){
                // alert("出错了");
            }
        });
    }

    function search(_params, _page){
        params = _params;
        var toPage = $("#toPage").val();//.replace(/\s/g, "")
        if(toPage == null || toPage == "") {
            toPage = 1;
        }else{
            toPage = toPage.replace(/\s/g, "");
        }
        if(/^-?\d+$/.test(toPage)){
            var totalPage = $("#totalPage").html();
            if(parseInt(toPage) < 1) {
                toPage = 1;
            }
            if(parseInt(toPage) > parseInt(totalPage) && parseInt(totalPage) > 0){
                toPage = parseInt(totalPage);
            }
            searchList(toPage, params);
        }else{
            $("#toPage").val("");
        }
    }

    function fillData(data) {
        callBack.call(this, data.result);
        fillPageData(data.hasPreviousPage, data.currentPageNo, data.totalPageCount, data.hasNextPage);
    }

    function fillPageData(hasPreviousPage, currentPageNo, totalPageCount, hasNextPage){
        $("#" + pageId).empty();
        var current = parseInt((currentPageNo - 1) / groupPage);
        var result = "<div class=\"pageLft\">";
        //有上一页
        if(hasPreviousPage){
            result += "<a href=\"javascript:void(0);\" onclick=\"javascript:pagination.searchList(" + (currentPageNo - 1) + ");\" class=\"prev\"></a>";
        }
        //前面的“...”
        if(Math.ceil(currentPageNo / groupPage) > 1){
            result += "<span>...</span>";
        }
        //中间的页数
        if(totalPageCount > 0){
            for(var i = current * groupPage; i < (current + 1) * groupPage && i < totalPageCount; i++){
                result += "<a href=\"javascript:void(0);\" onclick=\"javascript:pagination.searchList(" + (i + 1)  + ");\"";
                if(currentPageNo == i + 1){
                    result += " style=\"background-color: #b2dbfb;\"";
                }
                result += ">" + (i + 1) + "</a>";
            }
        }
        //后面的“...”
        if(Math.ceil(currentPageNo / groupPage) < Math.ceil(totalPageCount / groupPage)){
            result += "<span>...</span>";
        }
        //有下一页
        if(hasNextPage){
            result += "<a href=\"javascript:void(0);\" onclick=\"javascript:pagination.searchList(" + (currentPageNo + 1)  + ");\" class=\"next\"></a>";
        }
        //闭合
        result += "</div>";
        //确定按钮等
        result += "<div class=\"pageRht\">共<span id=\"totalPage\">" + totalPageCount + "</span>页，到第 <input type=\"text\" id=\"toPage\" value=\"" + currentPageNo + "\">页 <button onclick=\"searchPage();\">确定</button></div>";
        //添加进页面
        $("#" + pageId).append(result);
    }
    return returnObj;
}
