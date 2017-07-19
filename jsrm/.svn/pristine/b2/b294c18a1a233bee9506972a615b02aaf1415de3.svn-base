var userId;
var userName;
var type;

$(function () {
    initPage();     //初始化页面

    $("#btn").click(function () {         //确认按钮绑定事件
        submitOpinion();
    })

    $("#appDate").append(getCurrentDate());
    btnFhUrl();     //返回按钮绑定事件
})

function initPage() {
    getLoginInfo();         //获取用户信息
}

/**
 * 获取单选按钮的值
 * @param radioName
 */
function getRadioValue(radioName){

    var value = "";
    var radio = document.getElementsByName(radioName);

    for (var i=0; i<radio.length; i++) {
        if (radio[i].checked) {
            value = radio[i].value;
            break;
        }
    }

    return value;
}

/**
 * 提交审批意见
 */
function submitOpinion() {
    var isPass = getRadioValue("ispass");

    if(isPass==undefined || isPass=='' || isPass==null) {
        alert("请选择审核结果");
        return;
    }

    var busiId = $.getUrlParam("resourceId");
    var busiType = $.getUrlParam("type");

    var des = $("#opinion").val();
    if(des == null||des == ''){
        alert("请填写审核意见");
        return;
    }

    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/submitTask",
        dataType:"json",
        data:{"busiId":busiId, "busiType":busiType, "isPass":isPass, "approveOpinion":des},
        success:function (data) {
            if(data.status==0){
                var flag = ""+data.data;
                if(flag == '"2"'){
                    alert("提交失败：获取下一环节审批人失败！");
                    return;
                }

                
                alert("提交成功");
                window.parent.location.href=getForwordUrl();
            }else{
                console.log("提交流程失败！！");
            }
        },
        error:function () {
            console.log("获取数据失败！！");
        }
    });
}

function getLoginInfo() {
    $.ajax({
        type:"post",
        url:getBasePath()+"userRest/getUserInfo",
        dataType:"json",
        data:null,
        success:function (data) {
            if(data.status==0){
                userId = data.data.data.id;
                userName = data.data.data.username;

                $("#appUser").html(userName);     //显示审批人信息
            }else{
                console.log("获取数据失败！！");
            }
        },
        error:function () {
            console.log("获取数据失败！！");
        }
    })
}

/**
 * 设置返回按钮地址
 */
function btnFhUrl() {
    /**返回*/
    $("#ret").click(function () {
        window.parent.location.href=getForwordUrl();
    });
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getCurrentDate() {
    var myDate = new Date();

    return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
}

/**
 * 获取返回url
 * @returns {string}
 */
function getForwordUrl() {
    var url = "";
    var type=$.getUrlParam("type");
    if(type == 'DRA') {     //如果是发稿
        url="topicVetting.html";
    } else {
        url="resourceVetting.html";
    }

    return url;
}