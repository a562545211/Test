/**
 * Created by Administrator on 2016/10/25 0025.
 */

var  return_url=getBasePath()+"static/html/login/login.html";

$(function () {

    /**点击按钮退出*/
    $(".frame_top_btn a").click(function () {
        $.ajax({
            type:"post",
            url:getBasePath()+"userRest/logout",
            dataType:"json",
            success: function (data) {
                logoutAdapter(data);
            },
            error: function () {
                alert("退出失败！");
            }
        })
    });
    function logoutAdapter(data) {
        if(data.status===0){
            window.location.href='login/login.html'
        }
    }

    /**获取当前登录人信息*/
    getAudit();
    /**获取列表*/
    getItem();
});

function getItem(){
    var itemList = $.getItemByRoleFirst({
        "path":'/'
    });
    $("#item").empty();
    
    var html = "";
    for(var i=0;i < itemList.length;i++){
        var itemName = escape(itemList[i].itemName);
        if(i==0){      //登录进来，个人中心是默认选中的  -----张建红，修改
            html+="<li class='active' ><a href='"+itemList[i].itemAction+"?itemId="+itemList[i].id+"&itemName="+itemName+"' target='right'><span class='"+itemList[i].itemImage+"'></span>"+itemList[i].itemName+"</a></li>";
        }else{
            html+="<li><a href='"+itemList[i].itemAction+"?itemId="+itemList[i].id+"&itemName="+itemName+"' target='right'><span class='"+itemList[i].itemImage+"'></span>"+itemList[i].itemName+"</a></li>";
        }
    }
    $("#item").append(html);
    
    var srcOne = itemList[0].itemAction+ "?itemId=" +itemList[0].id+"&itemName="+escape(itemList[0].itemName);
    $("#iframeId").attr("src",srcOne);
}


/**获取当前登录人信息*/
function getAudit() {
    $.ajax({
        type:"post",
        url:getBasePath()+"userRest/getUserInfo",
        dataType:"json",
        async:false,
        success:function (data) {
            if(data.status==0){
                $(".createUserName").html(data.data.data.username);
                if(data.data.data.username == "" ||data.data.data.username== undefined ){
                    window.location.href=return_url;
                }
            }else{
                window.location.href=return_url;
                alert("获取登录人信息，出错了!!");
            }
        },
        error:function () {
            window.location.href=return_url;
            alert("获取登录人信息，出错了!!");
        }
    });

    $('.frame_left').on("click","li",function(){
        $('.frame_left li').removeClass("active");
        $(this).addClass("active");
    })
}
