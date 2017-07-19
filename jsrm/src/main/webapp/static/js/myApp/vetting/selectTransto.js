
var appIntanId;

$(function () {
    layerApp();
})

/**
 * 显示转发人
 * @param appIntanId
 */
function showAppUser(_appIntanId, userName) {
    $("#userName").val('');
    if(_appIntanId!=undefined && _appIntanId!='' && _appIntanId!=null) {
        appIntanId = _appIntanId;
    }
    showAppUserDiv();      //显示选择人员

    $.ajax({
        type:"post",
        url:getBasePath()+"vettingRest/getTaskApproveUsers",
        dataType:"json",
        data:{"id":appIntanId,'toUserName':userName},
        success:function (data) {
            if(data.status==0){
                shwoAppUserData(data.data.data);
            }else{
                console.log("获取数据失败！！");
            }
        },
        error:function () {
            console.log("获取数据失败！！");
        }
    })
}

function showAppUserDiv() {

    $(".btn_xz_alertb").show();
    $('#mask',parent.document).show();
}

/**
 * 列表填充数据
 * @param data
 */
function shwoAppUserData(data) {
    //清空table
    $("#appUserTable tr:not(:first)").remove();
    var result = "";
    if(data != undefined) {
        for(var i = 0; i < data.length; i++){
            var id = data[i].id;
            var userName = data[i].username;

            result += "<tr>"
                        + "<td><input type='radio' name='check' data-userId='"+id+"' data-userName='" + userName + "'></td>"
                        + "<td>" + userName + "</td>"
                    + "</tr>"
        }
        $("#appUserTable").append(result);
    }
}

//弹窗
function layerApp(){
    
    $("#userQuery").click(function () {
        var userName = $("#userName").val();

        showAppUser(null, userName);
    });

    $('.btn_qd').click(function(){
        var userId= "";             //获取选中信息
        var userName = "";
        var radio = document.getElementsByName("check");

        for (var i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                userId = radio[i].getAttribute("data-userId");
                userName = radio[i].getAttribute("data-userName");
                break;
            }
        }

        if(userId=='' || userName=='') {        //请选择需要转发的人员
            alert("请选择需要转发的人员");
            return;
        }
        if(confirm("是否确认转发？")){
            $.ajax({
                type:"post",
                url:getBasePath()+"vettingRest/transpondTask",
                dataType:"json",
                data:{"id":appIntanId, 'toUserName':userName, 'toUserId':userId},
                success:function (data) {
                    if(data.status==0){
                        alert("转发成功");
                        $(".btn_xz_alertb").hide();
                        $('#mask',parent.document).hide();

                        window.location.reload();
                    }else{
                        console.log("操作失败！！");
                    }
                },
                error:function () {
                    console.log("操作失败！！");
                }
            });
        }
    });
    $('.btn_qx').click(function(){$(".btn_xz_alertb").hide();
        $('#mask',parent.document).hide();
    });

    $('input[type=radio]','.alertbox').click(function(){
        if(this.checked){
            $(this).parent().parent().css({'background':'#E0EFD8'})
        }else{
        }
    });
}